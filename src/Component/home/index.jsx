import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import SliderBanner from "../slide";
import Carousel from "../slide";
import Course from "../Courses";
function Home() {
    const navigate = useNavigate();
    function handleNavigate() {
        navigate("/project")
    }
    return (
        <>
            <Carousel/>
            <Course/>
        </>
    )
}
export default Home;
