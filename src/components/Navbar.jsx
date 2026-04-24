import { useState, useEffect, useRef } from "react";
import { FaRegCalendarAlt, FaTimes, FaChevronRight } from "react-icons/fa";
import logo from "../assets/logo.webp";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [hoveredItem, setHoveredItem] = useState(null);

  // Estados para el acceso secreto
  const clickTimer = useRef(null);
  const clickCount = useRef(0);

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (menuOpen) setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  // Detectar sección activa durante el scroll
  useEffect(() => {
    const sections = ["inicio", "servicios", "nosotros", "opiniones", "galeria", "contacto"];
    
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  // MANEJAR CLIC SECRETO EN EL LOGO
  const handleLogoClick = () => {
    clickCount.current += 1;

    if (clickCount.current === 1) {
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
      }, 2000);
    }

    if (clickCount.current === 3) {
      clearTimeout(clickTimer.current);
      clickCount.current = 0;
      
      // Redirigir al panel admin
      window.location.hash = '#/admin';
      
      return;
    }

    // Comportamiento normal: ir al inicio
    scrollToSection("inicio");
  };

  const navItems = [
    { id: "inicio", label: "INICIO" },
    { id: "servicios", label: "SERVICIOS" },
    { id: "nosotros", label: "NOSOTROS" },
    { id: "opiniones", label: "OPINIONES" },
    { id: "galeria", label: "GALERÍA" },
    { id: "contacto", label: "CONTACTO" }
  ];

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
        <div className="navbar-container">
          
          {/* LOGO CON ACCESO SECRETO */}
          <div 
            className="logo-wrapper"
            onClick={handleLogoClick}
          >
            <img
              src={logo}
              alt="Favela Barber"
              className="logo-img"
            />
            <div className="logo-glow"></div>
          </div>

          {/* MENÚ DESKTOP */}
          <div className="nav-links-desktop">
            {navItems.map((item) => (
              <span
                key={item.id}
                className={`nav-item ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="nav-item-text">{item.label}</span>
                <span className={`nav-item-underline ${hoveredItem === item.id || activeSection === item.id ? "visible" : ""}`}></span>
              </span>
            ))}
          </div>

          {/* BOTÓN DESKTOP */}
          <button
            className="nav-btn-desktop"
            onClick={() => scrollToSection("contacto")}
          >
            <FaRegCalendarAlt className="btn-icon" />
            <span>Agendar Cita</span>
            <span className="btn-shine"></span>
          </button>

          {/* ICONO HAMBURGUESA */}
          <button 
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
          </button>

        </div>

        {/* MENÚ MÓVIL OVERLAY */}
        <div className={`mobile-menu-overlay ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(false)}></div>

        {/* MENÚ MÓVIL */}
        <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
          <div className="mobile-menu-header">
            <img src={logo} alt="Favela Barber" className="mobile-logo" />
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="mobile-menu-content">
            <div className="mobile-nav-links">
              {navItems.map((item, index) => (
                <div
                  key={item.id}
                  className="mobile-nav-item-wrapper"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span
                    className={`mobile-nav-item ${activeSection === item.id ? "active" : ""}`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    <span className="mobile-nav-number">0{index + 1}</span>
                    <span className="mobile-nav-text">{item.label}</span>
                    <FaChevronRight className="mobile-nav-arrow" />
                  </span>
                </div>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <button
                className="mobile-nav-btn"
                onClick={() => scrollToSection("contacto")}
              >
                <FaRegCalendarAlt />
                <span>Agendar Cita</span>
              </button>

              <div className="mobile-contact-info">
                <p className="mobile-phone">📞 871 450 6477</p>
                <p className="mobile-hours">🕐 11:00 AM - 9:00 PM</p>
              </div>

              <div className="mobile-social-links">
                <a href="#" className="mobile-social-link">IG</a>
                <a href="#" className="mobile-social-link">FB</a>
                <a href="#" className="mobile-social-link">WA</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="navbar-spacer"></div>
    </>
  );
}

export default Navbar;