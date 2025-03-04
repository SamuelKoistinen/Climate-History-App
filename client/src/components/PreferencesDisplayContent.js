import PreferencesSwitchGroup from "./PreferencesSwitchGroup";
import PrefenrecesButtonGroup from "./PreferencesButtonGroup";
import axios from "axios";
import {useEffect, useState} from "react";
import Spinner from "./Spinner";

export default function PreferencesDisplayContent(props){
    const [isLoading, setIsLoading] = useState(true);
    const [preferences, setPreferences] = useState(null);
    const [clickedSave, setClickedSave] = useState(false);

    var changeList = [];

    async function savePreferences(){
        const address = "http://localhost:3001/userpreferences/preference";
        const preferencesArray = [...preferences];

        changeList.forEach(element => {
            console.log("Making post request");
            axios.post(address, {
                preferenceValue: document.getElementById(element).checked,
                username: props.username,
                preferenceID: element
            })
            .then((response) => {
                console.log(response);
                
                preferencesArray[parseInt(element)-1] = {username:props.username, preferenceID:element, preferenceValue:Number(document.getElementById(element).checked)};
                setPreferences(preferencesArray.map(element => {
                    
                    setClickedSave(true);
                    return{ ...element, preferenceValue: element.preferenceValue}
            }));
            })
            .catch(error => {
                console.log(error);
            });
        });
        changeList = [];
    }

    const callSavePreferences = () => {
        savePreferences();
    }

    const saveChange = e => {
        if(changeList.includes(e.target.id)){
            changeList.splice(changeList.indexOf(e.target.id), 1);
        }else{
            changeList.push(e.target.id);
        }
        console.log(changeList);
    }

    const saveSessionPreference = () => {
        sessionStorage.setItem("preferences", JSON.stringify(preferences));
    }

     useEffect(() => {
        if(clickedSave){
            console.log(preferences);
            saveSessionPreference();
            setClickedSave(false);
        }
    }, [preferences]) 

    useEffect(() => {
        if(sessionStorage.getItem("preferences") !== null){
            setPreferences(JSON.parse(sessionStorage.getItem("preferences")));
            console.log("Items loaded from session storage")
        } else {   
            const address = "http://localhost:3001/userpreferences/user/" + props.username;
            axios.get(address)
            .then((response) => {
                console.log("Loaded data from database");
                setPreferences(response.data); 
                sessionStorage.setItem("preferences", JSON.stringify(response.data));
            }).catch(error => {
                alert(error);
            });
        }

        setTimeout(() =>{
            setIsLoading(false);
        }, 500);
    }, [])
    
    if(isLoading){
        return <Spinner />
    }
    else{
        return(
            <div className="div-centered">

                <PreferencesSwitchGroup label="Charts side by side" name="settingOneRadios" 
                checked={preferences[0].preferenceValue} id="1" saveChange={saveChange}/>
                <PreferencesSwitchGroup label="Anomaly chart" name="settingTwoRadios" 
                checked={preferences[1].preferenceValue} id="2" saveChange={saveChange}/>                
                <PreferencesSwitchGroup label="chart 2 toggle" name="settingThreeRadios" 
                checked={preferences[2].preferenceValue} id="3" saveChange={saveChange}/>                
                <PreferencesSwitchGroup label="Chart 3 toggle" name="settingFourRadios" 
                checked={preferences[3].preferenceValue} id="4" saveChange={saveChange}/>               
                <PreferencesSwitchGroup label="chart 4 toggle" name="settingFiveRadios" 
                checked={preferences[4].preferenceValue} id="5" saveChange={saveChange}/>               
                <PreferencesSwitchGroup label="chart 5 toggle" name="settingSixRadios" 
                checked={preferences[5].preferenceValue} id="6" saveChange={saveChange}/>
                
                <PrefenrecesButtonGroup username={props.username} savePreferences={callSavePreferences}/>
            </div>
            
        )
    }
}