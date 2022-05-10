import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from "./themes.js";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Container, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { sizeHeight } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function createData(content) {
    return { content };
}

function createPageData(page) {
    return { page };
}


// Hier muss noch aufruf backend stattfinden. // String, String, Bool

const rows = [
    createPageData('skonto'),
    createPageData('Rechnung'),
    createPageData('Kunde'),
];

const chips = [
    createData('Salesforce CRM'),
];

export default function SearchResult() {

    const [clicked, setClicked] = useState();
    return (
        <Container maxWidth="auto">
            <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                    <Item
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 1
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'center',
                            }}>
                            <Typography align='left' variant="h5" component="h3"
                                sx={{
                                    mt: 1
                                }}> <b>Auftrag</b> </Typography>
                            <IconButton onClick={() => setClicked(!clicked)} >
                                {clicked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignContent: 'center',
                            }}>
                             {chips.map((chip) => (
                                <Chip label={chip.content} key={chip.content} sx={{
                                    marginRight: 1,
                                    marginY: 'auto'
                                }} />
                            ))}
                            <Button variant="contained" sx={{
                                marginLeft: 1,
                                marginY: 'auto',
                                sizeHeight: 20,
                            }}>
                                <EditIcon />
                            </Button>
                        </Box>
                    </Item >



                    <Item>
                        <Box>
                            <Typography align='left' variant="h6" component="h3"> <b>Synonym: </b> </Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                            <Box>

                            </Box>
                        </Box>
                    </Item>
                    <Item>
                        <Box>
                            <Typography align='left' variant="h6" component="h3"> <b>Begriffsabgrenzung: </b> </Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                            <Box>
                                <Typography align='left' fontSize={14} component="h3">
                                    Der Auftrag ist in der Rechtswissenschaft ein Vertrag zwischen einem Auftraggeber und einem Auftragnehmer, bei dem sich letzterer verpflichtet, das ihm übertragene Geschäft unentgeltlich zu besorgen.
                                    Der allgemeine Sprachgebrauch versteht unter dem Auftrag meist einen durch Bestellung eingeleiteten Kaufvertrag, einen Werkvertrag, ein Kommissionsgeschäft oder die Klienten von Maklern, Architekten oder Kommissionären. Beim Auftrag im Rechtssinne liegt dagegen ein unentgeltlicher Gefälligkeitsvertrag wie bei Schenkung und Leihe vor, bei dem es sich um einen unvollkommen zweiseitig verpflichtenden Vertrag handelt, weil die Hauptleistungspflichten beim Auftragnehmer liegen. Als Auftragnehmer fungieren insbesondere Unternehmen, die hereingenommene Aufträge als Auftragseingang registrieren, einer wichtigen betriebswirtschaftlichen und volkswirtschaftlichen Kennzahl. Aufträge in diesem Sinne sind Kundenaufträge aufgrund eines Vertragsangebots, deren Bearbeitung oder Produktion noch nicht begonnen hat. Unter einem Geschäft ist in diesem Zusammenhang jede beliebige Tätigkeit tatsächlicher oder rechtsgeschäftlicher Art im fremden Interesse zu verstehen. Das aus einem Auftrag herrührende Geschäft muss unentgeltlich, also ohne Gegenleistung des Auftraggebers, erfolgen. </Typography>
                            </Box>
                        </Box>

                    </Item>
                    <Item>
                        <Box>
                            <Typography align='left' variant="h6" component="h3"> <b>Kontext: </b> </Typography>
                            <Divider sx={{ marginBottom: 1 }} />
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignContent: 'center',
                            }}>
                                {rows.map((row) => (
                                    <Button variant="contained"
                                        sx={{ marginRight: 2 }}>
                                        {row.page}
                                    </Button>
                                ))}
                            </Box>
                        </Box>

                    </Item>
                </Stack>
            </Box>
        </Container>


    )


}