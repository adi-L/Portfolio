import { Button } from "../../Buttons/ButtonV2/Buttons"
import classes from '../style.module.css';
import Row from "../../../Grid/row/row";
import Col from "../../../Grid/cols/Col";
import { ArrayToString } from "../../../utilis/Array";
import { Hooks } from "../../hooks/hooks";

export function Dropdown(props) {
    let _content;
    let isOpen = false;
    const { pose = "bottom", className = "", trigger, offset, context = { className: "" }, closeOnClick = false } = props;
    const onToggle = (e) => {
        const icon = component.querySelector(`.${classes.icon}`);
        if (icon) {
            //if not defined.. is custom dropdown
            icon.classList.add(classes.open);
        }
        if (!isOpen) {
            const rect = component.getBoundingClientRect();
            const x = rect.left + "px";
            let y;
            if (pose === "bottom") {
                y = rect.top + rect.height + 1 + "px";
            }

            const minWidth = rect.width + "px";
            _content = <div  className={ArrayToString(classes.backdrop, "part-of-block", "ignore-events", "no-select")}>
                <div className={["adi-plugin", "part-of-block", context.className, classes.content].join(" ")} style={{ left: x, top: y, "min-width": minWidth }}>
                    {props.children}
                </div>
            </div>
            //append the dropdown content into the docoment
            document.body.appendChild(_content);

            const dd = _content.firstElementChild;
            const contentRect = dd.getBoundingClientRect();
            dd.style.left = (parseInt(dd.style.left) + rect.width / 2) + "px"
            if (typeof offset === "number") {
                dd.style.left = (contentRect.left - offset) + "px"
            }
            if (pose === "top") {
                dd.style.top = (rect.top - contentRect.height - 2) + "px";
            } else if (pose === "mouse") {
                dd.style.top = (e.pageY - pageYOffset - contentRect.height / 2) + "px";
                dd.style.left = (e.pageX) + "px"
            }
            if (contentRect.left < 1) {
                dd.style.left = 10 + contentRect.width / 2 + "px"
            }
            _content.onclick = (e) => {
                const target = e.target;
                const reqTarget = target.closest("[data-value]");
                if (reqTarget) {
                    if (typeof props.onChange === "function") {
                        let value = reqTarget.getAttribute("data-value");
                        if (!value.trim()) {
                            value = reqTarget.dataValue ? { ...reqTarget.dataValue } : null;
                        }
                        props.onChange(value, reqTarget);

                        const title = component.querySelector(`.${classes.title}`);
                        if (!title && !trigger) {
                            console.error("...");
                            return null;
                        }
                        if (!trigger) {
                            title.innerHTML = reqTarget.innerHTML;
                        }


                    }
                }
                if (!trigger || (trigger && closeOnClick)) {
                    closeDropdown(icon, _content);
                }
            };
        }
        else {
            closeDropdown(icon);
        }
        isOpen = !isOpen;
    }
    if (trigger) {
        trigger.addEventListener("click", onToggle);
    }
    // trigger is custom button as prop..
    const component = trigger ? trigger : <Button delay={100} onClick={onToggle} className={ArrayToString(classes.main, className)} color={props.color || "light"}>
        <Row >
            <Col className={classes.title}>
                {props.title}
            </Col>
        </Row>
    </Button>

    component.update = (html) => {
        const title = component.querySelector(`.${classes.title}`);
        if (!title) {
            throw Error("cant find title to change on dropdowm");
        }
        title.innerHTML = html;
    }
    return component;



    function closeDropdown(icon, backdrop) {
        isOpen = false;
        if (icon) {
            icon.classList.remove(classes.open);
        }
        if (backdrop) {
            backdrop.classList.add(classes.remove)
            setTimeout(() => {
                backdrop.remove();

            }, 300);
        }
    }
}
export function Item(props) {
    const { className = "", data = {} } = props;
    const onkeydown = (event) => {
        const target = event.target.closest("[data-value]");
        if (event.code === "ArrowDown" && target.parentNode.nextElementSibling) {
            target.parentNode.nextElementSibling?.querySelector("[data-value]")?.focus();
        } else if (event.code === "ArrowUp" && target.parentNode.previousElementSibling) {
            target.parentNode.previousElementSibling?.querySelector("[data-value]")?.focus();
        } else if (event.code === "Enter") {
            if (typeof props.onClick === "function") {
                props.onClick(target.dataset.value);
            }
        }
    }
    const tempalte = <div tabindex="0" autofocus="true" onKeydown={onkeydown} {...props} data-value={props.value || ""} className={ArrayToString(classes.item, "adi-plugin", className)}>
        {props.children}
    </div>;
    tempalte.dataValue = data;
    return new Hooks({
        children: tempalte,
        onUpdate: (that) => {
          setTimeout(() => {
            that.firstElementChild && that.firstElementChild.focus();
          }, 0);
        }
    });

}
export const Divider = () => {
    return <div className={classes.divider}></div>
}