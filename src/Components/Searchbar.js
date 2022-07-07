import React, { useState } from 'react'
import { DataSearch } from "@appbaseio/reactivesearch";
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Styles = styled.div`
    .searchbar{
        color: black;
    }
`;

//Reactive search Searchbar Coponent
function Searchbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchValue, setSearchValue] = useState()

    // function for redirecting on ResultList Component after pressing enter or hitting the searchbutton
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
                redirect(value)
            }
            
           
        }
        className="searchbar"
    />
    </Styles>
  )
 }

export default Searchbar

