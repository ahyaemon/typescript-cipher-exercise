import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {
    createCandidates, createKeys,
    createPattern,
    getSingleAlphabets,
    hack,
    letters,
    mergeCandidates,
    normalize
} from "./simpleSubHacker.ts";

const plainText     = 'If a man is offered a fact which goes against his instincts, he will scrutinize it closely, and unless the evidence is overwhelming, he will refuse to believe it. If, on the other hand, he is offered something which affords a reason for acting in accordance to his instincts, he will accept it even on the slightest evidence. The origin of myths is explained in this way. -Bertrand Russell'
const encryptedText = 'Sy l nlx sr pyyacao l ylwj eiswi upar lulsxrj isr sxrjsxwjr, ia esmm rwctjsxsza sj wmpramh, lxo txmarr jia aqsoaxwa sr pqaceiamnsxu, ia esmm caytra jp famsaqa sj. Sy, px jia pjiac ilxo, ia sr pyyacao rpnajisxu eiswi lyypcor l calrpx ypc lwjsxu sx lwwpcolxwa jp isr sxrjsxwjr, ia esmm lwwabj sj aqax px jia rmsuijarj aqsoaxwa. Jia pcsusx py nhjir sr agbmlsxao sx jisr elh. -Facjclxo Ctrramm'

Deno.test('create pattern', () => {
    assertEquals(createPattern('abc'), '012')
    assertEquals(createPattern('aab'), '001')
    assertEquals(createPattern('aabacca'), '0010220')
})

Deno.test('create candidates', () => {
    const candidates = createCandidates()
    const alphabets = letters.split('')
    assertEquals(candidates.get('A'), new Set(alphabets))
    assertEquals(candidates.get('B'), new Set(alphabets))
    assertEquals(candidates.get('Z'), new Set(alphabets))
})

Deno.test('merge candidates', () => {
    const c1 = new Map<string, Set<string>>()
    c1.set('A', new Set(['X', 'Y', 'Z']))
    c1.set('B', new Set(['X', 'Y']))
    c1.set('C', new Set([]))

    const c2 = new Map<string, Set<string>>()
    c2.set('A', new Set(['W', 'X', 'Y']))
    c2.set('C', new Set(['W']))

    const expected = new Map<string, Set<string>>()
    expected.set('A', new Set(['X', 'Y']))
    expected.set('B', new Set(['X', 'Y']))
    expected.set('C', new Set(['W']))

    const result = mergeCandidates(c1, c2)
    assertEquals(result, expected)
})

Deno.test('get single alphabets', () => {
    const c1 = new Map<string, Set<string>>()
    c1.set('A', new Set(['X', 'Y', 'Z']))
    c1.set('B', new Set(['Y']))
    c1.set('C', new Set(['X']))
    c1.set('D', new Set(['V', 'X']))
    c1.set('E', new Set(['T', 'U', 'V', 'X']))

    assertEquals(getSingleAlphabets(c1), ['Y', 'X'])
})

Deno.test('normalize', () => {
    const c1 = new Map<string, Set<string>>()
    c1.set('A', new Set(['X', 'Y', 'Z']))
    c1.set('B', new Set(['Y']))
    c1.set('C', new Set(['X']))
    c1.set('D', new Set(['V', 'X']))
    c1.set('E', new Set(['T', 'U', 'V', 'X']))

    const expected = new Map<string, Set<string>>()
    expected.set('A', new Set(['Z']))
    expected.set('B', new Set(['Y']))
    expected.set('C', new Set(['X']))
    expected.set('D', new Set(['V']))
    expected.set('E', new Set(['T', 'U']))

    assertEquals(normalize(c1), expected)
})

Deno.test('create keys', () => {
    const c1 = new Map<string, Set<string>>()
    c1.set('A', new Set(['A']))
    c1.set('B', new Set(['B', 'C']))
    c1.set('C', new Set(['B', 'E']))
    c1.set('D', new Set(['F']))

    assertEquals(createKeys(c1), ['ABEF', 'ACBF', 'ACEF'])
})

Deno.test('hack', () => {
    assertEquals(hack(encryptedText), plainText)
})
