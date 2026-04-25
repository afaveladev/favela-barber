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
  // Detectar si es localhost o GitHub Pages
  const isLocalhost = window.location.hostname === 'localhost';
  
  // Panel admin: en localhost usa /admin, en GitHub Pages usa #/admin
  const isAdmin = isLocalhost 
    ? window.location.pathname.includes('/admin')
    : window.location.hash === '#/admin';

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