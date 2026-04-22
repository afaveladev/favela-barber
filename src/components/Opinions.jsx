import { useEffect, useState } from "react";
import { FaStar, FaQuoteRight, FaUserCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Datos de opiniones (sin duplicados)
const allReviews = [
  {
    id: 1,
    name: "Carlos Méndez",
    role: "Cliente frecuente",
    text: "Excelente servicio, muy profesional y ambiente increíble. Los barberos realmente saben lo que hacen.",
    rating: 5,
    date: "Hace 2 días",
    verified: true,
    img: "" //
  },
  {
    id: 2,
    name: "Roberto Sánchez",
    role: "Cliente nuevo",
    text: "Primera vez que vengo y me encantó el resultado. Sin duda volveré para mi próximo corte.",
    rating: 5,
    date: "Hace 5 días",
    verified: true,
    img: "" //
  },
  {
    id: 3,
    name: "Miguel Ángel",
    role: "Cliente habitual",
    text: "Muy profesionales, siempre salgo satisfecho. El ambiente es increíble y la música excelente.",
    rating: 5,
    date: "Hace 1 semana",
    verified: true,
    img: "" //
  },
  {
    id: 4,
    name: "Andrés López",
    role: "Cliente VIP",
    text: "Nivel alto, atención excelente y muy detallistas. Se nota la experiencia y pasión por lo que hacen.",
    rating: 5,
    date: "Hace 1 semana",
    verified: true,
    img: "" //
  },
  {
    id: 5,
    name: "Fernando Ruiz",
    role: "Cliente frecuente",
    text: "El mejor lugar para cortarte el cabello en la ciudad. Siempre salgo como nuevo.",
    rating: 5,
    date: "Hace 2 semanas",
    verified: true,
    img: "" //
  },
  {
    id: 6,
    name: "Luis García",
    role: "Cliente frecuente",
    text: "Muy buena atención, recomendado 100%. El corte con tijera es una obra de arte.",
    rating: 5,
    date: "Hace 2 semanas",
    verified: true,
    img: "" //
  },
  {
    id: 7,
    name: "Jorge Torres",
    role: "Cliente nuevo",
    text: "Me encantó el corte, volveré pronto. El trato es muy personalizado y profesional.",
    rating: 5,
    date: "Hace 3 semanas",
    verified: true,
    img: "" //
  },
  {
    id: 8,
    name: "Raúl Paredes",
    role: "Cliente habitual",
    text: "Siempre vuelvo, excelente servicio. Ya tengo mi barbero de confianza aquí.",
    rating: 5,
    date: "Hace 3 semanas",
    verified: true,
    img: "" //
  },
  {
    id: 9,
    name: "Daniel Martínez",
    role: "Cliente VIP",
    text: "Top barbería, muy profesionales. El combo corte + barba es espectacular.",
    rating: 5,
    date: "Hace 1 mes",
    verified: true,
    img: "" //
  },
  {
    id: 10,
    name: "Pedro Salazar",
    role: "Cliente frecuente",
    text: "100% recomendado, gran experiencia. El fade que me hicieron quedó perfecto.",
    rating: 5,
    date: "Hace 1 mes",
    verified: true,
    img: "" //
  }
];

function Opinions() {
  const [currentPage, setCurrentPage] = useState(0);
  const [reviewsPerPage, setReviewsPerPage] = useState(6);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Ajustar reviews por página según tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) setReviewsPerPage(1);
      else if (window.innerWidth <= 768) setReviewsPerPage(2);
      else if (window.innerWidth <= 1024) setReviewsPerPage(4);
      else setReviewsPerPage(6);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  
  const currentReviews = allReviews.slice(
    currentPage * reviewsPerPage, 
    (currentPage + 1) * reviewsPerPage
  );

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalPages, isAutoPlaying]);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Calcular rating promedio
  const averageRating = (allReviews.reduce((acc, rev) => acc + rev.rating, 0) / allReviews.length).toFixed(1);

  return (
    <section className="opinions" id="opiniones">
      {/* Fondo decorativo */}
      <div className="opinions-bg-pattern"></div>
      
      <div className="opinions-container">
        {/* Header */}
        <div className="opinions-header">
          <span className="opinions-subtitle">
            <span className="subtitle-dot"></span>
            LO QUE DICEN NUESTROS CLIENTES
            <span className="subtitle-dot"></span>
          </span>

          <h2 className="opinions-title">
            OPINIONES <span className="title-highlight">REALES</span>
          </h2>

          {/* Rating Summary */}
          <div className="rating-summary">
            <div className="rating-main">
              <div className="rating-stars-large">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(averageRating) ? 'star-filled' : 'star-empty'} />
                ))}
              </div>
              <div className="rating-number-large">
                <span className="rating-big">{averageRating}</span>
                <span className="rating-total">/5</span>
              </div>
            </div>
            
            <div className="rating-info">
              <p className="rating-based">Basado en <strong>{allReviews.length} opiniones</strong> verificadas</p>
              <div className="rating-badge">
                <span className="verified-badge">✓ Opiniones verificadas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de opiniones */}
        <div className="opinions-grid-wrapper">
          {totalPages > 1 && (
            <button 
              className="nav-arrow nav-arrow-left" 
              onClick={prevPage}
              aria-label="Anterior"
            >
              <FaChevronLeft />
            </button>
          )}

          <div className="opinions-grid">
            {currentReviews.map((review, index) => (
              <div
                key={review.id}
                className={`opinion-card ${hoveredCard === review.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(review.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icono de comillas */}
                <div className="card-quote-icon">
                  <FaQuoteRight />
                </div>

                {/* Header */}
                <div className="opinion-card-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      {review.img && review.img !== "/clientes/1.jpg" ? (
                        <img src={review.img} alt={review.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          <FaUserCircle />
                        </div>
                      )}
                      {review.verified && (
                        <span className="verified-check" title="Opinión verificada">✓</span>
                      )}
                    </div>
                    <div className="user-details">
                      <h4 className="user-name">{review.name}</h4>
                      <div className="user-meta">
                        <span className="user-role">{review.role}</span>
                        <span className="meta-separator">•</span>
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="opinion-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="star-filled" />
                  ))}
                </div>

                {/* Texto */}
                <p className="opinion-text">{review.text}</p>

                {/* Footer */}
                <div className="opinion-card-footer">
                  <div className="verified-badge-small">
                    <span>✓ Compra verificada</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <button 
              className="nav-arrow nav-arrow-right" 
              onClick={nextPage}
              aria-label="Siguiente"
            >
              <FaChevronRight />
            </button>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="pagination">
            <div className="pagination-dots">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`pagination-dot ${i === currentPage ? 'active' : ''}`}
                  onClick={() => goToPage(i)}
                  aria-label={`Ir a página ${i + 1}`}
                />
              ))}
            </div>
            
            <div className="pagination-info">
              <span className="page-counter">
                {currentPage + 1} / {totalPages}
              </span>
            </div>
          </div>
        )}

        {/* CTA para dejar opinión */}
        <div className="opinions-cta">
          <p>¿Ya nos visitaste? ¡Cuéntanos tu experiencia!</p>
          <button className="btn-leave-review">
            <FaStar /> Dejar una opinión
          </button>
        </div>
      </div>
    </section>
  );
}

export default Opinions;