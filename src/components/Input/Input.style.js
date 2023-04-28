import styled from "styled-components";

export const InputStyled = styled.input`
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    padding: 14px 16px;
    width: 100%;
    background: #F4F4FD;
    box-shadow: inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7);
    border-radius: 12px;

    &::placeholder {
        color: #C0C0DB;
    }
`;