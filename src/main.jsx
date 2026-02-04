import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TokenProvider } from './context/TokenContext'
import ErrorBoundary from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
        <TokenProvider>
            <App />
        </TokenProvider>
    </ErrorBoundary>,
)
