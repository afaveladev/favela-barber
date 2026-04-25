import { FaWhatsapp, FaRegCalendarAlt } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero" id="inicio">

      {/* 🌑 Overlay */}
      <div className="hero-overlay"></div>

      {/* 📦 Contenido */}
      <div className="hero-content">

        {/* ⭐ Rating */}
        <div className="hero-rating">
          ⭐⭐⭐⭐⭐ 4.9 / 5 • 150 opiniones
        </div>

        {/* 🔥 Título */}
        <h1 className="hero-title">
          FAVELA'S <br />
          <span>BARBER</span>
        </h1>

        {/* ✍️ Frase */}
        <p className="hero-tagline">
          "Donde el estilo se convierte en identidad"
        </p>

        {/* ✂️ Divider */}
        <div className="hero-divider">
          <span className="scissors">✂️</span>
        </div>

        {/* 📝 Descripción */}
        <p className="hero-description">
          Barbería premium en Gómez Palacio, Durango. Cortes de precisión,
          <br />
          arreglo de barba y estilizado con la más alta calidad.
        </p>

        {/* 🔘 Botones */}
        <div className="hero-buttons">

          {/* BOTÓN CITA */}
          <button className="btn-primary"   onClick={() => document.getElementById("contacto").scrollIntoView({ behavior: "smooth" })}>
            <FaRegCalendarAlt /> Agendar Cita
          </button>

          {/* BOTÓN WHATSAPP */}
          <a
            href="https://wa.me/528716003627?text=Hola,%20quiero%20agendar%20una%20cita%20en%20FAVELA%20BARBER"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <FaWhatsapp className="whatsapp-icon" />
            Contáctanos
          </a>

        </div>

      </div>
    </section>
  );
}

export default Hero;