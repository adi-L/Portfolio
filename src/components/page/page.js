import Col from "../../Grid/cols/Col";
import Row from "../../Grid/row/row";
import { ArrayToString } from "../../utilis/Array";
import classes from './style.module.css';

export const Page = (props) => {
    return <Row alignItems="center" className={ArrayToString(classes.main)}>
        <main {...props} className={ArrayToString(classes.page, "page-demo")}>
            <Row alignItems="Center" justify="flex-start" className={classes.header}>
                <Col className="hide_on_mobile" style={{ margin: "4px" }} sm={4}>
                    <Row style={{ marginLeft: "10px" }} gap="10px" justify="flex-start">
                        <Col className={classes.dot1} sm={1}></Col>
                        <Col className={classes.dot1} sm={1}></Col>
                        <Col className={classes.dot1} sm={1}></Col>
                    </Row>
                </Col>
                <Col className="hide_on-desktop">
                    <Row alignItems="center">
                        <Col sm={1} className={ArrayToString(classes.mobileHeader)}></Col>
                    </Row>
                </Col>
            </Row>
            <div className={ArrayToString(classes.content,"main-page--adi")}>
                {props.children}
            </div>
            <div className={classes.footer}>
                <Col className="hide_on-desktop">
                    <Row style={{height:"40px"}} alignItems="center">
                        <Col sm={1} className={ArrayToString(classes.mobileFooter)}></Col>
                    </Row>
                </Col>
            </div>
        </main>
    </Row>
}