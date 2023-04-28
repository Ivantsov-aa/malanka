import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "../pagination/pagination";
import { Select } from "../select/select";
import { newsArray } from '../store/store';
import { monthArray } from '../store/store';

export const NewsContent = ({ innerWidth }) => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortValue, setSortValue] = useState(null);
    const contentRef = useRef();

    useEffect(() => {
        setNews(newsArray);
    }, [])

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
            const sortNews = news.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
            setNews(sortNews);
        } else if (action.value === 'descending') {
            const sortNews = news.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
            setNews(sortNews);
        }

        setSortValue(action.name);
        setCurrentPage(1);
    }

    return (
        <section className='news-content' ref={contentRef}>
            <div className='news-content__sort-params mb-32'>
                <Select
                    title={sortValue ? sortValue : 'Сортировка'}
                    list={[
                        {
                            name: 'Дата (по возрастанию)',
                            value: 'ascending'
                        },
                        {
                            name: 'Дата (по убыванию)',
                            value: 'descending'
                        }
                    ]}
                    action={handleSortNews}
                />
            </div>
            <div className='news-content__container'>
                {news.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice((currentPage - 1) * (innerWidth < 768 ? 8 : 9), currentPage * (innerWidth < 768 ? 8 : 9)).map(item => {
                    const newsDate = item.date.split('/');
                    const newsDateDay = newsDate[1];
                    const newsDateMonth = monthArray[newsDate[0] - 1];
                    const newsDateYear = newsDate[2];
                    return <Link to={`./${item.id}`} className='news-content__block' key={item.id}>
                        <div className='img__wrapper mb-16'>
                            <img src={item.img} alt='news-cover' />
                        </div>
                        <p className='date mb-16'>{`${newsDateDay} ${newsDateMonth}, ${newsDateYear}`}</p>
                        <h5>{item.title}</h5>
                    </Link>
                })}
            </div>
            {news.length && <Pagination pageQuantity={Math.ceil(news.length / (innerWidth < 768 ? 8 : 9))} current={currentPage} handleChosenPage={handleChosenPage} actionPrev={handlePrevPage} actionNext={handleNextPage} />}
        </section>
    )
}