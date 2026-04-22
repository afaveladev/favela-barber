import { FaWhatsapp, FaRegCalendarAlt } from "react-icons/fa";

function CallToAction() {
  return (
    <section className="cta">

      <p className="cta-sub">— VIVE LA EXPERIENCIA —</p>

      <h2 className="cta-title">
        VIVE LA EXPERIENCIA <br />
        <span>FAVEL'A BARBER</span>
      </h2>

      {/* TEXTO */}
      <p className="cta-text">
        No solo es un corte. Es una transformación. Agenda tu cita hoy
        <br />
        descubre por qué somos la barbería premium de Gómez Palacio.
      </p>

      {/* BOTONES */}
      <div className="cta-buttons">

        {/* AGENDA */}
        <button
          className="btn-primary"
          onClick={() =>
            document
              .getElementById("contacto")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          <FaRegCalendarAlt /> Agenda tu Cita Hoy
        </button>

        {/* WHATSAPP (MISMO ESTILO QUE HERO) */}
        <a
          href="https://wa.me/528714506477?text=Hola,%20quiero%20agendar%20una%20cita%20en%20FAVELA%20BARBER"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <FaWhatsapp className="whatsapp-icon" />
          Contáctanos
        </a>

      </div>

      {/* STATS */}
      <div className="cta-stats">
        <div>
          <h3>4.9★</h3>
          <span>CALIFICACIÓN</span>
        </div>

        <div>
          <h3>69+</h3>
          <span>OPINIONES</span>
        </div>

        <div>
          <h3>100%</h3>
          <span>SATISFACCIÓN</span>
        </div>
      </div>

    </section>
  );
}

export default CallToAction;