import instance, { customConfig } from "../../Utils/Interceptors/Interceptor";

const EliminarUsuario = async (values) => {
    try {        
        const resultado = await instance.Backend.post("/Usuario/Borrar",{
            usuarioId: values
            
        }, customConfig);

        return resultado

    } catch (error) {

        console.log(error);

    }

}

export {EliminarUsuario};