const PaginationTable = (props) => {
    const { pageIndex, pageOptions, previousPage, canPreviousPage, nextPage, canNextPage, gotoPage } = props;
    return (
        <>
            <nav className="d-flex justify-content-end">
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={previousPage}
                            disabled={!canPreviousPage}
                        >
                            <span aria-hidden="true">
                                <span>Anterior</span>
                            </span>
                        </button>
                    </li>
                    {pageOptions.map((index, page) => {
                        return <li key={index}
                        >
                            <button
                                className="page-link"
                                onClick={() => gotoPage(page)}
                            >{page + 1}</button>
                        </li>
                    })}

                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={nextPage}
                            disabled={!canNextPage}
                        >
                            <span aria-hidden="true">
                                <span>Siguiente</span>
                            </span>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default PaginationTable;