const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerLetters = upperLetters.toLowerCase()

export function encrypt(plainText: string, key: string): string {
    let encryptedText = ''
    let iKey = 0
    for (let i = 0; i < plainText.length; i++) {
        const keyNumber = upperLetters.indexOf(key[iKey % key.length])
        const s = plainText[i]
        if (isLetter(s)) {
            encryptedText += move(s, i2 => (i2 + keyNumber) % upperLetters.length)
            iKey++
        } else {
            encryptedText += s
        }

    }
    return encryptedText
}

export function decrypt(encryptedText: string, key: string): string {
    let plainText = ''
    let iKey = 0
    for (let i = 0; i < encryptedText.length; i++) {
        const keyNumber = upperLetters.indexOf(key[iKey % key.length])
        const s = encryptedText[i]
        if (isLetter(s)) {
            plainText += move(s, i2 => (i2 + upperLetters.length - keyNumber) % upperLetters.length)
            iKey++
        } else {
            plainText += s
        }

    }
    return plainText
}

function isLetter(s: string): boolean {
    return (upperLetters.indexOf(s.toUpperCase()) >= 0)
}

function move(s: string, createNewIndex: (i: number) => number): string {
    if (upperLetters.indexOf(s) >= 0) {
        const i = upperLetters.indexOf(s)
        const i2 = createNewIndex(i)
        return upperLetters[i2]
    } else {
        const i = lowerLetters.indexOf(s)
        const i2 = createNewIndex(i)
        return lowerLetters[i2]
    }
}
