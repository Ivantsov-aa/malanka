import Button from "../../Button/button";
import styled from "styled-components";

export const AdminPagesControlContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 100px;
    z-index: 100000;
`;

export const EditTextPanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 50%;
    bottom: 20px;
    z-index: 500;
    background: #fff;
    padding: 20px;
    border-radius: 20px;
    gap: 16px;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);

    div {
        display: flex;
        align-items: center;
        gap: 16px;

        input[type="color"] {
            -webkit-appearance: none;
            width: 100%;
            max-width: 35px;
            height: 35px;
            border: 0;
            border-radius: 10px;
            padding: 0;
            overflow: hidden;
        }

        input[type="color"]::-webkit-color-swatch-wrapper {
            padding: 0;
        }
        input[type="color"]::-webkit-color-swatch {
            border: none;
        }
    }

    textarea {
        width: 100%;
        height: 200px;
        background: #F4F4FD;
        box-shadow: inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7);
        border-radius: 12px;
        resize: none;
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
        padding: 14px 16px;
    }
`;

export const AdminPagesSaveButton = styled(Button)`
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 10000;

    @media (max-width: 1024px) {
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
    }
`;