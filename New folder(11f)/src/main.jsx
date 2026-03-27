// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Provider/AuthProvider.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import PageLoader from './components/PageLoader/PageLoader.jsx'

// PageLoader is now a non-blocking thin progress bar at the top of the page.
// It does not hide app content — the app renders immediately underneath.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageLoader />
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)