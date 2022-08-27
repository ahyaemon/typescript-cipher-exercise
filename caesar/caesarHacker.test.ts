import { assertEquals, assertNotEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import {hack} from "./caesarHacker.ts";
import {decrypt} from "./caesarCipher.ts";

const plainText = 'This is my secret message.'

const encryptedByKey13 = 'guv6Jv6Jz!J6rp5r7Jzr66ntrM'

Deno.test('hack', () => {
    const results = hack(encryptedByKey13)
    const hit = results.some(result => {
        return (result.key === 13) && (result.text === plainText)
    })
    assertEquals(hit, true)
})

Deno.test({
    name: 'practice',
    fn() {
        const encryptedTexts = [
            'qeFIP?eGSeECNNS',
            '5coOMXXcoPSZIWoQI',
            "avnl1olyD4l'ylDohww6DhzDjhuDil",
            'z.GM?.cEQc. 70c.7KcKMKHA9AGFK',
            '?MFYp2pPJJUpZSIJWpRdpMFY',
            'ZqH8sl5HtqHTH4s3lyvH5zH5spH4t pHzqHlH3l5K',
            'Zfbi,!tif!xpvme!qspcbcmz!fbu!nfA`',
        ]
        const results = hack(encryptedTexts[0])
        const key = results.find(result => result.text.includes('love'))!!.key
        // Each line have different key...
        encryptedTexts
            .map(encryptedText => decrypt(encryptedText, key))
            .forEach(decryptedText => console.log(decryptedText))
    },
    ignore: true,
})
