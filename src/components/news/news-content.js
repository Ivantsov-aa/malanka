import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Pagination} from "../pagination/pagination";
import {Select} from "../select/select";
import {useSelector} from "react-redux";
import {dateConverter} from "./news-title";
import {url} from "../admin/AuthForm/AuthForm";
import {NewsPageCloseButton, NewsPageLangButtons} from "../admin/AdminNews/AdminNews.style";

export const NewsContent = ({innerWidth, currentPage, setCurrentPage, news, setNews, onDeleteArticle}) => {
    const [sortValue, setSortValue] = useState(null);
    const contentRef = useRef();
    const {language} = useSelector(store => store.localLanguage);
    const {isLogged} = useSelector((store) => store.authAdmin);

    useEffect(() => {
        setSortValue("")
    }, [language])

    const scrollToContentTop = () => {
        const newsContentTop = contentRef.current.getBoundingClientRect().top;

        window.scrollTo({
            top: newsContentTop + window.pageYOffset - 120,
            behavior: 'smooth'
        })
    }

    const handlePrevPage = () => {
        scrollToContentTop();
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        scrollToContentTop();
        setCurrentPage(currentPage + 1);
    }

    const handleChosenPage = (page) => {
        scrollToContentTop();
        setCurrentPage(page);
    }

    const handleSortNews = (action) => {
        if (action.value === 'ascending') {
            const sortNews = news.sort((a, b) => Date.parse(a.dateModified) - Date.parse(b.dateModified));
            setNews(sortNews);
        } else if (action.value === 'descending') {
            const sortNews = news.sort((a, b) => Date.parse(b.dateModified) - Date.parse(a.dateModified));
            setNews(sortNews);
        }

        setSortValue(action.name);
    }

    const handleDeleteArticle = (id) => {
        onDeleteArticle(id);
    }

    return (
        <section className='news-content' ref={contentRef}>
            <div className='news-content__sort-params mb-32'>
                <Select
                    title={sortValue ? sortValue : language === 'RU' ? 'Сортировка'
                        :
                        (
                            language === 'EN' ?
                                'Sorting'
                                :
                                'Сартаванне'
                        )}
                    list={[
                        {
                            name: language === 'RU' ? 'Дата (по возрастанию)'
                                :
                                (
                                    language === 'EN' ?
                                        'Date (asc)'
                                        :
                                        'Дата (па ўзрастанні)'
                                ),
                            value: 'ascending'
                        },
                        {
                            name: language === 'RU' ? 'Дата (по убыванию)'
                                :
                                (
                                    language === 'EN' ?
                                        'Date (desc)'
                                        :
                                        'Дата (па змяншэнні)'
                                ),
                            value: 'descending'
                        }
                    ]}
                    action={handleSortNews}
                    primary={1}
                />
            </div>
            <div className='news-content__container'>
                {news.map(item => {
                    const date = item.dateModified.split('T');
                    return <div className='news-content__block' key={item.id}>
                        <Link to={`./${item.id}`} state={{currentPage: currentPage}}>
                            <div className='img__wrapper mb-16'>
                                {item.imageDtos.length > 0 ?
                                    item.imageDtos.map((el, i) => (
                                        el.imageType === "MAIN" && <img src={url + `/image/${el.id}`} alt="news-cover" key={i} />)
                                    )
                                    :
                                    <img src='/images/main-2.png' alt="news-cover" />
                                }
                            </div>
                            <p className='date mb-16'>{dateConverter(date[0], language)} в {date[1].split(':').slice(0, 2).join(':')}</p>
                            <h5>{item.title}</h5>
                        </Link>
                        {
                            isLogged && <>
                                <NewsPageCloseButton onClick={() => handleDeleteArticle(item.id)}>
                                    <CloseSvg />
                                </NewsPageCloseButton>
                                {language === "RU" && <NewsPageLangButtons>
                                    <Link to="../article-create" state={{language: "EN", newsId: item.id}}>Eng</Link>
                                    <Link to="../article-create" state={{language: "BE", newsId: item.id}}>Бел</Link>
                                </NewsPageLangButtons>}
                            </>
                        }
                    </div>
                })}
            </div>
            {news.length ? <Pagination pageQuantity={Math.ceil(news.length / (innerWidth < 768 ? 8 : 9))} current={currentPage} handleChosenPage={handleChosenPage} actionPrev={handlePrevPage} actionNext={handleNextPage} /> : ""}
        </section >
    )
}

export const CloseSvg = () => {
    return (
        <svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" /></svg>
    )
}