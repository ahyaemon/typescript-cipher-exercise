import {hack} from "./vigenereDictionaryHacker.ts";

const encryptedText = 'Tzx isnz eccjxkg nfq lol mys bbqq I lxcz.'

Deno.test('hack', () => {
    try {
        const result = hack(encryptedText)
        console.log(result)
    } catch (e) {
        console.error(e)
        throw Error()
    }
})
