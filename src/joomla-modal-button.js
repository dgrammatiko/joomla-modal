export class JoomlaModalButton extends HTMLElement {
  constructor() {
    super();

    this.onOpen = this.onOpen.bind(this);
    this.createIframeDialog = this.createIframeDialog.bind(this);
  }

  observedAttributes = [
    'type',
    'id',
    'title',
    'url',
    'close-text',
    'close-outside',
  ];

  get type() { return this.getAttribute('type') || 'dialog' };
  set type(value) { this.setAttribute('type', value); }

  get id() { return this.getAttribute('id') || 'random_id' };
  set id(value) { this.setAttribute('id', value); }

  get title() { return this.getAttribute('title'); };
  set title(value) { this.setAttribute('title', value); }

  get url() { return this.getAttribute('url'); };
  set url(value) { this.setAttribute('url', value); }

  get closeText() { return this.getAttribute('close-text'); };
  set closeText(value) { this.setAttribute('close-text', value); }

  get clickOutside() { return this.getAttribute('click-outside'); };
  set clickOutside(value) { this.setAttribute('click-outside', value); }

  connectedCallback() {
    // Do we have any HTML nodes
    if (this.children.length) {
      // Check if a modal wrapper exists
      if (this.children[1] && this.children[1].nodeName && this.children[1].nodeName === 'JOOMLA-MODAL') {
        console.log(this.children[1].nodeName)

      }
      // Check if the opener button/link exist
      if (this.firstElementChild && this.firstElementChild.nodeName && ['A', 'BUTTON'].includes(this.firstElementChild.nodeName)) {
        this.opener = this.firstElementChild;
        this.opener.addEventListener('click', this.onOpen)
      }
    }

    // Auto create the modal
    if (this.url) {
      // this.createIframeDialog();
    }
  }

  disconnectedCallback() {

  }

  attributeChangeCallback() {

  }

  onOpen() {
    if (this.url) {
      if (this.children[1] && this.children[1].nodeName && this.children[1].nodeName === 'JOOMLA-MODAL') {
        this.modalContainer.open();
        if (Joomla && Joomla.Modal) Joomla.Modal.setCurrent(this.modalContainer);
      } else {
        this.createIframeDialog();
        this.modalContainer.open();
        if (Joomla && Joomla.Modal) Joomla.Modal.setCurrent(this.modalContainer);
      }

    }
  }

  createIframeDialog() {
    this.modalContainer = document.createElement('joomla-modal');
    this.modalContainer.setAttribute('id', `${this.id}-modal`);
    this.modalContainer.setAttribute('title', this.title);
    this.modalContainer.setAttribute('url', this.url);
    this.modalContainer.setAttribute('close-text', this.closeText);
    if (this.clickOutside) this.modalContainer.setAttribute('click-outside', this.clickOutside);

    this.append(this.modalContainer);
  }
}
