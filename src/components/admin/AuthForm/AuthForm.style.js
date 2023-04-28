import styled from "styled-components";

export const AuthWrap = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
    background: url('/images/malanka-auth.png') no-repeat -200px -180px;
    background-size: 50%;
    position: relative;
    z-index: 0;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, .5);
        z-index: 0;
    }
`;

export const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;    
    align-items: center;
    gap: 64px;
    width: 100%;
    max-width: 700px;
    margin: auto;
    padding: 32px 15px;
    border: 1px solid #76D275;
    border-radius: 20px;
    box-shadow: -6px -6px 16px rgba(255, 255, 255, 0.7), 6px 6px 20px rgba(192, 192, 219, 0.7);
    background: #fff;
    z-index: 10;

    >div {
        max-width: 500px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
`