import { motion } from "framer-motion"
import styled from "styled-components"

const Wrapper = styled.div`
    background : black;
`

const Loader = styled.div`
    height : 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Banner = styled.div<{bgphoto : string}>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center ;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)) ,url(${(props)=>props.bgphoto});
    background-size: cover;
`
const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 10px;
`
const Overview = styled.p`
    font-size: 30px;
    width : 50%;
`

const Slider = styled.div`
    position: relative;
    top : -100px;
`
const Box = styled(motion.div)<{bgphoto : string}>`
    background-color: white;
    background-image: url(${(props)=>props.bgphoto});
    background-size: cover;
    background-position: center center;    
    height: 200px;
    font-size: 68px;
    cursor: pointer;
    &:first-child{
        transform-origin: center left;
    }
    &:last-child{
        transform-origin: center right;
    }
    
`
const Row = styled(motion.div)`
    display: grid;
    gap : 5px;
    width : 100%;
    grid-template-columns: repeat(6,1fr);    
    position: absolute;    
`


const Info = styled(motion.div)`
    padding: 10px;
    opacity: 0;
    position: absolute;
    width : 100%;
    bottom:0;
    background-color: ${(props)=>props.theme.black.lighter};
    h4{
        text-align: center;
        font-size: 18px;
    }
`

export { Wrapper, Row, Title, Overview, Box, Loader, Banner, Slider,Info}