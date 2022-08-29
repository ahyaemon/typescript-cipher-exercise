const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerLetters = upperLetters.toLowerCase()
const lettersAndSpace = upperLetters + lowerLetters + ' \t\n'

function loadDictionary(): string[] {
    const txt = Deno.readTextFileSync('detectEnglish/dictionary.txt') as string
    return txt.replaceAll('\r\n', '\n').split('\n')
}

const dictionary = loadDictionary()

export function getEnglishCount(message: string): number {
    const upper = message.toUpperCase()
    const words = removeNonLetters(upper).split(/\s/).filter(word => word.length > 0)
    const matches = words
        .filter(word => dictionary.includes(word))
        .length
    return matches / words.length
}

export function removeNonLetters(message: string): string {
    return message.split('').filter(c => lettersAndSpace.includes(c)).join('')
}

export function isEnglish(
    message: string,
    wordPercentage: number = 20,
    letterPercentage: number = 85,
): boolean {
    const wordsMatch = getEnglishCount(message) * 100 / wordPercentage
    if (!wordsMatch) {
        return false
    }

    const letters = removeNonLetters(message)
    const messageLettersPercentage = letters.length / message.length * 100
    const lettersMatch = messageLettersPercentage >= letterPercentage
    if (!lettersMatch) {
        return false
    }

    return true
}
