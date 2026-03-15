import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from "./Components/ErrorBoundary"
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastProvider } from "./Components/Toast/ToastContainer";

createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
        <Provider store={store}>
            <ToastProvider>
                <App />
            </ToastProvider>
        </Provider>
    </ErrorBoundary>
);
