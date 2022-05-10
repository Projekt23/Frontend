// import React from "react";
// import data from "./Lexikon.Data"
// import {Accordion, AccordionDetails, AccordionSummary, Divider} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
//
// export default function () {
//
//     const state = {
//         LexikonData: [
//             {
//                 id: 1,
//                 title: "Auftrag",
//                 description: "Amt, Anordnung, Anweisung, Aufgabe",
//                 details: "Der Auftrag ist in der Rechtswissenschaft ein Vertrag zwischen einem Auftraggeber und einem Auftragnehmer, bei dem sich letzterer verpflichtet, das ihm übertragene Geschäft unentgeltlich zu besorgen..."
//             },
//             {
//                 id: 2,
//                 title: "Outsourcing",
//                 description: "Auslagerung",
//                 details: "Der Begriff Outsourcing leitet sich aus “Outside” und “Resourcing” ab und wurde im Umfeld der damals spektakulären Vereinbarung geprägt, welche Eastman Kodak 1989 mit IBM, DEC und Businessland abschloss. Unter ..."
//             }
//         ]
//     }
//
//     const [expanded, setExpanded] = React.useState(false);
//
//     const handleChange = (panel) => (event, isExpanded) => {
//         setExpanded(isExpanded ? panel : false);
//     };
//
//     const expandAll = (state.LexikonData.map(data => (
//         handleChange(data.id)
//     )))
//
//     const accordionDetailsText = {
//         marginTop: "30px",
//         marginBottom: "30px"
//     }
//
//     const AccordionDetailsButtons = {
//         marginTop: "15px"
//     }
//
//     return(
//         state.LexikonData.map(data => (
//             <Accordion key={data.id} expanded={expanded === data.id} onChange={handleChange(data.id)}>
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon/>}
//                     aria-controls={data.id}
//                     id={data.id}
//                 >
//                     <Typography sx={{width: '33%', flexShrink: 0 }}>
//                         {data.title}
//                     </Typography>
//                     <Typography sx={{color: 'text.secondary'}}>Synonyme: {data.description}</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Divider/>
//                     <div style={accordionDetailsText}>
//                         <Typography variant={"h5"}>Begriffsabgrenzung</Typography>
//                         <br/>
//                         <Typography>{data.details}</Typography>
//                     </div>
//                     <Divider/>
//                     <Button variant={"contained"} style={AccordionDetailsButtons}>Zur Detailseite</Button>
//                 </AccordionDetails>
//             </Accordion>
//         ))
//     )
// }
//
