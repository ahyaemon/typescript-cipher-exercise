import { assertEquals, assertNotEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {hack} from "./caeserHacker.ts";

const plainText = 'This is my secret message.'

const encryptedByKey13 = 'guv6Jv6Jz!J6rp5r7Jzr66ntrM'

Deno.test('hack', () => {
    const results = hack(encryptedByKey13)
    const hit = results.some(result => {
        return (result.key === 13) && (result.text === plainText)
    })
    assertEquals(hit, true)
})