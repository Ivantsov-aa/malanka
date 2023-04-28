import styled from "styled-components";
import { ListItem } from "../../Partners.style";
import { FlexWrap } from "../../../FlexWrap/FlexWrap";

export const IntegrationContainer = styled.main`
    max-width: 1720px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px 128px;

    h2 {
        margin: 32px 0;
    }

    @media (max-width: 1024px) {
        padding-bottom: 64px;
    }

    @media (max-width: 768px) {
        padding-bottom: 32px;
    }

    .form-block__wrapper {
        display: grid;
        grid-template-columns: repeat(2, calc(50% - 32px));
        gap: 32px;

        img { 
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 6px;
        }

        @media (max-width: 1024px) {
            grid-template-columns: 100%;
        }
    }
`;

export const IntegrationRateButton = styled.button`
    padding: 32px 24px;
    font-size: 16px;
    line-height: 24px;
    max-width: calc((100% / 3) - (64px / 3));
    min-width: 280px;
    border: 1px solid #fff;
    border-radius: 6px;

    &:hover {
        color: #000;
        border-color: #00902A;
        box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.11);
    }

    &.active {
        color: #000;
        border-color: #00902A;
        box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.11);
    }

    h3 {
        span {
            color: #00902A;
        }
    }

    @media (max-width: 1024px) {
        padding: 16px;
    }
`;

export const IntegrationList = styled(FlexWrap)`
    @media (max-width: 1024px) {
        overflow-x: auto;
    }
`;

export const IntegrationListItem = styled(ListItem)`
    align-items: flex-start;
    text-align: left;
`;

export const IntegrationListItemBenefit = styled(ListItem)`
    font-weight: 600;
    align-items: flex-start;
    text-align: left;
    color: #00902A;

    &::before {
        background: url('/images/svg/benefit-icon.svg') no-repeat center;
        max-width: 30px;
        height: 30px;
        border-radius: 50%;
    }
`;