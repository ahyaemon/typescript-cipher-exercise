import {isEnglish, loadDictionary} from "../detectEnglish/detectEnglish.ts";
import {decrypt} from "./vigenereCipher.ts ";

const dictionary = loadDictionary()

export function hack(encryptedText: string): {key: string, decryptedText: string} {
    for (const word of dictionary) {
        const decryptedText = decrypt(encryptedText, word)
        if (isEnglish(decryptedText, 60, 85)) {
            return { key: word, decryptedText }
        }
    }
    throw Error('hack failed')
}
