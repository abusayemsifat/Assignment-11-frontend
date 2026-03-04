// src/main.jsx
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Provider/AuthProvider.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import PageLoader from './components/PageLoader/PageLoader.jsx'

/**
 * App shell — shows PageLoader on first visit, then renders the full app.
 *
 * Libraries to install for full animation + smooth scroll:
 *   npm install gsap lenis framer-motion
 */
const App = () => {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)