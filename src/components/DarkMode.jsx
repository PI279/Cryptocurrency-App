import React from 'react';
import { Switch, theme  } from 'antd';
import "../styles/styles.css";

const DarkMode = () =>{
    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark")
        localStorage.setItem("selectedTheme", "dark")
    };
    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light")
        localStorage.setItem("selectedTheme", "light")
    };
    const selectedTheme = localStorage.getItem("selectedTheme");

    if(selectedTheme === "dark"){
        setDarkMode();
    }

    const toggleTheme = (checked) => {
        if (checked) setDarkMode();
        else setLightMode()
    }
return(
     <Switch  defaultChecked={selectedTheme === "dark"} onChange={toggleTheme} /> 
     )
} 
export default DarkMode;
