import { FaCut, FaUser, FaCrown, FaStar } from "react-icons/fa";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function Services() {
  const subtitleRef = useScrollAnimation(0.1);
  const titleRef = useScrollAnimation(0.1);
  const descRef = useScrollAnimation(0.1);

  const services = [
    { icon: <FaCut />, title: "Corte de Cabello", desc: "Corte clásico o moderno adaptado a tu estilo. Técnica precisa para un acabado impecable que dura.", price: "Desde $80", delay: "1" },
    { icon: <FaCut />, title: "Corte con Tijera", desc: "Nuestra especialidad. Técnica artesanal con tijera para texturas naturales y acabados de alto nivel.", price: "Desde $120", badge: "Especialidad", delay: "2" },
    { icon: <FaUser />, title: "Arreglo de Barba", desc: "Perfilado, delineado y cuidado completo de barba. Definición perfecta para un look profesional.", price: "Desde $60", delay: "3" },
    { icon: <FaStar />, title: "Estilizado", desc: "Acabado con productos premium. Peinado y estilizado profesional para cualquier ocasión.", price: "Desde $50", delay: "4" },
    { icon: <FaCrown />, title: "Corte + Barba", desc: "El combo completo. Corte de cabello y arreglo de barba en una sola sesión con descuento especial.", price: "Desde $150", badge: "Popular", delay: "5" },
    { icon: <FaStar />, title: "Tratamiento Capilar", desc: "Hidratación y cuidado profundo del cabello. Productos de alta gama para un cabello saludable.", price: "Desde $100", highlight: true, delay: "6" }
  ];

  return (
    <section className="services" id="servicios">
      <p className="services-subtitle animate-on-scroll animate-fade-up" ref={subtitleRef}>
        — LO QUE OFRECEMOS —
      </p>

      <h2 className="services-title animate-on-scroll animate-fade-up" ref={titleRef}>
        NUESTROS <span>SERVICIOS</span>
      </h2>

      <p className="services-description animate-on-scroll animate-fade-up" ref={descRef}>
        Cada servicio es una experiencia. Calidad, precisión y atención al detalle en cada visita.
      </p>

      <div className="services-grid">
        {services.map((service, index) => {
          const cardRef = useScrollAnimation(0.1);
          
          return (
            <div
              key={index}
              ref={cardRef}
              className={`service-card animate-on-scroll animate-fade-up stagger-delay-${service.delay} ${service.highlight ? "highlight" : ""}`}
            >
              {service.badge && <span className="badge">{service.badge}</span>}
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className="service-footer">
                <span className="price">{service.price}</span>
                <div className="arrow">→</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Services;