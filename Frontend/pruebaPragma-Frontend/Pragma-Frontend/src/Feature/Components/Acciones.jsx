import { useState } from "react";
// import ModalEliminar from "./ModalEliminar";
import Button from "../../Components/Button/Button";
import edit from "../../assets/image/editIcons.png";
import delet from "../../assets/image/deleteIcons.png"
import ModalAgregarUsuario from "./ModalAgregarUsuario";
import ModalEliminar from "./ModalEliminar";
const Acciones = (props) => {
    const [show, setShow] = useState(false);
    const [showPersona, setShowPersona] = useState(false);
    const handleClose = () => setShow(false);
    const handleClosePersona = () => setShowPersona(false);
    return (
        <>
            <div className="d-flex justify-content-start align-items-center p-0">
                <Button design={"btn--outline btn--icon btn--pewter-blue rounded"} onClick={() =>  setShowPersona(true)}>
                    <img height='20px' src={edit} alt="" />
                </Button>
                <Button onClick={() =>setShow(true)}>
                    <img height='20px' src={delet} alt="" />
                </Button>
            </div>
            <ModalEliminar
                show={show}
                onHide={handleClose}
                persona={props.persona}
                renderizar={props.renderizar}
            />
            <ModalAgregarUsuario
                show={showPersona}
                onHide={handleClosePersona}
                isCrear={false}
                persona={props.persona}
                renderizar={props.renderizar}
            />

        </>
    )
}

export default Acciones;