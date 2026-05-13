import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/store.js'
import { CategoryProvider } from './Context/CategoryContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
       <Provider store={store}>
          <CategoryProvider>
           <App />
          </CategoryProvider>
       </Provider>
       
    </BrowserRouter>
    
  </StrictMode>,
)