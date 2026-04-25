import { useEffect, useRef } from "react";
import { FaCut, FaUser, FaCrown, FaStar } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    { icon: <FaCut />, title: "Corte de Cabello", desc: "Corte clásico o moderno adaptado a tu estilo. Técnica precisa para un acabado impecable que dura.", price: "Desde $80" },
    { icon: <FaCut />, title: "Corte con Tijera", desc: "Nuestra especialidad. Técnica artesanal con tijera para texturas naturales y acabados de alto nivel.", price: "Desde $120", badge: "Especialidad" },
    { icon: <FaUser />, title: "Arreglo de Barba", desc: "Perfilado, delineado y cuidado completo de barba. Definición perfecta para un look profesional.", price: "Desde $60" },
    { icon: <FaStar />, title: "Estilizado", desc: "Acabado con productos premium. Peinado y estilizado profesional para cualquier ocasión.", price: "Desde $50" },
    { icon: <FaCrown />, title: "Corte + Barba", desc: "El combo completo. Corte de cabello y arreglo de barba en una sola sesión con descuento especial.", price: "Desde $150", badge: "Popular" },
    { icon: <FaStar />, title: "Tratamiento Capilar", desc: "Hidratación y cuidado profundo del cabello. Productos de alta gama para un cabello saludable.", price: "Desde $100", highlight: true }
  ];

  useEffect(() => {
    // Animación de entrada para títulos
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    );

    // Animación stagger para las cards
    gsap.fromTo(cardsRef.current,
      { 
        opacity: 0, 
        y: 60,
        rotationX: -15,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );

    // Efecto 3D en hover para cada card
    cardsRef.current.forEach((card) => {
      if (!card) return;
      
      card.addEventListener("mouseenter", (e) => {
        gsap.to(card, {
          rotationY: 5,
          rotationX: -5,
          scale: 1.03,
          duration: 0.4,
          ease: "power2.out"
        });
      });
      
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      // Efecto de movimiento con el mouse
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(card, {
          rotationY: x * 8,
          rotationX: -y * 8,
          duration: 0.3,
          ease: "power1.out"
        });
      });
    });

  }, []);

  return (
    <section className="services" id="servicios" ref={sectionRef}>
      <p className="services-subtitle" ref={subtitleRef}>— LO QUE OFRECEMOS —</p>

      <h2 className="services-title" ref={titleRef}>
        NUESTROS <span>SERVICIOS</span>
      </h2>

      <p className="services-description" ref={descRef}>
        Cada servicio es una experiencia. Calidad, precisión y atención al detalle en cada visita.
      </p>

      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`service-card ${service.highlight ? "highlight" : ""}`}
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
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
        ))}
      </div>
    </section>
  );
}

export default Services;