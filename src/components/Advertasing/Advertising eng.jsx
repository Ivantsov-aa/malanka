import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import { FlexWrap } from "../FlexWrap/FlexWrap";
import { useEffect } from "react";
import { CallbackForm } from "../callback-form/callback-form";
import Swiper, { Navigation, Pagination } from "swiper";

const slides = ['/images/adv/adv-slide.png', '/images/adv/bg-image.png', '/images/adv/adv-slide.png', '/images/adv/adv-slide.png'];

export const Advertising = ({ innerWidth }) => {
    useEffect(() => {
        swiperTitleInit();
        swiperZoomInit();
    }, [])

    const swiperZoomInit = () => {
        const swiper = new Swiper('.news-page__slider', {
            slidesPerView: 1,
            slidesPerGroup: 1,
            modules: [Navigation, Pagination],
            navigation: {
                nextEl: '.news-page .slider-btns .slider-next-btn',
                prevEl: '.news-page .slider-btns .slider-prev-btn'
            },
            pagination: {
                el: '.news-page .swiper-pagination',
                type: 'fraction',
            },

        });

        swiper.init();
    }

    const swiperTitleInit = () => {
        const sliderPreview = document.querySelector('.slider-preview img');
        const swiper = new Swiper('.swiper', {
            slidesPerView: 'auto',
            slidesPerGroup: 1,
            spaceBetween: 60,
            modules: [Navigation, Pagination],
            navigation: {
                nextEl: '.slider-btns .slider-next-btn',
                prevEl: '.slider-btns .slider-prev-btn'
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            }
        });

        swiper.init();
        swiper.on('slideChange', e => {
            sliderPreview.setAttribute('src', slides[e.activeIndex]);
        });
    }

    const zoomTargetImage = (e) => {
        const { clientX, clientY } = e;
        const zoomSwiper = document.querySelector('.news-page__slider');
        const size = (window.innerWidth - 240) / 4;
        let image;
        const images = Array.from(zoomSwiper.children[0].children);
        images.forEach(element => {
            if (element.classList.contains('swiper-slide-active')) {
                image = element.children[0];
            }
        });;

        if (image) {
            const canvas = document.querySelector('#canvas');
            canvas.style.top = `${clientY - 300}px`;
            canvas.style.left = `${clientX - 550}px`;
            canvas.style.display = 'block';
            const ctx = canvas.getContext("2d");
            canvas.width = size;
            canvas.height = size;
            ctx.scale(4, 4);
            ctx.drawImage(image, (-clientX + 470) / 1.8, (-clientY + 270) / 1.5);
        }
    }

    return (
        <main className="advertising pb-128" data-id='61' data-count='1'>
            <Breadcrumbs className='mb-32' currentPage='Advertising' />
            <h2>Ads on charging stations and in the Malanka New app</h2>
            <FlexWrap className='advertising__container pb-128' justify='space-between' direction={innerWidth < 1400 ? 'column-reverse' : 'row'} gap={32}>
                <FlexWrap className='slider-container' gap={64}>
                    <FlexWrap justify='center' align='center' className='slider-preview'>
                        <img src={slides[0]} alt='malanka' />
                    </FlexWrap>
                    <FlexWrap className='slider-wrap' direction='column'>
                        <div className='swiper'>
                            <div className='swiper-wrapper'>
                                {slides.map((item, i) => (
                                    <div
                                        className='swiper-slide'
                                        key={i}
                                    >
                                        <img src={item} alt='malanka' />
                                    </div>
                                ))}
                            </div>
                            <FlexWrap className='slider__control-panel' justify='flex-start'>
                                <div className="swiper-pagination"></div>
                                <div className='slider-btns'>
                                    <button
                                        className='slider-prev-btn'
                                    >
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.8" d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z" fill="#7A7A95" />
                                        </svg>
                                    </button>
                                    <button
                                        className='slider-next-btn'
                                    >
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.8" d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z" fill="#7A7A95" />
                                        </svg>
                                    </button>
                                </div>
                            </FlexWrap>
                        </div>
                    </FlexWrap>
                </FlexWrap>
                <FlexWrap className='adv-title' direction='column' gap={32}>
                    <FlexWrap direction='column' gap={16}>
                        <h3>You’ll be definitely noticed by Belarussian electric car owners</h3>
                        <p className='regular-text'>
                            Banner ads in the mobile app of the largest charging stations network –Malanka. Screens on charging stations, lightboxes and a LED-screen in a cashierless shop. Target audience of electric car owners is at your disposal.
                        </p>
                    </FlexWrap>
                    <FlexWrap direction='column' gap={16}>
                        <h3>Malanka Web-site and social media</h3>
                        <p className='regular-text'>
                            Partners’ information and banner ads on our website, News page, Telegram, Instagram Malanka.
                        </p>
                    </FlexWrap>
                    <button className='btn-green-outline'>
                        Download pricelist
                    </button>
                </FlexWrap>
            </FlexWrap>
            <FlexWrap className='advertising__screens pb-128' direction={innerWidth <= 1024 ? 'column' : 'row'} gap={32}>
                <FlexWrap className='pt-64' direction='column' gap={32}>
                    <h3>Screens on charging stations</h3>
                    <p className='regular-text'>
                        Your banner ad will be placed in the locations you choose, clients at charging stations and passers-by will definitely notice your ad on the LCD –monitor.
                    </p>
                </FlexWrap>
                <img src='/images/adv/example.png' alt='malanka' />
                <FlexWrap direction='column' className='pt-64' gap={32}>
                    <h4>It’s also possible to cover charging stations with your unique advertising materials!</h4>
                    <img src='/images/adv/bn-bg.png' alt='malanka' />
                </FlexWrap>
            </FlexWrap>
            <FlexWrap className='news-page zoom-container pb-128' direction='column'>
                <h3 className='mb-8'>Ultra-fast charging systems</h3>
                <div className='mb-16 slider__title'>
                    <p>Lightboxes, a LED-screen, a pylon – electric cars and their owners are at the center of your attention.</p>
                    <div className='slider__control-panel'>
                        <p className='swiper-pagination'></p>
                        <div className='slider-btns'>
                            <button
                                className='slider-prev-btn'
                            >
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.8" d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z" fill="#7A7A95" />
                                </svg>
                            </button>
                            <button
                                className='slider-next-btn'
                            >
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.8" d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z" fill="#7A7A95" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='news-page__slider'>
                    <div className='swiper-wrapper'>
                        {['/images/main-1.png', '/images/main-2.png'].map((item, i) => (
                            <div className='swiper-slide zoom' key={i}>
                                <img
                                    src={item}
                                    loading='lazy'
                                    alt='slide-cover'
                                    onMouseMove={zoomTargetImage}
                                    onMouseLeave={() => {
                                        const canvas = document.querySelector('#canvas');
                                        canvas.style.display = 'none';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    {/* <div className='swiper-pagination'></div> */}
                </div>
                <canvas id='canvas'></canvas>
            </FlexWrap>
            <FlexWrap className='form-pr' direction={innerWidth <= 1024 ? 'column' : 'row'} gap={128}>
                <h3 className="left">Are you interested or have any questions?</h3>
                <CallbackForm />
            </FlexWrap>
        </main>
    )
}