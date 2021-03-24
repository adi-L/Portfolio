import { camelCaseToDash } from "./string";

export function styleObjectToString(styles) {
    let collectStyles = [];
    for (const key in styles) {
        if (styles.hasOwnProperty(key)) {
            const style = styles[key];
            collectStyles.push(`${camelCaseToDash(key)}:${style}`);
        }
    }
    return collectStyles.join(';');
}