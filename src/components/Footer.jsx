import { FaWhatsapp, FaInstagram, FaFacebookF, FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import logo from "../assets/logo.webp";


function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* 🔥 LOGO + DESCRIPCIÓN */}
        <div className="footer-brand">
          <img 
            src={logo} 
            alt="Favela Barber" 
            className="footer-logo" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ cursor: 'pointer' }}
          />

          <p>
            Barbería premium en Gómez Palacio, Durango. <br />
            Donde el estilo se convierte en identidad.
          </p>

          <div className="footer-socials">
            <a href="#"><FaWhatsapp /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
          </div>
        </div>

        {/* 🔗 NAVEGACIÓN */}
        <div>
          <h4>NAVEGACIÓN</h4>
          <ul className="footer-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#opiniones">Opiniones</a></li>
            <li><a href="#galeria">Galería</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>

        {/* 📍 CONTACTO */}
        <div>
          <h4>CONTACTO</h4>

          <div className="footer-contact">
            <p><FaMapMarkerAlt /> Calle Tolosa 320, Santa Sofía, Gómez Palacio</p>
            <p><FaPhoneAlt /> 871 535 3066</p>
            <p><FaClock /> Desde las 11:00 a.m.</p>
          </div>
        </div>

      </div>

      {/* 🔻 BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 FAVELA'S BARBER. Todos los derechos reservados.</p>

        <div className="footer-rating">
          ⭐⭐⭐⭐⭐ <span>4.9 / 5 • 69 opiniones</span>
        </div>
      </div>

      {/* 🔥 BOTÓN WHATS FLOAT */}
      <a
        href="https://wa.me/8715353066"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <FaWhatsapp />
      </a>

    </footer>
  );
}

export default Footer;