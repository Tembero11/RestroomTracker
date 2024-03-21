import { useContext } from "react";
import { SnackBarContext } from "../contexts/SnackBarContext/SnackBarContext";

export default function useSnackBar() {
    return useContext(SnackBarContext);
}