import { useState, useEffect } from "react";
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import About from "./components/About"
import Opinions from "./components/Opinions"
import Gallery from "./components/Gallery"
import Contact from "./components/Contact"
import CallToAction from "./components/CallToAction"
import Footer from "./components/Footer"
import Admin from "./components/Admin"

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Función para verificar si estamos en el panel admin
    const checkAdmin = () => {
      const hash = window.location.hash;
      setIsAdmin(hash === '#/admin');
    };

    // Verificar al cargar
    checkAdmin();

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', checkAdmin);
    
    return () => window.removeEventListener('hashchange', checkAdmin);
  }, []);

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Opinions />
      <Gallery />
      <Contact />
      <CallToAction />
      <Footer />
    </>
  )
}

export default App;