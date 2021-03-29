export class Hooks extends HTMLElement {
    constructor(props = {}) {
      // Always call super first in constructor
      super();
      this.props = props;
      this.style.width = "100%";
      if (props.id) {
        this.id = props.id;
      }
      if (typeof props.onDestroy === "function") {
        this.onDestroy = props.onDestroy;
      }
    }
    connectedCallback() {
      const { props } = this;
  
      if (props.children instanceof HTMLElement) {
        this.appendChild(props.children)
      }
      if (typeof props.children ==="string") {
        this.innerHTML = props.children;
      }
      if (typeof props.children ==="function") {
        this.appendChild(props.children())
      }
      if (typeof props.onUpdate === "function") {
        props.onUpdate(this);
      }
      if (typeof props.onLoad === "function" &&  !this.isLoaded) {
        this.isLoaded = true;
        props.onLoad(this);
      }
      console.log("component loaded");
    }
    disconnectedCallback(){
      const { props } = this;
      console.log("component unloaded");
      if (typeof props.onUnload === "function") {
        props.onUnload(this);
      }
    }
  }
  customElements.define('hooks-element', Hooks);
  