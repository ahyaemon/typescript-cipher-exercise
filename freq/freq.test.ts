import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {englishFreqMatchScore} from "./freq.ts";

const simpleSub = `
Sy l nlx sr pyyacao l ylwj eiswi upar lulsxrj isr sxrjsxwjr, ia esmm
rwctjsxsza sj wmpramh, lxo txmarr jia aqsoaxwa sr pqaceiamnsxu, ia esmm caytra
jp famsaqa sj. Sy, px jia pjiac ilxo, ia sr pyyacao rpnajisxu eiswi lyypcor l
calrpx ypc lwjsxu sx lwwpcolxwa jp isr sxrjsxwjr, ia esmm lwwabj sj aqax px jia
rmsuijarj aqsoaxwa. Jia pcsusx py nhjir sr agbmlsxao sx jisr elh. -Facjclxo
Ctrramm
`

const transpotision = `
I rc ascwuiluhnviwuetnh,osgaa ice tipeeeee slnatsfietgi tittynecenisl. e fo f
fnc isltn sn o a yrs sd onisli ,l erglei trhfmwfrogotn,l stcofiit.aea
wesn,lnc ee w,l eIh eeehoer ros iol er snh nl oahsts ilasvih tvfeh rtira id
thatnie.im ei-dlmf i thszonsisehroe, aiehcdsanahiec gv gyedsB affcahiecesd d
lee onsdihsoc nin cethiTitx eRneahgin r e teom fbiotd n
ntacscwevhtdhnhpiwru
`

Deno.test('simpleSub', () => {
    assertEquals(englishFreqMatchScore(simpleSub), 5)
})

Deno.test('transposition', () => {
    assertEquals(englishFreqMatchScore(transpotision), 9)
})
