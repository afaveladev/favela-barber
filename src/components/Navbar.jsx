import { useState, useEffect, useRef, useCallback } from "react";
import { FaRegCalendarAlt, FaTimes, FaChevronRight, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.webp";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [hoveredItem, setHoveredItem] = useState(null);

  const clickTimer = useRef(null);
  const clickCount = useRef(0);
  const lastScrollY = useRef(0);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (menuOpen) setMenuOpen(false);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  // Scroll Spy optimizado
  useEffect(() => {
    const sections = ["inicio", "servicios", "nosotros", "opiniones", "galeria", "contacto"];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 120;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Scroll suave con offset
  const scrollToSection = useCallback((id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 80;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setMenuOpen(false);
    }
  }, []);

  // Triple clic en logo → Panel Admin
  const handleLogoClick = () => {
    clickCount.current += 1;
    if (clickCount.current === 1) {
      clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 2000);
    }
    if (clickCount.current === 3) {
      clearTimeout(clickTimer.current);
      clickCount.current = 0;
      window.location.href = '/favela-barber/admin';
      return;
    }
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

  // Bloquear scroll cuando menú abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Cerrar menú con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
        <div className="navbar-container">
          
          {/* LOGO */}
          <div className="logo-wrapper" onClick={handleLogoClick} title="Favela Barber - Inicio">
            <img src={logo} alt="Favela Barber" className="logo-img" />
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

          {/* BOTÓN AGENDAR */}
          <button className="nav-btn-desktop" onClick={() => scrollToSection("contacto")}>
            <FaRegCalendarAlt className="btn-icon" />
            <span>Agendar Cita</span>
            <span className="btn-shine"></span>
          </button>

          {/* HAMBURGUESA */}
          <button 
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
          </button>
        </div>

        {/* OVERLAY */}
        <div className={`mobile-menu-overlay ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(false)}></div>

        {/* MENÚ MÓVIL */}
        <div className={`mobile-menu ${menuOpen ? "active" : ""}`} aria-hidden={!menuOpen}>
          <div className="mobile-menu-header">
            <img src={logo} alt="Favela Barber" className="mobile-logo" />
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
              <FaTimes />
            </button>
          </div>

          <div className="mobile-menu-content">
            <div className="mobile-nav-links">
              {navItems.map((item, index) => (
                <div key={item.id} className="mobile-nav-item-wrapper" style={{ animationDelay: `${index * 0.08}s` }}>
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
              <button className="mobile-nav-btn" onClick={() => scrollToSection("contacto")}>
                <FaRegCalendarAlt /><span>Agendar Cita</span>
              </button>
              <div className="mobile-contact-info">
                <p className="mobile-phone">📞 871 535 3066</p>
                <p className="mobile-hours">🕐 Desde las 11:00 a.m.</p>
              </div>
              <div className="mobile-social-links">
                <a href="https://wa.me/528715353066" target="_blank" rel="noopener noreferrer" className="mobile-social-link" aria-label="WhatsApp">WA</a>
                <a href="https://instagram.com/favelabarber" target="_blank" rel="noopener noreferrer" className="mobile-social-link" aria-label="Instagram">IG</a>
                <a href="https://facebook.com/favelabarber" target="_blank" rel="noopener noreferrer" className="mobile-social-link" aria-label="Facebook">FB</a>
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