import React, {useEffect, useState} from "react";
import Data from "./EditObject/EditObjectsData"
import style from "./LexikonComponents/Lexikon.module.css";
import {Autocomplete, Card, Divider, Stack, TextField, Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Button from "@mui/material/Button";
import Chip from "@material-ui/core/Chip";
import {Grid} from "@material-ui/core";
import { isExpired, decodeToken } from "react-jwt";

import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
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


    const [Labels, setLabels] = useState([])
    const [Objects, setObjects] = useState([])
    const [CurrentObjects, setCurrentObjects] = useState([])

    //selected Data
    const [selectedName, setSelectedName] = useState("")
    const [selectedLabels, setSelectedLabels] = useState([])
    const [selectedSynonyms, setSelectedSynonyms] = useState([])
    const [selectedDescription, setSelectedDescription] = useState("")
    const [selectedKontext, setSelectedKontext] = useState([])
    const navigate = useNavigate();

    //current Object
    const location = useLocation();
    const [currentBusinessObjectName, setCurrentBusinessObjectName] = useState("");
    const [currentSynonyms, setCurrentSynonyms] = useState([]);
    const [currentDescription, setCurrentDescription] = useState("");
    const [currentLabels, setCurrentLabels] = useState([]);
    const [currentContextList, setCurrentContextList] = useState([]);
    const [currentBoId, setCurrentBoId] = useState("");

    const handleNameSelection = (event, value) => setSelectedName(value)
    const handleLabelSelection = (event, value) => setSelectedLabels(value);
    const handleSynonymSelection = (value) => {
        var selectedSynonymIds = []
        value.forEach(element => {
        selectedSynonymIds.push(element["id"])
    }); setSelectedSynonyms(selectedSynonymIds)};
    const handleDesciptionSelection = (event, value) => setSelectedDescription(value)
    const handleKontextSelection = (value) => {
        var selectedKontextIds = []
            value.forEach(element => {
            selectedKontextIds.push(element["id"])
    }); setSelectedKontext(selectedKontextIds)};

    useEffect(() => {
        const server = process.env.REACT_APP_API_BACKEND;
        var userId = decodeToken(localStorage.getItem("userID")).id;

        //Get Current Object
        fetch(server+'/businessobject/' + location.hash.replace('#', "") + '?userId='+userId+'', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        })
            .then(response => {
                response.text().then(value => {
                    var responseJSON = JSON.parse(value);
                    setCurrentBusinessObjectName(responseJSON["name"])
                    setCurrentSynonyms(responseJSON["synonyms"])
                    setCurrentDescription(responseJSON["description"])
                    setCurrentLabels(responseJSON["labels"])
                    setCurrentContextList(responseJSON["contextList"])
                    setCurrentBoId(responseJSON["id"])
                }).catch(err => {
                    console.log(err);
                });
            });

            // .then(res => res.json())
            // .then(
            //     (currentObjects) => {
            //         setCurrentObjects(currentObjects);
            //     },
            // )

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

        //Get Objekt Data
        fetch(server + '/businessobject/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
        })
            .then(res => res.json())
            .then(
                (objects) => {
                    setObjects(objects);
                },
            )
    }, [])

    const LabelData = Labels.map((labels) =>{
        return(labels.name)
    })

    let optionsData = [];
    let currentoptionsData = [];

    const ObjectData = Objects.map((objects) =>{
       //return optionsData = {id: objects.id, name: objects.name}
        return {id: objects.id, name: objects.name}
    });

    const CurrentObjectData = currentSynonyms.map((objects) =>{
        return currentoptionsData = {id: objects.id, name: objects.name}
    });

    const [autocompleteValues, setAutocompleteValues] = useState([
        //ObjectData[1]
    ]);

    const handleAutocompleteChange = (event, value) => {
        setAutocompleteValues(value);
    };


    function TestButton() {
        //console.log(Objects);
        console.log(ObjectData);
        console.log(ObjectData[1]);
        console.log(optionsData[1])
        //console.log(CurrentObjects);
        //console.log(currentSynonyms);
        //console.log(CurrentObjectData);
    }

    function TestData() {      
        const server = process.env.REACT_APP_API_BACKEND;
        var id = decodeToken(localStorage.getItem("userID")).id;
        fetch(server + '/businessobject?userId='+id+'', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        body: JSON.stringify({
            "name": selectedName,
            "description": selectedDescription,
            "synonymIds": selectedSynonyms,
            "labels": selectedLabels,
            "contextIds": selectedKontext
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
    //Input Field function
    const [value, setValue] = React.useState('');
    return (
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
                        <Button variant={"contained"} style={{backgroundColor: "grey"}} onClick={TestButton}><CloseIcon/> Abbrechen</Button>
                        <Button variant={"contained"} onClick={TestData}><SaveIcon/> Veröffentlichen</Button>
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
                                onChange = {(event) => {setSelectedName(event.target.value)}}
                            />
                        </Stack>
                        <Stack direction="column" spacing={2} style={NameColumn}>
                            <Typography variant={"h6"}>Labels</Typography>
                            <Autocomplete
                                fullWidth={true}
                                multiple
                                id="labels"
                                options={LabelData}
                                //defaultValue={LabelData.find(v => v.label[0])}
                                onChange={handleLabelSelection}
                                renderTags={(value, getTagProps) =>
                                    value.map((data, index) => (
                                        <Chip variant="outlined" label={data} {...getTagProps({index})} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Labels (z.B. System) auswählen"
                                        placeholder="..."
                                    />
                                )}
                            />
                        </Stack>
                    </Grid>
                </Card>
                <Card style={CardStyle}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant={"h6"}>Synonyme </Typography>
                        <Autocomplete
                            fullWidth={true}
                            multiple
                            id="synonyms"
                            options = {ObjectData}
                            getOptionLabel={(option) => option.name}
                            value={autocompleteValues}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            filterSelectedOptions
                            onChange={handleAutocompleteChange}
                            // onChange={(event, newValue) => {
                            //     handleSynonymSelection(newValue)
                            // }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Synonyme für das Objekt auswählen"
                                />
                            )}
                        />
                    </Stack>
                </Card>
                <Card style={CardStyle}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <div style={DescriptionCard}>
                            <Stack direction="column" spacing={2} >
                                <Typography variant={"h6"}>Begriffsabgrenzung</Typography>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Begriffsabgrenzung eingeben ..."
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    defaultValue={value}
                                    onChange= {(event) => {setSelectedDescription(event.target.value)}}
                                />
                            </Stack>
                        </div>
                        <div style={DescriptionCard}>
                                <Card>
                                    <Stack direction={"column"} spacing={2} alignItems={"flex-start"} >
                                    <div>
                                        <InfoIcon/>
                                        <Typography>
                                            Die Begriffsabgrenzung kann automatisch anhand des Namens generiert werden.
                                            Das automatische Generieren ist nur möglich, wenn das Textfeld leer ist.
                                            Nach der Generierung kann der Text manuell bearbeitet werden.
                                        </Typography>
                                    </div>
                                    <div>
                                        <Button aria-label="autoGenerate" variant={"contained"}>
                                            <InfoIcon/>
                                                Automatisch generieren ...
                                        </Button>
                                    </div>
                                    </Stack>
                                </Card>
                        </div>
                    </Grid>
                </Card>
                <Card style={CardStyle}>
                    <Stack direction={"column"} spacing={2}>
                        <Typography variant={"h6"}>Kontext</Typography>
                        <Autocomplete
                            fullWidth={true}
                            multiple
                            id="context"
                            options = {ObjectData}
                            getOptionLabel={(option) => option["name"]}
                            filterSelectedOptions
                            onChange={(event, newValue) => {
                                handleKontextSelection(newValue)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Objekte im gleichen Kontext auswählen"
                                />
                            )}
                        />
                    </Stack>
                </Card>
            </Stack>
        </div>
    )
}