import { JoomlaModal  } from "./joomla-modal";
import { JoomlaModalButton } from "./joomla-modal-button";

function registerElements() {
  customElements.define('joomla-modal-button', JoomlaModalButton);
  customElements.define('joomla-modal', JoomlaModal);
}

if (window.HTMLDialogElement === undefined) {
  // polyfill required
  let scriptOriginalSrc;
  try {
    scriptOriginalSrc = import.meta.url;
  } catch (err) {
    scriptOriginalSrc = document.currentScript.src;
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

