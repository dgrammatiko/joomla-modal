import { JoomlaModal  } from "./joomla-modal";
import { JoomlaModalButton } from "./joomla-modal-button";

function registerElements() {
  customElements.define('joomla-modal-button', JoomlaModalButton);
  customElements.define('joomla-modal', JoomlaModal);
}

if (window.HTMLDialogElement === undefined) {
  // polyfill required
    import('./polyfill.js').then(registerElements);
} else {
  registerElements();
}

