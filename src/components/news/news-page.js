import {useEffect, useRef, useState} from "react"
import {Link, useLocation} from "react-router-dom";

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";

import {Breadcrumbs} from "../breadcrumbs/breadcrumbs";
import {AppLinks} from "../AppLinks/AppLinks";

import {newsArray} from "../store/store";
import {Instructions} from "../instructions/instructions";
import {NewsPageParagraph} from "./NewsPage.style";
import {url} from "../admin/AuthForm/AuthForm";
import {instructionsList} from "../mission";
import {useSelector} from "react-redux";
import {dateConverter} from "./news-title";

export const NewsPage = ({pathname, innerWidth}) => {
    const [currentNews, setCurrentNews] = useState(null);
    const [prevNews, setPrevNews] = useState(null);
    const [nextNews, setNextNews] = useState(null);
    const [sliderPage, setSliderPage] = useState(1);
    const [slider, setSlider] = useState(null);
    const {language} = useSelector(store => store.localLanguage);

    const sliderPrevBtnRef = useRef();
    const sliderNextBtnRef = useRef();
    const location = useLocation();

    useEffect(() => {
        loadCurrentNews(language === 'RU' ? 'RUS' : (language === 'EN' ? 'ENG' : 'BEL'));
    }, []);

    const loadCurrentNews = async (language) => {
        const currentId = location.pathname.split("/").pop();
        await fetch(`${url}/article/${currentId}`)
            .then(response => response.json())
            .then(result => {
                setCurrentNews(result);
                const photos = result.imageDtos.filter(image => image.imageType === 'CAROUSEL');
                setSlider(photos);
            });

        await fetch(`${url}/article?language=${language}&page=${location.state?.currentPage || 0}`)
            .then(response => response.json())
            .then(result => {
                const currentArticleIndex = result.findIndex(c => c.id === +currentId);

                if (currentArticleIndex !== 0) {
                    setPrevNews(result[currentArticleIndex - 1]);
                } else {
                    if (location.state && location.state.currentPage > 0) {
                        fetch(`${url}/article?language=${language}&page=${location.state.currentPage - 1}`)
                            .then(response => response.json())
                            .then(result => {
                                setPrevNews(result[result.length - 1]);
                            })
                    }
                }

                if (currentArticleIndex !== result.length - 1) {
                    setNextNews(result[currentArticleIndex + 1]);
                } else {
                    fetch(`${url}/article?language=${language}&page=${location.state.currentPage + 1}`)
                        .then(response => response.json())
                        .then(result => {
                            if (result && result.length) {
                                setNextNews(result[0]);
                            }
                        })
                }
            });
    }

    return (
        currentNews &&
        <main className="news-page">
            <div className="pt-32">
                <section className="news-page__title mb-32">
                    <div className="news-page__cover mb-16">
                        {currentNews.imageDtos.map((item, i) => (
                            item.imageType === "MAIN" && <img src={url + `/image/${item.id}`} alt="news-cover" key={i} />
                        ))}
                    </div>
                    <Breadcrumbs link={{name: "Новости", path: "news"}} currentPage={currentNews.title} />
                </section>
                <section className="news-page__content">
                    <div className="mb-32">
                        <p className="news-date text mb-24">{dateConverter(currentNews.dateModified.split('T')[0], language)} в {currentNews.dateModified.split('T')[1].split(':').slice(0, 2).join(':')}</p>
                        <h1 className="mb-16">{currentNews.title}</h1>
                        <h2 className="mb-16">{currentNews.preview}</h2>
                        <AppLinks />
                    </div>
                    <div className="grid">
                        {currentNews.paragraphDtos.map((item, i) => {
                            if (item.style.family === 'slider-desc') {
                                return <div className="mb-32" style={{gridRow: item.position}} key={i}>
                                    <div>
                                        <div className="mb-16 slider__title">
                                            <p>{item.body}</p>
                                            <div className="slider__control-panel">
                                                <p>{sliderPage} / {Math.ceil(slider && slider.length / (innerWidth < 768 ? 1 : 3))}</p>
                                                <div className="slider-btns">
                                                    <button
                                                        className="slider-prev-btn"
                                                        ref={sliderPrevBtnRef}
                                                    >
                                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.8" d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z" fill="#7A7A95" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="slider-next-btn"
                                                        ref={sliderNextBtnRef}
                                                    >
                                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.8" d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z" fill="#7A7A95" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Swiper
                                        className="news-page__slider"
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
                                    >
                                        {slider && slider.map((item, i) => (
                                            <SwiperSlide key={i}>
                                                <img src={url + `/image/${item.id}`} loading="lazy" alt="slide-cover" />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            } else if (item.style.family === 'video-title') {
                                return <div style={{marginBottom: '32px', gridRow: item.position}} key={i}>
                                    <NewsPageParagraph
                                        className="h4"
                                        size={item.style.size}
                                        weight={item.style.weight}
                                        alignment={item.style.alignment}
                                        marginBottom={item.style.marginBottom}
                                    >
                                        {item.body}
                                    </NewsPageParagraph>
                                    <div className="video-block__container">
                                        <video width="100%" height="100%" src={`${url}/video/${currentNews.videoId}`} />
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
                                </div>
                            } else {
                                return <NewsPageParagraph
                                    row={item.position}
                                    size={item.style.size}
                                    weight={item.style.weight}
                                    alignment={item.style.alignment}
                                    marginBottom={item.style.marginBottom}
                                    key={i}
                                >
                                    {item.body}
                                </NewsPageParagraph>
                            }
                        })}
                        {currentNews.simpleListDtos.map(item => (
                            item.listType === 'ORDERED' ?
                                <div style={{gridRow: item.position, marginBottom: item.style.marginBottom}} key={item.id}>
                                    <h3
                                        className="mb-8"
                                        style={{
                                            fontSize: item.style.size,
                                            fontWeight: item.style.weight,
                                            fontStyle: item.style.alignment
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <ol>
                                        {item.simpleRows.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ol>
                                </div>
                                :
                                <div style={{gridRow: item.position, marginBottom: item.style.marginBottom}} key={item.id}>
                                    <h3
                                        className="mb-8"
                                        style={{
                                            fontSize: item.style.size,
                                            fontWeight: item.style.weight,
                                            fontStyle: item.style.alignment
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <ul>
                                        {item.simpleRows.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                        ))}
                        {currentNews.complexListDtos.map(item => (
                            <div style={{gridRow: item.position, marginBottom: item.style.marginBottom}} key={item.id}>
                                <h3
                                    className="mb-8"
                                    style={{
                                        fontSize: item.style.size,
                                        fontWeight: item.style.weight,
                                        fontStyle: item.style.alignment
                                    }}
                                >{item.mainTitle}</h3>
                                <ol className="complex-list">
                                    {item.complexListPartDtos.map(part => (
                                        part.complexRows.length > 0 ?
                                            <div className="parent-list" key={part.id}>
                                                <li
                                                    style={{
                                                        fontSize: part.style.size,
                                                        fontWeight: part.style.weight,
                                                        fontStyle: part.style.alignment
                                                    }}
                                                >
                                                    {part.title}
                                                </li>
                                                <ul>
                                                    {part.complexRows.map((el, index) => (
                                                        <li key={index + "a"}>{el}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            :
                                            <div key={part.id}>
                                                <li
                                                    style={{
                                                        fontSize: part.style.size,
                                                        fontWeight: part.style.weight,
                                                        fontStyle: part.style.alignment
                                                    }}
                                                >
                                                    {part.title}
                                                </li>
                                            </div>
                                    ))}
                                </ol>
                            </div>
                        ))}
                        {currentNews.imageDtos.map(item => (
                            item.imageType === 'BANNER' && <img style={{marginBottom: '32px', gridRow: item.position}} src={url + `/image/${item.id}`} alt="malanka" key={item.id} />
                        ))}
                    </div>
                    <Instructions
                        title={language === 'RU' ?
                            'Зарядка электромобиля в 3 шага!'
                            :
                            (language === 'EN' ?
                                'Electric car charging in 3 steps!'
                                :
                                'Зарадка электрамабіля ў 3 крокі!'
                            )}
                        list={instructionsList}
                        subtitle={language === 'RU' ?
                            'Сейчас чтобы зарядить свой электромобиль вам нужно всего три клика в смартфоне'
                            :
                            (language === 'EN' ?
                                'Now to charge your electric car you need only three clicks on your smartphone'
                                :
                                'Цяпер каб зарадзіць свой электрамабіль вам трэба ўсяго тры клікі ў смартфоне'
                            )}
                    />
                    <div className="news-page__content-footer">
                        <Link to="/news" className="link-to-news">
                            <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.8" d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z" fill="#7A7A95" />
                            </svg>
                            К списку новостей
                        </Link>
                        <div>
                            <Link
                                to={prevNews ? `/news/${prevNews.id}` : ''}
                                // onClick={(e) => newsArray[prevNews].id === currentNews.id && e.preventDefault()}
                                className={`prev-link`}
                                disabled={!prevNews}
                                state={{currentPage: location.state?.currentPage}}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12.0503L1 7.05029L6 2.05029" stroke="#C1C1C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1 7.05029H13" stroke="#C1C1C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Предыдущая
                            </Link>
                            <Link
                                to={nextNews ? `/news/${nextNews.id}` : ''}
                                state={{currentPage: location.state?.currentPage}}
                                // onClick={(e) => newsArray[nextNews].id === currentNews.id && e.preventDefault()}
                                disabled={!nextNews}
                                className={`next-link`}
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