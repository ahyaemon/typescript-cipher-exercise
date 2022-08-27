import {decrypt, symbols} from "./caeserCipher.ts";

type Result = {
    key: number
    text: string
}

export function hack(encryptedText: string): Result[] {
    const results: Result[] = []
    for (let key = 1; key < symbols.length; key++) {
        const text = decrypt(encryptedText, key)
        const result = { key, text }
        results.push(result)
    }
    return results
}
