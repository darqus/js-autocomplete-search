// Static templates
const initial = /*html*/ `\
<div class="container mt-5">
  <div class="row">
    <div class="col-lg-6 col-md-8 col-sm-10 m-auto">
      <h4 id="headerText" class="text-center my-3"></h4>
      <div class="form-group">
        <input
          type="text"
          id="search"
          class="form-control form-control-lg"
          disabled
        >
      </div>
      <div id="spinner"></div>
      <div id="error"></div>
      <div id="result"></div>
    </div>
  </div>
</div>`

// const spinner = /*html*/ `\
// <div class="d-flex">
//   <div class="lds-css mt-5">
//     <div class="lds-double-ring">
//       <div></div>
//       <div></div>
//     </div>
//   </div>
// </div>`

const spinner = /*html*/ `\
<div class="d-flex justify-content-center py-4">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`

// Dynamic templates
const renderText = (text) => ( /*html*/ `\
<p>${text}</p>`
)

const renderHTML = (html) => html

const alertMsg = (type = 'success', header = '', text = '', html = '') => ( /*html*/ `\
<div class="alert alert-${type} my-3">
  <h5>${header}</h5>
  <hr/>
  ${renderText(text)}
  ${renderHTML(html)}
</div>`
)

const renderMain = (name, email, website, companyName, bs) => ( /*html*/ `\
<div class="card card-body my-3">
  <h5 class="card-subtitle my-2 text-warning">${name}</h5>
  <hr/>
  <div>Company: ${companyName}</div>
  <div>BS: ${bs}</div>
  <hr/>
  <a href="mailto:${email}" target="_blank">${email}</a>
  <a href="//${website}" target="_blank">${website}</a>
</div>`
)

export default {
  initial,
  spinner,
  alertMsg,
  renderMain,
}
