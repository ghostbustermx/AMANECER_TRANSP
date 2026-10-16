import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import nodemailer from 'nodemailer';
import emailConfig from './emailConfig.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || (emailConfig.server?.port ?? 3001);

const tripTypeLabels = {
  'round-trip': 'Round Trip',
  'one-way': 'One Way',
};

function clean(value, maxLength = 200) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function buildEmail(data) {
  const destination = clean(data.destination);
  const tripType = tripTypeLabels[data.tripType] || 'N/A';
  const arrival = clean(data.arrival);
  const passengers = clean(data.passengers);
  const email = clean(data.email);

  const sentAt = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const rows = [
    ['Destination', destination],
    ['Trip Type', tripType],
    ['Arrival Date', arrival],
    ['Passengers', passengers],
    ['Email', email],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#b45309;margin-bottom:4px;">New booking request</h2>
      <p style="color:#666;margin-top:0;">Submitted from the website booking bar on ${sentAt}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        ${rows
          .map(
            ([label, value], i) => `
              <tr>
                <td style="padding:10px 12px;background:${i % 2 ? '#f9f9f9' : '#fff'};border-bottom:1px solid #eee;color:#333;font-weight:bold;width:40%;">${label}</td>
                <td style="padding:10px 12px;background:${i % 2 ? '#f9f9f9' : '#fff'};border-bottom:1px solid #eee;color:#222;">${value}</td>
              </tr>`
          )
          .join('')}
      </table>
      <p style="color:#888;font-size:12px;margin-top:24px;">Amanecer Transportation</p>
    </div>
  `;

  const text = [
    'New booking request',
    `Submitted on: ${sentAt}`,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join('\n');

  return {
    subject: emailConfig.bookingEmail?.subject || 'New booking request',
    html,
    text,
  };
}

const transporter = nodemailer.createTransport({
  host: emailConfig.smtp?.host,
  port: emailConfig.smtp?.port,
  secure: emailConfig.smtp?.secure,
  tls: {
    rejectUnauthorized: emailConfig.smtp?.rejectUnauthorized ?? true,
  },
  auth: {
    user: emailConfig.smtp?.user,
    pass: emailConfig.smtp?.appPassword,
  },
});

const appPasswordConfigured = (emailConfig.smtp?.appPassword || '')
  .replace(/\s/g, '')
  .length > 0;

async function sendBookingMail({ subject, html, text, replyTo }) {
  const recipients = emailConfig.to?.recipients || [];
  const hidden = emailConfig.to?.bcc || [];
  const base = {
    from: `"${emailConfig.from?.name}" <${emailConfig.from?.alias}>`,
    replyTo: replyTo || emailConfig.from?.replyTo || emailConfig.smtp?.user,
    subject,
    text,
    html,
  };

  await transporter.sendMail({
    ...base,
    to: recipients,
  });

  for (const recipient of hidden) {
    await transporter.sendMail({ ...base, to: recipient });
  }
}

function buildDetailsEmail(data) {
  const fields = [
    ['Vehicle', clean(data.vehicle)],
    ['Name', clean(data.name)],
    ['Phone / WhatsApp', clean(data.phone)],
    ['Email', clean(data.email)],
    ['Pax Number', clean(data.pax)],
    ['Arrival Date', clean(data.arrivalDate)],
    ['Airline', clean(data.airline)],
    ['Flight', clean(data.flight)],
    ['Return Date', clean(data.returnDate)],
    ['Pick Up', clean(data.pickup)],
    ['Drop Off', clean(data.dropoff)],
  ].filter(([, value]) => value);

  const sentAt = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#b45309;margin-bottom:4px;">New booking request</h2>
      <p style="color:#666;margin-top:0;">Submitted from the booking modal on ${sentAt}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        ${fields
          .map(
            ([label, value], i) => `
              <tr>
                <td style="padding:10px 12px;background:${i % 2 ? '#f9f9f9' : '#fff'};border-bottom:1px solid #eee;color:#333;font-weight:bold;width:40%;">${label}</td>
                <td style="padding:10px 12px;background:${i % 2 ? '#f9f9f9' : '#fff'};border-bottom:1px solid #eee;color:#222;">${value}</td>
              </tr>`
          )
          .join('')}
      </table>
      <p style="color:#888;font-size:12px;margin-top:24px;">Amanecer Transportation</p>
    </div>
  `;

  const text = [
    'New booking request',
    `Submitted on: ${sentAt}`,
    '',
    ...fields.map(([label, value]) => `${label}: ${value}`),
  ].join('\n');

  return {
    subject: emailConfig.bookingEmail?.subject || 'New booking request',
    html,
    text,
  };
}

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowed = emailConfig.security?.corsOrigins || [];
  if (origin && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.post('/api/send-booking', async (req, res) => {
  try {
    const { destination, tripType, arrival, passengers, email } = req.body || {};

    if (!clean(destination)) {
      return res.status(400).json({ message: 'Destination is required.' });
    }
    if (!clean(arrival)) {
      return res.status(400).json({ message: 'Arrival date is required.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'A valid email is required.' });
    }
    if (!appPasswordConfigured || /^x{4}/i.test(emailConfig.smtp?.appPassword || '')) {
      return res.status(500).json({
        message:
          'Email service is not configured yet. Set the app password in server/emailConfig.js',
      });
    }

    const { subject, html, text } = buildEmail({ destination, tripType, arrival, passengers, email });

    await sendBookingMail({ subject, html, text, replyTo: clean(email) });

    res.json({ ok: true });
  } catch (err) {
    console.error('Failed to send booking email:', err);
    res.status(500).json({ message: 'Email could not be sent. Check the server log.' });
  }
});

app.post('/api/send-booking-details', async (req, res) => {
  try {
    const body = req.body || {};

    if (!clean(body.name) || !clean(body.email)) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }
    if (!appPasswordConfigured || /^x{4}/i.test(emailConfig.smtp?.appPassword || '')) {
      return res.status(500).json({
        message:
          'Email service is not configured yet. Set the app password in server/emailConfig.js',
      });
    }

    const { subject, html, text } = buildDetailsEmail(body);

    await sendBookingMail({ subject, html, text, replyTo: clean(body.email) });

    res.json({ ok: true });
  } catch (err) {
    console.error('Failed to send booking details email:', err);
    res.status(500).json({ message: 'Email could not be sent. Check the server log.' });
  }
});

const distDir = path.join(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
}

app.listen(PORT, () => {
  console.log(`Email server running on http://localhost:${PORT}`);
});