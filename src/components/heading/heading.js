import { ArrayToString } from '../../utilis/Array';
import classes from './style.module.css';

export const Heading = (props)=>{
    return <h1 {...props} className={ArrayToString(classes.main,props.className)} >{props.children}</h1>
}