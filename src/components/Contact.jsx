import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, push, onValue } from "firebase/database";

function Contact() {

  // 🔥 HORARIOS (2 horas)
  const HORARIOS = [
    "09:00",
    "11:00",
    "13:00",
    "15:00",
    "17:00",
    "19:00"
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

  // 🔥 FUNCIONES FECHA
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthName = (month) => {
    const names = [
      "Enero","Febrero","Marzo","Abril",
      "Mayo","Junio","Julio","Agosto",
      "Septiembre","Octubre","Noviembre","Diciembre"
    ];
    return names[month];
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 🔥 FIREBASE - CONEXIÓN CORREGIDA
  useEffect(() => {
    console.log("🔥 Conectando a Firebase Realtime Database...");
    const citasRef = ref(db, "citas");

    const unsubscribe = onValue(citasRef, (snapshot) => {
      const data = snapshot.val();
      console.log("📦 Datos recibidos de Firebase:", data);
      
      if (data) {
        setAppointments(data);
        console.log(`✅ ${Object.keys(data).length} citas cargadas`);
      } else {
        setAppointments({});
        console.log("⚠️ No hay citas registradas aún");
      }
      setLoading(false);
    }, (error) => {
      console.error("❌ Error al leer Firebase:", error);
      setLoading(false);
    });

    return () => {
      console.log("🔌 Desconectando listener de Firebase");
      unsubscribe();
    };
  }, []);

  // 🔥 CAMBIAR MES
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
    setSelectedHora(null);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
    setSelectedHora(null);
  };

  // 🔥 VALIDACIONES - CORREGIDAS
  const isHorarioOcupado = (fecha, hora) => {
    if (!appointments || typeof appointments !== 'object') return false;
    
    return Object.values(appointments).some(
      (cita) => cita && cita.fecha === fecha && cita.hora === hora
    );
  };

  const countCitasPorDia = (fecha) => {
    if (!appointments || typeof appointments !== 'object') return 0;
    
    return Object.values(appointments).filter(
      (cita) => cita && cita.fecha === fecha
    ).length;
  };

  // 🔥 DÍAS PASADOS
  const isPastDay = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayClean = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return date < todayClean;
  };

  // 🔥 DISPONIBILIDAD
  const espaciosDisponibles = (fecha) => {
    const usadas = countCitasPorDia(fecha);
    return MAX_CITAS_DIA - usadas;
  };

  // 🔥 CLICK DÍA
  const handleDayClick = (day) => {
    const fecha = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    if (isPastDay(day)) {
      console.log("⏳ Día pasado, no seleccionable");
      return;
    }

    if (countCitasPorDia(fecha) >= MAX_CITAS_DIA) {
      alert("Este día ya está lleno");
      return;
    }

    console.log("📅 Día seleccionado:", fecha);
    setSelectedDay(day);
    setSelectedHora(null);

    setForm(prev => ({
      ...prev,
      fecha,
      hora: ""
    }));
  };

  // 🔥 INPUTS
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ✅ VALIDACIÓN DE EMAIL
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // ✅ VALIDACIÓN DE TELÉFONO
  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
  };

  // 🔥 ENVIAR - CORREGIDO CON ASYNC/AWAIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📤 Intentando enviar cita...");

    // Validaciones
    if (!form.nombre || !form.telefono || !form.servicio || !form.fecha || !form.hora) {
      alert("Completa todos los campos obligatorios");
      console.log("❌ Campos faltantes");
      return;
    }

    if (form.email && !validateEmail(form.email)) {
      alert("Ingresa un email válido");
      console.log("❌ Email inválido");
      return;
    }

    if (!validatePhone(form.telefono)) {
      alert("Ingresa un teléfono válido (10 dígitos)");
      console.log("❌ Teléfono inválido");
      return;
    }

    if (isHorarioOcupado(form.fecha, form.hora)) {
      alert("Este horario ya está ocupado");
      console.log("❌ Horario ocupado");
      return;
    }

    if (countCitasPorDia(form.fecha) >= MAX_CITAS_DIA) {
      alert("Este día ya está lleno");
      console.log("❌ Día lleno");
      return;
    }

    try {
      console.log("💾 Guardando en Firebase...", form);
      const citasRef = ref(db, "citas");
      
      await push(citasRef, {
        nombre: form.nombre,
        telefono: form.telefono,
        email: form.email || "",
        servicio: form.servicio,
        fecha: form.fecha,
        hora: form.hora,
        mensaje: form.mensaje || "",
        createdAt: Date.now()
      });

      console.log("✅ Cita guardada exitosamente");
      alert("✅ Cita agendada correctamente. ¡Te esperamos en Favela Barber!");

      // Limpiar formulario
      setForm({
        nombre: "",
        telefono: "",
        email: "",
        servicio: "",
        fecha: "",
        hora: "",
        mensaje: ""
      });

      setSelectedDay(null);
      setSelectedHora(null);
      
    } catch (error) {
      console.error("❌ Error al guardar cita:", error);
      alert("Error al agendar. Revisa la consola o intenta de nuevo.");
    }
  };

  return (
    <section className="contact" id="contacto">

      <p className="contact-sub">— ENCUÉNTRANOS —</p>

      <h2 className="contact-title">
        UBICACIÓN Y <span>CONTACTO</span>
      </h2>

      <div className="contact-container">

        {/* IZQUIERDA */}
        <div className="left-side">

          {/* 📅 CALENDARIO */}
          <div className="calendar">

            <h4>Selecciona un día</h4>

            <div className="calendar-header">
              <button onClick={prevMonth} aria-label="Mes anterior">‹</button>
              <span>{getMonthName(currentMonth)} {currentYear}</span>
              <button onClick={nextMonth} aria-label="Mes siguiente">›</button>
            </div>

            {loading ? (
              <div className="calendar-loading">
                Cargando disponibilidad...
              </div>
            ) : (
              <div className="calendar-grid">
                {days.map(day => {
                  const fecha = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const isPast = isPastDay(day);
                  const total = countCitasPorDia(fecha);
                  const disponible = espaciosDisponibles(fecha);
                  const lleno = total >= MAX_CITAS_DIA;

                  return (
                    <div
                      key={day}
                      className={`day 
                        ${selectedDay === day ? "selected" : ""} 
                        ${isPast ? "past" : ""} 
                        ${lleno ? "busy" : ""}`}
                      onClick={() => {
                        // 🗓️ DÍA PASADO
                        if (isPast) {
                          alert("⏳ Este día ya pasó. Por favor selecciona una fecha futura.");
                          return;
                        }
                        
                        // 📅 DÍA LLENO
                        if (lleno) {
                          alert("📅 Este día ya está completamente lleno. Por favor selecciona otra fecha.");
                          return;
                        }
                        
                        // ✅ DÍA DISPONIBLE
                        handleDayClick(day);
                      }}
                    >
                      <span>{day}</span>
                      {!isPast && (
                        <small className="disponibles">
                          {lleno ? "Lleno" : `${disponible} disp.`}
                        </small>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Leyenda */}
            <div className="calendar-info">
              <span><span className="free-dot"></span> Disponible</span>
              <span><span className="busy-dot"></span> Ocupado</span>
            </div>

          </div>

          {/* ⏰ HORARIOS */}
          {selectedDay && (
            <div className="horarios">
              <h4>Selecciona horario</h4>
              <div className="horarios-grid">
                {HORARIOS.map(hora => {
                  const ocupado = isHorarioOcupado(form.fecha, hora);
                  const isSelected = selectedHora === hora;

                  return (
                    <button
                      key={hora}
                      type="button"
                      className={`hora-btn 
                        ${ocupado ? "busy" : ""} 
                        ${isSelected ? "selected" : ""}`}
                      disabled={ocupado}
                      onClick={() => {
                        if (!form.fecha) {
                          alert("📅 Primero selecciona un día en el calendario.");
                          return;
                        }
                        
                        if (ocupado) {
                          alert("⏰ Este horario ya está ocupado. Por favor selecciona otro.");
                          return;
                        }
                        
                        setSelectedHora(hora);
                        setForm(prev => ({ ...prev, hora }));
                      }}
                    >
                      {hora}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 🗺️ MAPA */}
          <div className="map">
            <iframe
              src="https://www.google.com/maps?q=Gomez+Palacio+Durango&output=embed"
              width="100%"
              height="220"
              style={{ border: 0, borderRadius: "15px" }}
              loading="lazy"
              title="Ubicación Favela Barber"
            ></iframe>
          </div>

        </div>

        {/* DERECHA - FORMULARIO */}
        <form className="contact-form" onSubmit={handleSubmit}>

          <h3 className="form-title">
            AGENDA TU <span>CITA</span>
          </h3>

          <p>Selecciona día y horario, luego completa tus datos.</p>

          <div className="form-grid">
            <div className="form-group">
              <label>Nombre *</label>
              <input 
                name="nombre" 
                value={form.nombre} 
                onChange={handleChange} 
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div className="form-group">
              <label>Teléfono *</label>
              <input 
                name="telefono" 
                value={form.telefono} 
                onChange={handleChange} 
                placeholder="10 dígitos"
                inputMode="numeric"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email (opcional)</label>
            <input 
              name="email" 
              type="email"
              value={form.email} 
              onChange={handleChange} 
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-group">
            <label>Servicio *</label>
            <select name="servicio" value={form.servicio} onChange={handleChange} required>
              <option value="">Selecciona un servicio</option>
              <option value="Corte">Corte de Cabello</option>
              <option value="Barba">Arreglo de Barba</option>
              <option value="Corte + Barba">Corte + Barba (Combo)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Fecha seleccionada</label>
            <input 
              value={form.fecha || "Selecciona un día en el calendario"} 
              readOnly 
            />
          </div>

          <div className="form-group">
            <label>Hora seleccionada</label>
            <input 
              value={form.hora || "Selecciona un horario"} 
              readOnly 
            />
          </div>

          <div className="form-group">
            <label>Mensaje (opcional)</label>
            <textarea 
              name="mensaje" 
              value={form.mensaje} 
              onChange={handleChange} 
              placeholder="¿Alguna indicación especial?"
            />
          </div>

          <button type="submit" className="btn-primary">
            ✂️ Confirmar Cita
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;