export function capittalize(word){
    return  word.charAt(0).toUpperCase() + word.slice(1);
}
export function camelCaseToDash( myStr ) {
    return myStr.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
}