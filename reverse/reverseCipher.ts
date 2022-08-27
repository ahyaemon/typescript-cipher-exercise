export function reverse(plainText: string): string {
    return plainText.split('').reverse().join('')
}

export function reverse2(plainText: string): string {
    let encrypted = ''
    for(let s of plainText) {
        encrypted = s + encrypted
    }

    return encrypted
}

export function reverse3(plainText: string): string {
    return plainText.split('').reduce((acc, cur) => cur + acc)
}

export function reverse4(plainText: string): string {
    let encrypted = ''
    for (let i = 0; i < plainText.length; i++) {
        encrypted = plainText[i] + encrypted
    }
    return encrypted
}
