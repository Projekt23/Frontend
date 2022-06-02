import React from 'react'
import { DataSearch } from "@appbaseio/reactivesearch";
import { useLocation, useNavigate } from "react-router-dom"

function Searchbar() {
    const navigate = useNavigate()
    const location = useLocation()

    /*
    * @description: If the current path is not "search" it redirects to this path.
    * @params:  -
    * @return:  Return DataSearch
    */
    const redirect = () => {
        if (location.pathname !== '/resultlist') {
            navigate("/resultlist");
        }
    }
  return (
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
  )
}

export default Searchbar

