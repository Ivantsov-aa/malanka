import styled from "styled-components";
import { FlexWrap } from "../FlexWrap/FlexWrap";

export const SliderGalleryStyled = styled.section`
    .slider {
        padding-bottom: 20px;

        .swiper-slide {
            max-height: 319px;
            overflow: hidden;
            border-radius: 6px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .swiper-pagination {
            bottom: 0;
            white-space: nowrap;
            display: flex;
            justify-content: center;
            gap: 8px;

            .swiper-pagination-bullet {
                flex: 1;
                max-width: 55px;
                height: 4px;
                background: #D9D9D9;
                border-radius: 0 !important;
                opacity: 1;
                margin: 0;

                &-active {
                    background: #000;
                }
            }
        }
    }
`;

export const SliderGalleryControlStyled = styled(FlexWrap)`
    gap: 35px;
    max-width: max-content;

    @media (max-width: 767px) {
        flex-direction: column;
        gap: 30px;
    }

    p {
        font-weght: 600;
        font-size: 16px;
        line-height: 24px;
        white-space: nowrap;
        text-align: center;
    }

    button {
        height: 26px;
        width: 26px;
        gap: 21px;

        &.slider-next-btn {
            transform: rotate(180deg);
        }

        &:disabled {
            svg {
                path {
                    fill: #C0C0DB;
                }
            }
        }
    }
`;