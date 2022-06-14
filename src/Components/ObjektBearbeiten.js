import React, {useEffect, useState} from "react";
import style from "./LexikonComponents/Lexikon.module.css";
import {Autocomplete, Paper, Box, Card, Divider, Stack, TextField, Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Button from "@mui/material/Button";
import {Grid} from "@material-ui/core";
import {decodeToken} from "react-jwt";
import { DataSearch } from "@appbaseio/reactivesearch";
import CancelIcon from "@mui/icons-material/Cancel";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {Chip} from "@mui/material";
import styled from 'styled-components';

const Styles = styled.div`
    .searchbar{
        color: black;
    }
`;


const PaperStyle = {
    padding: "20px",
}

const CardStyle = {
    padding: "20px",
}

const NameColumn = {
    width: "15%",
    minWidth: "500px",
    marginTop: "15px",
}

const DescriptionCard = {
    maxWidth: "35vw",
    minWidth: "500px",
    marginTop: "15px",

}

const ButtonStyle = {
    marginTop: "15px",
    marginBottom: "15px",
}

export default function ObjektAnlegen() {
    const [selectedKontext, setSelectedKontext] = useState([])
    const [kontextChips, setKontextChips] = useState([])
    const [Labels, setLabels] = useState([])
    const [Objects, setObjects] = useState([])
    const navigate = useNavigate();
    const [selectedSynonyms, setSelectedSynonyms] = useState([]);
    const location = useLocation();
    const [currentBusinessObjectName, setCurrentBusinessObjectName] = useState("");
    const [currentSynonyms, setCurrentSynonyms] = useState([]);
    const [currentSynonymsID, setCurrentSynonymsID] = useState([]);
    const [currentDescription, setCurrentDescription] = useState("");
    const [currentLabels, setCurrentLabels] = useState([]);
    const [currentLabelsID, setCurrentLabelsID] = useState([]);
    const [currentContextList, setCurrentContextList] = useState([]);
    const [currentContextListID, setCurrentContextListID] = useState([]);
    const [currentBoId, setCurrentBoId] = useState("");
    const [synonymChips, setSynonymChips] = useState([])
    useEffect(() => {
        const server = process.env.REACT_APP_API_BACKEND;
        var userId = decodeToken(localStorage.getItem("userID")).id;


        //Get Current Object
        fetch(server + '/businessobject/' + location.hash.replace('#', "") + '?userId=' + userId + '', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
        })
            .then(response => {
                response.text().then(value => {
                    var responseJSON = JSON.parse(value);
                    setCurrentBusinessObjectName(responseJSON["name"])
                    setSynonymChips(responseJSON["synonyms"])
                    setCurrentDescription(responseJSON["description"])
                    setCurrentLabels(responseJSON["labels"])
                    setKontextChips(responseJSON["contextList"])
                    setCurrentBoId(responseJSON["id"])
                }).catch(err => {
                    console.log(err);
                });
            });

        reload();

        //Get Label Data
        fetch(server + '/label/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
        })
            .then(res => res.json())
            .then(
                (labels) => {
                    setLabels(labels);
                },
            )

        
    }, [])

    const LabelData = Labels.map((labels) => {
        return {id: labels.id, name: labels.name}
    })

    const ObjectData = Objects.map((objects) => {
        return {id: objects.id, name: objects.name}
    });

    function reload() {
        setCurrentSynonymsID(
            currentSynonyms.map((syn) => (
                syn.id
            ))
        );
        setCurrentContextListID(
            currentContextList.map((context) => (
                context.id
            ))
        );
        setCurrentLabelsID(
            currentLabels.map((label) => (
                label.id
            ))
        );
    }

    const handleSynonymeChange = (event, value) => {
        setCurrentSynonyms(value);
        setCurrentSynonymsID(
            value.map((synonyme) => (
                synonyme.id
            )));
    };
    const handleSynonymDelete = (e, value) => {
        setSynonymChips(synonymChips.filter((synonym) => synonym.value !== value))
      }
    const handleContextChange = (event, value) => {
        setCurrentContextList(value);
        setCurrentContextListID(
            value.map((context) => (
                context.id
            )));
    };

    const handleLabelChange = (event, value) => {
        setCurrentLabels(value);
        setCurrentLabelsID(
            value.map((labels) => (
                labels.name
            )));
    };

    function handleNameChange(event) {
        setCurrentBusinessObjectName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setCurrentDescription(event.target.value);
    };
    const handleKontextSelection = (value, name) => {
        var selectedKontextIds = []
        selectedKontextIds.push(value)
        kontextChips.push({"value" : value, "name" : name})
        
        setSelectedKontext(selectedKontextIds)};

    function TestButton() {
        console.log("name", currentBusinessObjectName);
        console.log("description", currentDescription);
        console.log("synonymIds", currentSynonymsID,)
        console.log("Kontext", currentContextListID,)
        console.log("Labels", currentLabelsID,)
        //console.log("labels", currentLabels,);
        //console.log("contextIds", currentContextList);
        //console.log('currentObjectData',CurrentObjectData);
    }
    const handleKontextDelete = (e, value) => {
        setKontextChips(kontextChips.filter((kontext) => kontext.value !== value))
      }
    function updateObject() {
        // handleDescriptionChange()
        // handleNameChange()
        // handleSynonymeChange()
        // handleLabelChange()
        // handleContextChange()
        console.log(synonymChips)
        var synonymIds = []
        synonymChips.map((element) => {
            synonymIds.push(element.value)
            
        }
        
        )
        var kontextIds = []
        kontextChips.map((element) => {
            kontextIds.push(element.value)
            
        }
        
        )
        
        console.log(synonymIds)
        const server = process.env.REACT_APP_API_BACKEND;
        var id = decodeToken(localStorage.getItem("userID")).id;
        var bID = currentBoId;
        reload();
        fetch(server + '/businessobject/' + bID + '?userId=' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
            body: JSON.stringify({
                "name": currentBusinessObjectName,
                "description": currentDescription,
                "synonymIds": synonymIds,
                "labels": currentLabelsID,
                "contextIds": kontextIds
            })
        })
            .then(response => {
                response.text().then(value => {
                    navigate("/lexikon")
                }).catch(err => {
                    console.log(err);
                });
            });
    }

    function generateDescription() {
        if (currentBusinessObjectName !== "") {
            const serverKI = process.env.REACT_APP_API_KI;
            console.log(serverKI+ '/descriptgen/generatedescription');
            fetch(serverKI + '/descriptgen/generatedescription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                },
                body: JSON.stringify({
                    "term": currentBusinessObjectName
                })
            }).then(responseKI => {
                responseKI.text().then(value => {
                    console.log(JSON.parse(value))
                    const generatedDescription = JSON.parse(value);
                    console.log(generatedDescription.summary)
                    setCurrentDescription(generatedDescription.summary);
                }).catch(err => {
                    console.log(err);
                });
            });
        } else {
            alert("Bitte Objekt Namen einfügen und erneut versuchen")
        }
    }

    const handleSynonymSelection = (value, name) => {
        var selectedSynonymIds = []
        selectedSynonymIds.push(value)
        synonymChips.push({"value" : value, "name" : name})
        
        setSelectedSynonyms(selectedSynonymIds)};
    //Input Field function
    const [value, setValue] = React.useState('');
    return (
        <Styles>
        <div className={style.containerMain}>
            <div className={style.headerRow}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant={"h4"}>Objekt bearbeiten</Typography>
                    <Stack direction="row" spacing={2} style={ButtonStyle} alignItems={"center"}>
                        <Button variant={"contained"} style={{backgroundColor: "grey"}}
                                onClick={TestButton}><CloseIcon/> Abbrechen</Button>
                        <Button variant={"contained"} onClick={updateObject}><SaveIcon/> Veröffentlichen</Button>
                    </Stack>
                </Grid>

            </div>
            <Divider style={{marginBottom: 15}}/>
            <Stack direction="column" spacing={2}>
                <Card style={CardStyle}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Stack direction="column" spacing={2} style={NameColumn}>
                            <Typography variant={"h6"}>Name des Objekts</Typography>
                            <TextField
                                id="standard-basic"
                                label="Objekt Name eintragen"
                                variant="standard"
                                value={currentBusinessObjectName}
                                onChange={(event) => handleNameChange(event)}
                            />
                        </Stack>
                        <Stack direction="column" spacing={2} style={NameColumn}>
                            <Typography variant={"h6"}>Labels</Typography>
                            <Autocomplete
                                fullWidth={true}
                                multiple
                                id="labels"
                                options={LabelData}
                                getOptionLabel={(option) => option.name}
                                value={currentLabels}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={handleLabelChange}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Labels für das Objekt auswählen"
                                    />
                                )}
                            />
                        </Stack>
                    </Grid>
                </Card>
                <Paper style={PaperStyle} >
                        <Typography color= "textPrimary" variant={"h6"}>Synonyme </Typography>


                        <Box><DataSearch
                        
                        componentId="x"
                        dataField="name"
                        placeholder="Search..."
                        autosuggest={true}
                        size={5}
                        className="searchbar"
                        onValueSelected={(value, cause, source) => {
                            if (cause === 'SUGGESTION_SELECT') {
                              handleSynonymSelection(source._id, value);
                                
                            }
                            
                          }}
                        />
                        
                        </Box>

                        {synonymChips.map((object) => {
                            return(  <Chip style={{marginTop: 10, mr: 10}} id =  {object.value}
                                label = {object.name} deleteIcon={<CancelIcon onMouseDown = {(e) => e.stopPropagation()}></CancelIcon>} onDelete={(e) => handleSynonymDelete(e, object.value)}
                            />)}
                        )} 
                 </Paper>   
                <Card style={CardStyle}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <div style={DescriptionCard}>
                            <Stack direction="column" spacing={2}>
                                <Typography variant={"h6"}>Begriffsabgrenzung</Typography>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Begriffsabgrenzung eingeben ..."
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={currentDescription}
                                    onChange={handleDescriptionChange}
                                />
                            </Stack>
                        </div>
                        <div style={DescriptionCard}>
                            <Card>
                                <Stack direction={"column"} spacing={2} alignItems={"flex-start"}>
                                    <div>
                                        <InfoIcon/>
                                        <Typography>
                                            Die Begriffsabgrenzung kann automatisch anhand des Namens generiert werden.
                                            Das automatische Generieren ist nur möglich, wenn das Textfeld leer ist.
                                            Nach der Generierung kann der Text manuell bearbeitet werden.
                                        </Typography>
                                    </div>
                                    <div>
                                        <Button aria-label="autoGenerate" variant={"contained"} onClick={generateDescription}>
                                            <InfoIcon/>
                                            Automatisch generieren ...
                                        </Button>
                                    </div>
                                </Stack>
                            </Card>
                        </div>
                    </Grid>
                </Card>
                <Paper style={PaperStyle} >
                        <Typography color= "textPrimary" variant={"h6"}>Kontext </Typography>


                        <Box><DataSearch
                        
                        componentId="c"
                        dataField="name"
                        placeholder="Search..."
                        autosuggest={true}
                        size={5}
                        className="searchbar"
                        onValueSelected={(value, cause, source) => {
                            if (cause === 'SUGGESTION_SELECT') {
                              handleKontextSelection(source._id, value);
                                
                            }
                            
                          }}
                        />
                        
                        </Box>

                        {kontextChips.map((object) => {
                            return(  <Chip style={{marginTop: 10, mr: 10}} id =  {object.value}
                                label = {object.name} deleteIcon={<CancelIcon onMouseDown = {(e) => e.stopPropagation()}></CancelIcon>} onDelete={(e) => handleKontextDelete(e, object.value)}
                            />)}
                        )} 
                 </Paper>   
            </Stack>
        </div>
        </Styles>
    )
}