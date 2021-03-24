import {Home} from './pages/Home/Home';
import "./style.css";
import './Grid/grid.css';
export default class App{
    constructor(){
       const body = document.body;
       body.appendChild(<Home/>)
    }
}