import instance, { customConfig } from "../../Utils/Interceptors/Interceptor";

const ObtenerListadoUsuario = async (exportar) => {
    try {
        const resultado = await instance.Backend.post("/Usuario/ListaUsuarios",
            {
                exportar: exportar.exportar
            }, customConfig);

        return resultado

    } catch (error) {

        console.log(error);

    }

}
export { ObtenerListadoUsuario };