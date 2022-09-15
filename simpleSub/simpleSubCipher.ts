const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function encrypt(plainText: string, key: string): string {
    const map = createMap(letters, key)
    return plainText
        .split('')
        .map(s => map.has(s) ? map.get(s) : s)
        .join('')
}

function createMap(letters: string, key: string): Map<string, string> {
    const m = new Map<string, string>()
    letters.split('').forEach((s, i) => {
        m.set(s, key[i])
        m.set(s.toLowerCase(), key[i].toLowerCase())
    })
    return m
}

export function decrypt(decryptedText: string, key: string): string {
    const map = createMap(key, letters)
    return decryptedText
        .split('')
        .map(s => map.has(s) ? map.get(s) : s)
        .join('')
}
