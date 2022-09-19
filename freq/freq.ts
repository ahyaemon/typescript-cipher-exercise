const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerLetters = upperLetters.toLowerCase()
const high6 = 'ETAOIN'
const low6 = 'VKJXQZ'

export function englishFreqMatchScore(text: string): number {
    const textChars = text.split('')
    const ar: [string, number][] = upperLetters
        .split('')
        .map(s => [s, textChars.filter(ss => ss.toUpperCase() === s).length])
    ar.sort((a, b) => b[1] - a[1])

    const highCount = ar.slice(0, 6).filter(a => high6.indexOf(a[0]) >= 0).length
    const lowCount = ar.slice(ar.length - 6, ar.length).filter(a => low6.indexOf(a[0]) >= 0).length

    return highCount + lowCount
}
