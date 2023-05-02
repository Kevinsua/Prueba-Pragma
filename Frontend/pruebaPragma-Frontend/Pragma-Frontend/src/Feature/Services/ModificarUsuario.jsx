import instance, { customConfig } from "../../Utils/Interceptors/Interceptor";

const ModificarUsuario = async (values) => {
    try {
        const resultado = await instance.Backend.post("/Usuario/Modificar", {
            idUsuario: values.usuarioId,
            rut: values.rut,
            nombre: values.nombre,
            correo: values.correo,
            fechaNacimiento: values.fechaNacimiento
        }, customConfig);

        return resultado

    } catch (error) {

        console.log(error);

    }

}

export { ModificarUsuario };