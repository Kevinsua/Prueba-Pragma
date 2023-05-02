import { useMemo, useEffect, useState } from 'react';
import { useColumns } from '../Utils/Columns';
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters } from 'react-table';
import TablaUsuario from '../Components/TablaUsuario';
import { useUsuario } from '../Hooks/useUsuario';

const Usuario = () => {
    const { listadoPersona, getListadoPersona } = useUsuario();

    useEffect(() => {
        getListadoPersona({ exportar: false });
    }, [])

    const renderizar = () => {
        getListadoPersona({ exportar: false });
    }

    const { COLUMNS } = useColumns(renderizar);
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => listadoPersona, [listadoPersona]);

    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const descargar = () => {
        getListadoPersona({ exportar: true });
    };

    return (
        <div className="container-fluid">
            <div className="mx-auto">
                <TablaUsuario
                    tableInstance={tableInstance}
                    renderizar={renderizar}
                    descargar={descargar}
                />
            </div>
        </div >
    )
}
export default Usuario;