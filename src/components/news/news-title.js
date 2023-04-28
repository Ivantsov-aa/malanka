const mainNews = {
    date: '30 января, 2023',
    title: 'MALANKA запускает новое мобильное приложение по зарядке электромобиля',
    desc: 'Сеть зарядных станций MALANKA анонсирует запуск нового мобильного приложения по зарядке электромобиля. Сеть зарядных станций MALANKA анонсирует запуск нового мобильного приложения по зарядке электромобиля.Сеть зарядных станций MALANKA анонсирует запуск нового мобильного приложения по зарядке электромобиля. Сеть зарядных станций MALANKA.'
}

export const NewsTitle = () => {
    return (
        <section className='news__title'>
            <div className='title__col'>
                <p className='news-date mb-32'>{mainNews.date}</p>
                <h2 className='mb-16'>{mainNews.title}</h2>
                <p className='title-text'>{mainNews.desc}</p>
            </div>
            <div className='img__wrapper'>
                <img src='/images/news/news-cover.png' alt='news-cover' />
            </div>
        </section>
    )
}