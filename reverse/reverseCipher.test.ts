import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {reverse, reverse2, reverse3, reverse4} from "./reverseCipher.ts";
import {measureSeconds} from "../measure.ts";

const plainText = 'Three can keep a secret, if two of them are dead.'
const expected = '.daed era meht fo owt fi ,terces a peek nac eerhT'

Deno.test("reverse", () => {
    assertEquals(reverse(plainText), expected)
    // measureSeconds(() => { reverse(plainText) }, 1000)
})

Deno.test("reverse2", () => {
    assertEquals(reverse2(plainText), expected)
    // measureSeconds(() => { reverse2(plainText) }, 1000)
})

Deno.test("reverse3", () => {
    assertEquals(reverse3(plainText), expected)
    // measureSeconds(() => { reverse3(plainText) }, 1000)
})

Deno.test("reverse4", () => {
    assertEquals(reverse4(plainText), expected)
    // measureSeconds(() => { reverse4(plainText) }, 1000)
})

Deno.test({
    name: 'measure',
    fn: () => {
        const result1 = measureSeconds(() => { reverse(plainText) }, 1000)
        console.log({result1})
        const result2 = measureSeconds(() => { reverse2(plainText) }, 1000)
        console.log({result2})
        const result3 = measureSeconds(() => { reverse3(plainText) }, 1000)
        console.log({result3})
        const result4 = measureSeconds(() => { reverse4(plainText) }, 1000)
        console.log({result4})
    },
    ignore: false,
})
