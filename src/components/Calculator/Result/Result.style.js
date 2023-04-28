import styled from "styled-components";
import { FlexWrap } from "../../FlexWrap/FlexWrap";

export const ResultStyled = styled(FlexWrap)`
    @media (max-width: 768px) {

        >div:first-child {
            flex-direction: column;
        }
    }
`;

export const ResultProfitStyled = styled(FlexWrap)`
    .img__wrapper {
        min-width: 60px;
        max-width: 60px;
        height: 60px;
        border: 2.66667px solid #76D275;
        border-radius: 50%;
    }

`;