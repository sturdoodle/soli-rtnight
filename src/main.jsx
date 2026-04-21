import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'

// Register the Service Worker for PWA / Caching
registerSW({ immediate: true })
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import V5Editor from './V5/V5Editor.jsx';
import NotFoundPage from './NotFound.jsx';
import GlobalErrorBoundary from './components/GlobalErrorBoundary.jsx';
import { ResumeProvider } from './Modern/context/ResumeContext.jsx';

// const router=createBrowserRouter([
const router = createHashRouter([
  {
    path: "/",
    element: <V5Editor />
  },
  {
    path: "/v5",
    element: <V5Editor />
  },
  {
    path: "#google_vignette",
    element: <V5Editor />
  },
  {
    path: '*', // This wildcard path must be the LAST route defined
    element: <NotFoundPage />,
  },
])

import { NotificationProvider } from './context/NotificationContext.jsx';
import ThirdPartyScripts from './components/ThirdPartyScripts.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResumeProvider>
      <GlobalErrorBoundary>
        <NotificationProvider>
          <ThirdPartyScripts>
            <RouterProvider router={router} />
          </ThirdPartyScripts>
        </NotificationProvider>
      </GlobalErrorBoundary>
    </ResumeProvider>
  </StrictMode>,
)
