import { useState } from 'react';
import SearchField from '../../Components/SearchField/SearchField';
import Button from '../../Components/Button/Button';
import PaginationTable from '../../Components/PaginationTable/PaginationTable';
import ModalAgregarUsuario from './ModalAgregarUsuario';

const TablaUsuario = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [modalIsCrear, setModalIsCrear] = useState(true);
    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, state, pageOptions, previousPage, canPreviousPage, nextPage, canNextPage, gotoPage, setGlobalFilter } = props.tableInstance;
    const { globalFilter } = state;
    const {renderizar, listado, descargar} = props;
    function handleShow(isCrear) {
        setShow(true);
        setModalIsCrear(isCrear);
    }
   
    return (
        <>
            <div className="table-responsive">
                <div className='tools'>
                    <Button design="btn-primary btn-sm active" onClick={() => handleShow()}>
                        <span>Nuevo</span>
                    </Button>
                </div>
                <div className="tools">
                    <SearchField
                        filter={globalFilter}
                        setFilter={setGlobalFilter}
                    />
                </div>
                <div className="d-flex export">
                    <Button design="btn-primary btn-sm active" onClick = {() => descargar()}>
                        <span>Excel</span>                       
                    </Button>
                </div>
                <table className="table table-striped table-bordered" {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps(), { className: `${column.className}` })}>
                                        <span className="d-flex">
                                            {column.render('Header')}
                                            <>
                                                {column.isSorted ?
                                                    (column.isSortedDesc ?
                                                        <i className="ico-chevron-down"></i>
                                                        :
                                                        <i className="ico-chevron-up"></i>
                                                    ) :
                                                    <>
                                                        <i className="ico-sort fs-7"></i>
                                                    </>
                                                }
                                            </>
                                        </span>
                                    </th>
                                ))
                                }
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            page.map((row) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}
                                    >
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps({ className: `${cell.column.className}` })}>

                                                {cell.render('Cell')}
                                            </td>
                                        })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <PaginationTable
                pageIndex={state.pageIndex}
                pageOptions={pageOptions}
                previousPage={previousPage}
                canPreviousPage={canPreviousPage}
                nextPage={nextPage}
                canNextPage={canNextPage}
                gotoPage={gotoPage}
            />
            <ModalAgregarUsuario
                show={show}
                onHide={handleClose}
                renderizar={renderizar}
                isCrear = {true}
            />
        </>
    )
}

export default TablaUsuario;