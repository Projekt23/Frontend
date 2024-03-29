import React from "react" 
import { Box,sizing } from "@mui/system"
import { styled } from '@mui/material/styles';
import { Grid, Paper, Card, Container, Typography, Divider } from "@mui/material";
import {ListItem, ListItemText, ListItemButton} from "@mui/material"
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SettingsNav from "./SettingsComponents/SettingsNav";

export default function Settings() {
    var theme;
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? 'primary' : 'primary',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '450%'
      }));

  return (
    <SettingsNav />
    
  );
}