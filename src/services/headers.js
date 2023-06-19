export let lang = null

export const setLang = (newLang) => {
  lang = newLang
}

export let token = null

export const setToken = (newToken) => {
  token = `bearer ${newToken}`
}