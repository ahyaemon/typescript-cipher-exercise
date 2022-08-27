export function measureSeconds(f: () => void, times: number): number {
    const t0 = performance.now()
    for(let i = 0; i < times; i++) {
        f()
    }
    const t1 = performance.now()
    return t1 - t0
}
