import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {decrypt, encrypt} from "./vigenereCipher.ts";

const plainText = 'Common sense is not so common.'
const encryptedText = 'Rwlloc admst qr moi an bobunm.'
const key = 'PIZZA'

Deno.test('encrypt', () => {
    assertEquals(encrypt(plainText, key), encryptedText)
})

Deno.test('decrypt', () => {
    assertEquals(decrypt(encryptedText, key), plainText)
})