export function getNumbersOnly(str) {
    if (!str) return str

    let result = str.match(/\d+/g)
    return result ? result.join('') : ''
}