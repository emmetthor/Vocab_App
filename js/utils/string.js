import { D } from "../debug.js";

// 檢查字串是否為空後輸出
export function safeTrim(v) {
    if (typeof v === "string") {
        return v.trim();
    }

    D.warn(`safe_trim: empty or non-string value [${v}] `);
    return v;
}

export function isStringEmpty(str) {
    if (typeof str === "string") {
        return !str;
    }

    D.warn(`isStringEmpty: empty or non-string value [${str}] returned false`);
    return false;
}