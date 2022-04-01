
export default class Draggable {
  constructor(querySelector, options) {
    if (!options) options = {};
    this.container = options.container || document.body;
    this.onDrag = options.onDrag || function () {};
    this.onEnd = options.onEnd || function () {};
    this.querySelector = querySelector;
    this.pose = {
      initX: 0,
      initY: 0,
      firstX: 0,
      firstY: 0,
    };
    this.onMouseMove = (e) => {
      if (this.target) {
        this.target.dispatchEvent(new CustomEvent('drag'))

        const rect = this.target.getBoundingClientRect();
        let top = this.pose.initY + e.pageY - this.pose.firstY;
        let left = this.pose.initX + e.pageX - this.pose.firstX;
        if (options.maxTop && options.maxTop > top) {
          top = options.maxTop;
        }
        if (top < 0) {
          top = 0;
        }
        if (top > this.container.offsetHeight - rect.height) {
          top = this.container.offsetHeight - rect.height;
        }
        if (left < 0) {
          left = 0;
        }
        if (left + rect.width >= window.innerWidth) {
          left = window.innerWidth - rect.width;
        }
        this.left = left;
        this.top = top;
        this.onDrag({target:this.target,container:this.container, left:left, top:top});
      } else {
        window.removeEventListener("mousemove", this.onMouseMove, false);
      }
    };
    this.onMouseDown = (e) => {
      if (e.which !== 1) {
        return;
      }
      const target = e.target;
      const reqTarget = target.closest(this.querySelector);
      if (!reqTarget) return null;
      const handleQuerySelector = reqTarget.getAttribute("handle");
      if (handleQuerySelector) {
        const handle = target.closest(handleQuerySelector);
        if (!handle) {
          return null;
        }
      }

      this.target = reqTarget;
      this.originalTarget = reqTarget;
      const computed = reqTarget.getBoundingClientRect();
     
      this.pose.initX = reqTarget.offsetLeft || computed.left;
      this.pose.initY = reqTarget.offsetTop || computed.top;
      this.pose.firstX = e.pageX;
      this.pose.firstY = e.pageY;

      window.addEventListener("mousemove", this.onMouseMove, false);

      window.addEventListener(
        "mouseup",
        (e) => {

          window.removeEventListener("mousemove", this.onMouseMove, false);
          this.onEnd({target:this.target,container:this.container, left:this.left, top:this.top});

          this.target = null;
        },
        { once: true }
      );
    };
    this.start();
  }

  start() {
    document.body.addEventListener("mousedown", this.onMouseDown);
  }
  destroy() {
    document.body.removeEventListener("mousedown", this.onMouseDown);
  }
}