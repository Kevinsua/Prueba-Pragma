import { useContext } from "react";
import LoadingContext from "../Components/Context/LoadingContext";
export function useLoading() {
    const loadingHelpers = useContext(LoadingContext);
    // console.log('loading',loadingHelpers)
    return loadingHelpers;
}