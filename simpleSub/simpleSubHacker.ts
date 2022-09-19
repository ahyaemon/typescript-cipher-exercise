import {isEnglish} from "../detectEnglish/detectEnglish.ts";
import {decrypt, encrypt} from "./simpleSubCipher.ts";

export const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function loadDictionary(): string[] {
    const txt = Deno.readTextFileSync('detectEnglish/dictionary.txt') as string
    return txt.replaceAll('\r\n', '\n').split('\n')
}

export function createPattern(word: string): string {
    const ar: string[] = []
    return word.split('').map(s => {
        const i = ar.indexOf(s)

        if (i === -1) {
            ar.push(s)
            return ar.length - 1
        } else {
            return i
        }
    }).join('')
}

type Key = string
type Value = string
type Pair = [Key, Value]
type Candidates = Map<string, Set<string>>

function createWordPatternMap(): Pair[] {
    return loadDictionary().map(word => [word, createPattern(word)])
}

// 最初は全てのアルファベットが候補になりうる
export function createCandidates(): Candidates {
    const alphabets = letters.split('')
    return new Map(alphabets.map(a => [a, new Set(alphabets)]))
}

function createCandidatesByMatches(word: string, matches: Pair[]): Candidates {
    const map = new Map<string, Set<string>>()
    word.toUpperCase().split('').forEach((s, i) => {
        for (const match of matches) {
            const letter = match[0][i]
            if (map.has(s)) {
                map.get(s)!.add(letter)
            } else {
                map.set(s, new Set([letter]))
            }
        }
    })
    return map
}

export function mergeCandidates(c1: Candidates, c2: Candidates): Candidates {
    const keys = new Set([...c1.keys(), ...c2.keys()])
    const map = new Map<string, Set<string>>()
    keys.forEach(key => {
        const v1s = c1.get(key) as Set<string>
        const v2s = c2.get(key) as Set<string>

        if (v1s === undefined || v1s.size === 0) {
            map.set(key, v2s)
            return
        }

        if (v2s === undefined || v2s.size === 0) {
            map.set(key, v1s)
            return
        }

        const set = new Set<string>()
        v1s.forEach(v1 => {
            if (v2s.has(v1)) {
                set.add(v1)
            }
        })
        map.set(key, set)
    })

    return map
}

export function getSingleAlphabets(candidates: Candidates): string[] {
    const alphabets: string[] = []
    candidates.forEach((value, key) => {
        if (value.size === 1) {
            alphabets.push([...value.values()][0])
        }
    })
    return alphabets
}

export function normalize(candidates: Candidates): Candidates {
    const alphabets = getSingleAlphabets(candidates)

    const newCandidates = new Map<string, Set<string>>()
    candidates.forEach((value, key) => {
        const set = new Set([...value])
        alphabets.forEach(a => {
            if (set.has(a) && set.size >= 2) {
                set.delete(a)
            }
        })
        newCandidates.set(key, set)
    })

    const newAlphabets = getSingleAlphabets(newCandidates)
    if (newAlphabets.length === alphabets.length) {
        return newCandidates
    } else {
        return normalize(newCandidates)
    }
}

function decided(candidates: Candidates): boolean {
    return getSingleAlphabets(candidates).length === letters.length
}

function _createKeys(letters: string[], rest: string[][]): string[] {
    if (rest.length === 0) {
        return letters
    }

    const perm = letters
        .flatMap(l => rest[0].map(r => l + r))
        .filter(l => l.length === (new Set(l.split(''))).size)

    return _createKeys(perm, rest.slice(1))
}

export function createKeys(candidates: Candidates): string[] {
    const ar: string[][] = []
    candidates.forEach((value, key) => {
        ar.push([...value])
    })

    return _createKeys(ar[0], ar.slice(1))
}

export function hack(encryptedText: string): string {
    const wordPatternMap = createWordPatternMap()
    const words = encryptedText.replace(/[,.!?-]/g, '').split(' ')

    let candidates = createCandidates()

    for (const word of words) {
        const pattern = createPattern(word.toLowerCase())
        const matches = wordPatternMap.filter(([key, value]) => value === pattern)
        if (matches.length > 0) {
            const candidatesByMatches = createCandidatesByMatches(word, matches)
            candidates = normalize(mergeCandidates(candidates, candidatesByMatches))

            if(decided(candidates)) {
                const key = createKeys(candidates)[0]
                const decryptedText = decrypt(encryptedText, key)
                if (isEnglish(decryptedText)) {
                    return decryptedText
                }
            }
        }
    }

    const keys = createKeys(candidates)
    for (const key of keys) {
        // 仕組み上 encrypt を使う
        const decryptedText = encrypt(encryptedText, key)
        if (isEnglish(decryptedText, 65, 85)) {
            console.log({ key, decryptedText })
            return decryptedText
        }
    }

    throw Error('hack failed')
}
