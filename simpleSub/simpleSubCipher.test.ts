import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {decrypt, encrypt} from "./simpleSubCipher.ts";

const plainText     = 'If a man is offered a fact which goes against his instincts, he will scrutinize it closely, and unless the evidence is overwhelming, he will refuse to believe it. If, on the other hand, he is offered something which affords a reason for acting in accordance to his instincts, he will accept it even on the slightest evidence. The origin of myths is explained in this way. -Bertrand Russell'
const encryptedText = 'Sy l nlx sr pyyacao l ylwj eiswi upar lulsxrj isr sxrjsxwjr, ia esmm rwctjsxsza sj wmpramh, lxo txmarr jia aqsoaxwa sr pqaceiamnsxu, ia esmm caytra jp famsaqa sj. Sy, px jia pjiac ilxo, ia sr pyyacao rpnajisxu eiswi lyypcor l calrpx ypc lwjsxu sx lwwpcolxwa jp isr sxrjsxwjr, ia esmm lwwabj sj aqax px jia rmsuijarj aqsoaxwa. Jia pcsusx py nhjir sr agbmlsxao sx jisr elh. -Facjclxo Ctrramm'

const key = 'LFWOAYUISVKMNXPBDCRJTQEGHZ'

Deno.test('encrypt', () => {
    assertEquals(encrypt(plainText, key), encryptedText)
})

Deno.test('decrypt', () => {
    assertEquals(decrypt(encryptedText, key), plainText)
})
