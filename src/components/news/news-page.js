import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import { AppLinks } from "../AppLinks/AppLinks";

import { newsArray } from '../store/store';
import { monthArray } from '../store/store';
import { Instructions } from "../instructions/instructions";
import { NewsPageParagraph } from "./NewsPage.style";

export const NewsPage = ({ pathname, innerWidth }) => {
    const [currentNews, setCurrentNews] = useState(null);
    const [prevNews, setPrevNews] = useState(null);
    const [nextNews, setNextNews] = useState(null);
    const [sliderPage, setSliderPage] = useState(1);

    const sliderPrevBtnRef = useRef();
    const sliderNextBtnRef = useRef();

    useEffect(() => {
        loadCurrentNews();
    }, []);

    const loadCurrentNews = () => {
        const currentNewsId = pathname.split('/').pop();
        const filterNews = newsArray.filter((news, i) => {
            if (news.id === currentNewsId) {
                i > 0 ? setPrevNews(i - 1) : setPrevNews(i);
                i < newsArray.length - 1 ? setNextNews(i + 1) : setNextNews(i);
                return news;
            }

            return false;
        });

        const newsDate = filterNews[0].date.split('/');
        const newsDateDay = newsDate[1];
        const newsDateMonth = monthArray[newsDate[0] - 1];
        const newsDateYear = newsDate[2];

        setCurrentNews({ ...filterNews[0], date: `${newsDateDay} ${newsDateMonth}, ${newsDateYear}` });
    }

    return (
        currentNews &&
        <main className='news-page'>
            <div className='pt-32'>
                <section className='news-page__title mb-32'>
                    <div className='news-page__cover mb-16'>
                        <img src={`${currentNews.img}`} alt='news-cover' />
                    </div>
                    <Breadcrumbs link={{ name: 'Новости', path: 'news' }} currentPage={currentNews.title} />
                </section>
                <section className='news-page__content'>
                    <div>
                        <p className='news-date regular-text medium mb-24'>{currentNews.date}</p>
                        <h2 className='mb-16'>MALANKA запускает новое мобильное приложение по зарядке электромобиля</h2>
                        <p className='text mb-16'>Приложение MALANKA использует в своей работе данные вашей геолокации. Приложение определяет точное положение автомобиля и выстраивает самый оптимальный маршрут до ближайшей подходящей вашему электромобилю зарядной станции. </p>
                        <AppLinks />
                    </div>
                    {currentNews.text.map((item, i) => (
                        <NewsPageParagraph key={i}>{item}</NewsPageParagraph>
                    ))}
                    {currentNews.textWithBold}
                    <div>
                        <h4 className='medium mb-8'>Маркированный список</h4>
                        <ul>
                            {currentNews.ulList.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className='medium mb-8'>Нумерованный список</h4>
                        <ol>
                            {currentNews.olList.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <h4 className='medium mb-8'>Список</h4>
                        <ol>
                            {currentNews.olUlList.map((item, i) => (
                                item.items ?
                                    <div className='parent-list' key={i}>
                                        <li>
                                            {item.title}
                                        </li>
                                        <ul>
                                            {item.items.map((el, index) => (
                                                <li key={index + 'a'}>{el}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    :
                                    <li key={i}>
                                        {item.title}
                                    </li>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <h3 className='mb-8'>{currentNews.video.title}</h3>
                        <p className='mb-16'>{currentNews.video.text}</p>
                        <div className='video__container'>
                            <iframe width='100%' height='100%' src='https://www.youtube.com/embed/2j5vdIF2tDg' title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                    <Instructions {...currentNews.instructions} />
                    <div>
                        <h3 className='mb-8'>{currentNews.slider.title}</h3>
                        <div className='mb-16 slider__title'>
                            <p>{currentNews.slider.text}</p>
                            <div className='slider__control-panel'>
                                <p>{sliderPage} / {Math.ceil(currentNews.slider.photos.length / (innerWidth < 768 ? 1 : 3))}</p>
                                <div className='slider-btns'>
                                    <button
                                        className='slider-prev-btn'
                                        ref={sliderPrevBtnRef}
                                    >
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.8" d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z" fill="#7A7A95" />
                                        </svg>
                                    </button>
                                    <button
                                        className='slider-next-btn'
                                        ref={sliderNextBtnRef}
                                    >
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.8" d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z" fill="#7A7A95" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Swiper
                            className='news-page__slider'
                            spaceBetween={innerWidth < 768 ? 0 : 16}
                            slidesPerView={innerWidth < 768 ? 1 : 3}
                            slidesPerGroup={innerWidth < 768 ? 1 : 3}
                            modules={[Pagination, Navigation]}
                            pagination={{ clickable: true }}
                            navigation={{
                                prevEl: sliderPrevBtnRef.current,
                                nextEl: sliderNextBtnRef.current
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = sliderPrevBtnRef.current;
                                swiper.params.navigation.nextEl = sliderNextBtnRef.current;
                            }}
                            onSlideChange={e => setSliderPage((e.activeIndex / (innerWidth < 768 ? 1 : 3)) + 1)}
                        >
                            {currentNews.slider.photos.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <img src={item} loading='lazy' alt='slide-cover' />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className='news-page__content-footer'>
                        <Link to='/news' className='link-to-news'>
                            <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.8" d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z" fill="#7A7A95" />
                            </svg>
                            К списку новостей
                        </Link>
                        <div>
                            <Link
                                to={`/news/${newsArray[prevNews].id}`}
                                onClick={(e) => newsArray[prevNews].id === currentNews.id && e.preventDefault()}
                                className={`prev-link ${newsArray[prevNews].id === currentNews.id ? 'disabled' : ''}`}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12.0503L1 7.05029L6 2.05029" stroke="#C1C1C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1 7.05029H13" stroke="#C1C1C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Предыдущая
                            </Link>
                            <Link
                                to={`/news/${newsArray[nextNews].id}`}
                                onClick={(e) => newsArray[nextNews].id === currentNews.id && e.preventDefault()}
                                className={`next-link ${newsArray[nextNews].id === currentNews.id ? 'disabled' : ''}`}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12.0503L1 7.05029L6 2.05029" stroke="#C1C1C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1 7.05029H13" stroke="#C1C1C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Следующая
                            </Link>
                        </div>
                    </div>
                </section>
            </div >
        </main >
    )
}