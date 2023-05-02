import { useContext } from "react";
import ToastContext from "../Components/Context/ToastContext";
export function useToast() {
    const toastHelpers = useContext(ToastContext);
    return toastHelpers;
}