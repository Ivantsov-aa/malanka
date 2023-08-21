import { useState } from "react";
import { autosizeTextarea } from "../AdminNewsPage";
import {
    AdminNewsPageTextareaStyled,
    ContentEditControlContainerStyled,
    ContentEditControlStyled,
} from "../AdminNewsPage.style";

export const VideoDtos = ({ setFormDataVideo, video, setVideo }) => {
    const uploadVideo = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        const fileToRequest = new FormData();
        fileToRequest.append("file", e.target.files[0]);

        reader.onload = () => {
            setVideo(reader.result);
            setFormDataVideo(fileToRequest);
        };

        reader.readAsDataURL(file);
    };

    return (
        <ContentEditControlContainerStyled>
            <ContentEditControlStyled justify="flex-end" gap={32}>
                <label>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 12.0042V21H21V12"
                            stroke="white"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M16.5 6.5L12 2L7.5 6.5"
                            stroke="white"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M11.9958 16V3"
                            stroke="white"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={uploadVideo}
                    />
                </label>
            </ContentEditControlStyled>
            <div className="video-block__container">
                <video width="100%" height="100%" src={video} />
                <button
                    className="play-btn"
                    onClick={(e) => {
                        const previewVideo = e.target.parentElement.children[0];
                        if (previewVideo.paused) {
                            previewVideo.play();
                            e.target.parentElement.classList.add("play");
                        } else {
                            previewVideo.pause();
                            e.target.parentElement.classList.remove("play");
                        }
                    }}
                >
                    <div className="icon-wrapper">
                        <svg
                            width="68"
                            height="68"
                            viewBox="0 0 68 68"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M34 0.259766C27.3311 0.259766 20.8119 2.23734 15.2669 5.9424C9.72186 9.64746 5.40004 14.9136 2.84795 21.0749C0.29586 27.2362 -0.371884 34.0159 0.929162 40.5567C2.23021 47.0975 5.44161 53.1056 10.1573 57.8213C14.8729 62.5369 20.881 65.7483 27.4218 67.0494C33.9626 68.3504 40.7423 67.6827 46.9036 65.1306C53.0649 62.5785 58.3311 58.2567 62.0361 52.7116C65.7412 47.1666 67.7188 40.6475 67.7188 33.9785C67.7016 25.041 64.1436 16.4745 57.8238 10.1547C51.5041 3.83491 42.9375 0.276904 34 0.259766ZM45.8016 36.1508L30.2391 46.5258C29.8098 46.7914 29.3172 46.9369 28.8125 46.9473C28.3848 46.9469 27.9629 46.847 27.5805 46.6555C27.1658 46.4317 26.82 46.0991 26.58 45.6935C26.3401 45.288 26.2152 44.8247 26.2188 44.3535V23.6035C26.2152 23.1323 26.3401 22.6691 26.58 22.2635C26.82 21.8579 27.1658 21.5254 27.5805 21.3016C27.9968 21.0908 28.4608 20.9919 28.9269 21.0147C29.393 21.0374 29.8452 21.181 30.2391 21.4313L45.8016 31.8063C46.1628 32.042 46.4596 32.364 46.665 32.7433C46.8704 33.1226 46.978 33.5472 46.978 33.9785C46.978 34.4099 46.8704 34.8344 46.665 35.2137C46.4596 35.593 46.1628 35.9151 45.8016 36.1508Z"
                                fill="#FFF"
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </ContentEditControlContainerStyled>
    );
};
