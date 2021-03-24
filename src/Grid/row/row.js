import { ArrayToString } from '../../utilis/Array';

const getJustify = (justify) =>{
  if(!justify) justify = "center";
  return justify;
}
const getDirection = (direction)=>{
  if(!direction) direction = "row";
  return direction;
}
const Row = (props) => {
  const {alignItems = "end",style = {}} = props;
  const styleCompose = Object.assign(style,{"flex-direction":getDirection(props.direction),"align-items":alignItems,"justify-content":getJustify(props.justify),"gap":props.gap || 0});
  return <div {...props} style={styleCompose} className={ArrayToString(["row",props.className || ""])}>
    {props.children}
  </div>;
};

export default Row;
