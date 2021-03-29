
import classes from './style.module.css';

export const Title = (props) => {
    const { style, children } = props;
    return <div style={style} className={classes.title}>
        {children}
    </div>
}