import { FaAward, FaUserTie, FaCut, FaHeart } from "react-icons/fa";
import barberImg from "../assets/barber2.webp";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function About() {
  const imageRef = useScrollAnimation(0.15);
  const subtitleRef = useScrollAnimation(0.1);
  const titleRef = useScrollAnimation(0.1);
  const text1Ref = useScrollAnimation(0.1);
  const text2Ref = useScrollAnimation(0.1);

  const features = [
    { icon: <FaCut />, title: "Calidad", desc: "Usamos los mejores productos.", delay: "1", dir: "left" },
    { icon: <FaUserTie />, title: "Atención", desc: "Servicio personalizado.", delay: "2", dir: "right" },
    { icon: <FaAward />, title: "Profesionalismo", desc: "Barberos expertos.", delay: "3", dir: "left" },
    { icon: <FaHeart />, title: "Pasión", desc: "Cuidado en cada detalle.", delay: "4", dir: "right" }
  ];

  return (
    <section className="about" id="nosotros">
      <div className="about-container">
        <div className="about-image animate-on-scroll animate-zoom-in" ref={imageRef}>
          <img src={barberImg} alt="Barbería" loading="lazy" />
          <div className="about-rating">
            4.9 ⭐⭐⭐⭐⭐ <br />
            <span>69 opiniones</span>
          </div>
        </div>

        <div className="about-content">
          <span className="about-subtitle animate-on-scroll animate-fade-up" ref={subtitleRef}>
            — NUESTRA HISTORIA —
          </span>

          <h2 className="about-title animate-on-scroll animate-fade-up" ref={titleRef}>
            MAS QUE UNA <span>BARBERIA</span>
          </h2>

          <p className="about-text animate-on-scroll animate-fade-up" ref={text1Ref}>
            FAVELA BARBER nació con una visión clara: crear un espacio donde el estilo urbano y el profesionalismo se fusionen. Somos más que una barbería, somos un punto de encuentro para quienes valoran su imagen.
          </p>

          <p className="about-text animate-on-scroll animate-fade-up" ref={text2Ref}>
            Desde el primer día, nos hemos comprometido con la excelencia. Cada corte, cada arreglo de barba, cada detalle refleja nuestra pasión por el oficio.
            <span style={{ color: "#F59E0B" }}> Te sentirás como en casa.</span>
          </p>

          <div className="about-features">
            {features.map((feature, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const featureRef = useScrollAnimation(0.1);
              return (
                <div
                  key={i}
                  ref={featureRef}
                  className={`feature animate-on-scroll ${feature.dir === 'left' ? 'animate-fade-left' : 'animate-fade-right'} stagger-delay-${feature.delay}`}
                >
                  {feature.icon}
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}