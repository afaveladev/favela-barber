// src/utils/notifications.js
import emailjs from '@emailjs/browser';

// ⚠️ CONFIGURACIÓN DE EMAILJS
const EMAILJS_SERVICE_ID = "service_0g201k5";
const EMAILJS_TEMPLATE_ID = "template_c1ihlmb";
const EMAILJS_USER_ID = "R8st-MIEkk4LiKO8q";

// Inicializar EmailJS
emailjs.init(EMAILJS_USER_ID);

/**
 * Envía WhatsApp al barbero cuando se agenda una cita
 */
export const sendWhatsAppToBarber = (cita) => {
  const TU_NUMERO = "528715353066";
  
  const mensaje = `🪒 *¡NUEVA CITA AGENDADA!* 🪒

━━━━━━━━━━━━━━━━━━━━
👤 *Cliente:* ${cita.nombre}
📞 *Teléfono:* ${cita.telefono}
📧 *Email:* ${cita.email || 'No proporcionado'}
━━━━━━━━━━━━━━━━━━━━
💈 *Servicio:* ${cita.servicio}
📅 *Fecha:* ${formatFecha(cita.fecha)}
⏰ *Hora:* ${cita.hora}
━━━━━━━━━━━━━━━━━━━━
💬 *Mensaje:* ${cita.mensaje || 'Ninguno'}`;

  const url = `https://wa.me/${TU_NUMERO}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * 🧪 VERSIÓN DE PRUEBA - Envía en 2 minutos
 */
export const scheduleReminder = (cita) => {
  if (!cita.email) return;
  
  // 🧪 PRUEBA: enviar en 2 minutos
  console.log('🧪 MODO PRUEBA: Recordatorio se enviará en 2 minutos...');
  
  setTimeout(() => {
    sendEmailReminder(cita);
  }, 2 * 60 * 1000); // 2 minutos
  
  console.log(`⏰ Ahora: ${new Date().toLocaleTimeString()}`);
  console.log(`📧 Se enviará a las: ${new Date(Date.now() + 2*60*1000).toLocaleTimeString()}`);
};

/**
 * Envía el email de recordatorio usando EmailJS
 */
const sendEmailReminder = async (cita) => {
  if (!cita.email) return;
  
  const templateParams = {
    to_email: cita.email,
    nombre: cita.nombre,
    servicio: cita.servicio,
    fecha: formatFecha(cita.fecha),
    hora: cita.hora
  };
  
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    console.log('📧 Recordatorio enviado!', response.status);
  } catch (error) {
    console.error('❌ Error al enviar recordatorio:', error);
  }
};

const formatFecha = (fecha) => {
  if (!fecha) return '';
  const [year, month, day] = fecha.split('-');
  const months = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return `${parseInt(day)} de ${months[parseInt(month)]} de ${year}`;
};