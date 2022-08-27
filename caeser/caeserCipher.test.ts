import { assertEquals, assertNotEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {decrypt, encrypt} from "./caeserCipher.ts";

const plainText = 'This is my secret message.'

const encryptedByKey13 = 'guv6Jv6Jz!J6rp5r7Jzr66ntrM'

Deno.test('encrypt', () => {
    assertEquals(encrypt(plainText, 13), encryptedByKey13)
})

// Deno.test('decrypt', () => {
//     assertEquals(decrypt(encryptedByKey13, 13), plainText)
// })
//
// Deno.test('key 12', () => {
//     const encryptedByKey12 = encrypt(plainText, 12)
//     assertNotEquals(encryptedByKey12, encryptedByKey13)
// })
