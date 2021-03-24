import Col from '../../Grid/cols/Col';
import Row from '../../Grid/row/row';
import { Drag } from '../../icons/icons';
import classes from './style.module.css';


export const Block = (props) =>{
    return <Row className={classes.main} alignItems="center">
        <Row alignItems="center" className={classes.handle}><Drag/></Row>
        <Col>{props.children}</Col>
    </Row>
}