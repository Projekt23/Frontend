import React, {useEffect, useState} from "react";
import Data from "./EditObject/EditObjectsData"
import style from "./LexikonComponents/Lexikon.module.css";
import {Autocomplete, Paper, Card, Divider, Stack, TextField, Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Button from "@mui/material/Button";
import Chip from "@material-ui/core/Chip";
import {Grid} from "@material-ui/core";
import { isExpired, decodeToken } from "react-jwt";
import { DataSearch } from "@appbaseio/reactivesearch";
import {useNavigate} from "react-router-dom";
import { Box } from "@mui/system";
import styled from 'styled-components';
import {ReactiveList} from "@appbaseio/reactivesearch";
import CancelIcon from "@mui/icons-material/Cancel";

const Styles = styled.div`
    .searchbar{
        color: black;
    }
`;


const CardStyle = {
    padding: "20px",
    height: "100%",
    overflow: "auto",
    flexDirection: 'column'
}

const PaperStlye = {
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

const options = [
    { id: "01", name: "Peter" },
    { id: "02", name: "Mary" },
    { id: "03", name: "John" }
]



export default function ObjektAnlegen() {


    const [Labels, setLabels] = useState([])
    const [Objects, setObjects] = useState([])

    //selected Data
    const [selectedName, setSelectedName] = useState("")
    const [selectedLabels, setSelectedLabels] = useState([])
    const [selectedSynonyms, setSelectedSynonyms] = useState([])
    const [selectedDescription, setSelectedDescription] = useState("")
    const [selectedKontext, setSelectedKontext] = useState([])
    const navigate = useNavigate();
    const [synonymChips, setSynonymChips] = useState([])
    const [kontextChips, setKontextChips] = useState([])
    const handleNameSelection = (event, value) => setSelectedName(value)
    const handleLabelSelection = (event, value) => setSelectedLabels(value);
    const handleSynonymSelection = (value, name) => {
        var selectedSynonymIds = []
        selectedSynonymIds.push(value)
        synonymChips.push({"value" : value, "name" : name})
        
        setSelectedSynonyms(selectedSynonymIds)};
    const handleDesciptionSelection = (event, value) => setSelectedDescription(value)
    const handleKontextSelection = (value, name) => {
        var selectedKontextIds = []
        selectedKontextIds.push(value)
        kontextChips.push({"value" : value, "name" : name})
        
        setSelectedKontext(selectedKontextIds)};
    

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
                },
            )
    }, [])
    const handleSynonymDelete = (e, value) => {
        setSynonymChips(synonymChips.filter((synonym) => synonym.value !== value))
      }
      const handleKontextDelete = (e, value) => {
        setKontextChips(kontextChips.filter((kontext) => kontext.value !== value))
      }
    const LabelData = Labels.map((labels) =>{
        return(labels.name)
    })
    let optionsData = [];
    const ObjectData = Objects.map((objects) =>{
       return optionsData = {id: objects.id, name: objects.name}
    })

    function PublishData() {      
        
        console.log(synonymChips)
        var synonymIds = []
        synonymChips.map((element) => {
            synonymIds.push(element.value)
            
        }
        
        )
        
        console.log(synonymIds)
       
        console.log(synonymChips)
        var kontextIds = []
        kontextChips.map((element) => {
            kontextIds.push(element.value)
            
        }
        
        )
        


        const server = process.env.REACT_APP_API_BACKEND;
        var id = decodeToken(localStorage.getItem("userID")).id;
        fetch(server + '/businessobject?userId='+id+'', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        body: JSON.stringify({
            "name": selectedName,
            "description": selectedDescription,
            "synonymIds": synonymIds,
            "labels": selectedLabels,
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
    function getUnique(arr, index) {

        const unique = arr
             .map(e => e[index])
      
             // store the keys of the unique objects
             .map((e, i, final) => final.indexOf(e) === i && i)
      
             // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);      
      
         return unique;
      }
    function generateDescription() {
        if (selectedName !== "") {
            const serverKI = "http://88.214.57.111:5001";
            console.log(serverKI+ '/descriptgen/generatedescription');
            fetch(serverKI + '/descriptgen/generatedescription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                },
                body: JSON.stringify({
                     "term": selectedName
                })
            }).then(responseKI => {
                responseKI.text().then(value => {
                    console.log(JSON.parse(value))
                    const generatedDescription = JSON.parse(value);
                    console.log(generatedDescription.summary)
                    setSelectedDescription(generatedDescription.summary);
                }).catch(err => {
                    console.log(err);
                });
            });
        } else {
            alert("Bitte Objekt Namen einfügen und erneut versuchen")
        }
    }

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
                    <Typography color= "textPrimary" variant={"h4"}>Objekt anlegen</Typography>
                    <Stack direction="row" spacing={2} style={ButtonStyle} alignItems={"center"}>
                        <Button variant={"contained"} onClick={() => navigate("/lexikon")} style={{backgroundColor: "grey"}}><CloseIcon/> Abbrechen</Button>
                        <Button variant={"contained"} onClick={() => PublishData}><SaveIcon/> Veröffentlichen</Button>
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
                                onChange = {(e) => {setSelectedName(e.target.value)}}
                            />
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
                                        <Chip  variant="outlined" label={data} {...getTagProps({index})} />
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
                <Paper style={PaperStlye} >
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
                            <Stack direction="column" spacing={2} >
                                <Typography variant={"h6"}>Begriffsabgrenzung</Typography>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Begriffsabgrenzung eingeben ..."
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={selectedDescription}
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
                
                <Paper style={PaperStlye} >
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