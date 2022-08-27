const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 !?.'

export function encrypt(plainText: string, key: number): string {
    return move(plainText, key, i => (i + key) % symbols.length)
}

export function decrypt(encryptedText: string, key: number): string {
    return move(encryptedText, key, i => (i + symbols.length - key) % symbols.length)
}

function move(text: string, key: number, createNewIndex: (i: number) => number): string {
    let after = ''

    for (const s of text) {
        const i = symbols.indexOf(s)
        const i2 = createNewIndex(i)
        const s2 = symbols[i2]
        after = after + s2
    }

    return after
}
