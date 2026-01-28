import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Popup from './Popup'
import { ErrorBoundary } from '@/shared/ErrorBoundary'
import '../index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Popup />
    </ErrorBoundary>
  </StrictMode>
)
