import classes from './style.module.css';


export const Navbar = (props) => {
    return <div style={props.style} className={classes.main}>
      {props.children}
    </div>
}   