import React, {useEffect, useState} from "react";
import {Divider, FormControl, InputLabel, NativeSelect, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import data from "./LexikonData";

export default function ({handleSort, handleSort2, ansicht, setAnsicht, startLetter, setStartLetter, getAllFavourites}) {
    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const [tempLetter, setTempLetter] = React.useState(null);
    const [entries, setEntries] = React.useState('all');


    const ansichtToggler = (event) => {
        getAllFavourites()
        setAnsicht(event.target.value);
    }
    const [alignment, setAlignment] = React.useState('left');
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
      };
    const handleLetterChange = (event) => {
    if(startLetter === event.target.value.toUpperCase()){
        setStartLetter(null)
        setTempLetter(null);
        try {
           document.getElementById(event.target.value).style.background='#004ea5'; 
        } catch (error) {
            
        }
        
    }
    else{
        setStartLetter(event.target.value.toUpperCase()); 
        try {
            document.getElementById(event.target.value).style.background="grey";
        } catch (error) {
            
        }
        
        try {
            document.getElementById(tempLetter).style.background="#004ea5";
        } catch (error) {
            
        }
        
        setTempLetter(event.target.value);
    }

    };
      
    //Nativ Select call Sort Function in Lexikon
    const handleChange = (event) => {
        switch (event.target.value) {
            case "3":
                handleSort()
                break;
            case "4":
                handleSort2()
                break;
            default:
                
                console.log("default sort")
        }
    }

    const expandAll = () => (isExpanded) => {
        for (var i = 0; i < data.length; i++) {

        }
    };

    const alphabetButton = {
        maxWidth: "50px",
        maxHeight: "50px",
        minWidth: "30px",
        minHeight: "30px",
        margin: "3px"
    }

    const alphabetDiv = {
        marginTop: "20px",
        marginBottom: "20px"
    }

    const sortingButtons = {
        marginTop: "20px",
        marginBottom: "20px"
    }

    const selectOptions = {
        marginLeft: "50px"
    }

    const AccordionExpandButtons = {
        marginTop: "30px",
        marginBottom: "30px",
    }


    return (
        <div>
            <Divider/>
            <div style={alphabetDiv}>
                {letters.map((letter) => (
                            <Button id={letter} value={letter} key={letter} variant="contained" onClick = {(event) => handleLetterChange(event)} style={alphabetButton}>
                            {letter.toUpperCase()}
                        </Button>
                        ))}
            </div>
            <div style={sortingButtons}>
                <ToggleButtonGroup
                    color={"primary"}
                    defaultValue="all"
                    exclusive
                    onChange={handleAlignment}
                    value={ansicht}
                >
                        <ToggleButton value="all" onClick={ansichtToggler} >
                            Alle Einträge
                        </ToggleButton>
                        <ToggleButton value="favorites" onClick={ansichtToggler}>
                            Merkliste
                        </ToggleButton>
                </ToggleButtonGroup>

                <FormControl style={selectOptions} onChange={handleChange}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Sortierung
                    </InputLabel>
                    <NativeSelect
                        defaultValue={3}
                    >
                        <option value={1}>Relevanz (aufsteigend)</option>
                        <option value={2}>Relevanz (absteigend)</option>
                        <option value={3}>Alphabetisch (A &rarr; Z)</option>
                        <option value={4}>Alphabetisch (Z &rarr; A)</option>
                    </NativeSelect>
                </FormControl>

            </div>
            <Divider/>
            <div style={AccordionExpandButtons}>
                <Stack spacing={2} direction="row">
                    <Button variant={"contained"} onClick={expandAll}>Alle aufklappen</Button>
                    <Button variant={"contained"}>Alle zuklappen</Button>
                </Stack>
            </div>
        </div>

    )
}