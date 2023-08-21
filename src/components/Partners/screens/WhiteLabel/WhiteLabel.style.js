import styled from "styled-components";

export const WhiteLabelStyled = styled.main`
    max-width: 1720px;
    width: 100%;
    margin: 0 auto;
    padding:  0 15px 128px;

    .wl-title {
        margin: 32px 0;

        p {
            font-size: 16px;
            line-height: 24px;
        }
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

export const WhiteLabelListStyled = styled.ul`
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    align-items: inherit;
`;

export const WhiteLabelListItemStyled = styled.li`
    flex-direction: column;
    align-items: flex-start;
    width: calc(25% - 6px);
    padding: 0 32px;
    border-right: 1px solid #C0C0DB;

    @media (max-width: 1024px) {
        padding: 0 16px;
        width: calc(50% - 4px);

        &:nth-child(2) {
            border-right: none;
        }
    }

    @media (max-width: 768px) {
        padding: 16px 0;
        width: 100%;
        border: none;
        border-bottom: 1px solid #C0C0DB;
    }

    &::before {
        display: none;
    }

    h4 {
        text-transform: uppercase;
    }

    h6 {
        color: #7A7A95;
    }

    &:first-child {
        padding-left: 0;
    }

    &:last-child {
        padding-right: 0;
        border: 0;
    }
`;