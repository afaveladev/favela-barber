import { useState, useEffect } from "react";
import { FaInstagram, FaFacebookF, FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";

// Importa todas tus imágenes
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) setColumns(1);
      else if (window.innerWidth <= 768) setColumns(2);
      else if (window.innerWidth <= 1024) setColumns(3);
      else setColumns(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = [
    { src: corte1, label: "Fade Clásico", category: "Corte", featured: true },
    { src: corte2, label: "Nuestro Local", category: "Barbería", featured: false },
    { src: corte3, label: "Arreglo de Barba", category: "Barba", featured: true },
    { src: corte4, label: "Corte con Tijera", category: "Corte", featured: false },
    { src: corte5, label: "Estilizado Premium", category: "Estilo", featured: true },
    { src: corte6, label: "Transformación", category: "Antes/Después", featured: true },
    { src: corte7, label: "Combo Corte + Barba", category: "Combo", featured: true },
    { src: corte8, label: "Detalles de Precisión", category: "Detalle", featured: false },
    { src: corte9, label: "Ambiente Premium", category: "Local", featured: false },
    { src: corte10, label: "Corte Moderno", category: "Corte", featured: false },
    { src: corte11, label: "Barba Estilizada", category: "Barba", featured: true },
    { src: corte12, label: "Experiencia Favela", category: "Experiencia", featured: true },
  ];

  const getColumns = () => {
    const cols = Array.from({ length: columns }, () => []);
    images.forEach((img, index) => {
      cols[index % columns].push(img);
    });
    return cols;
  };

  const openLightbox = (imageData) => {
    const globalIndex = images.findIndex(img => img.src === imageData.src);
    setCurrentIndex(globalIndex);
    setSelectedImage(imageData);
  };

  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

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

          <div className="gallery-masonry-container">
            <div className={`gallery-masonry columns-${columns}`}>
              {getColumns().map((column, colIndex) => (
                <div className="masonry-column" key={colIndex}>
                  {column.map((img) => {
                    const globalIndex = images.findIndex(i => i.src === img.src);
                    const delayClass = `stagger-delay-${(globalIndex % 12) + 1}`;
                    
                    return (
                      <div 
                        className={`gallery-card ${img.featured ? 'featured' : ''} ${delayClass}`}
                        key={globalIndex}
                        onClick={() => openLightbox(img)}
                      >
                        <div className="gallery-card-inner">
                          <img src={img.src} alt={img.label} loading="lazy" />
                          <div className="gallery-card-overlay">
                            <div className="overlay-content">
                              <span className="card-category">{img.category}</span>
                              <h3 className="card-title">{img.label}</h3>
                              <span className="card-expand">
                                <FaExpand />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
        <div className="lightbox-modal" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}><FaTimes /></button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}><FaChevronLeft /></button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.label} />
            <div className="lightbox-info">
              <h3>{selectedImage.label}</h3>
              <span className="lightbox-category">{selectedImage.category}</span>
              <p className="image-counter">{currentIndex + 1} / {images.length}</p>
            </div>
          </div>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}><FaChevronRight /></button>
        </div>
      )}
    </>
  );
}

export default Gallery;