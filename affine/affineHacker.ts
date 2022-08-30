import {createKeys, decrypt} from "./affineCipher.ts";
import {symbols} from "../symbols.ts";
import {gcd} from "../moduler/moduler.ts";
import {isEnglish} from "../detectEnglish/detectEnglish.ts";

type HackResult = {
    decryptedText: string
    key: number
}

export function hack(encryptedText: string): HackResult {
    for (let key = 0; key < encryptedText.length ** 2; key++) {
        const [ keyA ] = createKeys(key, symbols.length)
        if (gcd(keyA, symbols.length) !== 1) {
            continue
        }

        const decryptedText = decrypt(encryptedText, key)
        if (isEnglish(decryptedText)) {
            return { key, decryptedText }
        }
    }

    throw Error('failed to decrypt text')
}
