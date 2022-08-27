import { assertEquals, assertNotEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {decrypt, encrypt, encrypt2} from "./caeserCipher.ts";
import {measureSeconds} from "../measure.ts";

const plainText = 'This is my secret message.'

const encryptedByKey13 = 'guv6Jv6Jz!J6rp5r7Jzr66ntrM'

Deno.test('encrypt', () => {
    assertEquals(encrypt(plainText, 13), encryptedByKey13)
})

Deno.test('encrypt2', () => {
    assertEquals(encrypt2(plainText, 13), encryptedByKey13)
})

Deno.test('decrypt', () => {
    assertEquals(decrypt(encryptedByKey13, 13), plainText)
})

Deno.test('key 12', () => {
    const encryptedByKey12 = encrypt(plainText, 12)
    assertNotEquals(encryptedByKey12, encryptedByKey13)
})

Deno.test({
    name: 'measure',
    fn: () => {
        const result11 = measureSeconds(() => {
            encrypt(plainText, 13)
        }, 1000)
        console.log({result11})

        const result21 = measureSeconds(() => {
            encrypt2(plainText, 13)
        }, 1000)
        console.log({result21})

        const result12 = measureSeconds(() => {
            encrypt(plainText, 13)
        }, 1000)
        console.log({result12})

        const result22 = measureSeconds(() => {
            encrypt2(plainText, 13)
        }, 1000)
        console.log({result22})
    },
    ignore: true,
})
