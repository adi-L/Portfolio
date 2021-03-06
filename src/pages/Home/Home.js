import { Button } from "../../components/Buttons/ButtonV2/Buttons";
import { Divider } from "../../components/divider/dividerY";
import { Navbar } from "../../components/navbar/navbar"
import { Page } from '../../components/page/page';
import Col from "../../Grid/cols/Col";
import Row from "../../Grid/row/row";
import { Desktop, Mobile, Tablet, Email } from "../../icons/icons";
import { Demo } from "../demo/demo";
import classes from './style.module.css';
import bigHeadSrc from '../../assets/avatars/adi.jpg';
import { ArrayToString } from "../../utilis/Array";
import { Input } from "../../components/input/input";
import { Title } from "../../components/Title/Title";
import { createRef } from "../../../jsx-render/client/client";
import { Dropdown, Item } from "../../components/Dropdowns/dropdownV1/Dropdown";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/scale.css';
import 'tippy.js/themes/light.css';


export const Home = (props) => {
    const pageRef = createRef();
    const inputScreenWidth = <Input disabled={true} className={classes.input} />
    window.addEventListener("resize", () => {
        requestAnimationFrame(() => {
            inputScreenWidth.value = pageRef.element.offsetWidth + "px"
        })
    });
    const desktop = <Button color="transparent" className={ArrayToString(classes.btn)}>
        <Desktop />
    </Button>;
    tippy(desktop, {
        content: 'Desktop',
        animation: "scale",
        theme: 'light',
    });
    const tablet = <Button color="transparent" className={classes.btn}>
        <Tablet />
    </Button>
    tippy(tablet, {
        content: 'Tablet',
        animation: "scale",
        theme: 'light',
    });
    const mobile = <Button color="transparent" className={classes.btn}>
        <Mobile />
    </Button>
    tippy(mobile, {
        content: 'Mobile',
        animation: "scale",
        theme: 'light',
    });
    return <div>
        <img style={{ display: "none" }} src={bigHeadSrc} onLoad={function () {
            inputScreenWidth.value = pageRef.element.offsetWidth + "px";
        }} />
        <Navbar >
            <Row className="h-100" justify={"flex-start"} alignItems="center">
                <Col style={{ maxWidth: "50px" }} sm={1} lg={1} >
                    <Row style={{ height: "100%", width: "50px" }} alignItems="center">
                        <img className={classes.avatar} alt="avatar" src={bigHeadSrc} />
                    </Row>

                </Col>
                <Divider />
                <Col style={{ marginLeft: "20px" }} lg={6} md={8} sm={12}>
                    <Row className="h-100" justify={"flex-start"} alignItems="center">
                        <Col sm={2}>
                            <Dropdown closeOnClick={true} trigger={<Button color="transparent">
                                <Title >CONTACT ME</Title>
                            </Button>}>
                                <Item onClick={() => {
                                    const a = document.createElement("a");
                                    a.target = "_blank";
                                    a.href = "mailto:adilev3344@gmail.com";
                                    a.click();
                                }}>Email</Item>
          <Item onClick={() => {
                                    const a = document.createElement("a");
                                    a.target = "_blank";
                                    a.href = "https://github.com/adi-L";
                                    a.click();
                                }}>Github</Item>  
                            </Dropdown>

                        </Col>
                        <Col sm={2}>
                            <Dropdown closeOnClick={true} trigger={<Button color="transparent">
                                <Title>PROJECTS</Title>
                            </Button>}>
                                <Item onClick={() => {
                                    const a = <a target="_blank" href="https://style-it.github.io/home/" />
                                    a.click();
                                }}>StyleIt API</Item>
                                  <Item onClick={() => {
                                    const a = <a target="_blank" href="https://www.npmjs.com/package/dragoned" />
                                    a.click();
                                }}>Dragoned - Sortable library</Item>
                                <Item onClick={() => {
                                    const a = <a target="_blank" href="https://www.npmjs.com/package/spliter-html" />
                                    a.click();
                                }}>Split-html</Item>
                                  <Item onClick={() => {
                                    const a = <a target="_blank" href="https://github.com/adi-L/starNode-rts" />
                                    a.click();
                                }}>rts game - using canvas.</Item>
                                 <Item onClick={() => {
                                    const a = <a target="_blank" href="https://www.webizzart.com/" />
                                    a.click();
                                }}>Webizzart - he</Item>
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
                            {desktop}
                        </div>
                        {mobile}
                        {tablet}
                        <Divider />
                        {inputScreenWidth}
                        <Divider />
                    </Row></Col>
                <Col className={"hide_on_mobile"}>
                </Col>
            </Row>
        </Navbar>
        <Page ref={pageRef}>
            <Demo querySelector={".main-page--adi"} />
        </Page>
    </div>
}