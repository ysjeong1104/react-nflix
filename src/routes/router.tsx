
import { basename } from "path";
import React, { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import MoviePop from "./Components/MoviePop";
import Home from "./Home";
import Search from "./Search";
import Tv from "./Tv";

const router = createBrowserRouter([

    {
        path : "/",
        element : <Root />,
        children : [
            {
                path : "",
                element : <Home />,
                children :[
                    {
                        path : "movies/:id",
                        element : <MoviePop />
                    },
                ]
            },
            
            {
                path : "tv",
                element : <Tv />
            },
            {
                path:"search",
                element : <Search/>
            }
        ]
    }    

],
{basename : process.env.PUBLIC_URL},
);

export default router;