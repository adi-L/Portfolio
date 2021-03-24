import { Button } from "../../components/Buttons/ButtonV2/Buttons";
import { Divider } from "../../components/divider/dividerY";
import { Navbar } from "../../components/navbar/navbar"
import { Page } from '../../components/page/page';
import Col from "../../Grid/cols/Col";
import Row from "../../Grid/row/row";
import { Desktop, Mobile, Tablet } from "../../icons/icons";
import { Demo } from "../demo/demo";
import classes from './style.module.css';
import bigHeadSrc from '../../assets/avatars/bighead.svg';
import { ArrayToString } from "../../utilis/Array";
import { Input } from "../../components/input/input";
import { Title } from "../../components/Title/Title";
import { createRef } from "../../../jsx-render/client/client";
import { Dropdown, Item } from "../../components/Dropdowns/dropdownV1/Dropdown";

export const Home = (props) => {
    const pageRef = createRef();
    const inputScreenWidth = <Input disabled={true} className={classes.input} />
    window.addEventListener("resize", () => {
        requestAnimationFrame(() => {
            inputScreenWidth.value = pageRef.element.offsetWidth + "px"
        })
    })
    return <div>
        <img style={{ display: "none" }} src={bigHeadSrc} onLoad={function () {
            inputScreenWidth.value = pageRef.element.offsetWidth + "px";
        }} />
        <Navbar >
            <Row  className="h-100" justify={"end"} alignItems="center">
                <Col style={{maxWidth:"50px" }} sm={2} lg={1} >
                    <Row style={{ height: "100%"}} alignItems="center">
                        <Col>
                            <img className={classes.avatar} alt="avatar" src={bigHeadSrc} />
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Row className="h-100" justify={"end"} alignItems="center">
                        <Col sm={2}>
                        <Dropdown   closeOnClick={true} trigger={   <Button>
                                <Title>ABOUT ME</Title>
                            </Button>}>
                               <Row style={{width:"200px"}}>
                                <Col>Under Construction</Col>
                                </Row>
                            </Dropdown>
                         
                        </Col>
                        <Col sm={2}>
                            <Dropdown closeOnClick={true} trigger={<Button>
                                <Title>PROJECTS</Title>
                            </Button>}>
                                <Item onClick={()=>{
                                    const a = document.createElement("a");
                                    a.target="_blank";
                                    a.href = "https://www.npmjs.com/package/styleit-api";
                                    a.click();
                                }}>StyleIt API</Item>
                                <Item >Coming Soon...</Item>

                            </Dropdown>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Navbar>
        <Navbar>
            <Row className="h-100" alignItems="center">
                <Col className={"hide_on_mobile"}>

                </Col>
                <Col sm={12} className={classes.col}>

                    <Row className="h-100" alignItems="center">
                        <Divider />
                        <div className="active">
                            <Button className={ArrayToString(classes.btn)}>
                                <Desktop />
                            </Button>
                        </div>
                        <Button className={classes.btn}>
                            <Mobile />
                        </Button>
                        <Button className={classes.btn}>
                            <Tablet />
                        </Button>
                        <Divider />
                        {inputScreenWidth}
                        <Divider />
                    </Row></Col>
                <Col className={"hide_on_mobile"}>
                </Col>
            </Row>
        </Navbar>
        <Page ref={pageRef}>
            <Demo />
        </Page>
    </div>
}