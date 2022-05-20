import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Divider, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@material-ui/core/Chip";


export default function (props) {
    const [expand, setExpand] = React.useState(false);
    const toggleAcordion = () => {

        setExpand((prev) => !prev);
    };

    const [expanded, setExpanded] = React.useState(false);
    const [fav, setFav] = React.useState(props.favorite);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function changeFavorite(favorite, accordionId) {
        if (favorite === true) {

            setFav(false);
        } else {
            setFav(true);
        }
    }

    // checks if object is marked as favorite
    function checkFavorite(favorite, accordionId) {
        if (favorite === true) {
            return (
                <IconButton aria-label="delete" onClick={() => {
                    changeFavorite(favorite, accordionId);
                    toggleAcordion()
                }}>
                    <FavoriteIcon/>
                </IconButton>
            )
        } else {
            return (
                <IconButton aria-label="delete" onClick={() => {
                    changeFavorite(favorite, accordionId);
                    toggleAcordion()
                }}>
                    <FavoriteBorderIcon/>
                </IconButton>
            )
        }
    }

    const AccordionSummaryText = {
        width: "100%",
        display: "flex",
        justifyContent: "space-between"

    }

    const AccordionDetailsText = {
        marginTop: "30px",
        marginBottom: "30px"
    }

    const AccordionFooter = {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px",
    }

    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const server = "http://88.214.57.111:8081/api";
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
                (data) => {
                    setObjects(data);
                    console.log(data);
                },
            )
    }, [])


    return (
        <div>
            {
                objects.map(object => (
                    <Accordion id={object.id} key={object.id} expanded={expand} onChange={handleChange(object.id)}
                               onClick={toggleAcordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls={object.id}

                        >
                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                {object.name}
                            </Typography>
                            <div style={AccordionSummaryText}>
                                <Typography sx={{color: 'text.secondary'}}>Synonyme: {object.description}</Typography>
                                {checkFavorite(fav, object.id)}
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider/>
                            <div style={AccordionDetailsText}>
                                <Typography variant={"h5"}>Begriffsabgrenzung</Typography>
                                <br/>
                                <Typography>{object.description}</Typography>
                            </div>
                            <Divider/>
                            <div style={AccordionFooter}>
                                <Button variant={"contained"} component={Link}
                                        to={{pathname: "/result", hash: String(object.id)}}>Zur Detailseite</Button>
                                <div>
                                <Stack direction={"row"} spacing={1}>
                                    {object.labels.map(label => (
                                        <Chip  id= {label.id} label= {label.name}/>
                                    ))}
                                </Stack>
                            </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div>
    );
}
