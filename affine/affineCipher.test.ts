import { assertEquals} from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {createKeys, encrypt} from "./affineCipher.ts";
import {symbols} from "../symbols.ts";

const plainText = `A computer would deserve to be called intelligent if it could deceive a human into believing that it was human." -Alan Turing`

const encryptedText = `5QG9ol3La6QI93!xQxaia6faQL9QdaQG1!!axQARLa!!AuaRLQADQALQG93!xQxaGaAfaQ1QX3o1RQARL9Qda!AafARuQLX1LQALQI1iQX3o1RN"Q-5!1RQP36ARu`

const key = 2894

Deno.test('createKeys', () => {
    assertEquals(createKeys(10, 3), [3, 1])
    assertEquals(createKeys(key, symbols.length), [43, 56])
})

Deno.test('encrypt', () => {
    assertEquals(encrypt(plainText, key), encryptedText)
})