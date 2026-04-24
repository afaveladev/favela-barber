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
  const [currentPath, setCurrentPath] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash);
    };

    // Detectar cambios en el hash
    window.addEventListener('hashchange', handleHashChange);
    
    // Verificar al cargar la página
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Panel de Administración
  if (currentPath === '/admin') {
    return <Admin />;
  }

  // Página principal
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