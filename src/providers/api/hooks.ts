import { useContext } from "react";
import { APIContext } from "./context";

export const useAPI = () => useContext(APIContext);