
import React from "react"
import { useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { IMovie } from "../../interface/interface";
import { makeImgPath } from "../../lib/common";

interface IProps{
    movieId : string;
    positionY : number;
    movieInfo : IMovie;
}

const Overlay = styled(motion.div)`
    position: fixed;
    top : 0;
    width : 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(0,0,0,0.5);
`

const BigMovie = styled(motion.div)`
    position: absolute;
    width : 40vw;
    height: 80vh;
    left: 0;
    right : 0;
    margin: 0 auto;
    border-radius: 15px;
    overflow: hidden;
    background-color: ${(props)=>props.theme.black.lighter};
`

const BigCover = styled.div<{bgPhoto : string}>`
    width: 100%;    
    height: 400px;
    background-size: cover;
    background-position: center center;
    background-image: linear-gradient(to top, black,transparent) ,url(${(props)=>props.bgPhoto});
`

const BigTitle = styled.h3`
    color : ${(props) => props.theme.white.lighter};
    padding : 20px;
    font-size: 46px;
    position: relative;
    top : -80px;
`

const BigOverView = styled.p`
    padding: 20px;
    top : -80px;
    position: relative;
    color : ${(props) => props.theme.white.lighter};
`

const MoviePop=()=>{
    
    const {movieId, positionY,movieInfo} = useOutletContext<IProps>();   
    const navigate = useNavigate();
    
    const onOverlayClick=()=>{
        navigate("/");  
    }
    return (    
        <Overlay onClick={onOverlayClick} animate={{opacity : 1}} exit={{opacity : 0}}>    

            <BigMovie style={{top : positionY}} layoutId={movieId}>
            {movieInfo && 
            <>
                <BigCover bgPhoto={makeImgPath(movieInfo.backdrop_path,"w500")}/>
                <BigTitle>{movieInfo.title}</BigTitle>
                <BigOverView>{movieInfo.overview}</BigOverView>
            </>
            }
            </BigMovie>            
        </Overlay>
        
    )
}

export default MoviePop;