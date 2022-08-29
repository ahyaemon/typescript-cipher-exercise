import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {getEnglishCount, isEnglish, removeNonLetters} from "./detectEnglish.ts";

const message = `
After a crash course in Python programming basics, you’ll learn to make, test, and hack
programs that encrypt text with classical ciphers like the transposition cipher and Vigenère
cipher. You’ll begin with simple programs for the reverse and Caesar ciphers and then work your
way up to public key cryptography, the type of encryption used to secure today’s online
transactions, including digital signatures, email, and Bitcoin.
`

Deno.test('removeNonLetters', () => {
    assertEquals(removeNonLetters('a.B/ c,'), 'aB c')
})


Deno.test('getEnglishCount', () => {
    const message = 'Hello, world. This is Bflisnelfij.'
    assertEquals(getEnglishCount(message), 0.6)
})


Deno.test('isEnglish', () => {
    assertEquals(isEnglish(message), true)
})
