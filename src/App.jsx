import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import About from "./components/About"
import Opinions from "./components/Opinions"
import Gallery from "./components/Gallery"
import Contact from "./components/Contact"
import CallToAction from "./components/CallToAction"
import Footer from "./components/Footer"
import Admin from "./components/Admin"  // 🆕 Agregar esta línea

function App() {
  // Detectar si la URL es /admin
  const isAdmin = window.location.pathname.includes('/admin');

  // Si es admin, mostrar solo el panel
  if (isAdmin) {
    return <Admin />;
  }

  // Si no, mostrar la página normal
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

export default App