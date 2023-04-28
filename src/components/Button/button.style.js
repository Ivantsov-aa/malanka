import styled from "styled-components";

export const StyledButton = styled.button`
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: ${props => props.primary ? '#fff' : '#76D275'};
    width: 100vw;
    max-width: 263px;
    padding: 13px 20px;
    background: ${props => props.primary ? 'linear-gradient(271.12deg, #6FBE6E 0%, #8BEB8A 100%);' : '#F4F4FD'};
    box-shadow: -6px -6px 16px rgba(255, 255, 255, 0.7), 6px 6px 20px rgba(192, 192, 219, 0.7);
    border-radius: 50px;

    &:active, &.active {
        background: ${props => props.primary ? '#71C470' : '#F4F4FD'};
        box-shadow: ${props => props.primary ? 'inset -2px -2px 2px rgba(255, 255, 255, 0.2), inset 2px 2px 4px #62A661' : 'inset -2px -2px 2px #FFFFFF, inset 2px 2px 2px rgba(192, 192, 219, 0.7)'};
    }

    &:disabled {
        opacity: .3;
    }
`;