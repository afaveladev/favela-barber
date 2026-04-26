import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, push, onValue } from "firebase/database";

function Contact() {

  const HORARIOS = [
    "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"
  ];

  const MAX_CITAS_DIA = 8;
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHora, setSelectedHora] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    servicio: "",
    fecha: "",
    hora: "",
    mensaje: ""
  });

  // 🆕 Leer servicio seleccionado cuando la sección Contact se vuelve visible
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const servicioGuardado = localStorage.getItem("servicioSeleccionado");
          if (servicioGuardado) {
            setForm(prev => ({
              ...prev,
              servicio: servicioGuardado
            }));
            localStorage.removeItem("servicioSeleccionado");
          }
        }
      });
    });

    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      observer.observe(contactSection);
    }

    return () => {
      if (contactSection) observer.unobserve(contactSection);
    };
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getMonthName = (month) => {
    const names = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return names[month];
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    const citasRef = ref(db, "citas");
    const unsubscribe = onValue(citasRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAppointments(data);
      } else {
        setAppointments({});
      }
      setLoading(false);
    }, (error) => {
      console.error("Error Firebase:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else { setCurrentMonth(currentMonth + 1); }
    setSelectedDay(null); setSelectedHora(null);
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else { setCurrentMonth(currentMonth - 1); }
    setSelectedDay(null); setSelectedHora(null);
  };

  const isHorarioOcupado = (fecha, hora) => {
    if (!appointments || typeof appointments !== 'object') return false;
    return Object.values(appointments).some(cita => cita && cita.fecha === fecha && cita.hora === hora);
  };

  const countCitasPorDia = (fecha) => {
    if (!appointments || typeof appointments !== 'object') return 0;
    return Object.values(appointments).filter(cita => cita && cita.fecha === fecha).length;
  };

  const isPastDay = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayClean = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayClean;
  };

  const espaciosDisponibles = (fecha) => MAX_CITAS_DIA - countCitasPorDia(fecha);

  const handleDayClick = (day) => {
    const fecha = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (isPastDay(day)) return;
    if (countCitasPorDia(fecha) >= MAX_CITAS_DIA) { alert("Este día ya está lleno"); return; }
    setSelectedDay(day);
    setSelectedHora(null);
    setForm(prev => ({ ...prev, fecha, hora: "" }));
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => phone.replace(/\D/g, '').length === 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.servicio || !form.fecha || !form.hora) {
      alert("Completa todos los campos obligatorios"); return;
    }
    if (form.email && !validateEmail(form.email)) {
      alert("Ingresa un email válido"); return;
    }
    if (!validatePhone(form.telefono)) {
      alert("Ingresa un teléfono válido (10 dígitos)"); return;
    }
    if (isHorarioOcupado(form.fecha, form.hora)) {
      alert("Este horario ya está ocupado"); return;
    }
    if (countCitasPorDia(form.fecha) >= MAX_CITAS_DIA) {
      alert("Este día ya está lleno"); return;
    }

    try {
      await push(ref(db, "citas"), {
        nombre: form.nombre,
        telefono: form.telefono,
        email: form.email || "",
        servicio: form.servicio,
        fecha: form.fecha,
        hora: form.hora,
        mensaje: form.mensaje || "",
        createdAt: Date.now()
      });
      alert("✅ Cita agendada correctamente. ¡Te esperamos en Favela Barber!");
      setForm({ nombre: "", telefono: "", email: "", servicio: "", fecha: "", hora: "", mensaje: "" });
      setSelectedDay(null);
      setSelectedHora(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agendar. Intenta de nuevo.");
    }
  };

  return (
    <section className="contact" id="contacto">
      <p className="contact-sub">— ENCUÉNTRANOS —</p>
      <h2 className="contact-title">UBICACIÓN Y <span>CONTACTO</span></h2>

      <div className="contact-container">
        <div className="left-side">
          <div className="calendar">
            <h4>Selecciona un día</h4>
            <div className="calendar-header">
              <button onClick={prevMonth} aria-label="Mes anterior">‹</button>
              <span>{getMonthName(currentMonth)} {currentYear}</span>
              <button onClick={nextMonth} aria-label="Mes siguiente">›</button>
            </div>

            {loading ? (
              <div className="calendar-loading">Cargando disponibilidad...</div>
            ) : (
              <div className="calendar-grid">
                {days.map(day => {
                  const fecha = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const isPast = isPastDay(day);
                  const total = countCitasPorDia(fecha);
                  const disponible = espaciosDisponibles(fecha);
                  const lleno = total >= MAX_CITAS_DIA;

                  return (
                    <div key={day}
                      className={`day ${selectedDay === day ? "selected" : ""} ${isPast ? "past" : ""} ${lleno ? "busy" : ""}`}
                      onClick={() => {
                        if (isPast) { alert("⏳ Este día ya pasó."); return; }
                        if (lleno) { alert("📅 Este día ya está lleno."); return; }
                        handleDayClick(day);
                      }}
                    >
                      <span>{day}</span>
                      {!isPast && <small className="disponibles">{lleno ? "Lleno" : `${disponible} disp.`}</small>}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="calendar-info">
              <span><span className="free-dot"></span> Disponible</span>
              <span><span className="busy-dot"></span> Ocupado</span>
            </div>
          </div>

          {selectedDay && (
            <div className="horarios">
              <h4>Selecciona horario</h4>
              <div className="horarios-grid">
                {HORARIOS.map(hora => {
                  const ocupado = isHorarioOcupado(form.fecha, hora);
                  const isSelected = selectedHora === hora;
                  return (
                    <button key={hora} type="button"
                      className={`hora-btn ${ocupado ? "busy" : ""} ${isSelected ? "selected" : ""}`}
                      disabled={ocupado}
                      onClick={() => {
                        if (!form.fecha) { alert("📅 Primero selecciona un día."); return; }
                        if (ocupado) { alert("⏰ Este horario ya está ocupado."); return; }
                        setSelectedHora(hora);
                        setForm(prev => ({ ...prev, hora }));
                      }}
                    >{hora}</button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.7848096201274!2d-103.51697530784833!3d25.595661080538875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM1JzQ0LjciTiAxMDPCsDMxJzAwLjMiVw!5e0!3m2!1ses!2smx!4v1777146201658!5m2!1ses!2smx"
              width="100%" height="220"
              style={{ border: 0, borderRadius: "15px" }}
              allowFullScreen loading="lazy"
              title="Favela Barber - Calle Tolosa, Santa Sofía, Gómez Palacio"
            ></iframe>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3 className="form-title">AGENDA TU <span>CITA</span></h3>
          <p>Selecciona día y horario, luego completa tus datos.</p>

          <div className="form-grid">
            <div className="form-group">
              <label>Nombre *</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre completo" required />
            </div>
            <div className="form-group">
              <label>Teléfono *</label>
              <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="10 dígitos" inputMode="numeric" required />
            </div>
          </div>

          <div className="form-group">
            <label>Email (opcional)</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" />
          </div>

          {/* 🆕 SERVICIO - Se llena automáticamente desde Services */}
          <div className="form-group">
            <label>Servicio *</label>
            <input 
              value={form.servicio || "Selecciona un servicio de la sección Servicios"} 
              readOnly 
            />
          </div>

          <div className="form-group">
            <label>Fecha seleccionada</label>
            <input value={form.fecha || "Selecciona un día en el calendario"} readOnly />
          </div>

          <div className="form-group">
            <label>Hora seleccionada</label>
            <input value={form.hora || "Selecciona un horario"} readOnly />
          </div>

          <div className="form-group">
            <label>Mensaje (opcional)</label>
            <textarea name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="¿Alguna indicación especial?" />
          </div>

          <button type="submit" className="btn-primary">✂️ Confirmar Cita</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;