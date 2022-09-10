import config from './config.js';
import template from './template.js';
import {
  getElById,
  withStarts,
} from './util.js';

const { url, searchId, resultId } = config
const {
  initial,
  spinner,
  doneMsg,
  warningMsg,
  noDataMsg,
  errorMsg,
  renderMain,
} = template

const initialState = () => ({
  timeout: null,
  data: [],
})

const STATE = initialState()

const listenInput = () => {
  getElById(searchId).addEventListener('input', (e) => {
    clearTimeout(STATE.timeout)
    STATE.timeout = setTimeout(() => {
      onFilterData(e.target.value)
    }, 500)
  })
}

// On response
const onResponse = (response) => {
  if (response.ok) {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      getElById(resultId).innerHTML = doneMsg
      return response.json()
    }
  }
  renderErrorMsg()
}

// On fetch data
const onFetchData = (json) => {
  STATE.data = json
  if (STATE.data.length) {
    // Add event on input
    return
  }
  getElById(resultId).innerHTML = noDataMsg
}

// On error
const onError = (error) => {
  console.error(error)
  renderErrorMsg()
}

class ApiService {
  /* getResource() {
    fetch(url)
      .then((response) => onResponse(response))
      .then((json) => onFetchData(json))
      .catch((error) => onError(error))
    // .finally(() => STATE.isLoading = false)
  } */
  async getResource() {
    try {
      const response = await fetch(url)
      const data = await onResponse(response)
      const json = onFetchData(data)
      return json
    } catch (err) {
      console.error(err)
      onError(err)
    } finally {
      // STATE.isLoading = false
    }
  }
}

const setInitialState = async () => {
  getElById(config.rootId).innerHTML = initial
  document.title = getElById(config.headerId).innerText = config.pageTitle
  getElById(config.searchId).setAttribute('placeholder', config.textPlaceholder)
  getElById(config.resultId).innerHTML = spinner

  // set pseudo timeout for set pseudo delay on loading data from API
  /* setTimeout(async () => {
    await new ApiService().getResource()
    getElById(config.searchId).removeAttribute('disabled')
    listenInput()
  }, 1000) */

  await new ApiService().getResource()
  getElById(config.searchId).removeAttribute('disabled')
  listenInput()
}

const renderErrorMsg = () => {
  getElById(resultId).innerHTML = errorMsg(url)
}

// On fIlter data
const onFilterData = (startStr) => {
  const matches = startStr !== ``
    ? STATE.data.filter(
      ({ name, company: { name: companyName } }) =>
        withStarts(name, startStr) || withStarts(companyName, startStr)
    )
    : []

  renderHtml(matches)
}

// Render HTML
const renderHtml = (matches) => {
  getElById(resultId).innerHTML =
    matches.length === 0
      ? warningMsg
      : matches
        .map(
          ({
            name,
            email,
            website,
            company: { name: companyName },
            company: { bs },
          }) => renderMain(name, email, website, companyName, bs)
        )
        .join(``)
}

export { setInitialState };
