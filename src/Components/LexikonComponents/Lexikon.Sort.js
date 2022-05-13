import React from "react";
import {Divider, FormControl, InputLabel, NativeSelect, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import data from "./LexikonData";

export default function ({handleSort, handleSort2}) {
    const [entries, setEntries] = React.useState('left');

    const handleEntries = (event, newEntrie) => {
        setEntries(newEntrie);
    }

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
                <Button variant="contained" style={alphabetButton}>
                    A
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    B
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    C
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    D
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    E
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    F
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    G
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    H
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    I
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    J
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    K
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    L
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    M
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    N
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    O
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    P
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    Q
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    R
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    S
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    T
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    U
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    V
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    W
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    X
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    Y
                </Button>
                <Button variant="contained" style={alphabetButton}>
                    Z
                </Button>
            </div>
            <div style={sortingButtons}>
                <ToggleButtonGroup
                    color={"primary"}
                    value={entries}
                    exclusive
                    onChange={handleEntries}
                    variant="contained"
                >
                    <Stack spacing={2} direction="row">
                        <ToggleButton value="all">
                            Alle Einträge
                        </ToggleButton>
                        <ToggleButton value="bookmarks">
                            Merkliste
                        </ToggleButton>
                    </Stack>
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
                        <option value={3}>Alphabetisch (A -> Z)</option>
                        <option value={4}>Alphabetisch (Z -> A)</option>
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