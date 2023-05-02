import moment from "moment"
import Acciones from "../Components/Acciones"

export function useColumns(props) {
	const COLUMNS = [
		{
			Header: 'Id',
			accessor: 'id'
		},
		{
			Header: 'Nombre',
			accessor: 'nombre',
		},
		{
			Header: 'Rut',
			accessor: 'rut'
		},
		{
			Header: 'Correo',
			accessor: 'correo',
		},
		{
			Header: 'Fecha de nacimiento',
			accessor: data => {
				return moment(data.fechaNacimiento).format('DD-MM-YYYY')}
		},		
		{
			Header: 'Acciones',
			accessor: '',
			Cell: ({ row }) => <Acciones renderizar={props} persona ={row.original} />

		}
	]
	return { COLUMNS }
}