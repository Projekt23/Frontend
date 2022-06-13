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


    const redirect = (value) => {
        console.log("url = " + location.pathname)
        if( value === ""){
            navigate("/Lexikon?q=" + value );
        }else{
            navigate("/resultlist?q=" + value );
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
        onValueSelected={
            function(value){
                console.log(value)
                redirect(value)
            }
            
           
        }
        className="searchbar"
    />
    </Styles>
  )
 }

export default Searchbar

