import React from "react";
import Data from "./EditObject/EditObjectsData"
import style from "./LexikonComponents/Lexikon.module.css";
import {Autocomplete, Card, Divider, Stack, TextField, Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Button from "@mui/material/Button";
import Chip from "@material-ui/core/Chip";
import {Grid} from "@material-ui/core";


const CardStyle = {
    padding: "20px",
}

const NameColumn = {
    width: "15%",
    minWidth: "200px",
}

const DescriptionCard = {
    maxWidth: "35vw",
    minWidth: "500px"

}

export default function ObjektAnlegen() {
    //Input Field function
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={style.containerMain}>
            <div className={style.headerRow}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant={"h4"}>Objekt anlegen</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant={"contained"} style={{backgroundColor: "grey"}}><CloseIcon/> Abbrechen</Button>
                        <Button variant={"contained"}><SaveIcon/> Veröffentlichen</Button>
                    </Stack>
                </Grid>

            </div>
            <Divider style={{marginBottom: 15}}/>
            <Stack direction="column" spacing={2}>
                <Card style={CardStyle}>
                    <Typography variant={"h6"}>Name</Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <TextField id="standard-basic" label="Objekt Name" variant="standard"/>
                        <div style={NameColumn}>
                            <Autocomplete
                                fullWidth={true}
                                multiple
                                id="tags"
                                options={Data.map((data) => data.label)}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                    value.map((data, index) => (
                                        <Chip variant="outlined" label={data} {...getTagProps({index})} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Eintragen der Tags"
                                        placeholder="..."
                                    />
                                )}
                            />
                        </div>
                    </Grid>
                </Card>
                <Card style={CardStyle}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant={"h6"}>Synonyme </Typography>
                        <Autocomplete
                            multiple
                            id="synonyme"
                            options={Data.map((data) => data.label)}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((data, index) => (
                                    <Chip variant="outlined" label={data} {...getTagProps({index})} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Eintragen der Synonyme"
                                    placeholder="..."
                                />
                            )}
                        />
                    </Stack>
                </Card>
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
                                    label="Text einfügen ..."
                                    multiline
                                    rows={4}
                                    value={value}
                                    onChange={handleChange}
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
                                        <Button aria-label="autoGenerate" variant={"contained"}>
                                            <InfoIcon/>
                                                Automatisch generieren ...
                                        </Button>
                                    </div>
                                    </Stack>
                                </Card>
                        </div>
                    </Grid>
                </Card>
                <Card style={CardStyle}>
                    <Stack direction={"column"} spacing={2}>
                        <Typography variant={"h6"}>Kontext</Typography>
                        <Autocomplete
                            fullWidth={true}
                            multiple
                            id="tags"
                            options={Data.map((data) => data.label)}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((data, index) => (
                                    <Chip variant="outlined" label={data} {...getTagProps({index})} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Eintragen des Kontexts"
                                    placeholder="..."
                                />
                            )}
                        />
                    </Stack>
                </Card>
            </Stack>
        </div>
    )
}