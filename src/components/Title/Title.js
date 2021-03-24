
import classes from './style.module.css';

export const Title = (props)=>{
   return <div className={classes.title}>
             {props.children}
         </div>
}