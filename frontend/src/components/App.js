import React, {Component} from "react"; 
import {render}  from "react-dom"; 

export default class App extends Component{ //we have to render this componet inside the index.html (the js file)
    constructor(props){
        super(props);
    } 
    render(){
        return (<h1>Testing React Code</h1>)
    }
}

const appDiv = document.getElementById("app");  //this comp is essentially called in the app div
render(<App />, appDiv); 