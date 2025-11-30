import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Product from './pages/Product.tsx'
import About from './pages/About.tsx'
import PrivacyPolicy from './pages/PrivacyPolicy.tsx'
import TermsOfService from './pages/TermsOfService.tsx'
// import { CursorPixels } from './components/ui/CursorPixels.tsx' // Disabled - will revisit later
import { useAnalytics } from './hooks/useAnalytics.ts'
import './input.css'

function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  useAnalytics()
  return <>{children}</>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <CursorPixels /> */}
      <AnalyticsWrapper>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </AnalyticsWrapper>
    </BrowserRouter>
  </StrictMode>,
)