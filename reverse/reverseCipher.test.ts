import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {reverse} from "./reverseCipher.ts";


Deno.test("test", () => {
    assertEquals(reverse('hello'), 'olleh')
})
