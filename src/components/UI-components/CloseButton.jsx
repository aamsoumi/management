import React from "react";
import "./PaperDetails.css";
// https://react-icons.github.io/react-icons/icons/io5/
import { IoCloseCircleOutline } from "react-icons/io5";
export default function CloseButton({onClick}) {

    return (
        <IoCloseCircleOutline
        name="close-circle-outline"
        aria-label="Close"
        className="btn-x"
        onClick={onClick}
      />
 
    );
}