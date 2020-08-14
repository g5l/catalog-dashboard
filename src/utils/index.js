export function dateFormated (date) {
  const d = new Date(date)
  const da = new Intl.DateTimeFormat('pt-br', { day: '2-digit' }).format(d)
  const mo = new Intl.DateTimeFormat('pt-br', { month: '2-digit' }).format(d)
  const ye = new Intl.DateTimeFormat('pt-br', { year: 'numeric' }).format(d)
  return `${da}-${mo}-${ye}`
}

export function cloneAndCleanObj (obj) {
  let clone = {}
  for (const o in obj) {
    if (obj[o] == null) {
      clone[o] = null
    } else if (Array.isArray(obj)) {
      clone = obj.map(this.cloneArrayCallback)
    } else if (typeof obj[o] === 'object') {
      clone[o] = this.cloneAndCleanObj(obj[o])
    } else if (o !== '__typename' && o !== 'validationId') {
      if (typeof obj[o] === 'string') {
        const conversor = new CharConverter(obj[o])
        clone[o] = conversor.utf8ToAscii()
      } else {
        clone[o] = obj[o]
      }
    }
  }
  return clone
}

export function cloneArrayCallback (currentValue) {
  return this.cloneAndCleanObj(currentValue)
}