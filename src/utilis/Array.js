export function ArrayToString(array = [],...args){
    if(!array) {
        array = [];
    }
    if(array && !Array.isArray(array)) {
        array = [array];
    }
    if(args.length>0){
        array = [...array,...args]
    }
    if(Array.isArray(array)){
        return array.join(" ");
    }
    array = array.filter(item=>item);
    return array.toString();
   
}