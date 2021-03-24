import { isSVG, createFragmentFrom } from './utilis'
import { isEvent } from '../common/Utilis';
import { styleObjectToString } from '../common/style';
/**
 * The tag name and create an html together with the attributes
 *
 * @param  {String} tagName name as string, e.g. 'div', 'span', 'svg'
 * @param  {Object} attrs html attributes e.g. data-, width, src
 * @param  {Array} children html nodes from inside de elements
 * @return {HTMLElement|SVGElement} html node with attrs
 */
function createElements(tagName, attrs, children) {
  const element = isSVG(tagName)
    ? document.createElementNS('http://www.w3.org/2000/svg', tagName)
    : document.createElement(tagName)

  // one or multiple will be evaluated to append as string or HTMLElement
  const fragment = createFragmentFrom(children)
  element.appendChild(fragment)

  Object.keys(attrs || {}).forEach(prop => {
    if (prop === 'style') {
      // e.g. origin: <element style={{ prop: value }} />
      element.style = styleObjectToString(attrs[prop]);

    } else if (prop === 'ref' && typeof attrs[prop] === "object") {

      attrs[prop].element = element;
    } else if (prop === 'className') {
      element.setAttribute('class', attrs[prop])
    } else if (prop === 'htmlFor') {
      element.setAttribute('for', attrs[prop])
    } else if (prop === 'xlinkHref') {
      element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', attrs[prop])
    } else if (isEvent(prop)) {
      const event = prop.replace(/^on/, '').toLowerCase();
      if (typeof attrs[prop] === "function" && !element[prop.toLowerCase()]) {
        element.addEventListener(event, attrs[prop])
      }
    } else if(prop === "dangerouslySetInnerHTML" && typeof attrs[prop] === "object"){
      if(typeof attrs[prop].__html ==="string"){
        element.innerHTML = attrs[prop].__html;
      }else if (typeof attrs[prop].__html ==="object"){
        // TODO: validate if html
        const temp = document.createElement("div");
        temp.appendChild(attrs[prop].__html);
        element.appendChild(temp.firstChild);
      }
      
      element.prepend
      element.innerHTML = attrs[prop].__html;
    } else {
      if (prop !== "children") {
        // any other prop will be set as attribute
        element.setAttribute(prop, attrs[prop])
      }

    }
  })

  return element
}

/**
 * The JSXTag will be unwrapped returning the html
 *
 * @param  {Function} JSXTag name as string, e.g. 'div', 'span', 'svg'
 * @param  {Object} elementProps custom jsx attributes e.g. fn, strings
 * @param  {Array} children html nodes from inside de elements
 *
 * @return {Function} returns de 'dom' (fn) executed, leaving the HTMLElement
 *
 * JSXTag:  function Comp(props) {
 *   return dom("span", null, props.num);
 * }
 */
function composeToFunction(JSXTag, elementProps, children) {

  const props = Object.assign({}, JSXTag.defaultProps || {}, elementProps, { children: children });
  const bridge = JSXTag.prototype.render ? new JSXTag(props).render : JSXTag;
  const result = bridge(props)

  return result

}

function dom(element, attrs, ...children) {

  // Custom Components will be functions
  if (typeof element === 'function') {
    // e.g. const CustomTag = ({ w }) => <span width={w} />
    // will be used
    // e.g. <CustomTag w={1} />
    // becomes: CustomTag({ w: 1})
    return composeToFunction(element, attrs, children)
  }
  // regular html components will be strings to create the elements
  // this is handled by the babel plugins
  if (typeof element === 'string') {
    return createElements(element, attrs, children)
  }

  console.error(`jsx-render does not handle ${typeof tag}`)


}

export default dom
export const Fragment = () => 'FRAGMENT'