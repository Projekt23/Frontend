import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Divider, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@mui/material/Chip";
import data from "./LexikonData";

export default function () {

    // const state = {
    //     LexikonData: [
    //         {
    //             id: 1,
    //             title: "Auftrag",
    //             description: "Amt, Anordnung, Anweisung, Aufgabe",
    //             details: "Der Auftrag ist in der Rechtswissenschaft ein Vertrag zwischen einem Auftraggeber und einem Auftragnehmer, bei dem sich letzterer verpflichtet, das ihm übertragene Geschäft unentgeltlich zu besorgen...",
    //             systems: ["SAP ERP", "Salesforce CRM"],
    //             favorite: true,
    //         },
    //         {
    //             id: 2,
    //             title: "Outsourcing",
    //             description: "Auslagerung",
    //             details: "Der Begriff Outsourcing leitet sich aus “Outside” und “Resourcing” ab und wurde im Umfeld der damals spektakulären Vereinbarung geprägt, welche Eastman Kodak 1989 mit IBM, DEC und Businessland abschloss. Unter ...",
    //             systems: ["SAP ERP"],
    //             favorite: false,
    //         }
    //     ]
    // }

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const expandAll = () => (isExpanded) => {
        for (var i = 0; i < data.length; i++){

        }
    };

    // checks if object is marked as favorite
    function checkFavorite(favorite) {
        if (favorite === true) {
            return (
                <IconButton  aria-label="delete">
                    <FavoriteIcon />
                </IconButton>
            )
        } else {
            return (
                <IconButton  aria-label="delete">
                    <FavoriteBorderIcon />
                </IconButton>
            )
        }
    }

    const AccordionExpandButtons = {
        marginTop: "30px",
        marginBottom: "30px",
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

    const AccordionFooterChip = {
    }



    return (
        <div>
            <div style={AccordionExpandButtons}>
                <Stack spacing={2} direction="row">
                    <Button variant={"contained"} onClick={expandAll}>Alle aufklappen</Button>
                    <Button variant={"contained"}>Alle zuklappen</Button>
                </Stack>
            </div>
            <div>
                {data.map(data => (
                <Accordion key={data.id} expanded={expanded === data.id} onChange={handleChange(data.id)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls={data.id}
                        id={data.id}
                    >
                        <Typography sx={{width: '33%', flexShrink: 0 }}>
                            {data.title}
                        </Typography>
                        <div style={AccordionSummaryText}>
                            <Typography sx={{color: 'text.secondary'}}>Synonyme: {data.description}</Typography>
                            {checkFavorite(data.favorite)}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Divider/>
                        <div style={AccordionDetailsText}>
                            <Typography variant={"h5"}>Begriffsabgrenzung</Typography>
                            <br/>
                            <Typography>{data.details}</Typography>
                        </div>
                        <Divider/>
                        <div style={AccordionFooter}>
                            <Button variant={"contained"} component={Link} to="/result">Zur Detailseite</Button>
                            <div>
                                <Stack direction={"row"} spacing={1}>
                                    {data.systems.map(system => (
                                        <Chip  label= {system} style={AccordionFooterChip}/>
                                    ))}
                                </Stack>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                ))}
            </div>
        </div>
    );
}
