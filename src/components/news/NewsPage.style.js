import styled from "styled-components";

export const NewsPageParagraph = styled.p`
    position: relative;
    font-weight: ${props => props.weight ? props.weight : 400};
    font-size: ${props => props.size ? props.size : 18}px;
    line-height: ${props => props.size ? props.height : 27}px;

    @media (max-width: 767px) {
        font-weight: ${props => props.weight ? props.weight : 400};
        font-size: ${props => props.size ? props.size - '10%' : 16}px;
        line-height: ${props => props.size ? props.height - '20%' : 20}px;
    }

    .bold {
        font-weight: 700;
    }

    .italic {
        font-style: italic;
    }
`;