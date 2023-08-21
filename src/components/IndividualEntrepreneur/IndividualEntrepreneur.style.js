import styled from "styled-components";
import { FlexWrap } from "../FlexWrap/FlexWrap";
import { ListItem } from "../Partners/Partners.style";

export const IndividualEntrepreneurStyled = styled.main`
    max-width: 1720px;
    width: 100%;
    margin: 0 auto;
    padding:  0 15px 128px;

    h2 {
        margin: 32px 0;
    }

    .ip-title {
        padding: 54px 0;
        background: url('/images/individual/indivual-bg.png') no-repeat center;
        color: #fff;

        &__text {
            padding-left: 110px;
            max-width: 711px;

            @media (max-width: 768px) {
                padding: 0;

                button {
                    max-width: 100%;
                }
            }
        }

        img {
            max-width: 50%;

            @media (max-width: 768px) {
                display: none;
            }
        }

        @media (max-width: 768px) {
            padding: 32px 16px;
        }
    }

    @media (max-width: 1024px) {
        padding-bottom: 64px;
    }

    @media (max-width: 768px) {
        padding-bottom: 32px;
    }
`;

export const IndividualEntrepreneurListRegStepsStyled = styled(FlexWrap)`    
    @media (max-width: 768px) {
        overflow-x: auto; 
        gap: 16px;
    }
`;

export const IndividualEntrepreneurListRegStepsItemStyled = styled(FlexWrap)`
    max-width: calc((100% / 3) - (64px / 3));
    min-width: 220px;
    border: 1px solid rgba(0, 144, 42, 0.55);
    border-radius: 6px;
    padding: 0 24px;
    padding-top: 58px;
    height: 317px;
    text-align: center;
    
    &:nth-child(1) {
        background: url('/images/individual/bg-1.png') no-repeat center;
    }

    &:nth-child(2) {
        background: url('/images/individual/bg-2.png') no-repeat center;
    }

    &:nth-child(3) {
        background: url('/images/individual/bg-3.png') no-repeat center;
    }

    a {
        font-weight: inherit;
        font-size: inherit;
        color: #00902A;
    }

    @media (max-width: 1024px) {
        padding: 16px;
    }
`;

export const IndividualEntrepreneurBenefitItemStyled = styled(FlexWrap)`

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }

    .img-wrapper {
        max-width: 120px;
        width: 100vw;
        height: 120px;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #FFFFFF;
        border-radius: 50%;

        @media (max-width: 768px) {
            max-width: 60px;
            height: 60px;
        }
    }
`;

export const IndividualEntrepreneurForWhomItemStyled = styled(ListItem)`
    align-items: flex-start;
    line-height: 24px;
`;