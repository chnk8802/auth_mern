import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import '@/styles/index.css'
import App from '@/app/App'
import { store } from './store'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { Toaster } from '@/components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Toaster position="bottom-center" richColors closeButton/>
        <App />
      </ErrorBoundary>
    </Provider>
  // </StrictMode>,
)
