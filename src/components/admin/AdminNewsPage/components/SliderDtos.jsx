import {useState} from "react";
import {useRef} from "react";
import styled from "styled-components";
import {Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {FlexWrap} from "../../../FlexWrap/FlexWrap";
import {AdminNewsPageTextareaStyled, ContentEditControlContainerStyled, ContentEditControlStyled} from "../AdminNewsPage.style";
import {autosizeTextarea} from "../AdminNewsPage";

export const SliderDtos = ({item, i, templateRows, setTemplateRows, handleReplaceRows, handleDelete, innerWidth}) => {
    const [sliderPage, setSliderPage] = useState(1);

    const sliderPrevBtnRef = useRef();
    const sliderNextBtnRef = useRef();

    return (
        <ContentEditControlContainerStyled row={item.position}>
            <ContentEditControlStyled justify='flex-end' gap={32}>
                <select
                    onChange={e => {
                        const tempArray = templateRows.map((item, j) => (
                            i === j ?
                                {
                                    ...item,
                                    style: {
                                        ...item.style,
                                        alignment: e.target.value
                                    }
                                }
                                :
                                {...item}
                        ))

                        setTemplateRows(tempArray);
                    }}
                >
                    <option value='normal'>обычный</option>
                    <option value='italic'>курсив</option>
                </select>
                <input
                    type='number'
                    value={item.style.weight}
                    step={100}
                    min={100}
                    max={900}
                    onChange={e => {
                        const tempArray = templateRows.map((item, j) => (
                            i === j ?
                                {
                                    ...item,
                                    style: {
                                        ...item.style,
                                        weight: e.target.value
                                    }
                                }
                                :
                                {...item}
                        ))

                        setTemplateRows(tempArray);
                    }}
                />
                <input
                    type='number'
                    value={item.style.size}
                    step={1}
                    min={1}
                    onChange={e => {
                        const tempArray = templateRows.map((item, j) => (
                            i === j ?
                                {
                                    ...item,
                                    style: {
                                        ...item.style,
                                        size: e.target.value
                                    }
                                }
                                :
                                {...item}
                        ))

                        setTemplateRows(tempArray);
                    }}
                />
                <button type='button' onClick={() => handleReplaceRows(i, 'top')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.92 15.05L13.4 8.53001C12.63 7.76001 11.37 7.76001 10.6 8.53001L4.07999 15.05" stroke="black" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button type='button' onClick={() => handleReplaceRows(i, 'bottom')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.92 8.95001L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.07999 8.95001" stroke="black" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button
                    type='button'
                    onClick={() => handleDelete(i)}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 5V22H19.5V5H4.5Z" stroke="black" strokeWidth="3" strokeLinejoin="round" />
                        <path d="M10 10V16.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 10V16.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 5H22" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 5L9.6445 2H14.3885L16 5H8Z" stroke="black" strokeWidth="3" strokeLinejoin="round" />
                    </svg>
                </button>
            </ContentEditControlStyled>
            <AdminNewsPageTextareaStyled
                className='h3 mb-8'
                value={item.title}
                rows={1}
                onInput={autosizeTextarea}
                onChange={(e) => {
                    const tempArray = templateRows.map((el, j) => (
                        i === j ?
                            {...el, title: e.target.value}
                            :
                            {...el}
                    ))

                    setTemplateRows(tempArray);
                }}
            />
            <FlexWrap className='mb-16 slider__title' justify='space-between' align='center' style={{height: 'auto'}}>
                <AdminNewsPageTextareaStyled
                    className='regular-text'
                    value={item.subscription}
                    rows={1}
                    onInput={autosizeTextarea}
                    onChange={(e) => {
                        const tempArray = templateRows.map((el, j) => (
                            i === j ?
                                {...el, subscription: e.target.value}
                                :
                                {...el}
                        ))

                        setTemplateRows(tempArray);
                    }}
                />
                <div className='slider__control-panel'>
                    <p>{sliderPage} / {Math.ceil(item.photos.length / (innerWidth < 768 ? 1 : 3))}</p>
                    <div className='slider-btns'>
                        <button
                            className='slider-prev-btn'
                            ref={sliderPrevBtnRef}
                        >
                            <svg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path opacity='0.8' d='M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z' fill='#7A7A95' />
                            </svg>
                        </button>
                        <button
                            className='slider-next-btn'
                            ref={sliderNextBtnRef}
                        >
                            <svg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path opacity='0.8' d='M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z' fill='#7A7A95' />
                            </svg>
                        </button>
                    </div>
                </div>
            </FlexWrap>
            <Swiper
                className='news-page__slider'
                spaceBetween={innerWidth < 768 ? 0 : 16}
                slidesPerView={innerWidth < 768 ? 1 : 3}
                slidesPerGroup={innerWidth < 768 ? 1 : 3}
                modules={[Pagination, Navigation]}
                pagination={{clickable: true}}
                navigation={{
                    prevEl: sliderPrevBtnRef.current,
                    nextEl: sliderNextBtnRef.current
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = sliderPrevBtnRef.current;
                    swiper.params.navigation.nextEl = sliderNextBtnRef.current;
                }}
                onSlideChange={e => setSliderPage((e.activeIndex / (innerWidth < 768 ? 1 : 3)) + 1)}
                style={{maxWidth: 1312}}
            >
                {item.photos.map((slide, j) => (
                    <SwiperSlide key={j}>
                        <img src={slide} loading='lazy' alt='slide-cover' />
                    </SwiperSlide>
                ))}
            </Swiper>

        </ContentEditControlContainerStyled>
    )
}

const SliderDtosStyled = styled.div`
    overflow: hidden;
`;