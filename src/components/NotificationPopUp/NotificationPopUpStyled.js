import styled from "styled-components";

export const NotificationPopUpStyled = styled.div`
    @keyframes notificationShow {
        0% {
            scale: 0.5;
            opacity: 0;
        }

        50% {
            scale: 1.1;
            opacity: 1;
        }

        80% {
            scale: 0.9;
            opacity: 1;
        }

        100% {
            scale: 1;
            opacity: 1;
        }
    }

    position: fixed;
    display: flex;
    gap: 10px;
    align-items: center;
    top: 20px;
    right: 200px;
    z-index: 150;
    border-radius: 30px;
    background: #F4F4FD;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 6px 12px;
    border-radius: 12px;
    color: #7A7A95;
    padding: 16px;
    z-index: 1000;
    animation: notificationShow .2s ease;
    
    img {
        width: 32px;
        height: 32px;
    }

    button {
        position: absolute;
        right: 2px;
        top: 2px;
        width: 20px;
        height: 20px
    }
`;