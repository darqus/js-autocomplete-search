import config from './config.js';
import Template from './template.js';
import {
  getElById,
  withStarts,
} from './util.js';

const { url, searchId, spinnerId, errorId, headerId, rootId, resultId, pageTitle, textPlaceholder, invisibleClassName } = config

const initialState = () => ({
  timeout: null,
  data: [],
})

const STATE = initialState()

const showSpinner = () => {
  getElById(spinnerId).classList.remove(invisibleClassName)
}

const hideSpinner = () => {
  getElById(spinnerId).classList.add(invisibleClassName)
}

const renderErrorMsg = (error) => {
  getElById(errorId).innerHTML = new Template().htmlAlert('danger', 'Sorry', error, `<p>Could not fetch data from</p><h5>${url}</h5>`)
}

const listenInput = () => {
  getElById(searchId).addEventListener('input', (e) => {
    clearTimeout(STATE.timeout)
    showSpinner()
    STATE.timeout = setTimeout(() => {
      onFilterData(e.target.value)
      hideSpinner()
    }, 500)
  })
}

// On response
const onResponse = (response) => {
  if (response.ok) {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      getElById(resultId).innerHTML = new Template().htmlAlert('success', 'Done', 'Data loaded')
      return response.json()
    }
  }
  renderErrorMsg(response.error)
}

// On fetch data
const onFetchData = (json) => {
  STATE.data = json
  if (STATE.data.length) {
    // Add event on input
    return
  }
  getElById(errorId).innerHTML = new Template().htmlAlert('danger', 'Error', 'Data not loaded')
}

class ApiService {
  /* getResource() {
    fetch(url)
      .then((response) => onResponse(response))
      .then((json) => onFetchData(json))
      .catch((error) => renderErrorMsg(error))
    // .finally(() => STATE.isLoading = false)
  } */
  async getResource() {
    showSpinner()
    try {
      const response = await fetch(url)
      const data = await onResponse(response)
      const json = onFetchData(data)
      getElById(searchId).removeAttribute('disabled')
      listenInput()
      return json
    } catch (error) {
      // getElById(errorId).innerHTML = new Template().htmlAlert('danger', 'Error', error)
      renderErrorMsg(error)
    } finally {
      hideSpinner()
      // STATE.isLoading = false
    }
  }
}

const setInitialState = async () => {
  getElById(rootId).innerHTML = new Template().htmlContainer()
  document.title = getElById(headerId).innerText = pageTitle
  getElById(searchId).setAttribute('placeholder', textPlaceholder)
  getElById(spinnerId).innerHTML = new Template().htmlSpinner()

  // set pseudo timeout for set pseudo delay on loading data from API
  setTimeout(async () => {
    await new ApiService().getResource()
  }, 0)

  // await new ApiService().getResource()
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
      ? new Template().htmlAlert('warning', 'Sorry', '', `<p>Could not found data</p><p>Try type another query</p>`)
      : matches
        .map(
          ({
            name,
            email,
            website,
            company: { name: companyName },
            company: { bs },
          }) => new Template().htmlCard(name, email, website, companyName, bs)
        )
        .join(``)
}

export { setInitialState };
