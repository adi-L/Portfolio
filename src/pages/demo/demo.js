import classes from './style.module.css';
import style from '!!raw-loader!./style.demo.css';

export const Demo = () => {
    const iframe = <iframe className={classes.iframe}></iframe>;
    iframe.onload = () => {
        const component = <div className="h-screen pb-14 bg-right bg-cover" style="background-image:url('bg.svg');">
            <style>
                {style}
            </style>
       

            <div className="selected-block adi-block">

                <div className="selected-element ">
                
                    <h1 className="heading-h1 block-element ">
                        Hello, I'm <span className="text-primary">Adi L.</span><br />
                    </h1>
                    <p className="block-element ">And I'm a Web Developer</p>

                    <div className="dot dot-top-left"></div>
                    <div className="dot dot-top-right"></div>
                    <div className="dot dot-bottom-left "></div>
                    <div className="dot dot-bottom-right"></div>
                </div>
                {/* <div className="w-full xl:w-2/5 py-6 overflow-y-hidden">
                    <img className="w-5/6 mx-auto lg:mr-0 slide-in-bottom" src={webSrc} />
                </div> */}
                <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
                </div>

            </div>


        </div>;
        iframe.contentDocument.body.appendChild(component);
        setTimeout(() => {
            renderRules(iframe);
           }, 100);
        iframe.contentWindow. onresize = () =>{
            const calc = () =>{
                renderRules(iframe);
            }
            requestAnimationFrame(calc)
        }
        iframe.onload = ()=>{
            
        }
 

    }
    return iframe;
}
const Rule = ({height,bottom,width,left,top,className,children})=><div className={className}  style={{height:height,bottom:bottom, width:width, left: left , top:top  }}>
{children}
</div>;

function renderRules(iframe) {
    renderRightRule(iframe);
    renderLeftRule(iframe);
    renderCenterRule(iframe);
    renderRect(iframe);
}
function renderRect(iframe){
    const doc = iframe.contentDocument;
    const id = "client-rect-of-element";
    const selectedElement = doc.querySelector(".selected-element");
    doc.querySelector(`#${id}`)?.remove();
    const rect = selectedElement.getBoundingClientRect();
    const rectElement = <div id={id}>
        <p>{"height:"}{Math.round(rect.height)}{"px"}</p>
        <p>{"width:"}{Math.round(rect.width)}{"px"}</p>
        <p>{"left:"}{Math.round(rect.left)}{"px"}</p>
        <p>{"top:"}{Math.round(rect.top)}{"px"}</p>
    {/* <div className="arrow-right"></div> */}
    </div>
selectedElement.appendChild(rectElement)
}
function renderRightRule(iframe) {
    const { doc, rect, iframeRect } = resolveBoundingClient(iframe);
    doc.querySelector(".rule-x-right")?.remove();
    const width = iframeRect.width - rect.right;
    doc.body.appendChild(<Rule value={width} className="hide_on_mobile rule rule-x-right" width={width+ "px"} left={rect.right+ "px"} top={(rect.top + rect.height / 2)+ "px"}>
                    <div style={{marginTop:"5px"}} className={"rule-unit"}>{Math.round(width)} {"px"}</div>
    </Rule>);
}
function renderLeftRule(iframe) {
    const { doc, rect, iframeRect } = resolveBoundingClient(iframe);
    doc.querySelector(".rule-x-left")?.remove();
    const width =rect.left;
    doc.body.appendChild(<Rule value={width} className="hide_on_mobile rule rule-x-left" width={width+ "px"} left={0+ "px"} top={(rect.top + rect.height / 2)+ "px"}>
            <div style={{marginTop:"5px"}} className={"rule-unit"}>{Math.round(width)} {"px"}</div>
    </Rule>);
}
function renderCenterRule(iframe) {
    const { doc, rect, iframeRect } = resolveBoundingClient(iframe);
    doc.querySelector(".rule-center")?.remove();
    const height =rect.top;
    doc.body.appendChild(<Rule value={height} className="rule rule-center" height={iframeRect.height+ "px"} width={1+ "px"} left={(iframeRect.width/2)+ "px"} top={0}>
        <div style={{marginLeft:"10px",top:"10%"}} className={"rule-unit"}>{ Math.round(height)} {"px"}</div>
    </Rule>);
}
function resolveBoundingClient(iframe) {
    const doc = iframe.contentDocument;
    const selectedElement = doc.querySelector(".selected-element");
    const rect = selectedElement.getBoundingClientRect();
    const iframeRect = iframe.getBoundingClientRect();
    return { doc, rect, iframeRect ,selectedElement};
}

// function getDistance(x1,x2,y1,y2) {
//     return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) * 1.0);
// }

