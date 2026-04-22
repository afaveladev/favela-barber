import { FaAward, FaUserTie, FaCut, FaHeart } from "react-icons/fa";
import barberImg from "../assets/barber2.webp";

export default function About() {
  return (
    <section className="about" id="nosotros">

      <div className="about-container">

        {/* 🖼️ IMAGEN */}
        <div className="about-image">
          <img src={barberImg} alt="Barbería" />

          <div className="about-rating">
            4.9 ⭐⭐⭐⭐⭐ <br />
            <span>69 opiniones</span>
          </div>
        </div>

        {/* 📦 CONTENIDO */}
        <div className="about-content">

          <span className="about-subtitle">
            — NUESTRA HISTORIA —
          </span>

          <h2 className="about-title">
            MAS QUE UNA <span>BARBERIA</span>
          </h2>

          {/* ✅ TEXTO CORREGIDO - espacio agregado */}
          <p className="about-text">
            FAVELA BARBER nació con una visión clara: crear un espacio donde el estilo urbano y el profesionalismo se fusionen. Somos más que una barbería, somos un punto de encuentro para quienes valoran su imagen.
          </p>

          <p className="about-text">
            Desde el primer día, nos hemos comprometido con la excelencia. Cada corte, cada arreglo de barba, cada detalle refleja nuestra pasión por el oficio.
            <span style={{ color: "#F59E0B" }}> Te sentirás como en casa.</span>
          </p>

          {/* 🔥 FEATURES */}
          <div className="about-features">

            <div className="feature">
              <FaCut />
              <div>
                <h4>Calidad</h4>
                <p>Usamos los mejores productos.</p>
              </div>
            </div>

            <div className="feature">
              <FaUserTie />
              <div>
                <h4>Atención</h4>
                <p>Servicio personalizado.</p>
              </div>
            </div>

            <div className="feature">
              <FaAward />
              <div>
                <h4>Profesionalismo</h4>
                <p>Barberos expertos.</p>
              </div>
            </div>

            <div className="feature">
              <FaHeart />
              <div>
                <h4>Pasión</h4>
                <p>Cuidado en cada detalle.</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}