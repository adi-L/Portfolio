import style from '!!raw-loader!./style.demo.css';
import { Hooks } from '../../components/hooks/hooks';
import { Dropdown } from '../../components/Dropdowns/dropdownV1/Dropdown';
import { Heading } from '../../components/heading/heading';
import Row from '../../Grid/row/row';
import Col from '../../Grid/cols/Col';

export const Demo = (props) => {
    const { querySelector } = props;
    const myComponent = new Hooks({
        onLoad: (target) => {
            target.style.height = "100%";
            target.style.display = "block";
            const container = document.querySelector(querySelector);
            renderRules(container);
            window.addEventListener("resize", OnResize);
        },
        children: <div style={{ height: "100%", width: "100%" }}>
            <style>
                {style}
            </style>


            <div className="selected-block adi-block">

                <div className="selected-element ">
                    <h1 className="heading-h1 block-element ">
                        Hello I'm <span className="text-primary">Adi L.</span><br />
                    </h1>
                    <p className="block-element ">And I'm a Web Developer</p>
                    <Dropdown pose="top" color="primary" className="about-me-btn" title="About Me">
                        <div className="about-me-modal">
                            <Row justify="end" alignItems="center">
                            <Heading style={{color:"var(--primary)"}}>Hi I'm Adi,</Heading>
                            </Row>
                            <div style={{margin:"30px 0"}}>
                            <p>
              I have passion for creating a dynamic user experience. 
           
              </p>
              <p>
              Creativity is my guiding light and it always my goal.
              </p>
              <p>
              I love turning a complex problem into simple intuitive Solutions.
              </p>
                                </div> 
             
              <Row  justify="end" >
                  <Col title="coffee" sm={1}>☕ |</Col>
                  <Col title="code"  sm={1}>👨‍💻 |</Col>
                  <Col title="music"  sm={1}>🎵</Col>
              </Row>
                        </div>
                    </Dropdown>
                    <div className="dot dot-top-left"></div>
                    <div className="dot dot-top-right"></div>
                    <div className="dot dot-bottom-left "></div>
                    <div className="dot dot-bottom-right"></div>
                </div>


            </div>


        </div>

    })
    const Rule = ({ height, bottom, width, left, top, className, children }) => <div className={className} style={{ height: height, bottom: bottom, width: width, left: left, top: top }}>
        {children}
    </div>;

    function renderRules(iframe) {
        // renderRightRule(iframe);
        renderLeftRule(iframe);
        renderCenterRule(iframe);
        renderRect(iframe);
    }
    const OnResize = () => {
        const iframe = document.querySelector(querySelector)
        renderRules(iframe)
    }
    function renderRect(iframe) {
        const id = "client-rect-of-element";
        const selectedElement = document.body.querySelector(".selected-element");
        document.body.querySelector(`#${id}`)?.remove();
        const rect = selectedElement.getBoundingClientRect();
        const rectElement = <div id={id}>
            <p>{"height: "}{Math.round(rect.height)}{"px"}</p>
            <p>{"width:  "}{Math.round(rect.width)}{"px"}</p>
            <p>{"left: "}{Math.round(rect.left)}{"px"}</p>
            <p>{"top: "}{Math.round(rect.top)}{"px"}</p>
            {/* <div className="arrow-right"></div> */}
        </div>
        selectedElement.appendChild(rectElement)
    }
    function renderRightRule(iframe) {
        const { doc, rect, iframeRect } = resolveBoundingClient(iframe);
        doc.querySelector(".rule-x-right")?.remove();
        const width = iframeRect.width - rect.right;
        doc.appendChild(<Rule value={width} className="hide_on_mobile rule rule-x-right" width={width + "px"} left={rect.left + rect.width + "px"} top={(rect.top - rect.height / 1.5) + "px"}>
            <div style={{ marginTop: "5px" }} className={"rule-unit"}>{Math.round(width)} {"px"}</div>
        </Rule>);
    }
    function renderLeftRule(iframe) {

        const { doc, rect, iframeRect } = resolveBoundingClient(iframe);
        doc.querySelector(".rule-x-left")?.remove();
        const width = rect.left;
        doc.appendChild(<Rule value={width} className="hide_on_mobile rule rule-x-left" width={"100%"} left={0 + "px"} top={(rect.top - rect.height / 2) + "px"}>
            <div style={{ marginTop: "5px", left: "5%" }} className={"rule-unit"}>{Math.round(width)} {"px"}</div>
        </Rule>);
    }
    function renderCenterRule(iframe) {
        const { doc, rect, iframeRect } = resolveBoundingClient(iframe);
        doc.querySelector(".rule-center")?.remove();
        const height = rect.top;
        doc.appendChild(<Rule className="rule rule-center" height={(iframeRect.height) + "px"} width={1 + "px"} left={(iframeRect.width / 2) + "px"} top={0}>
            <div className="center-label">Center</div>
            <div style={{ marginLeft: "10px", top: "10%" }} className={"rule-unit"}>
                {Math.round(height)} {"px"}</div>
        </Rule>);
    }
    function resolveBoundingClient(iframe) {
        const doc = iframe;
        const selectedElement = document.body.querySelector(".selected-element");
        const rect = selectedElement.getBoundingClientRect();
        const iframeRect = doc.getBoundingClientRect();
        return { doc, rect, iframeRect, selectedElement };
    }
    return myComponent;
}


// function getDistance(x1,x2,y1,y2) {
//     return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) * 1.0);
// }

