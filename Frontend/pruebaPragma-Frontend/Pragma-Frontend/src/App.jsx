import './App.css'
import { LoadingContextProvider } from './Components/Context/LoadingContext'
import { ToastContextProvider } from './Components/Context/ToastContext'
import Usuario from './Feature/Page/Usuario'
import { AxiosInterceptor } from './Utils/Interceptors/Interceptor'
function App() {

  return (
    <>
   <ToastContextProvider>
        <LoadingContextProvider>
          <AxiosInterceptor>
            <Usuario/>
          </AxiosInterceptor >
        </LoadingContextProvider>
      </ToastContextProvider>
    </>
  )
}

export default App
