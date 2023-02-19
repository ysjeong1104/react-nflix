import React from "react";
import { useLocation } from "react-router-dom";

interface IParams{
    keyword : string;
}
const Search=()=>{
    const location = useLocation();    
    const search = new URLSearchParams(location.search);

    console.log(search.get("keyword"));
    console.log(location);
    return(
        <h1>Search</h1>
    )
}

export default Search;