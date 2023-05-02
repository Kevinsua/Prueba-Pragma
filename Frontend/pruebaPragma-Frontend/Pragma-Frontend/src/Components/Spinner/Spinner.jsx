import Spinner from "react-bootstrap/Spinner"
const SpinnerComponent = ({ showLoading }) => {
    return showLoading ? (
        <div className="loading-container flex-content-center">
            <Spinner animation="border" variant="primary" />
        </div>
    ) : null;
}
export default SpinnerComponent;