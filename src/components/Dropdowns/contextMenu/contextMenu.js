import classes from '../style.module.css';
import commonClassses from '../../TopNavbar/layout/common/style.module.css';
import animations from '../../../common/styles/animations.module.css';
import { ArrayToString } from "../../../utilis/Array";
import { DIRECTIONS } from "../../Main/Enum/DIRECTIONS";

export function ContextMenu(props) {
    let content;
    let isOpen = false;
    const { pose = DIRECTIONS.BOTTOM,className="",offset,children,context  } = props;
    const onToggle = (e) => {
        e.preventDefault();
        if (!isOpen) {
            const rect = component.getBoundingClientRect();
            const x = rect.left   + "px";
            let y;
            if (pose === DIRECTIONS.BOTTOM) {
                y = rect.top + rect.height + 1 + "px";
            }

            const minWidth = rect.width + "px";
            content = <div {...props} onContextmenu={onToggle} className={ArrayToString(classes.backdrop,className)}>
                <div className={ArrayToString("adi-plugin", classes.content, commonClassses.shadowLight, animations.fadeIn)} style={{ left: x, top: y, "min-width": minWidth }}>
                    {context}
                </div>
            </div>
            //append the dropdown content into the docoment
            document.body.appendChild(content);

            const dd = content.firstElementChild;
            const contentRect = dd.getBoundingClientRect();
            if(typeof offset === "number"){
                dd.style.left = (contentRect.left - offset)+"px"
            }
            if (pose === DIRECTIONS.TOP) {
               
                dd.style.top = (rect.top - contentRect.height - 2) + "px";
            }

            content.onclick = (e) => {
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
                        if (!title) {
                            console.error("...");
                            return null;
                        }
                        title.innerHTML = reqTarget.innerHTML;

                    }
                }
                closeDropdown(content);

            };
        }
        else {
            closeDropdown(content);
        }
        isOpen = !isOpen;
    }
    const component = <span onContextmenu={onToggle} className={ArrayToString(classes.main, className)}>
  {children}
</span>
    return component;



    function closeDropdown( backdrop) {
        if (backdrop) {
            backdrop.remove();
        }
    }
}
export function Item(props) {
    const {className = ""} = props;
    const tempalte = <div {...props} data-value={props.value || ""} className={ArrayToString(classes.item, "adi-plugin",className)}>
        {props.children}
    </div>;
    tempalte.dataValue = props.data;
    return tempalte;

}
export const Divider = () =>{
    return <div className={classes.divider}></div>
}