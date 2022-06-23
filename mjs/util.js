const getElById = (el) => document.getElementById(el)

const withStarts = (field, startStr) =>
  field.toLowerCase().startsWith(startStr.toLowerCase())

export { getElById, withStarts }
