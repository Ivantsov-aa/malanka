import { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FlexWrap } from "../../../FlexWrap/FlexWrap";
import {
    AdminNewsPageTextareaStyled,
    ContentEditControlContainerStyled,
    ContentEditControlStyled,
} from "../AdminNewsPage.style";
import { autosizeTextarea } from "../AdminNewsPage";

export const SliderDtos = ({
    item,
    i,
    sliderImages,
    templateRows,
    setTemplateRows,
    formDataSlider,
    setSliderImages,
    setFormDataSlider,
    handleReplaceRows,
    handleDelete,
    innerWidth,
    setSliderImagesPos,
}) => {
    const [sliderPage, setSliderPage] = useState(1);

    const sliderPrevBtnRef = useRef();
    const sliderNextBtnRef = useRef();

    const uploadPhoto = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        const fileToRequest = new FormData();
        fileToRequest.append("file", e.target.files[0]);

        reader.onload = () => {
            setSliderImages([...sliderImages, reader.result]);
            setFormDataSlider([...formDataSlider, fileToRequest]);
        };

        reader.readAsDataURL(file);
    };

    return (
        <ContentEditControlContainerStyled
            row={item.position}
            marginBottom={32}
        >
            <ContentEditControlStyled justify="flex-end" gap={32}>
                <select
                    onChange={(e) => {
                        const tempArray = templateRows.map((item, j) =>
                            i === j
                                ? {
                                      ...item,
                                      style: {
                                          ...item.style,
                                          alignment: e.target.value,
                                      },
                                  }
                                : { ...item }
                        );

                        setTemplateRows(tempArray);
                    }}
                >
                    <option value="normal">обычный</option>
                    <option value="italic">курсив</option>
                </select>
                <input
                    type="number"
                    value={item.style.weight}
                    step={100}
                    min={100}
                    max={900}
                    onChange={(e) => {
                        const tempArray = templateRows.map((item, j) =>
                            i === j
                                ? {
                                      ...item,
                                      style: {
                                          ...item.style,
                                          weight: e.target.value,
                                      },
                                  }
                                : { ...item }
                        );

                        setTemplateRows(tempArray);
                    }}
                />
                <input
                    type="number"
                    value={item.style.size}
                    step={1}
                    min={1}
                    onChange={(e) => {
                        const tempArray = templateRows.map((item, j) =>
                            i === j
                                ? {
                                      ...item,
                                      style: {
                                          ...item.style,
                                          size: e.target.value,
                                      },
                                  }
                                : { ...item }
                        );

                        setTemplateRows(tempArray);
                    }}
                />
                <button
                    type="button"
                    onClick={() => {
                        handleReplaceRows(i, "top");
                        setSliderImagesPos(item.position - 1);
                    }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19.92 15.05L13.4 8.53001C12.63 7.76001 11.37 7.76001 10.6 8.53001L4.07999 15.05"
                            stroke="black"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        handleReplaceRows(i, "bottom");
                        setSliderImagesPos(item.position + 1);
                    }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19.92 8.95001L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.07999 8.95001"
                            stroke="black"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button type="button" onClick={() => handleDelete(i)}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.5 5V22H19.5V5H4.5Z"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10 10V16.5"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M14 10V16.5"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M2 5H22"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 5L9.6445 2H14.3885L16 5H8Z"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </ContentEditControlStyled>
            <FlexWrap
                className="mb-16 slider__title"
                justify="space-between"
                align="center"
                style={{ height: "auto" }}
            >
                <AdminNewsPageTextareaStyled
                    value={item.body}
                    weight={item.style.weight}
                    size={item.style.size}
                    fontStyle={item.style.alignment}
                    rows={2}
                    onInput={autosizeTextarea}
                    onChange={(e) => {
                        const tempArray = templateRows.map((el, j) =>
                            i === j
                                ? { ...el, body: e.target.value }
                                : { ...el }
                        );

                        setTemplateRows(tempArray);
                    }}
                />
                <div className="slider__control-panel">
                    <p>
                        {sliderPage} /{" "}
                        {Math.ceil(
                            Math.max(1, sliderImages.length + 1) /
                                (innerWidth < 768 ? 1 : 3)
                        )}
                    </p>
                    <div className="slider-btns">
                        <button
                            className="slider-prev-btn"
                            ref={sliderPrevBtnRef}
                        >
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.8"
                                    d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z"
                                    fill="#7A7A95"
                                />
                            </svg>
                        </button>
                        <button
                            className="slider-next-btn"
                            ref={sliderNextBtnRef}
                        >
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.8"
                                    d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z"
                                    fill="#7A7A95"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </FlexWrap>
            <Swiper
                className="news-page__slider"
                spaceBetween={innerWidth < 768 ? 0 : 16}
                slidesPerView={innerWidth < 768 ? 1 : 3}
                slidesPerGroup={innerWidth < 768 ? 1 : 3}
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={{
                    prevEl: sliderPrevBtnRef.current,
                    nextEl: sliderNextBtnRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = sliderPrevBtnRef.current;
                    swiper.params.navigation.nextEl = sliderNextBtnRef.current;
                }}
                onSlideChange={(e) =>
                    setSliderPage(
                        Math.ceil(
                            e.activeIndex / (innerWidth < 768 ? 1 : 3) + 1
                        )
                    )
                }
                style={{ maxWidth: 1312 }}
            >
                <SlideStyled>
                    <SliderUploadPhotoStyled className="upload-slide">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={uploadPhoto}
                        />
                        <svg
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z"
                                stroke="#d9d9d9"
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 8V16"
                                stroke="#d9d9d9"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 12H16"
                                stroke="#d9d9d9"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </SliderUploadPhotoStyled>
                </SlideStyled>
                {sliderImages.map((slide, j) => (
                    <SlideStyled key={j}>
                        <img src={slide} loading="lazy" alt="slide-cover" />
                    </SlideStyled>
                ))}
            </Swiper>
        </ContentEditControlContainerStyled>
    );
};

const SliderUploadPhotoStyled = styled.label`
    background: #FFF;
    border-radius: 6px;
    display: flex;
    height: 319px;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const SlideStyled = styled(SwiperSlide)`
    border-radius: 6px;
    overflow: hidden;
    height: 319px;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`;
