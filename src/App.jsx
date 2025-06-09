import React, { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

// Lazy load components
const Navbar = lazy(() => import('./Components/Navbar/Navbar.jsx'))
const Hero = lazy(() => import('./Components/Hero/Hero.jsx'))
const About = lazy(() => import('./Components/About/About.jsx'))
const Services = lazy(() => import('./Components/Services/Services.jsx'))
const Projects = lazy(() => import('./Components/Projects/Projects.jsx'))
const Contact = lazy(() => import('./Components/Contact/Contact.jsx'))
const Footer = lazy(() => import('./Components/Footer/Footer.jsx'))

// Loading component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
)

// Error fallback component
const ErrorFallback = ({ error }) => (
  <div role="alert" className="error-container">
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
  </div>
)

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="app">
        <Suspense fallback={<LoadingFallback />}>
          <Navbar />
          <main>
            <Suspense fallback={<LoadingFallback />}>
              <Hero />
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
              <About />
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
              <Services />
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
              <Contact />
            </Suspense>
          </main>
          <Suspense fallback={<LoadingFallback />}>
            <Footer />
          </Suspense>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

export default App
