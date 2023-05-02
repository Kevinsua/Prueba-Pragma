import { useCallback, useState, createContext } from "react";
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
const ToastContext = createContext();

export default ToastContext;
let id = 0;
export function ToastContextProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const addToast = useCallback(
        function (toast) {
            console.log(toast)
            setToasts((toasts) => [...toasts, { id: id++, titulo: toast.titulo, tipo: toast.tipo, mensaje: toast.mensaje }]);
        },
        [setToasts]
    );
    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <ToastContainer position="top-end" className="p-3">
                {toasts.map((toast) => (
                    <Toast                    
                        onClose={() => setToasts(toasts => toasts.filter(t => t.id !== toast.id))}
                        autohide
                        // show={toast.mostrar}
                        bg={toast.tipo.toLowerCase()}
                        key={toast.id}
                    >
                        <Toast.Body className={toast.tipo} style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                            {toast.mensaje}

                        </Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
}
// import { createContext } from 'react';
// import Toast from 'react-bootstrap/Toast';
// import ToastContainer from 'react-bootstrap/ToastContainer';

// export const ToastContext = createContext();

// export const ToastProvider = ({ children }) => {
//     return (
//         <ToastContext.Provider value={{ showToast }}>
//             <ToastContainer position="top-center">
//                 {children}
//             </ToastContainer>
//         </ToastContext.Provider>
//     );
// };

// const showToast = (message) => {
//     return (
//         <Toast bg="success" text="white" animation={false}>
//             <Toast.Header closeButton={false}>
//                 <strong>Mensaje</strong>
//             </Toast.Header>
//             <Toast.Body>{message}</Toast.Body>
//         </Toast>
//     );
// };
// export default {
//     ToastProvider,
//     showToast
// };