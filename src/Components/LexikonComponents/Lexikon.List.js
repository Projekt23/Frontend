import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Divider, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";


export default function () {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const AccordionExpandButtons = {
        marginTop: "30px",
        marginBottom: "30px",
    }

    const accordionDetailsText = {
        marginTop: "30px",
        marginBottom: "30px"
    }

    const AccordionDetailsButtons = {
        marginTop: "15px"
    }

    return (
        <div>
            <div style={AccordionExpandButtons}>
                <Stack spacing={2} direction="row">
                    <Button variant={"contained"}>Alle aufklappen</Button>
                    <Button variant={"contained"}>Alle zuklappen</Button>
                </Stack>
            </div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0 }}>
                        Kundenauftrag
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}}>Synonyme: Amt, Anordnung, Anweisung, Aufgabe</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider/>
                    <div style={accordionDetailsText}>
                    <Typography variant={"h5"}>Begriffsabgrenzung</Typography>
                    <Typography>Der Auftrag ist in der Rechtswissenschaft ein Vertrag zwischen einem Auftraggeber und einem Auftragnehmer, bei dem sich letzterer verpflichtet, das ihm übertragene Geschäft unentgeltlich zu besorgen...</Typography>
                    </div>
                    <Divider/>
                    <Button variant={"contained"} style={AccordionDetailsButtons}>Zur Detailseite</Button>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>Users</Typography>
                    <Typography sx={{color: 'text.secondary'}}>
                        You are currently not an owner
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                        varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                        laoreet.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>
                        Advanced settings
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}}>
                        Filtering has been entirely disabled for whole web server
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>Personal data</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
