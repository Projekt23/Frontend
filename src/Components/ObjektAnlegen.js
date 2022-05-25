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

    //selected Data
    const [selectedLabels, setSelectedLabels] = useState([])
    const [selectedSynonyms, setSelectedSynonyms] = useState([])
    const [selectedKontext, setSelectedKontext] = useState([])

    const [selectedValue, SetSelectedValue] = useState("");

    const handleLabelSelection = (event, value) => setSelectedLabels(value);
    //const handleSynonymSelection = (event, value) => setSelectedSynonyms(value);
    const handleSynonymSelection = (event, newValue) => {
        if (newValue != null) {
            console.log(newValue)
            setSelectedSynonyms(newValue.id)
        }
    };
    const handleKontextSelection = (event, value) => setSelectedKontext(value);

    useEffect(() => {
        const server = process.env.REACT_APP_API_BACKEND;

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
                    console.log(labels);
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
                    console.log(objects);
                },
            )
    }, [])

    const LabelData = Labels.map((labels) =>{
        return(labels.name)
    })

    const ObjectData = Objects.map((objects) =>{
        //return(JSON.stringify({label: objects.name, id: objects.id}))
        return({name: objects.name, id: objects.id})
    })

    function TestData() {
        //console.log(LabelData);
        //console.log(ObjectData);
        console.log(selectedLabels)
        console.log(selectedSynonyms)
        console.log(selectedKontext)
    }

    //Input Field function
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    let output;
    return (
        <div className={style.containerMain}>
            <div className={style.headerRow}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant={"h4"}>Objekt anlegen</Typography>
                    <Stack direction="row" spacing={2} style={ButtonStyle} alignItems={"center"}>
                        <Button variant={"contained"} style={{backgroundColor: "grey"}}><CloseIcon/> Abbrechen</Button>
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
                            <TextField id="standard-basic" label="Objekt Name eintragen" variant="standard"/>
                        </Stack>
                        <Stack direction="column" spacing={2} style={NameColumn}>
                            <Typography variant={"h6"}>Labels</Typography>
                            <Autocomplete
                                fullWidth={true}
                                multiple
                                id="tags"
                                options={LabelData}
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
                            multiple
                            id="synonyme"
                            //options={ObjectData.map((data) => data.name)}
                            options={ObjectData.map((data) => output = JSON.stringify(data.name) )}
                            //getOptionLabel={(option) => `${option.name} -${option.id}`}
                            getOptionLabel={(output) => `${output.name} -${output.id}`}
                            // getOptionLabel={(option) => option.name}
                            onChange={(event, output) => {
                                if (output?.name) {
                                    SetSelectedValue(output.name);
                                    console.log(output)
                                } else {
                                    SetSelectedValue("");
                                }
                            }}
                            inputValue={selectedValue}
                            // getOptionLabel={(ObjectData) => ObjectData.name }
                            // getOptionSelected={(option, value) => option.name === value.name }
                            renderTags={(value, getTagProps) =>
                                value.map((data, index) => (
                                    <Chip variant="outlined" label={data} {...getTagProps({index})} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Synonyme auswählen und mit Enter bestätigen ..."
                                    placeholder="..."
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
                                    value={value}
                                    onChange={handleChange}
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
                            id="tags"
                            options={ObjectData.map((data) => data.name)}
                            onChange={handleKontextSelection}
                            renderTags={(value, getTagProps) =>
                                value.map((data, index) => (
                                    <Chip variant="outlined" label={data} {...getTagProps({index})} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Objekte im gleichen Kontext auswählen"
                                    placeholder="..."
                                />
                            )}
                        />
                    </Stack>
                </Card>
            </Stack>
        </div>
    )
}