import Modal from 'react-bootstrap/Modal';
import Button from '../../Components/Button/Button';
import { useToast } from '../../Hooks/useToast';
import { EliminarUsuario } from '../Services/EliminarUsuario';

const ModalEliminar = (props) => {
	const addToast = useToast();
	const { renderizar, ...rest } = props
	const handleClick = async () => {
		const resp = await EliminarUsuario(rest.persona.id);
		if (resp) {
			if (resp.status === 200) {
				if (resp.data) {
					renderizar();
					addToast({ mensaje: 'Se ha eliminado correctamente el usuario', titulo: 'Confirmación', tipo: 'Success' });
				}
			}
		}
		rest.onHide();
	};
	return (
		<Modal
			{...rest}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body>
				<div className='info my-4'>
					<span className='info__icon'>
						<i className='ico-user-delete'></i>
					</span>
					<h6 className='d-flex justify-content-center'>¿ Estas seguro que deseas eliminar a {rest.persona.nombre}?</h6>
				</div>
				<div className="d-flex flex-column flex-md-row justify-content-center align-items-stretch align-items-md-center gap-4">
					<Button type="button" design="btn-outline-pewter-blue btn--small" onClick={props.onHide}>Cancelar</Button>
					<Button type="button" design="btn-primary btn--small" onClick={handleClick}>Aceptar</Button>
				</div>
			</Modal.Body>
		</Modal>
	)
}
export default ModalEliminar;