import React, { useState } from 'react'
import { DataSearch } from "@appbaseio/reactivesearch";
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Styles = styled.div`
    .searchbar{
        color: black;
    }
`;

function Searchbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchValue, setSearchValue] = useState()


    const redirect = () => {
        console.log("url = " + location.pathname)
        if (location.pathname.toLowerCase() !== "/resultlist") {
            navigate("/resultlist");
            var element = document.getElementById('q-downshift-input').value
            setSearchValue(element.value) ; 
        }
    }
  return (
    <Styles>
    <DataSearch
        componentId="q"
        dataField="name"
        placeholder="Search..."
        autosuggest={true}
        size={5}
        URLParams={true}
        onValueSelected={redirect}
        className="searchbar"
    />
    </Styles>
  )
 }

export default Searchbar

