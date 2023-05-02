import { validate } from 'rut.js';
const validations = (values) => {
    const errors = {}
    if (values.correo) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)) {
            errors.correo = 'Email no válido';
        }
    }
    if (values.rut === '') {
        errors.rut = 'Requerido';
    } else if (values.rut) {
        if (!validate(values.rut)) {
            errors.rut = 'Rut inválido';
        }
    }

    if (values.nombre === '') {
        errors.nombre = 'Requerido';
    }
    console.log('values', values)
    if (values.fechaNacimiento === '') {
        errors.fechaNacimiento = 'Requerido';
    }


    return errors;
}
export default validations;
