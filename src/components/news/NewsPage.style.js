import styled from "styled-components";

export const NewsPageParagraph = styled.p`
    position: relative;
    grid-row: ${props => props.row};
    font-weight: ${props => props.weight ? props.weight : 400};
    font-size: ${props => props.size ? props.size : 16}px;
    line-height: 1.55;
    font-style: ${props => props.alignment};
    margin-bottom: ${props => props.marginBottom}px;

    @media (max-width: 768px) {
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
