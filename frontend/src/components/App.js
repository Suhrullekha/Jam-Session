import React, { Component } from "react"; 
import { render }  from "react-dom"; 
import HomePage from "./HomePage";


export default class App extends Component{ //we have to render this componet inside the index.html (the js file)
    constructor(props){
        super(props);
        //when the state changes, we render that component
    } 
    render(){
        return (
        <div>
            <HomePage />
        </div>
        );
    }
} 

const appDiv = document.getElementById("app");  //this comp is essentially called in the app div
render(<App />, appDiv); 