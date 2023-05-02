import { useCallback, useState, createContext } from "react";
import SpinnerComponent from "../Spinner/Spinner";
const LoadingContext = createContext();

export default LoadingContext;
export function LoadingContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const addLoading = useCallback(
        function (loadingValue) {
            setLoading(() => loadingValue);
        },
        [setLoading]
    );

    return (
        <LoadingContext.Provider value={addLoading}>
            {children}
            <SpinnerComponent showLoading={loading}></SpinnerComponent>
        </LoadingContext.Provider>
    );
}
