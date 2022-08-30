import {symbols} from "../symbols.ts";

export function encrypt(plainText: string, key: number): string {
    const [keyA, keyB] = createKeys(key, symbols.length)
    return encryptByAddition(encryptByMultiplication(plainText, keyA), keyB,)
}

export function createKeys(key: number, n: number): [number, number] {
    return [Math.floor(key / n), key % n]
}

function encryptByAddition(text: string, key: number): string {
    return move(text, key, i => (i + key) % symbols.length)
}

function encryptByMultiplication(text: string, key: number): string {
    return move(text, key, i => (i * key) % symbols.length)
}

function move(text: string, key: number, createNewIndex: (i: number) => number): string {
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
