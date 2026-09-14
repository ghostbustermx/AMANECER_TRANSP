// =====================================================================
// CONFIGURACION DE CORREO — Amanecer Transportation
// Este archivo es la plantilla de ejemplo (sin datos reales).
// Para usar tu configuracion real:
//   1) Copia este archivo como emailConfig.js  (misma carpeta server/)
//   2) Pon tu app password y ajusta los correos
// El archivo emailConfig.js NO se sube a Git (esta en .gitignore).
// =====================================================================

export default {
  // Servidor web del correo (no cambies salvo que sepas lo que haces)
  server: {
    port: 3001,
  },

  // Cuenta Gmail que envia + app password (Nunca la pongas en el frontend)
  smtp: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    user: 'noreply.amanecer.transp@gmail.com',
    appPassword: 'XXXX XXXX XXXX XXXX',
    // Verifica el certificado TLS (recomendado: true).
    // Pon false SOLO si tu antivirus/proxy bloquea el handshake TLS con Gmail.
    rejectUnauthorized: true,
  },

  // Remitente visible (alias verificado en Gmail > "Send mail as")
  // IMPORTANTE: alias SIN guion: noreply@amanecertransportation.com
  from: {
    name: 'Amanecer Transportation',
    alias: 'noreply@amanecertransportation.com',
    replyTo: 'noreply.amanecer.transp@gmail.com',
  },

  // A quien llegan las solicitudes de reserva
  to: {
    recipients: ['keconecte@gmail.com'],
    // Copia oculta (CCO / BCC)
    bcc: ['webmaster@venadoblanco.com'],
    // Como se entrega la copia oculta:
    //   'hostinger' -> via smtp.hostinger.com con el buzón webmaster@venadoblanco.com
    //                   (envio de su propio dominio a su propio dominio: SIEMPRE llega)
    //   'separate'  -> mensaje aparte directo a cada correo de bcc, por el mismo relay de Gmail
    //   'bcc'       -> CCO real en el mismo mensaje (Gmail lo descarta si el From
    //                  es un dominio externo sin DKIM alineado)
    deliverBcc: 'hostinger',
  },

  // Transporte de la copia oculta via Hostinger (solo se usa si deliverBcc = 'hostinger')
  hostinger: {
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    user: 'webmaster@venadoblanco.com',
    pass: 'XXXX XXXX XXXX XXXX',
    from: 'webmaster@venadoblanco.com',
    fromName: 'Amanecer Transportation',
    rejectUnauthorized: false,
  },

  // Asunto del correo de reserva
  bookingEmail: {
    subject: 'Nueva solicitud de reserva — Amanecer Transportation',
  },

  // Origenes permitidos para hacer peticiones al servidor de correo
  security: {
    corsOrigins: [
      'http://localhost:5173',
      'http://localhost:4173',
      'https://amanecertransportation.com',
      'https://www.amanecertransportation.com',
      'https://amanecer.sayulitatravel.com',
    ],
  },
};