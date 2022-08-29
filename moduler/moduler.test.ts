import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {findModInverse, gcd} from "./moduler.ts";

Deno.test('gcd', () => {
    assertEquals(gcd(24, 32), 8)
    assertEquals(gcd(32, 24), 8)
})

Deno.test('findModInverse', () => {
    assertEquals(findModInverse(5, 7), 3)
    assertEquals(findModInverse(53, 66), 5)
})