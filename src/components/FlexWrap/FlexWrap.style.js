import styled from "styled-components";

export const FlexWrapStyled = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: ${props => props.direction};
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    gap: ${props => props.gap}px;
    text-align: ${props => props.textAlign};
    flex-wrap: ${props => props.wrap ? 'wrap' : ''};
`