import { useCallback, useState } from 'react'
import { ObtenerListadoUsuario } from '../Services/ObtenerListadoUsuario';

export function useUsuario() {

    const [listadoPersona, setListadoPersona] = useState([]);

    async function postObtenerListado(descargar) {
        const resp = await ObtenerListadoUsuario(descargar);
        if (resp) {
            if (resp.status === 200) {
                if (!descargar.exportar) {
                    if (resp.data) {
                        setListadoPersona(resp.data);
                    }
                } else {
                    if (resp.data) {
                        let decode = atob(resp.data);
                        downloadCSV(decode, "Personas");
                    }
                }
            }
        }
    }

    const downloadCSV = (data, nombreArchivo) => {
        const tipo = 'text/csv';
        const extension = 'csv';
        const universalBOM = "\uFEFF";
        const a = document.createElement('a');
        a.setAttribute('href', 'data:' + tipo + '; charset=utf-8,' + encodeURIComponent(universalBOM + data));
        a.setAttribute('download', nombreArchivo + '.' + extension);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const getListadoPersona = useCallback(
        function (descargar) {
            postObtenerListado(descargar);
        },
        []
    );

    return { listadoPersona, getListadoPersona }
}
