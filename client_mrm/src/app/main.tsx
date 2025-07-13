import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import "@fontsource/lato/400.css"; // Normal weight
import "@fontsource/lato/700.css"; // Bold weight
import "@fontsource/lato/300.css"; // Light
import "@fontsource/lato/900.css"; // Black

import "leaflet/dist/leaflet.css";

import {App} from '@/app/App'
import '@/styles/index.css'
import { store } from './store'
import { Toaster } from '@/components/ui/sonner'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Toaster position="bottom-center" richColors closeButton/>
        <App />
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)
