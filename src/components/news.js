import { useSelector } from "react-redux"
import { Breadcrumbs } from "./breadcrumbs/breadcrumbs"
import { NewsContent } from "./news/news-content"
import { NewsTitle } from "./news/news-title"
import { useEffect } from "react"

export const News = (props) => {
    const { language } = useSelector(store => store.localLanguage);

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
                <NewsTitle />
                <NewsContent {...props} />
            </div>
        </main>
    )
}