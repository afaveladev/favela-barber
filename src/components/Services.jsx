import { FaCut, FaUser, FaCrown, FaStar } from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <FaCut />,
      title: "Corte de Cabello",
      desc: "Corte clásico o moderno adaptado a tu estilo. Técnica precisa para un acabado impecable que dura.",
      price: "Desde $80",
    },
    {
      icon: <FaCut />,
      title: "Corte con Tijera",
      desc: "Nuestra especialidad. Técnica artesanal con tijera para texturas naturales y acabados de alto nivel.",
      price: "Desde $120",
      badge: "Especialidad"
    },
    {
      icon: <FaUser />,
      title: "Arreglo de Barba",
      desc: "Perfilado, delineado y cuidado completo de barba. Definición perfecta para un look profesional.",
      price: "Desde $60",
    },
    {
      icon: <FaStar />,
      title: "Estilizado",
      desc: "Acabado con productos premium. Peinado y estilizado profesional para cualquier ocasión.",
      price: "Desde $50",
    },
    {
      icon: <FaCrown />,
      title: "Corte + Barba",
      desc: "El combo completo. Corte de cabello y arreglo de barba en una sola sesión con descuento especial.",
      price: "Desde $150",
      badge: "Popular"
    },
    {
      icon: <FaStar />,
      title: "Tratamiento Capilar",
      desc: "Hidratación y cuidado profundo del cabello. Productos de alta gama para un cabello saludable.",
      price: "Desde $100",
      highlight: true
    }
  ];

  return (
    <section className="services" id="servicios">

      {/* TITULOS */}
      <p className="services-subtitle">— LO QUE OFRECEMOS —</p>

      <h2 className="services-title">
        NUESTROS <span>SERVICIOS</span>
      </h2>

      <p className="services-description">
        Cada servicio es una experiencia. Calidad, precisión y atención al detalle en cada visita.
      </p>

      {/* GRID */}
      <div className="services-grid">
        {services.map((service, index) => (
          <div
            className={`service-card ${service.highlight ? "highlight" : ""}`}
            key={index}
          >

            {/* BADGE */}
            {service.badge && (
              <span className="badge">{service.badge}</span>
            )}

            {/* ICONO */}
            <div className="service-icon">
              {service.icon}
            </div>

            {/* CONTENIDO */}
            <h3>{service.title}</h3>
            <p>{service.desc}</p>

            {/* FOOTER */}
            <div className="service-footer">
              <span className="price">{service.price}</span>

              <div className="arrow">→</div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Services;