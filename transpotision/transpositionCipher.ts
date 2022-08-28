type Cell = string
type Row = Cell[]
type Grid = Row[]

export function encrypt(plainText: string, key: number): string {
    const grid: Grid = []
    const rowCount = plainText.length / key + 1
    for (let i = 0; i < rowCount; i++) {
        grid[i] = Array(key).fill('')
    }

    for (let i = 0; i < plainText.length; i++) {
        const s = plainText[i]
        const row =  Math.floor(i / key)
        const col = i % key
        grid[row][col] = s
    }

    let encryptedText = ''
    for (let i = 0; i < key; i++) {
        for (const row of grid) {
            encryptedText += row[i]
        }
    }

    return encryptedText
}

export function encrypt2(plainText: string, key: number): string {
    const rowCount = plainText.length / key + 1
    let encryptedText = ''
    for (let icol = 0; icol < key; icol++) {
        for (let irow = 0; irow < rowCount; irow++) {
            const i = irow * key + icol
            if (i < plainText.length) {
                encryptedText += plainText[i]
            }
        }
    }
    return encryptedText
}

export function decrypt(encryptedText: string, key: number): string {
    const ncol = Math.floor(encryptedText.length / key) + 1
    const rows: string[] = []
    const indexOfDefectedRow = key - (ncol * key - encryptedText.length)
    let start = 0
    for (let irow = 0; irow < key; irow++) {
        const itemCount = (irow < indexOfDefectedRow) ? ncol : ncol - 1
        const row = encryptedText.slice(start, start + itemCount)
        rows.push(row)
        start += itemCount
    }

    let decryptedText = ''
    for (let icol = 0; icol < ncol; icol++) {
        decryptedText += rows.map(row => row[icol]).filter(row => row !== undefined).join('')
    }
    return decryptedText
}