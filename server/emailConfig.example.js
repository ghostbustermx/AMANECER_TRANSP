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
    // Copia oculta (CCO / BCC): cada correo recibe una copia enviada
    // desde la misma cuenta Gmail (smtp) con su app password.
    bcc: ['webmaster@venadoblanco.com'],
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
    ],
  },
};