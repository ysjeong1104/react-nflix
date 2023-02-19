import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMovies } from "../api/movie_api";
import { IMovie, IMoviesResult } from "../interface/interface";
import { makeImgPath } from "../lib/common";
import { AnimatePresence, useScroll } from "framer-motion";
import { Banner, Box, Info, Loader, Overview, Row, Slider, Title, Wrapper } from "../styles/HomeStyle";
import { useMatch, useNavigate,  Outlet } from "react-router-dom";

const rowVariants={
    hidden : {
        x : window.innerWidth,
    },
    visible : {
        x : 0,
    },
    exit : {
        x : -window.innerWidth,
    }
}

const boxVariants={
    normal : {
        scale : 1
    },
    hover : {
        zIndex : 99,
        scale : 1.3,
        y : -50,
        transition : {delay : 0.3,duration : 0.2,type:"tween"}
    }
}

const infoVariant={
    hover : {opacity : 1}
}

const Home=()=>{
    const {data, isLoading} = useQuery<IMoviesResult>(["movies", "nowPlaying"],getMovies);
    const bigMovieMatch = useMatch("/movies/:movieId");    
    
    //console.log(bigMovieMatch)
    //const [index,setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);    
    const [maxPageNum,setMaxPageNum] = useState(0);
    const [page, setPage] =  useState(0);
    const navigate = useNavigate()
    const {scrollY} = useScroll();
    const offset = 6;

    const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find((movie)=>movie.id === Number(bigMovieMatch.params.movieId));
    
    const [movieArray, setMovieArray] = useState<IMovie[]>();

    useEffect(()=>{
        setMaxPageNum( Math.floor(data ? data.results.slice(1).length/offset : 1) -1)
        //console.log(maxPageNum);
        setMovieArray([...data?.results ? data?.results.slice(1).slice(page*offset,page*offset+offset) : [] ]);
      
    },[isLoading,page,data]);
   
    const incresePage=()=> {
        if(data){
            if(leaving) return;
            toggleLeaving();
            setPage((prev)=> prev === maxPageNum ? 0 : ++prev)
        }
    }

    const decresePage=()=> setPage((prev)=> --prev);
    
    const toggleLeaving=()=>{
        setLeaving((prev)=> !prev);
    }
    
    const onBoxClick=(movieId:number)=>{
        navigate(`/movies/${movieId}`)
    }
    return(
        <Wrapper>
        {isLoading ? <Loader>Loading...</Loader> : 
            
            <>
                <Banner onClick={incresePage} bgphoto={makeImgPath(data?.results[0].backdrop_path ? data?.results[0].backdrop_path : ""  ,"original")}>
                    <Title>{data?.results[0].title}</Title>
                    <Overview>{data?.results[0].overview}</Overview>
                </Banner>
                <Slider>   
                    <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                        <Row variants={rowVariants} 
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{type : "tween",duration : 1}}
                            key={page}>
                            { movieArray ?  movieArray.map((movie)=>
                                <Box variants={boxVariants} key={movie.id} layoutId={movie.id+""}
                                    bgphoto={makeImgPath(movie.backdrop_path,"w500")}
                                    initial="normal"
                                    whileHover="hover"
                                    transition={{type:"tween"}}
                                    onClick={()=>onBoxClick(movie.id)}
                                >
                                    <Info variants={infoVariant}><h4>{movie.title}</h4></Info>
                                </Box>
                                )                                 
                                : null 
                            }
                        </Row>
                    </AnimatePresence>                           
                </Slider>
                <AnimatePresence>
                    {bigMovieMatch &&  <Outlet context={{movieId :bigMovieMatch.params.movieId ?? "", positionY : scrollY.get()+50, movieInfo : clickedMovie}}/>}
                </AnimatePresence>
            </>
        }
        </Wrapper>
    )
}

export default Home;