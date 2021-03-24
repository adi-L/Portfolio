import { ArrayToString } from '../../utilis/Array';

const COLS = {
    sm: "sm",
    md: "md",
    lg: "lg"
}
const Col = (props) => {

    const renderedCols = (props) => {
        let collector = ["col"];// def col init
        if(props.className){
            collector.push(props.className);
        }
        for (const key in COLS) {
            const _c = COLS[key];
            if (props[_c]) {
                collector.push("col-" + _c+"-" + props[_c]);
            }
        }
        return ArrayToString(collector);
    }
    return <div {...props} className={renderedCols(props)}>
        {props.children}
    </div>;
};

export default Col;
