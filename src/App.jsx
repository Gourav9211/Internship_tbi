import { useState, useEffect, lazy, Suspense } from "react";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Vault from "./components/Vault";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";


const BuyNow = lazy(() => import("./components/BuyNow"));
const Products = lazy(() => import("./components/Products"));
const WatchTrailer = lazy(() => import("./components/WatchTrailer"));
const ContactPage = lazy(() => import("./components/ContactPage"));

const OverlayLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
    <div className="three-body">
      <div className="three-body__dot" />
      <div className="three-body__dot" />
      <div className="three-body__dot" />
    </div>
  </div>
);

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
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}
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

      <Suspense fallback={<OverlayLoader />}>
        {currentPage === "products" && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black will-change-[transform,opacity]">
            <Products 
              onClose={handleNavigateToHome} 
              onBuyClick={handleNavigateToBuy} 
            />
          </div>
        )}

        {currentPage === "buy" && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black will-change-[transform,opacity]">
            <BuyNow 
              onClose={handleNavigateToHome} 
              preSelectedProductId={selectedProductId} 
            />
          </div>
        )}

        {currentPage === "trailer" && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-black will-change-[transform,opacity]">
            <WatchTrailer onClose={handleNavigateToHome} />
          </div>
        )}

        {currentPage === "contact" && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black will-change-[transform,opacity]">
            <ContactPage onClose={handleNavigateToHome} />
          </div>
        )}
      </Suspense>
    </main>
  );
}

export default App;
