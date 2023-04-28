import React from "react";
import { FlexWrapStyled } from "./FlexWrap.style";

export const FlexWrap = (props) => {
    return (
        <FlexWrapStyled {...props}> {props.children}</FlexWrapStyled >
    )
}