import { JoomlaModal  } from "./joomla-modal";
import { JoomlaModalButton } from "./joomla-modal-button";

function registerElements() {
  customElements.define('joomla-modal-button', JoomlaModalButton);
  customElements.define('joomla-modal', JoomlaModal);
}

if (window.HTMLDialogElement !== undefined) {
  // polyfill required
  let scriptOriginalSrc;
  try {
    scriptOriginalSrc = document.currentScript.src;
  } catch (err) {
    scriptOriginalSrc = import.meta.url;
  }

  if (scriptOriginalSrc) {
    const script = document.createElement('script');
    script.src = scriptOriginalSrc.replace('/index.js', '/polyfill.js');
    script.addEventListener('load', registerElements);
    document.head.appendChild(script);
  }
} else {
  registerElements();
}

