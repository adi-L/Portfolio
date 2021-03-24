
import classes from '../style.module.css';
import { createRipple } from '../createRipple';
import { getColor } from '../getColor';

export const Button = (props = {}) => {
    function dispatch(e) {
        const rippleConfig = typeof props.ripple === "object" ? props.ripple : {};
        createRipple(e,rippleConfig);
    }
    // props.onClick = dispatch

    const selectedColor = getColor(props.color);
    const __ClassList = [classes.btn, classes[selectedColor], "adi-plugin",props.className || ""].join(" ");

    const tempalte = <button {...props} className={__ClassList}>
        {props.children}
    </button>;
    tempalte.addEventListener("mousedown",dispatch);
    // tempalte.onclick = (e) => dispatch(e);
    return tempalte;
}