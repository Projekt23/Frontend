import React from "react";
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
        console.log(props.labels)
      setExpand((prev) => !prev);
    };

    const [expanded, setExpanded] = React.useState(false);
    const [fav, setFav] = React.useState(props.favorite);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    function changeFavorite(favorite, accordionId) {
        if(favorite === true){

            setFav(false);
        }
        else{
            setFav(true);
        }
    }
    // checks if object is marked as favorite
    function checkFavorite(favorite, accordionId) {
        if (favorite === true) {
            return (
                <IconButton aria-label="delete" onClick={() => {changeFavorite(favorite, accordionId);toggleAcordion()}}>
                    <FavoriteIcon />
                </IconButton>
            )
        } else {
            return (
                <IconButton aria-label="delete" onClick={() => {changeFavorite(favorite, accordionId);toggleAcordion()}}>
                    <FavoriteBorderIcon />
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

    return (
        <div>
            <div>
                <Accordion id={props.id} expanded={expand} onChange={handleChange(props.id)} onClick= {toggleAcordion}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls={props.id}
                        
                    >
                        <Typography sx={{width: '33%', flexShrink: 0}} key={props.id}>
                            {props.name}
                        </Typography>
                        <div style={AccordionSummaryText}>
                            <div>
                                <Stack direction={"row"} spacing={1} alignItems="center">
                                    <Typography sx={{color: 'text.secondary'}}>
                                        Synonyme:
                                    </Typography>
                                    {props.synonyms.map(synonym => (
                                        // <Typography key={synonym.id}>{synonym.name}</Typography>
                                        <Chip key={synonym.id} label={synonym.name} color={"primary"}/>
                                    ))}
                                </Stack>
                            </div>
                            {checkFavorite(fav, props.id)}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Divider/>
                        <div style={AccordionDetailsText}>
                            <Typography variant={"h5"}>Begriffsabgrenzung</Typography>
                            <br/>
                            <Typography key={props.id}>{props.description}</Typography>
                        </div>
                        <Divider/>
                        <div style={AccordionFooter}>
                            <Button variant={"contained"} component={Link} to={{pathname: "/result", hash: String(props.id)}}>Zur Detailseite</Button>
                            <div>
                                <Stack direction={"row"} spacing={1}>
                                    {props.labels.map(label => (
                                        <Chip key={label.id} label={label.name}/>
                                    ))}
                                </Stack>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}
