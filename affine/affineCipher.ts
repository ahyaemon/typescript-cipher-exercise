import {symbols} from "../symbols.ts";
import {findModInverse} from "../moduler/moduler.ts";

export function encrypt(plainText: string, key: number): string {
    const [keyA, keyB] = createKeys(key, symbols.length)
    return encryptByAddition(encryptByMultiplication(plainText, keyA), keyB)
}

export function decrypt(encryptedText: string, key: number): string {
    const [keyA, keyB] = createKeys(key, symbols.length)
    const modInverse = findModInverse(keyA, symbols.length)
    return move(encryptedText, i => {
        return ((i - keyB) * modInverse % symbols.length + symbols.length) % symbols.length
    })
}

export function createKeys(key: number, n: number): [number, number] {
    return [Math.floor(key / n), key % n]
}

function encryptByAddition(text: string, key: number): string {
    return move(text, i => (i + key) % symbols.length)
}

function decryptByAddition(encryptedText: string, key: number): string {
    return move(encryptedText, i => (i + symbols.length - key) % symbols.length)
}

function encryptByMultiplication(text: string, key: number): string {
    return move(text, i => (i * key) % symbols.length)
}

function decryptByMultiplication(encryptedText: string, key: number): string {
    const modInverse = findModInverse(key, symbols.length)
    return move(encryptedText, i => (i * modInverse) % symbols.length)
}

function move(text: string, createNewIndex: (i: number) => number): string {
    let after = ''

    for (const s of text) {
        const i = symbols.indexOf(s)
        if (i === -1) {
            after = after + s
        } else {
            const i2 = createNewIndex(i)
            const s2 = symbols[i2]
            after = after + s2
        }
    }

    return after
}
