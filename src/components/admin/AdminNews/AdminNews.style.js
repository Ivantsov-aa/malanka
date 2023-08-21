import styled from "styled-components";

export const AdminNewsStyled = styled.main`
    max-width: 1720px;
    width: 100%;
    margin: 0 auto;
    padding: 32px 20px;

    &.disabled-bg {
        overflow: hidden;
        
        &::before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 10;
        }
    }
`;

export const NewsPageCloseButton = styled.button`
    position: absolute;
    background: #000;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    top: -15px;
    right: -15px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const DeletePopUpStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 30px;
    padding: 24px;
    z-index: 15;

    h2 {
        margin-bottom: 48px;
        max-width: 450px;
        text-align: center;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;

        .btn-green-outline {
            box-shadow: -6px -6px 16px rgba(255, 255, 255, 0.7), 6px 6px 20px rgba(192, 192, 219, 0.7);
        }
    }
`;