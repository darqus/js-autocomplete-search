// Static templates
const htmlContainer = () => /*html*/ `\
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

// const htmlSpinner = () => /*html*/ `\
// <div class="d-flex">
//   <div class="lds-css mt-5">
//     <div class="lds-double-ring">
//       <div></div>
//       <div></div>
//     </div>
//   </div>
// </div>`

const htmlSpinner = () => /*html*/ `\
<div class="d-flex justify-content-center py-4">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`

// Dynamic templates
const renderText = (text) => /*html*/ `\
<p>${text}</p>`

const renderHTML = (html) => html

const htmlAlert = (
  type = 'success',
  header = '',
  text = '',
  html = ''
) => /*html*/ `\
<div class="alert alert-${type} my-3">
  <h5>${header}</h5>
  <hr/>
  ${renderText(text)}
  ${renderHTML(html)}
</div>`

const htmlCard = (name, email, website, companyName, bs) => /*html*/ `\
<div class="card card-body my-3">
  <h5 class="card-subtitle my-2 text-warning">${name}</h5>
  <hr/>
  <div>Company: ${companyName}</div>
  <div>BS: ${bs}</div>
  <hr/>
  <a href="mailto:${email}" target="_blank">${email}</a>
  <a href="//${website}" target="_blank">${website}</a>
</div>`

export default class Template {
  htmlContainer() {
    return htmlContainer()
  }

  htmlSpinner() {
    return htmlSpinner()
  }

  /** @typedef { import('../ts/types').Alert } Alert */
  /**
   * @param {Alert} type - ['success', 'warning', 'danger', ...]
   * @param {Alert} header - header of alert
   * @param {Alert} text - content alert message in p
   * @param {Alert} html - content alert message in raw html
   */
  htmlAlert(type, header, text, html) {
    return htmlAlert(type, header, text, html)
  }

  /** @typedef { import('../ts/types').User } User */
  /**
   * @param {User} name - name of user
   * @param {User} email - email of user
   * @param {User} website - website of user
   * @param {User} companyName - companyName of user
   * @param {User} bs - bs of user
   */
  htmlCard(name, email, website, companyName, bs) {
    return htmlCard(name, email, website, companyName, bs)
  }
}
