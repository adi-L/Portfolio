import classes from "./style.module.css";

class Resizable {
    constructor(querySelector, options) {
        const { container = document.body, onResize, minWidth } = options;
        this.querySelector = querySelector;
        this.container = container;
        this.isImage = false;
        this.onResize = onResize;
        this.minimum_size = minWidth;
        this.resizers = [];
        this.clickedResizer = null;
        this.element;
        this.isMouseDown = false;
        this.original_width = 0;
        this.original_height = 0;
        this.original_x = 0;
        this.original_y = 0;
        this.original_mouse_x = 0;
        this.original_mouse_y = 0;
        this.resize = this.resize.bind(this);
        this.stopResize = this.stopResize.bind(this);
        this.onClickedTarget = this.onClickedTarget.bind(this);
        this.rePosition = this.rePosition.bind(this);
        this.init = this.init.bind(this);
        this.onClickResizer = this.onClickResizer.bind(this);
        this.init();
    }
    onClickResizer(e) {
        this.clickedResizer = e.target;
        e.preventDefault()
        this.isMouseDown = true;
        this.original_width = parseFloat(getComputedStyle(this.element, null).getPropertyValue('width').replace('px', ''));
        this.original_height = parseFloat(getComputedStyle(this.element, null).getPropertyValue('height').replace('px', ''));
        this.original_x = this.element.getBoundingClientRect().left;
        this.original_y = this.element.getBoundingClientRect().top;
        this.original_mouse_x = e.pageX;
        this.original_mouse_y = e.pageY;
        window.addEventListener('mousemove', this.resize)
        window.addEventListener('mouseup', this.stopResize)
    }
    createSizePreview() {
        const sizePreview = document.createElement('div');
        sizePreview.classList.add(classes.sizePreview);
        return sizePreview;
    }

    createBorder(className) {
        const border = document.createElement('div');
        border.classList.add(classes.resizableBorder);
        border.classList.add(className);
        return border;
    }
    init() {
        this.sizePreview = this.createSizePreview();
        this.borders = [this.createBorder('left'), this.createBorder('right'), this.createBorder('bottom'), this.createBorder('top')];
        const resizers = this.resizers = [this.createResizer('bottom-center'), this.createResizer('left-center'), this.createResizer('right-center'), this.createResizer('bottom-left'), this.createResizer('bottom-right'), this.createResizer('top-right'), this.createResizer('top-left')];
        for (let i = 0; i < resizers.length; i++) {
            resizers[i].addEventListener('mousedown', this.onClickResizer);
        }
        window.addEventListener("mousedown", this.onClickedTarget)
    }
    onClickedTarget(event) {
        if (this.isMouseDown) return;
        const clickOn = event.path[0];
        const target = clickOn.closest(this.querySelector);
        if (target) {
            this.resizers.forEach(resizer => document.body.appendChild(resizer));
            this.borders.forEach(border => document.body.appendChild(border));
            this.element = target;
            this.rePosition();
            this.container.addEventListener("scroll", this.rePosition);
            window.addEventListener("scroll", this.rePosition);
            window.addEventListener("resize", this.rePosition);
            this.element.addEventListener("drag", this.rePosition);
        } else {
            this.resizers.forEach(resizer => resizer.remove());
            this.borders.forEach(border => border.remove());
            this.container.removeEventListener("scroll", this.rePosition);
            window.removeEventListener("scroll", this.rePosition);
            window.removeEventListener("resize", this.rePosition);
            this.element.removeEventListener("drag", this.rePosition);
        }
    }
    stopResize() {
        this.isMouseDown = false;
        this.sizePreview.remove();
        window.removeEventListener('mouseup', this.stopResize)
        window.removeEventListener('mousemove', this.resize);

    }
    resize(e) {
        document.body.appendChild(this.sizePreview);
        this.sizePreview.style.left = e.clientX + 50 + "px";
        this.sizePreview.style.top = e.clientY + "px";
        if (this.clickedResizer.classList.contains('left-center')) {
            let height = this.original_height + (e.pageY - this.original_mouse_y)
            let width = this.original_width - (e.pageX - this.original_mouse_x)
            let left = 0;
            height = height + 'px';
            this.onResize(this.element, { height })
            if (width > this.minimum_size) {
                width = width + 'px'
                this.sizePreview.innerHTML = `w:${parseInt(width)}`;;
                left = this.original_x + (e.pageX - this.original_mouse_x) + 'px';
                this.onResize(this.element, { width, left })
            }
        }
        else if (this.clickedResizer.classList.contains('right-center')) {
            let width = this.original_width + (e.pageX - this.original_mouse_x);
            if (width > this.minimum_size) {
                width = width + 'px'
                this.sizePreview.innerHTML = `w:${parseInt(width)}`;
                this.onResize(this.element, { width })
            }
        }
        else if (this.clickedResizer.classList.contains('bottom-center')) {
            let height = this.original_height + (e.pageY - this.original_mouse_y)
            height = height + 'px';
            this.sizePreview.innerHTML = `h:${parseInt(height)}`;
            this.onResize(this.element, { height })
        }
        else if (this.clickedResizer.classList.contains('bottom-right')) {
            let width = this.original_width + (e.pageX - this.original_mouse_x);
            let height = this.original_height + (e.pageY - this.original_mouse_y)
            if (width > this.minimum_size) {
                width = width + 'px';
                this.sizePreview.innerHTML = `w:${parseInt(width)}`;;
                this.onResize(this.element, { width })

            }
            height = height + 'px';
            this.onResize(this.element, { height })
        } else if (this.clickedResizer.classList.contains('bottom-left')) {
            let height = this.original_height + (e.pageY - this.original_mouse_y)
            let width = this.original_width - (e.pageX - this.original_mouse_x)
            let left = 0;
            height = height + 'px';
            this.onResize(this.element, { height })
            if (width > this.minimum_size) {
                width = width + 'px'
                this.sizePreview.innerHTML = `w:${parseInt(width)}`;;
                left = this.original_x + (e.pageX - this.original_mouse_x) + 'px';
                this.onResize(this.element, { width, left })
            }
        } else if (this.clickedResizer.classList.contains('top-right')) {
            let width = this.original_width + (e.pageX - this.original_mouse_x);
            if (width > this.minimum_size) {
                width = width + 'px'
                this.sizePreview.innerHTML = `w:${parseInt(width)}`;;
                this.onResize(this.element, { width })

            }

        }
        else if (this.clickedResizer.classList.contains('top-left')) {
            let height = this.original_height + (e.pageY - this.original_mouse_y)
            let width = this.original_width - (e.pageX - this.original_mouse_x)
            let left = 0;
            height = height + 'px';
            this.onResize(this.element, { height })
            if (width > this.minimum_size) {
                width = width + 'px'
                this.sizePreview.innerHTML = `w:${parseInt(width)}`;;
                left = this.original_x + (e.pageX - this.original_mouse_x) + 'px';
                this.onResize(this.element, { width, left })
            }
        }
        this.rePosition();
    }
    rePosition() {
        window.requestAnimationFrame(() => {
            const rect = this.element.getBoundingClientRect();
            this.borders.forEach(border => {
                if (border.classList.contains('left')) {
                    border.style.width = "1px";
                    border.style.left = rect.left + 'px';
                    border.style.top = rect.top + 'px';
                    border.style.height = rect.height + 'px';
                } else if (border.classList.contains('right')) {
                    border.style.width = "1px";
                    border.style.left = rect.right + 'px';
                    border.style.top = rect.top + 'px';
                    border.style.height = rect.height + 'px';
                } else if (border.classList.contains('top')) {
                    border.style.left = rect.left + 'px';
                    border.style.top = rect.top + 'px';
                    border.style.width = rect.width + 'px';
                    border.style.height = "1px";
                } else if (border.classList.contains('bottom')) {
                    border.style.height = "1px";
                    border.style.left = rect.left + 'px';
                    border.style.top = rect.bottom + 'px';
                    border.style.width = rect.width + 'px';
                }
            });
            for (let i = 0; i < this.resizers.length; i++) {
                const resizer = this.resizers[i];
                if (resizer.classList.contains('bottom-left')) {
                    resizer.style.left = rect.left + 'px';
                    resizer.style.top = rect.bottom + 'px';
                } else if (resizer.classList.contains('bottom-right')) {
                    resizer.style.left = rect.right + 'px';
                    resizer.style.top = rect.bottom + 'px';
                } else if (resizer.classList.contains('top-right')) {
                    resizer.style.left = rect.right + 'px';
                    resizer.style.top = rect.top + 'px';
                } else if (resizer.classList.contains('top-left')) {
                    resizer.style.left = rect.left + 'px';
                    resizer.style.top = rect.top + 'px';
                } else if (resizer.classList.contains('left-center')) {
                    resizer.style.left = rect.left + 'px';
                    resizer.style.top = (rect.top + rect.bottom) / 2 + 'px';
                } else if (resizer.classList.contains('right-center')) {
                    resizer.style.left = rect.right + 'px';
                    resizer.style.top = (rect.top + rect.bottom) / 2 + 'px';
                } else if (resizer.classList.contains('bottom-center')) {
                    resizer.style.left = (rect.left + rect.right) / 2 + 'px';
                    resizer.style.top = rect.bottom + 'px';
                }
            }


        })
    }
    createResizer = (className) => {
        const resizer = document.createElement('div');
        resizer.className = className;
        resizer.classList.add(classes.resizer);
        return resizer;
    }
}

export default Resizable