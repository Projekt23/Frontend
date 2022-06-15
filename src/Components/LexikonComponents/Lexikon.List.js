import React, { useEffect } from "react";
import {Accordion, AccordionDetails, AccordionSummary, Divider, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@material-ui/core/Chip";
import { isExpired, decodeToken } from "react-jwt";
export default function (props) {
    const [expand, setExpand] = React.useState(props.expand);
    const toggleAcordion = () => {
      setExpand((prev) => !prev);
    };

    useEffect(() => {
        setExpand(props.expand)
    }, [props.reload])
    
    const navigate = useNavigate();
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
                <IconButton aria-label="delete" onClick={() => {
                    
                    deleteFavorite();
                    changeFavorite(favorite, accordionId);
                    toggleAcordion()}}>
                    <FavoriteIcon />
                </IconButton>
            )
        } else {
            return (
                <IconButton aria-label="delete" onClick={() => {
                    setFavorite();
                    changeFavorite(favorite, accordionId);
                    toggleAcordion()}}>
                    <FavoriteBorderIcon />
                </IconButton>
            )
        }
    }
    
    function deleteFavorite(){
        const server = process.env.REACT_APP_API_BACKEND;
        var userId = decodeToken(localStorage.getItem("userID")).id;
        fetch(server + '/favourite/' + userId +'/'+props.id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        })
        .then(response => {
        response.text().then(value => {
            }).catch(err => {
            console.log(err);
            });
        });
    }

    function setFavorite(){
        const server = process.env.REACT_APP_API_BACKEND;
        var userId = decodeToken(localStorage.getItem("userID")).id;
        fetch(server + '/favourite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        body: JSON.stringify({
            "userId": userId,
            "businessObjectId": props.id
        })
        })
        .then(response => {
        response.text().then(value => {
            }).catch(err => {
            console.log(err);
            });
        });
    }

    function labelCheck(){
       
    if(props.labels === null)  {
        return
    }
     return(
        props.labels.map(element => 
            ( <Chip key={element} label={element} color={"primary"}/>)
         )
        )
    }
    
    function synonymCheck(){
      
        if(props.synonyms === null)  {
            return
        }
         return(
            props.synonyms.map(synonym => 
                ( <Chip key={synonym.id} label={synonym.name} color={"primary"}/>)
             )
            )
       
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
                                    {synonymCheck()}
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
                            <Typography key={props.id}>{props.details}</Typography>
                        </div>
                        <Divider/>
                        <div style={AccordionFooter}>
                            <Button variant={"contained"} onClick={() => navigate("/result#" + String(props.id))}>Zur Detailseite</Button>
                            <div>
                                <Stack direction={"row"} spacing={1}>
                                    {labelCheck()}
                                </Stack>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}
