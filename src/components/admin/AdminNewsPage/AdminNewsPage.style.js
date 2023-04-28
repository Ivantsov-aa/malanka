import styled from "styled-components";
import {FlexWrap} from "../../FlexWrap/FlexWrap";

export const AdminNewsPageStyled = styled.form`
    max-width: 1720px;
    width: 100%;
    margin: 0 auto;
    padding: 32px 20px 128px;

    input[type='file'] {
        position: absolute;
        visibility: hidden;
        width: max-content;
        left: 0;
    }

    textarea {
        resize: none;
        width: 100%;
    }

    @media (max-width: 1024px) {
        padding-bottom: 64px;
    }

    @media (max-width: 767px) {
        padding-bottom: 32px;
    }
`;

export const AdminNewsPageContentStyled = styled.div`
    max-width: 1352px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
`;

export const AdminNewsPageDateStyled = styled.p`
    font-weight: 500;
    font-size: 18px;
    line-height: 1.5;
    color: #7A7A95;
`;

export const AdminNewsPageContentPosStyled = styled.div`
    display: grid;
    grid-temlate-column: 100%;
    padding-top: 32px;
    gap: 32px;
`;

export const ParagraphDtos = styled.input`
    font-weight: ${props => props.weight};
    font-size: ${props => props.size}px;
    font-style: ${props => props.style};
    line-height: 1.5;
    grid-row: ${props => props.row};
`;

export const NewsList = styled(FlexWrap)`

`;

export const UnorderedList = styled.li`
`;

export const AdminNewsPageControlPanelStyled = styled(FlexWrap)`
    width: 100%;
    text-align: center;
    gap: 16px 2px;
    flex-wrap: wrap;
    min-width: 210px;
    grid-row: ${props => props.row};

    button, label {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 50px;
        font-size: 16px;
        font-weight: 600;
        background: #F4F4FD;
        border-radius: 10px;
        padding: 0 10px;

        &:hover {
            background: #7A7A95;
            color: #fff;
        }

        &:disabled {
            opacity: .5;
        }
    }
`;

export const AdminNewsPageTextareaStyled = styled.textarea`
    font-weight: ${props => props.weight};
    font-size: ${props => props.size}px;
    font-style: ${props => props.fontStyle};
    line-height: 1.5;
    width: 100%;
    resize: none;
    height: auto;
    max-height: max-content;

    @media (max-width: 1440px) {
        font-size: ${props => props.size * 0.7}px;
    }
`;

export const ContentEditControlContainerStyled = styled.div`
    position: relative;
    grid-row: ${props => props.row};
    // overflow: hidden;

    button {
            display: flex;
            justify-content: center;
            align-items: center;
    }

    &:hover {
        >div {
            opacity: 1;
            background: linear-gradient(271.12deg, rgb(111, 190, 110) 30%, rgba(139, 235, 138, 0) 100%);
        }
        button {
            opacity: 1;
        }

        li {
            padding-left: 24px;

            &::before {
                opacity: 0;
            }
        }
    }

    ul, ol, li {
        position: relative;
        transition: all .2s linear;
    }
`;

export const ContentEditControlStyled = styled(FlexWrap)`
    padding: 5px 10px;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    opacity: 0;
    transition: all .2s;
    border-radius: 15px;

    * {
        color: #fff;
        stroke: #fff;
        font-weight: 500;
    }

    option {
        color: #000;
    }
`;

export const AdminNewsPageListTitleStyled = styled.input`

`;

export const AddDeleteBtnsContainerStyled = styled(FlexWrap)`
    position: absolute;
    gap: 8px;
    left: 0;
    width: max-content;
`;

export const AddListElementButtonStyled = styled.button`
    color: #6FBE6E;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 12px;
    opacity: 0;
    transition: all .2s;

    svg {
        height: 16px;
        width: 16px;
    }
`;

export const DeleteListElementButtonStyled = styled.button`
    color: #6FBE6E;
    display: flex;
    gap: 8px;
    font-weight: 600;
    font-size: 12px;
    opacity: 0;
    transition: all .2s;

    svg {
        height: 16px;
        width: 16px;
    }
`;