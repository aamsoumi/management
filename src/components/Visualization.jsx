import React, { useState, useEffect,useRef } from "react";
import * as d3 from "d3";
import ScatterPlot from "./js/Scatterplot";

import papersFile from "../data/papersFile.json";
export default function Visualization() {

    const [data, setData] = useState([]);
    const svgRef = useRef();

    useEffect(() => {
        setData(papersFile.data);
        if(data.length>0)
        {
            const svg = d3.select(svgRef.current)
            ScatterPlot(data,svg)
        }
        else{
         
        }
          },[data])

    return (
        <div>
            <svg width="700" height="700" viewBox ="0 0 1000 1000" ref={svgRef}>
            </svg>
        </div>
    )   }