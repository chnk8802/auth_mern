// import "@fontsource/poppins/400.css";
// import "@fontsource/poppins/600.css";
// import "@fontsource/poppins/700.css";

import "@fontsource/lato/400.css"; // Normal weight
import "@fontsource/lato/700.css"; // Bold weight
import "@fontsource/lato/300.css"; // Light
import "@fontsource/lato/900.css"; // Black


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import '@/styles/index.css'
import {App} from '@/app/App'
import { store } from './store'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { Toaster } from '@/components/ui/sonner'

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
