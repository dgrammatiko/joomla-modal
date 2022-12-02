const templateHeader = `<header>
  <h3></h3>
  <button></button>
</header>`;
const templateArticleIframe = `<article><iframe /></article>`;
const templateArticle = `<article></article>`;
const templateFooter = `<footer></footer>`;

export class JoomlaModal extends HTMLElement {
  constructor() {
    super();

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onObserverChange = this.onObserverChange.bind(this);
    this.clickOutsideFn = this.clickOutsideFn.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);

    this.observerConfig = { attributes: true, childList: true, subtree: true };
    this.observer = new MutationObserver(this.onObserverChange)
  }

  observedAttributes = [
    'type',
    'id',
    'title',
    'url',
    'close-text'
  ];

  get type() { return this.getAttribute('type') || 'dialog' };
  set type(value) { this.setAttribute('type', value); }

  get id() { return this.getAttribute('id') || 'random_id' };
  set id(value) { this.setAttribute('id', value); }

  get title() { return this.getAttribute('title'); };
  set title(value) { this.setAttribute('title', value); }

  get url() { return this.getAttribute('url'); };
  set url(value) { this.setAttribute('url', value); }

  get closeText() { return this.getAttribute('close-text') || 'Close'; };
  set closeText(value) { this.setAttribute('close-text', value); }

  get clickOutside() { return this.getAttribute('click-outside'); };
  set clickOutside(value) { this.setAttribute('click-outside', value); }

  connectedCallback() {
    this.dialog = this.querySelector('dialog');
    // if (this.firstElementChild && ['A', 'BUTTON'].includes(this.firstElementChild.nodeName)) {
    //   this.opener = this.firstElementChild;
    //   this.opener.addEventListener('click', this.open)
    // }

  }

  disconnectedCallback() {

  }

  attributeChangeCallback() {

  }

  open() {
    if (this.firstElementChild && this.firstElementChild.nodeName === 'DIALOG') {
      this.dialog.showModal();
      this.dialog.addEventListener('close', this.onDialogClose);

      if (this.clickOutside) {
        this.dialog.addEventListener('click', this.clickOutsideFn);
      }
    } else {
      this.createIframeDialog();
      this.dialog.showModal();
      this.dialog.addEventListener('close', this.onDialogClose);

      if (this.clickOutside) {
        this.dialog.addEventListener('click', this.clickOutsideFn);
      }
    }
  }

  close() {
    if (this.dialog) {
      this.dialog.close();
    }
  }

  onDialogClose() {
    this.parentNode.removeChild(this);
  }

  clickOutsideFn(event) {
    if (event.target === this.dialog) {
      this.dialog.removeEventListener('click', this.clickOutsideFn);
      this.dialog.close();
    }
  }

  createIframeDialog() {
    const doc = new DOMParser().parseFromString(`${templateHeader}${this.url ? templateArticleIframe : templateArticle}${templateFooter}`, 'text/html');
    console.log(doc.documentElement.children[1].children)
    this.dialog = document.createElement('dialog');
    this.headerTitleElement = doc.documentElement.querySelector('header > h3');
    this.closeButton = doc.documentElement.querySelector('header > button');
    this.closeButton.setAttribute('aria-label', this.closeText);
    this.closeButton.setAttribute('type', 'button');
    this.closeButton.addEventListener('click', this.close)
    this.headerTitleElement.textContent = this.title;
    this.iframe = doc.documentElement.querySelector('article > iframe');
    this.iframe.src = this.url;

    [...doc.documentElement.children[1].children].forEach(eee => this.dialog.append(eee))


    this.append(this.dialog)
  }

  onObserverChange(mutationList, observer) {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        console.log('A child node has been added or removed.');
      } else if (mutation.type === 'attributes') {
        console.log(`The ${mutation.attributeName} attribute was modified.`);
      }
    }
  }
}
