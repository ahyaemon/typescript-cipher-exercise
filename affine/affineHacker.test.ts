import {hack} from "./affineHacker.ts";

const encryptedText = `5QG9ol3La6QI93!xQxaia6faQL9QdaQG1!!axQARLa!!AuaRLQADQALQG93!xQxaGaAfaQ1QX3o1RQARL9Qda!AafARuQLX1LQALQI1iQX3o1RN"Q-5!1RQP36ARu`

// This test will fail if encryptedText can't be decrypted. (The method hack throws exception)
Deno.test('hack', () => {
    console.log(hack(encryptedText))
})
