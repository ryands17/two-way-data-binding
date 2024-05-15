// import './style.css';
// import typescriptLogo from './typescript.svg';
// import viteLogo from '/vite.svg';

declare global {
  interface Window {
    state: TState;
  }
}
type ObjKey = string | symbol;
type TState = Record<ObjKey, any>;

function initialise(stage: TState) {
  return new Proxy(stage, {
    set(target: Record<ObjKey, any>, key, value) {
      target[key] = value;
      render(key);

      return true;
    },
  });
}

export const state = initialise({ firstname: '', lastname: '' });
addListeners();

// access state globally to debug
window.state = state;

function addListeners() {
  document.addEventListener('input', (e: Event) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      const key = e.target.dataset.model;
      if (key) {
        state[key] = e.target.value;
      }
    }
  });
}

function render(key: ObjKey) {
  const bindings = document.querySelectorAll(`[data-bind=${String(key)}]`);

  for (let binding of bindings) {
    if (
      binding instanceof HTMLInputElement ||
      binding instanceof HTMLTextAreaElement
    ) {
      binding.value = String(state[key]);
    } else {
      binding.textContent = String(state[key]);
    }
  }
}
