// Static templates
const initial = /*html*/ `\
<div class="container mt-5">
  <div class="row">
    <div class="col-lg-6 col-md-8 col-sm-10 m-auto">
      <h4 id="headerText" class="text-center mb-3"></h4>
      <div class="form-group">
        <input
          type="text"
          id="search"
          class="form-control form-control-lg"
          disabled
        >
      </div>
      <div id="result"></div>
    </div>
  </div>
</div>`

const spinner = /*html*/ `\
<div class="d-flex">
  <div class="lds-css mt-5">
    <div class="lds-double-ring">
      <div></div>
      <div></div>
    </div>
  </div>
</div>`

const doneMsg = /*html*/ `\
<div class="alert alert-success my-3">
  <h5>Done</h5>
  <hr/>
  <p>Data loaded</p>
</div>`

const warningMsg = /*html*/ `\
<div class="alert alert-warning my-3">
  <h5>Sorry</h5>
  <hr/>
  <p>Could not found data</p>
  <p>Try type another query</p>
</div>`

const noDataMsg = /*html*/ `\
<div class="alert alert-danger my-3">
  <h5>Error</h5>
  <hr/>
  <p>Data not loaded</p>
</div>`

// Dinamic templates
const errorMsg = (url) => {
  return /*html*/ `\
<div class="alert alert-danger my-3">
  <h5>Sorry</h5>
  <hr/>
  <p>Could not fetch data from</p>
  <h5>${url}</h5>
</div>`
}

const renderMain = (name, email, website, companyName, bs) => {
  return /*html*/ `\
<div class="card card-body my-3">
  <h5 class="card-subtitle my-2 text-warning">${name}</h5>
  <hr/>
  <div>Company: ${companyName}</div>
  <div>BS: ${bs}</div>
  <hr/>
  <a href="mailto:${email}" target="_blank">${email}</a>
  <a href="//${website}" target="_blank">${website}</a>
</div>`
}

export default {
  initial,
  spinner,
  doneMsg,
  warningMsg,
  noDataMsg,
  errorMsg,
  renderMain,
}
