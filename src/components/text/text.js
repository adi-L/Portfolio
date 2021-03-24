import classes from './style.module.css';

export const Text = (props)=>{
    return <span className={classes.main}>{props.children}</span>
}