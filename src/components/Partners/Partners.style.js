import { Link } from "react-router-dom";
import styled from "styled-components";

export const PartnersContainer = styled.main`
    max-width: 1720px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px 128px;

    h2 {
        margin: 32px 0;
    }

    .categories-container {
        gap: 16px;
        overflow-x: auto;
    }

    @media (max-width: 1024px) {
        padding-bottom: 64px;
    }

    @media (max-width: 768px) {
        padding-bottom: 32px;
    }
`;

export const DirectionLink = styled(Link)`
    padding: 24px;
    font-size: 16px;
    line-height: 24px;
    max-width: calc((100% / 3) - (64px / 3));
    min-width: 280px;
    border: 1px solid #fff;
    border-radius: 6px;
    max-height: max-content;

    &:hover {
        color: #000;
        border-color: #00902A;
        box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.11);
    }
    
    @media (max-width: 1024px) {
        color: #000;
        border-color: #00902A;
        box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.11);
        padding: 16px;
    }
`;

export const ListItem = styled.li`
    &:before {
        background: url('/images/svg/green-checked.svg') no-repeat center;
        max-width: 30px;
        margin: 0;
        width: 100%;
        height: 30px;
        border-radius: none;
    }

    img {
        max-width: 400px;
        max-height: 400px;
    }
`;