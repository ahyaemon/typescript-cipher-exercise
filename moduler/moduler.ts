export function gcd(a: number, b: number): number {
    let aa = a
    let bb = b
    while(aa != 0) {
        [aa, bb] = [bb % aa, aa]
    }
    return bb
}

export function findModInverse(a: number, m: number): number {
    if (gcd(a, m) != 1) {
        throw Error('mod inverse not exists')
    }
    let [u1, u2, u3] = [1, 0, a]
    let [v1, v2, v3] = [0, 1, m]
    while (v3 !== 0) {
        const q = Math.floor(u3 / v3);
        [v1, v2, v3, u1, u2, u3] = [
            u1 - q * v1,
            u2 - q * v2,
            u3 - q * v3,
            v1,
            v2,
            v3,
        ]
    }

    return u1 % m
}
