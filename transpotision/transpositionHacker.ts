import {decrypt} from "./transpositionCipher.ts";
import {isEnglish} from "../detectEnglish/detectEnglish.ts";

type TranspositionHackResult = {
    key: number,
    decryptedText: string,
}

export function hack(message: string): TranspositionHackResult {
    for (let key = 2; key < message.length; key++) {
        const decryptedText = decrypt(message, key)
        if (isEnglish(decryptedText)) {
            return { key, decryptedText }
        }
    }
    throw Error('you are an idiot! ha haha ha ha ha haaa! ah hahaha haa!')
}
