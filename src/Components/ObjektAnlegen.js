import React from "react";
import style from "./LexikonComponents/Lexikon.module.css";
import {
    Card,
    Divider,
    Stack,
    TextField,
    Typography
} from "@mui/material";


const CardStyle = {
    padding: "20px",
}

export default function ObjektAnlegen(){
        return (
            <div className={style.containerMain}>
                <div className={style.headerRow}>
                    <Typography variant={"h4"}>Objekt anlegen</Typography>
                </div>
                <Divider style={{marginBottom: 15}}/>
                <Stack direction="column" spacing={2}>
                    <Card style={CardStyle}>
                        <Typography variant={"h6"}>Name</Typography>
                        <TextField id="standard-basic" label="Objekt Name" variant="standard"/>
                    </Card>
                    <Card style={CardStyle}>
                        <Typography variant={"h6"}>Synonyme </Typography>
                    </Card>
                    <Card style={CardStyle}>
                        <Typography variant={"h6"}>Begriffsabgrenzung </Typography>
                    </Card>
                    <Card style={CardStyle}>
                        <Typography variant={"h6"}>Kontext</Typography>
                    </Card>
                </Stack>
            </div>
        )
    }