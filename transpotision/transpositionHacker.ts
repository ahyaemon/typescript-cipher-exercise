import {decrypt} from "./transpositionCipher.ts";
import {isEnglish} from "../detectEnglish/detectEnglish.ts";

export function hack(message: string): string {
    for (let key = 2; key < message.length; key++) {
        const decrypted = decrypt(message, key)
        if (isEnglish(decrypted)) {
            return decrypted
        }
    }
    return ''
}
