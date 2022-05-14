import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ViewModule } from "@material-ui/icons";


export default function (props) {
    const [expanded, setExpanded] = React.useState(false);
    const [fav, setFav] = React.useState(props.favorite);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    function changeFavorite(favorite) {
        if(favorite === true){
            setFav(false);
        }
        else{
            setFav(true);
        }
    }
    // checks if object is marked as favorite
    function checkFavorite(favorite) {
        if (favorite === true) {
            return (
                <IconButton aria-label="delete" onClick={() => {changeFavorite(favorite);}}>
                    <FavoriteIcon/>
                </IconButton>
            )
        } else {
            return (
                <IconButton aria-label="delete" onClick={() => {changeFavorite(favorite);}}>
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

    return (
        <div>
            <div>
                <Accordion key={props.id} expanded={expanded === props.id} onChange={handleChange(props.id)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls={props.id}
                        id={props.id}
                    >
                        <Typography sx={{width: '33%', flexShrink: 0}}>
                            {props.title}
                        </Typography>
                        <div style={AccordionSummaryText}>
                            <Typography sx={{color: 'text.secondary'}}>Synonyme: {props.description}</Typography>
                            {checkFavorite(fav)}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Divider/>
                        <div style={AccordionDetailsText}>
                            <Typography variant={"h5"}>Begriffsabgrenzung</Typography>
                            <br/>
                            <Typography>{props.details}</Typography>
                        </div>
                        <Divider/>
                        <div style={AccordionFooter}>
                            <Button variant={"contained"} component={Link} to={{pathname: "/result", hash: String(props.id)}}>Zur Detailseite</Button>
                            {/*                            <div>
                                <Stack direction={"row"} spacing={1}>
                                    {props.systems.map(system => (
                                        <Chip  label= {system}/>
                                    ))}
                                </Stack>
                            </div>*/}
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}
