import styled from "styled-components";
import { SwiperSlide } from "swiper/react";

export const AdvertisingContainer = styled.main`
    max-width: 1720px;
    margin: 0 auto;

    >* {
        padding-left: 20px;
        padding-right: 20px;
    }

    h2 {
        margin: 32px 0;
        max-width: 50%;

        @media (max-width: 1024px) {
            max-width: 100%;
        }
    }

    .pb-128 {

        @media (max-width: 768px) {
            padding-bottom: 32px;
        }
    }

    .slider-container {
        max-width: 780px;
        width: 50%;

        @media (max-width: 1400px) {
            width: 100%;
            max-width: calc(100% - 354px);
        }

        @media (max-width: 500px) {
            max-width: 100%;
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }

        .slider-preview {
            position: relative;
            min-width: 290px;
            max-width: 290px;
            height: 580px;
            background: url('/images/adv/slider-cover.png') no-repeat center;
            background-size: contain;
            padding: 15px 10px;

            img {
                object-fit: cover;
                height: 100%;
                max-width: 255px;
                border-radius: 35px;
            }

            &::before {
                content: '';
                position: absolute;
                top: 23px;
                left: 50%;
                transform: translateX(-50%);
                width: 64px;
                height: 18px;
                background: url('/images/adv/camera.png') no-repeat center;
            }
        }

        .swiper {
            display: flex; 
            flex-direction: column;
            align-items: flex-start;
            gap: 85px;
            padding-top: 57px;
            width: 100%;

            @media (max-width: 500px) {
                padding: 0;
            }

            &-wrapper {
                height: 410px;

                @media (max-width: 500px) {
                    display: none;
                }
            }

            &-slide {
                min-width: 187px;
                max-width: 187px;
                opacity: 0.5;
                border-radius: 20px;

                img {
                    height: 100%;
                    width: 100%;
                    border-radius: 20px;
                }
            }
        }

        .slider-wrap {
            max-width: calc(100% - 345px);
            gap: 85px;

            @media (max-width: 1400px) {
                max-width: 100%;
            }

            @media (max-width: 768px) {
                .slider__control-panel {
                    flex-direction: row;
                    justify-content: center;
                }
            }
        }
    }

    .adv-title {
        padding: 64px;
        max-width: 708px;
        width: 100%;
        background: url('/images/adv/bg-image.png') no-repeat center;
        background-size: cover;
        color: #fff;

        button {
            margin-top: 16px;
        }

        @media (max-width: 1400px) {
            max-width: 100%;
        }

        @media (max-width: 1024px) {
            padding: 16px;
            button {
                width: 100%;
            }
        }
    }

    .news-page__slider {
        height: 784px;
        width: 100%;

        @media (max-width: 1024px) {
            height: max-content;
        }
    }

    .zoom-container {
        position: relative;

        @media (max-width: 1024px) {
            margin: 32px 0;
        }
    }

    #canvas {
        display: none;
        position: absolute;
        z-index: 1000000;
        box-shadow: 0px 4px 47px rgba(0, 0, 0, 0.13);
        background: #fff;
        border-radius: 50%;
    }

    .left {
        max-width: 550px;
    }

    .form-pr {
        padding-right: 261.5px;

        @media (max-width: 1024px) {
            padding: 0 20px;
        }
    }
`;

export const SwiperSlideStyled = styled(SwiperSlide)`
    max-width: 187px;
    opacity: 0.5;
    border-radius: 20px;
    overflow: hidden;
    height: 410px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &.zoom {
        opacity: 1;
        max-width: 100%;
        position: relative;

        &, img {
            max-height: 764px;
            height: 100%;
        }

        img {
            object-fit: contain;
        }
    }
`;