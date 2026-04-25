import { useState, useEffect } from "react";
import { FaInstagram, FaFacebookF, FaTimes } from "react-icons/fa";

import corte1 from "../assets/corte1.webp";
import corte2 from "../assets/corte2.webp";
import corte3 from "../assets/corte3.webp";
import corte4 from "../assets/corte4.webp";
import corte5 from "../assets/corte5.webp";
import corte6 from "../assets/corte6.webp";
import corte7 from "../assets/corte7.webp";
import corte8 from "../assets/corte8.webp";
import corte9 from "../assets/corte9.webp";
import corte10 from "../assets/corte10.webp";
import corte11 from "../assets/corte11.webp";
import corte12 from "../assets/corte12.webp";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    { src: corte1, label: "Fade Clásico", category: "Corte" },
    { src: corte2, label: "Nuestro Local", category: "Barbería" },
    { src: corte3, label: "Arreglo de Barba", category: "Barba" },
    { src: corte4, label: "Corte con Tijera", category: "Corte" },
    { src: corte5, label: "Estilizado Premium", category: "Estilo" },
    { src: corte6, label: "Transformación", category: "Antes/Después" },
    { src: corte7, label: "Combo Corte + Barba", category: "Combo" },
    { src: corte8, label: "Detalles de Precisión", category: "Detalle" },
    { src: corte9, label: "Ambiente Premium", category: "Local" },
    { src: corte10, label: "Corte Moderno", category: "Corte" },
    { src: corte11, label: "Barba Estilizada", category: "Barba" },
    { src: corte12, label: "Experiencia Favela", category: "Experiencia" },
  ];

  // Duplicar imágenes para efecto infinito
  const infiniteImages = [...images, ...images, ...images];

  return (
    <>
      <section className="gallery" id="galeria">
        <div className="gallery-bg-pattern"></div>

        <div className="gallery-container">
          <div className="gallery-header">
            <span className="gallery-subtitle">
              <span className="subtitle-line"></span>
              NUESTRO TRABAJO
              <span className="subtitle-line"></span>
            </span>

            <h2 className="gallery-title">
              GALERÍA <span className="title-highlight">VISUAL</span>
            </h2>

            <p className="gallery-description">
              Cada imagen cuenta una historia. Así es como transformamos 
              <span className="highlight-text"> estilos en identidades.</span>
            </p>
          </div>

          {/* 🎠 CARRUSEL INFINITO */}
          <div 
            className="carousel-track-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={`carousel-track ${isPaused ? "paused" : ""}`}>
              {infiniteImages.map((img, i) => (
                <div 
                  className="carousel-card" 
                  key={i}
                  onClick={() => setSelectedImage(img)}
                >
                  <div className="carousel-card-inner">
                    <img src={img.src} alt={img.label} loading="lazy" />
                    <div className="carousel-card-overlay">
                      <span className="carousel-card-category">{img.category}</span>
                      <h3 className="carousel-card-label">{img.label}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="gallery-footer">
            <div className="footer-divider">
              <span className="scissors-icon">✂️</span>
            </div>
            
            <p className="gallery-cta">
              ¿Quieres ver más? Síguenos en redes sociales
            </p>

            <div className="gallery-socials">
              <a href="https://instagram.com/favelabarber" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                <FaInstagram /><span>Instagram</span>
              </a>
              <a href="https://facebook.com/favelabarber" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                <FaFacebookF /><span>Facebook</span>
              </a>
            </div>

            <div className="gallery-stats">
              <div className="stat-item"><span className="stat-number">{images.length}+</span><span className="stat-label">Estilos</span></div>
              <div className="stat-divider"></div>
              <div className="stat-item"><span className="stat-number">100%</span><span className="stat-label">Profesional</span></div>
              <div className="stat-divider"></div>
              <div className="stat-item"><span className="stat-number">4.9★</span><span className="stat-label">Rating</span></div>
            </div>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="lightbox-modal" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close" onClick={() => setSelectedImage(null)}><FaTimes /></button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.label} />
            <div className="lightbox-info">
              <h3>{selectedImage.label}</h3>
              <span className="lightbox-category">{selectedImage.category}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;