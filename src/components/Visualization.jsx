import React, { useState, useEffect,useRef } from "react";
import * as d3 from "d3";
//import ScatterPlot from "./js/Scatterplot";
import ScatterPlotComp from "./js/ScatterplotComp";
import papersFile from "../data/papersFile.json";
export default function Visualization(Props) {

    const svgRef = useRef();

    useEffect(() => {
            const svg = d3.select(svgRef.current)
            ScatterPlotComp({
                axis:svg,
                plotData:Props.data,
                selectedPapers:Props.selectedPapers ,
                setSelectedPapers:Props.setSelectedPapers
            })
    
          },[])

    return (
        <div>
            <svg width="700" height="700" viewBox ="0 0 1000 600" ref={svgRef}>
            </svg>
        </div>
    )   }