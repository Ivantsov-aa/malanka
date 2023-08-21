import styled from "styled-components";
import { FlexWrap } from "../FlexWrap/FlexWrap";

export const CalculatorStyled = styled.div`
    max-width: 1720px;
    width: 100%;
    margin: 0 auto;
    padding:  0 15px 64px;

    @media (max-width: 768px) {
        padding-bottom: 32px;
    }
    
    h2 {
        margin: 32px 0;
    }

    h4 {
        span {
            color: #A3A3A7;
        }
    }
`;

export const CalculatorFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CalculatorFormBlockStyled = styled(FlexWrap)`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-right: 64px;
    border-right: 1px solid #C0C0DB;

    &:last-child {
        padding: 0;
        padding-left: 64px;
        border: none;
    }

    @media (max-width: 768px) {
        width: 100%;
        border: none;
        border-bottom: 1px solid #C0C0DB;
        padding: 0;
        padding-bottom: 32px;

        &:last-child {
            padding: 0;
            padding-top: 40px;
        }
    }
`;

export const CalculatorStepCountStyled = styled(FlexWrap)`
    background: #000;
    border-radius: 50%;
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    color: #fff;
    width: 100%;
    max-width: 29px;
    height: 29px;
`;

export const CalculatorInputStyled = styled.input`
    border: 1px solid #7A7A95;
    border-radius: 1000px;
    padding: 15px 25px;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.5;
    height: 59px;
    color: #7A7A95;
    width: 100%;
    max-width: ${props => props.maxWidth}px;
    text-align: center;
`;

export const CalculatorAverageConsumptionBlockStyled = styled(FlexWrap)`
    flex-direction: column;
    
    h4 {
        --font-size: 24px;
        --line-height: 36px;

        font-weight: 600;
        font-size: --font-size;
        line-height: --line-height;

        @media (max-width: 1440px) {
            font-size: --font-size * 0.8;
            line-height: --line-height * 0.8;
        }

        @media (max-width: 768px) {
            font-size: --font-size * 0.6;
            line-height: --line-height * 0.6;
        }
    }

    .flex-block {
        max-width: max-content;
    }
`;

export const CalculatorRadioButtonStyled = styled.div`
    position: relative;

    label {
        display: flex;
        flex-direction: ${props => props.vertical ? 'column' : 'row'};
        align-items: center;
        gap: 8px;
        font-weight: 500;
        font-size: 18px;
        line-height: 1.5;

        &::before {
            content: '';
            display: block;
            margin: 0 auto;
            height: 16px;
            width: 100%;
            min-width: 16px;
            max-width: 16px;
            border-radius: 50%;
            border: 1px solid #00902A;
        }

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }

    input:checked + label {
        &::before {
            background: #00902A;
        }
    }

    input {
        position: absolute;
        opacity: 0;
        z-index: -1;
    }
`;

export const CalculatorAverageConsumptionListItemStyled = styled(FlexWrap)`
    @media (max-width: 1024px) and (min-width: 769px) {
        flex-direction: column;

        input {
            max-width: 100%;
        }
    }

    @media (max-width: 500px) {
        flex-direction: column;

        input {
            max-width: 100%;
        }
    }

    input {
        padding: 7px 25px;
        height: 42px;
    }
`;