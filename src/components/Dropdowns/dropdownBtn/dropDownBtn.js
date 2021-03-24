import Row from "../../../Grid/row/row";
import { ArrayToString } from "../../../utilis/Array";
import { Button } from "../../Buttons/ButtonV2/Buttons";
import { Dropdown } from "../dropdownV1/Dropdown"
import classes from './style.module.css';


export const DropdownButton = (props) => {
    const { children, text = "save", pose } = props;
    return <div className="dir-lang">
        <Row className={ArrayToString(classes.main)} justify="flex-end">
            <Dropdown pose={pose} className={classes.dd} color="primary">{children}</Dropdown>
            <Button className={classes.btn}>{text}</Button>
        </Row>
    </div>

}