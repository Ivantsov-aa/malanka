import styled from "styled-components";
import { FlexWrap } from "../FlexWrap/FlexWrap";

export const Shop247Styled = styled.main`
    max-width: 1720px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px 128px;

    h2 {
        margin: 32px 0 16px;
    }

    @media (max-width: 1024px) {
        padding-bottom: 64px;
    }

    @media (max-width: 768px) {
        padding-bottom: 32px;
    }
`;

export const Shop247MessageBlock = styled(FlexWrap)`
    background: ${props => props.dark ? 'rgba(0, 0, 0, .7)' : 'linear-gradient(90.32deg, rgba(132, 196, 94, 0.8) 33.05%, rgba(132, 196, 94, 0.4) 113.44%)'};
    border-radius: 30px;
    padding: ${props => props.padding ? '16px' : '0 16px 0 0'};
    color: #fff;
    align-self: ${props => props.self};
    height: 150px;
    max-width: ${props => props.maxWidth};
    opacity: 0;
    transition: opacity .2s ease; 

    img {
        height: 118px;
    }

    p {
        span {
            display: block;
            color: #84C45E;
            
            &.upper {
                font-weight: 700;
                text-transform: uppercase;
            }
        }

        &.count {
            font-weight: 900;
            font-size: 215px;
        }
    }

    @media (max-width: 600px) {
        max-width: 100%;
        height: auto;
    
        img {
            height: 60px;
        }

        p {
            &.count {
                font-size: 120px;
            }
        }
    }
`;