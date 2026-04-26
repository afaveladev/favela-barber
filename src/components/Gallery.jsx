// eslint-disable-next-line no-unused-vars
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
    { src: corte1, label: "Burst Fade", category: "Corte", position: "center 25%" },
    { src: corte2, label: "Mullet", category: "Corte", position: "center 20%" },
    { src: corte3, label: "Low Fade", category: "Corte", position: "center 30%" },
    { src: corte4, label: "Mullet + Beard", category: "Corte", position: "center 35%" },
    { src: corte5, label: "Drop Fade", category: "Corte", position: "center 25%" },
    { src: corte6, label: "Low Fade", category: "Corte", position: "center 25%" },
    { src: corte7, label: "Low Fade", category: "Corte", position: "center 25%" },
    { src: corte8, label: "Detalles de Precisión", category: "Barba", position: "center 55%" },
    { src: corte9, label: "Taper Fade Medium", category: "Local", position: "center 25%" },
    { src: corte10, label: "Taper Fade", category: "Corte", position: "center 30%" },
    { src: corte11, label: "Burst", category: "Barba", position: "center 25%" },
    { src: corte12, label: "Taper Fade + Beard", category: "Corte", position: "center 25%" },
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
                    <img 
                      src={img.src} 
                      alt={img.label} 
                      loading="lazy"
                      style={{ objectPosition: img.position || "center 25%" }}
                    />
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