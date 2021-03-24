import Classes from './style.module.css';

export function createRipple(event,options = {}) {
    const {color = "rgba(226, 221, 221, 0.281)"} = options;
    const button = event.currentTarget;;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.backgroundColor = color;
    const bound = button.getBoundingClientRect();
    circle.style.left = `${event.clientX - bound.x - radius}px`;
    circle.style.top = `${event.clientY - bound.top - radius}px`;
    circle.classList.add(Classes.ripple);



    button.appendChild(circle);
    setTimeout(() => {
        circle.remove();
    }, 500);
}
