import {useSelector} from "react-redux"
import {Breadcrumbs} from "./breadcrumbs/breadcrumbs"
import {NewsContent} from "./news/news-content"
import {NewsTitle} from "./news/news-title"
import {useEffect} from "react"
import {useState} from "react"
import {url} from "./admin/AuthForm/AuthForm"

export const News = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [mainNews, setMainNews] = useState(null);
    const [newsList, setNewsList] = useState(null);
    const {language} = useSelector(store => store.localLanguage);

    useEffect(() => {
        loadNews(language === 'RU' ? 'RUS' : (language === 'EN' ? 'ENG' : 'BEL'));
    }, [currentPage]);

    const loadNews = async (language) => {
        await fetch(`${url}/article?language=${language}&page=${currentPage}`)
            .then(response => response.json())
            .then(result => {
                if (result.message) {
                    loadNews('RUS');
                } else {
                    if (currentPage === 0) {
                        setMainNews(result[3]);
                    }

                    setNewsList(result);
                }
            })
    }

    return (
        <main>
            <div className='pt-16'>
                <Breadcrumbs padding
                    link={{
                        name: language === 'RU' ?
                            'Новости'
                            :
                            (language === 'EN' ?
                                'News'
                                :
                                'Навіны'
                            )
                        , path: 'news'
                    }} />
                {mainNews && <NewsTitle news={mainNews} currentPage={currentPage} />}
                {newsList && <NewsContent {...props} news={newsList} setNews={setNewsList} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            </div>
        </main>
    )
}