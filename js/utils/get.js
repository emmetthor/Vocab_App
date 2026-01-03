import { D } from "../debug.js";
import { safeTrim } from "./string.js";

export function getFromInput(inputName, mode) {
    let inputValue = inputName.value;

    if (mode === "trim") {
        return safeTrim(inputValue);
    }

    if (mode === "none") {
        return inputValue;
    }

    D.warn(`getFromInput: invalid mode [${mode}] returned empty`);

    return "";
}