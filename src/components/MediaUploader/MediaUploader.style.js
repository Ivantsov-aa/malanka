import styled from "styled-components";
import { FlexWrap } from "../FlexWrap/FlexWrap";

export const MediaUploaderStyled = styled.section`
    @keyframes showUploader {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    text-align: center;
    max-width: 500px;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    overflow: hidden;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 20px;
    box-shadow: rgba(255, 255, 255, 0.7) -6px -6px 16px, rgba(192, 192, 219, 0.7) 6px 6px 20px;
    animation: showUploader .2s;
`;

export const MediaUploaderNavStyled = styled(FlexWrap)`
    height: 50px;
    box-shadow: rgba(255, 255, 255, 0.7) -6px -6px 16px, rgba(192, 192, 219, 0.7) 2px 2px 20px;
`;

export const MediaUploaderNavItemStyled = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    background: ${props => props.active ? 'linear-gradient(271.12deg, rgb(111, 190, 110) 0%, rgb(139, 235, 138) 100%)' : 'transparent'};
    color: ${props => props.active ? '#fff' : 'rgb(139, 235, 138)'};
`;

export const MediaUploaderContentStyled = styled(FlexWrap)`
    padding: 32px 16px;
`;

export const MediaUploaderPreviewStyled = styled(FlexWrap)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
    height: 468px;

    .video-block__container {
        height: 100%;
    }

    img, video, iframe {
        height: 100%;
        object-fit: cover;
        width: 100%;
        border-radius: 20px;
    }

    button {
        align-self: flex-end;
    }
`;

export const UploaderButtonStyled = styled.label`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #fff;
    width: 100vw;
    max-width: 263px;
    padding: 13px 20px;
    background: linear-gradient(271.12deg, #6FBE6E 0%, #8BEB8A 100%);
    box-shadow: -6px -6px 16px rgba(255, 255, 255, 0.7), 6px 6px 20px rgba(192, 192, 219, 0.7);
    border-radius: 50px;
    margin: auto;

    &:active, &.active {
        background: #71C470;
        box-shadow: inset -2px -2px 2px rgba(255, 255, 255, 0.2), inset 2px 2px 4px #62A661;
    }

    input {
        position: absolute;
        opacity: 0;
        z-index: -1;
    }
`;