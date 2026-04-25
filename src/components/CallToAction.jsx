import { useEffect, useRef } from "react";
import { FaWhatsapp, FaRegCalendarAlt } from "react-icons/fa";
import gsap from "gsap";

function Hero() {
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const ratingRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // 1. RATING
    tl.fromTo(ratingRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    // 2. TÍTULO - Stagger letters + Golden Reveal
    const titleElement = titleRef.current;
    const originalHTML = titleElement.innerHTML;
    
    titleElement.innerHTML = "";
    const lines = originalHTML.split("<br>");
    
    lines.forEach((line) => {
      const lineDiv = document.createElement("div");
      lineDiv.style.display = "block";
      
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = line;
      const text = tempDiv.textContent || "";
      
      [...text].forEach((letter) => {
        const span = document.createElement("span");
        span.innerText = letter;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(30px)";
        lineDiv.appendChild(span);
      });
      
      titleElement.appendChild(lineDiv);
    });

    // Animar con stagger
    tl.fromTo(titleElement.querySelectorAll("span"),
      { 
        opacity: 0, 
        y: 30,
        filter: "blur(4px)"
      },
      { 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)",
        duration: 0.5,
        stagger: 0.03,
        ease: "back.out(2)"
      }
    );

    // 3. TAGLINE
    tl.fromTo(taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // 4. DESCRIPCIÓN
    tl.fromTo(descriptionRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.2"
    );

    // 5. BOTONES
    tl.fromTo(buttonsRef.current.children,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
      "-=0.1"
    );

    // 6. TIJERAS
    gsap.to(".scissors", {
      rotation: 360,
      duration: 3,
      repeat: -1,
      ease: "linear",
      transformOrigin: "center center"
    });

    // 7. PULSO RATING
    gsap.to(ratingRef.current, {
      boxShadow: "0 0 15px rgba(245, 158, 11, 0.5)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

  }, []);

  const scrollToContact = () => {
    document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="inicio">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        {/* ⭐ Rating */}
        <div className="hero-rating" ref={ratingRef}>
          ⭐⭐⭐⭐⭐ 4.9 / 5 • 150 opiniones
        </div>

        {/* 🔥 Título - FAVELA'S BLANCO + BARBER DORADO */}
        <h1 className="hero-title" ref={titleRef}>
          FAVELA'S <br />
          <span style={{ color: "#F59E0B" }}>BARBER</span>
        </h1>

        {/* ✍️ Frase */}
        <p className="hero-tagline" ref={taglineRef}>
          "Donde el estilo se convierte en identidad"
        </p>

        {/* ✂️ Divider */}
        <div className="hero-divider">
          <span className="scissors">✂️</span>
        </div>

        {/* 📝 Descripción */}
        <p className="hero-description" ref={descriptionRef}>
          Barbería premium en Gómez Palacio, Durango. Cortes de precisión,
          <br />
          arreglo de barba y estilizado con la más alta calidad.
        </p>

        {/* 🔘 Botones */}
        <div className="hero-buttons" ref={buttonsRef}>
          <button className="btn-primary" onClick={scrollToContact}>
            <FaRegCalendarAlt /> Agendar Cita
          </button>

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