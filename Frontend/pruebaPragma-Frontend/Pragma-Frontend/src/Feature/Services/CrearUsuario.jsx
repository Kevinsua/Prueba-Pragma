import instance, { customConfig } from "../../Utils/Interceptors/Interceptor";

const CrearUsuario = async (values) => {
    try {console.log('valuessssss',values)
        const resultado = await instance.Backend.post("/Usuario/Crear", {
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

export { CrearUsuario };