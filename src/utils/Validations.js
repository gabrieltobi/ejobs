export function isValidCpf(cpf) {
    let isValid = true

    if (cpf === '00000000000') return false

    for (let i = 0; i < 2; i++) {
        let sum = 0

        for (let j = 1; j <= (9 + i); j++) {
            sum = sum + parseInt(cpf.substring(j - 1, j)) * ((11 + i) - j)
        }

        let rest = (sum * 10) % 11

        if ((rest == 10) || (rest == 11)) {
            rest = 0
        }

        if (rest != parseInt(cpf.substring((9 + i), (10 + i)))) {
            isValid = false
            break
        }
    }

    return isValid
}