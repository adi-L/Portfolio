import { ArrayToString } from '../../utilis/Array';
import classes from './style.module.css';

export const Input = (props) => {
    return <input {...props}  className={ArrayToString(classes.main,props.className)} />
}