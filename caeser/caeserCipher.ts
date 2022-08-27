const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 !?.'

export function encrypt(plainText: string, key: number): string {
    let encrypted = ''

    for (const s of plainText) {
        const i = symbols.indexOf(s)
        const i2 = (i + key) % symbols.length
        const s2 = symbols[i2]
        encrypted = encrypted + s2
    }

    return encrypted
}

export function decrypt(plainText: string, key: number): string {
    return ''
}
