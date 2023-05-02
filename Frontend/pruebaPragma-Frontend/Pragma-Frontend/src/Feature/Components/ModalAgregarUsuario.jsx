import Modal from 'react-bootstrap/Modal';
import { Formik, Form } from "formik";
import Button from '../../Components/Button/Button';
import InputTextField from '../../Components/InputTextField/InputTextField';
import { format } from 'rut.js';
import { useState, useEffect } from 'react';
import DatePickerField from '../../Components/DatePicker/DatePicker';
import { CrearUsuario } from '../Services/CrearUsuario';
import { ModificarUsuario } from '../Services/ModificarUsuario';
import validations from '../../Utils/Validations/Validations';
import { useToast } from '../../Hooks/useToast';

const ModalAgregarUsuario = (props) => {
    const { isCrear, renderizar, persona, ...rest } = props
    const addToast = useToast();
    const [initialValues, setInitialValues] = useState({
        nombre: '',
        rut: '',
        correo: '',
        fechaNacimiento: ''
    })

    async function postCrearPersona(values) {
        const resp = await CrearUsuario(values);
        if (resp) {
            if (resp.status === 200) {
                addToast({ mensaje: 'Se ha guardado correctamente.', titulo: 'Confirmación', tipo: 'Success' });
                rest.onHide();
                renderizar();
            }
        }
    }

    async function postActualizarPersona(values) {
        const resp = await ModificarUsuario(values);
        if (resp) {
            if (resp.status === 200) {
                addToast({ mensaje: 'Se ha guardado correctamente.', titulo: 'Confirmación', tipo: 'Success' });
                rest.onHide();
                renderizar();
            }
        }
    }

    useEffect(() => {
        if (!isCrear) {
            setInitialValues({
                nombre: persona.nombre,
                rut: persona.rut,
                correo: persona.correo,
                fechaNacimiento: persona.fechaNacimiento
            })
        } else {
            setInitialValues({
                nombre: '',
                rut: '',
                correo: '',
                fechaNacimiento: ''
            })
        }
    }, [isCrear, rest.show])
    return (
        <Modal
            {...rest}
            size="md"
            aria-labelledby="contained-modal-title-"
            centered
        >
            <Modal.Header >
                {isCrear ?
                    <h6>Nuevo Usuario</h6>
                    :
                    <h6>Modificar Usuario</h6>
                }
            </Modal.Header>
            <Modal.Body>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validate={validations}
                    onSubmit={values => {
                        console.log('values', values)
                        if (isCrear) {
                            const envioForm = {
                                rut: format(values.rut, { dots: false }),
                                nombre: values.nombre,
                                correo: values.correo === '' ? null : values.correo,
                                fechaNacimiento: values.fechaNacimiento
                            }
                            postCrearPersona(envioForm);
                        } else {
                            const envioFormActualizar = {
                                usuarioId: persona.id,
                                rut: format(values.rut, { dots: false }),
                                nombre: values.nombre,
                                correo: values.correo,
                                fechaNacimiento: values.fechaNacimiento
                            }
                            postActualizarPersona(envioFormActualizar);                        }
                    }}
                >
                    {() => (
                        <Form className="form mb-0">
                            <InputTextField
                                name="nombre"
                                type="text"
                                label="Nombre"
                                placeholder="Nombre"
                                autoComplete="true"
                            />
                            <InputTextField
                                name="rut"
                                type="text"
                                label="Rut"
                                placeholder="RUT"
                                autoComplete="true"
                                maxLength="20"
                            />
                            <InputTextField
                                name="correo"
                                type="text"
                                label="Correo"
                                placeholder="Email"
                                autoComplete="true"
                            />
                            <DatePickerField
                                label="Fecha de nacimiento"
                                name="fechaNacimiento"
                                initialValues={initialValues}
                            />
                            <Modal.Footer>
                                <Button type="submit" design="btn-primary btn-sm active">Crear</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
                {/* </div> */}
            </Modal.Body>
        </Modal>
    )
}
export default ModalAgregarUsuario;
