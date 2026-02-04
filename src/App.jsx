import React, { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShaderAnimation } from "./Components/ui/shader-animation.tsx";

// Lazy load all components
const Navbar = lazy(() => import("./Components/Navbar/Navbar.jsx"));
const Hero = lazy(() => import("./Components/Hero/Hero.jsx"));
const About = lazy(() => import("./Components/About/About.jsx"));
const Services = lazy(() => import("./Components/Services/Services.jsx"));
const Projects = lazy(() => import("./Components/Projects/Projects.jsx"));
const Contact = lazy(() => import("./Components/Contact/Contact.jsx"));
const Footer = lazy(() => import("./Components/Footer/Footer.jsx"));

// Loading fallback (can add animation here)
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
);

// Error fallback component
const ErrorFallback = ({ error }) => (
  <div role="alert" className="error-container">
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <div className="app">
          <Navbar />
          <main>
            <ShaderAnimation />
            <Hero />
            <About />
            <Services />
            <Projects />
            <Contact />
          </main>
          <Footer />

          {/* Toast notifications globally */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
          />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
