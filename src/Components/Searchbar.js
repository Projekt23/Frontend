import React from 'react'
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

    const redirect = () => {
        if (location.pathname !== '/resultlist') {
            navigate("/resultlist");
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

