import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {decrypt, encrypt, encrypt2} from "./transpositionCipher.ts";
import {measureSeconds} from "../measure.ts";

const plainText = 'Underneath a huge oak tree there was of swine a huge company,'

const encryptedText = 'Uhot  on ahoamdakef pe  r harhtesunnur wgyegewie,aeean t  sec'

const key = 9

Deno.test('encrypt', () => {
    assertEquals(encrypt(plainText, key), encryptedText)
})

Deno.test('encrypt2', () => {
    assertEquals(encrypt2(plainText, key), encryptedText)
})

Deno.test('decrypt', () => {
    assertEquals(decrypt(encryptedText, key), plainText)
})

Deno.test({
    name: 'measure',
    fn: () => {
        const n = 100000

        const result11 = measureSeconds(() => {
            encrypt(plainText, 13)
        }, n)
        console.log({result11})

        const result21 = measureSeconds(() => {
            encrypt2(plainText, 13)
        }, n)
        console.log({result21})

        const result12 = measureSeconds(() => {
            encrypt(plainText, 13)
        }, n)
        console.log({result12})

        const result22 = measureSeconds(() => {
            encrypt2(plainText, 13)
        }, n)
        console.log({result22})
    },
    ignore: true,
})