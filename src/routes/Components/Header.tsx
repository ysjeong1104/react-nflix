import React, { useEffect, useState } from "react";
import {motion , useAnimation, useScroll} from "framer-motion";
import { Link, useMatch, useNavigate, } from "react-router-dom";
import { Logo, Nav,Col,Items,Item,Search,Circle, Input} from "../../styles/HeaderStyle";
import { useForm } from "react-hook-form";


const logoVariant = {
    normal: {fillOpacity : 1},
    active : {
        fillOpacity : [0,1,0],        
        transition :{
            repeat : Infinity
        }
    }
}

interface IForm {
    keyword : string;
}

const navVariant = {
    top : {
        backgroundColor : "rgba(0,0,0,0)"
    },
    scroll : {
        backgroundColor : "rgba(0,0,0,1)"
    }
}

const Header=()=>{

    const homeMatch = useMatch("/");
    const tvMatch = useMatch("/tv");
    const navigate = useNavigate();
    const {register,handleSubmit} = useForm<IForm>();
    
    const [searchOpen, setSearchOpen] =useState(false);

    const inputAnimation = useAnimation();
    const searchAnimation = useAnimation();
    const navAnimation = useAnimation();
    const {scrollY} = useScroll();

    useEffect(()=>{
        scrollY.on("change",()=>{
            if(scrollY.get() > 80){
                navAnimation.start("scroll");
            }
            else{
                navAnimation.start("top");
            }
        })      
    },[scrollY])
    const toggleSearch  = () =>{      

        if(searchOpen){
           inputAnimation.start({
            scaleX : 0
           });
           searchAnimation.start({
            x : 0,
           });
        }
        else{
            inputAnimation.start({
                scaleX : 1
            });

            searchAnimation.start({
                x : -180,
            })
        }
        setSearchOpen((prev) => !prev);
    }

    const onValid=({keyword} : IForm)=>{

        navigate(`/search?keyword=${keyword}`);
        
    }
    return(
        <Nav 
            variants={navVariant}
            animate={navAnimation}
            initial="top"
        >
            <Logo 
                variants={logoVariant}
                whileHover="active"
                initial="normal"
                xmlns="http://www.w3.org/2000/svg" 
                height="800" 
                width="1200" 
                viewBox="-153.6 -69.1855 1331.2 415.113">
                <motion.path fill="#d81f26" d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676L44.051 119.724v151.073C28.647 272.418 14.594 274.58 0 276.742V0h41.08l56.212 157.021V0h43.511zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461V0h119.724v43.241h-76.482zm237.284-58.104h-44.862V242.15c-14.594 0-29.188 0-43.239.539V43.242h-44.862V0H463.22zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433V0h120.808v43.241h-78.375zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676V0h43.24zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242V0h-42.43zM1024 0l-54.863 131.615L1024 276.742c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75L871.576 0h46.482l28.377 72.699L976.705 0z"/>
            </Logo>
            <Col>
                <Items>
                    <Item>
                        <Link to={{pathname : "/"}}>Home{homeMatch && <Circle layoutId="circle"/> }</Link>
                    </Item>
                    <Item>
                        <Link to={{pathname : "/tv"}}>Tv Shows{tvMatch && <Circle layoutId="circle"/>}</Link>
                    </Item>
                </Items>
            </Col>
            <Col>
                <Search onSubmit={handleSubmit(onValid)}>
                    <motion.svg onClick={toggleSearch}
                        animate={searchAnimation}
                        transition={{type : "linear"}}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    ></path>
                    </motion.svg>                    
                    <Input type='text' 
                        {...register("keyword",{required : true,minLength:2})}
                        animate={inputAnimation}
                        initial={{scaleX : 0}}
                        transition={{type : "linear"}}                        
                        placeholder="Search for movie or tv show."/>                    
                </Search>
            </Col>
        </Nav>
    )
}

export default Header;