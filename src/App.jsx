import { useState, useEffect } from "react";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Vault from "./components/Vault";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BuyNow from "./components/BuyNow";
import Products from "./components/Products";
import WatchTrailer from "./components/WatchTrailer";
import ContactPage from "./components/ContactPage";
import Preloader from "./components/Preloader";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState("obsidian-key");
  const [showPreloader, setShowPreloader] = useState(true);

  // Prevent background scroll when overlays or preloader are active
  useEffect(() => {
    if (showPreloader || currentPage !== "home") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [currentPage, showPreloader]);

  const handleNavigateToBuy = (productId = "obsidian-key") => {
    setSelectedProductId(productId);
    setCurrentPage("buy");
  };

  const handleNavigateToProducts = () => {
    setCurrentPage("products");
  };

  const handleNavigateToTrailer = () => {
    setCurrentPage("trailer");
  };

  const handleNavigateToContact = () => {
    setCurrentPage("contact");
  };

  const handleNavigateToHome = () => {
    setCurrentPage("home");
  };

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Preloader */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}
      {/* Home Page - Persistently mounted to preserve scroll & GSAP state */}
      <div className={currentPage !== "home" ? "h-screen overflow-hidden" : ""}>
        <NavBar 
          onBuyClick={() => handleNavigateToBuy("obsidian-key")} 
          onProductsClick={handleNavigateToProducts}
          onContactClick={handleNavigateToContact}
        />
        <Hero onWatchTrailerClick={handleNavigateToTrailer} isReady={!showPreloader} />
        <About />
        <Features />
        <Story />
        <Vault />
        <Contact onContactClick={handleNavigateToContact} />
        <Footer onContactClick={handleNavigateToContact} />
      </div>

      {/* Products Page Overlay */}
      {currentPage === "products" && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black will-change-[transform,opacity]">
          <Products 
            onClose={handleNavigateToHome} 
            onBuyClick={handleNavigateToBuy} 
          />
        </div>
      )}

      {/* Buy Now Page Overlay */}
      {currentPage === "buy" && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black will-change-[transform,opacity]">
          <BuyNow 
            onClose={handleNavigateToHome} 
            preSelectedProductId={selectedProductId} 
          />
        </div>
      )}

      {/* Watch Trailer Overlay */}
      {currentPage === "trailer" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black will-change-[transform,opacity]">
          <WatchTrailer onClose={handleNavigateToHome} />
        </div>
      )}

      {/* Contact Page Overlay */}
      {currentPage === "contact" && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black will-change-[transform,opacity]">
          <ContactPage onClose={handleNavigateToHome} />
        </div>
      )}
    </main>
  );
}

export default App;
