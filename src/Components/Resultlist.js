/*------------------------------------------------------------Necessary imports------------------------------------------------------------------------------------------------*/
import React, { useEffect } from 'react'
import { ReactiveList, ResultList } from "@appbaseio/reactivesearch";
import { Container, Accordion, AccordionSummary, Typography, Stack, Chip, AccordionDetails, Button, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import styled from 'styled-components';
import { Label } from '@material-ui/icons';
import SearchResult from './SearchResult';
import { func } from 'prop-types';
import { Subscriptions } from '@mui/icons-material';

/*------------------------------------------------------------Styles of UserDropDownSettings------------------------------------------------------------------------------------*/
const Styles = styled.div`


.test{
    margin-top: 5px;
    border-color: black;
    border: 1px solid #ccc;
    
}

.divider{
    color: #C4C4CC;
}

`;

function getSearchValue(){
    var element = document.getElementById('q-downshift-input').value
    var value = element.value; 
    console.log(value)
    return value;
}

const Resultlist = (props) => {
    const navigate = useNavigate()
    const redirect = (e, id) => {
        e.preventDefault();
        navigate("/results#" + id);
    }

    
    
    const [expand, setExpand] = React.useState(props.expand);
    const toggleAcordion = () => {
        setExpand((prev) => !prev);
    };

    useEffect(() => {
        setExpand(props.expand)
    }, [props.expand])

 
    const [expanded, setExpanded] = React.useState(false);
    const [fav, setFav] = React.useState(props.favorite);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


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
        <Styles>
            <Container sx={{ mt: 3 }} >

                <Typography sx={{ mb: 1 }} align='left' variant="h4" component="h2"> Suchergebnisse:   </Typography>
                <Divider sx={{ mb: 3 }}></Divider> 

         
               
                <ReactiveList
                    componentId="SearchResult"
                    dataField="name"
                    size={10}
                    className="result-list-container"
                    showResultStats={false}
                    pagination={true}
                    paginationAt="bottom"
                    react={{
                        and: "q"
                    }}
                    render={({ data, value }) => (
                       
                        data.map(item => (
                            
                            <Accordion key={item._id} >
                                <AccordionSummary
                                    
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    {/* {setsearchValue(value)} */}
                                    {console.log(value)}
                                    <Typography sx={{ width: '33%', flexShrink: 0 }} >
                                        {item.name}
                                    </Typography>
                                    <div style={AccordionSummaryText}>
                                        <div>
                                            <Stack direction={"row"} spacing={1} alignItems="center">
                                                <Typography>
                                                    Synonyme:
                                                </Typography>

                                            </Stack>
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Divider />
                                    <div style={AccordionDetailsText}>
                                        <Typography variant={"h5"}>Begriffsabgrenzung</Typography>
                                        <br />
                                        <Typography key={item._id}> {item.description} </Typography>
                                    </div>
                                    <Divider />
                                    <div style={AccordionFooter}>
                                        <Button variant={"contained"} component={Link} to={{ pathname: "/result", hash: String(item._id) }}>Zur Detailseite</Button>
                                        <div>
                                          <Stack direction={"row"} spacing={1}>
                                                <Chip label={item.label}></Chip>
                                            </Stack> 
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    )}
                />
            </Container>
        </Styles>
    );
}


export default Resultlist



