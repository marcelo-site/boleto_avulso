const mascaraMoeda = (value: string) => {
  const onlyDigits = value
    .split("")
    .filter((s: string) => /\d/.test(s))
    .join("")
    .padStart(3, "0")
  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
  return maskCurrency(+digitsFloat)
}

const maskCurrency = (valor: number, locale = 'pt-BR', currency = 'BRL') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(valor)
}

export { mascaraMoeda }