import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLoading } from '../../Hooks/useLoading';
import { useToast } from '../../Hooks/useToast';
//const loading = useLoading();
const instance = {
    Backend: axios.create({ baseURL: "https://localhost:7036/" }) // agregamos la base de la url
}
const customConfig = {
    headers: {
        'Content-Type': 'application/json' // content-Type de nuestra api
    }
}

// instance.Backend.interceptors.request.use(
//     function (config) {
//         const loading = useLoading(); // Crear una instancia de useLoading en el nivel del interceptor
//         loading(true); // Mostrar el indicador de carga
//         return config;
//     },
//     function (error) {
//         const loading = useLoading();
//         loading(false); // Ocultar el indicador de carga
//         return Promise.reject(error);
//     }
// );

// instance.Backend.interceptors.response.use(
//     function (response) {
//         const loading = useLoading();
//         loading(false);
//         return response;
//     },
//     function (error) {
//         const loading = useLoading();
//         loading(false);
//         return Promise.reject(error);
//     }
// );

const AxiosInterceptor = ({ children }) => {
    const addLoading = useLoading();
    const addToast = useToast();
    const [isSet, setIsSet] = useState(false);

    useEffect(() => {
        const reqInterceptor = (request) => {
            if (request.url) {
                addLoading(true);
            }
            return request;
        }
        const resInterceptor = response => {
            if (response.data) {
                if (response.data.codigo) {
                    if (response.data.codigo === 206) {
                        addToast({ mensaje: response.data.mensaje, titulo: 'Información', tipo: 'Info' });
                    }
                }
            }
            if (response.config.url) {
                console.log('pasoo config')
                addLoading(false);
            }
            return response;
        }
        const errInterceptor = error => {
            if ((error.config.url)) {
                addLoading(false);
            }
            let mensajeError = "Ha ocurrido un error.";
            if (error.request.status === 400) {
                addToast({ mensaje: mensajeError, titulo: 'Error', tipo: 'Danger' });
            }
            return Promise.reject(error);
        }
        const interceptorReq = instance.Backend.interceptors.request.use(reqInterceptor, errInterceptor);
        const interceptorResp = instance.Backend.interceptors.response.use(resInterceptor, errInterceptor);
        setIsSet(true); // Esto es para saber cuando ya ha finalizado la configuración del interceptor y asi validarlo en el return 

        return () => {
            instance.Backend.interceptors.request.eject(interceptorReq);
            instance.Backend.interceptors.response.eject(interceptorResp);
        }
    }, [])

    return isSet && children;
}
export default instance;
export { customConfig, AxiosInterceptor };
