import { useState } from "react";
import { Link } from "react-router-dom";

const sectionsContent = {
    clients: [
        {
            id: 1,
            title: 'Як зарадзіць электрамабіль?',
            img: '/images/news/news-3.png',
            path: '#'
        },
        {
            id: 2,
            title: 'Якая зарадка падыдзе майму электрамабілю?',
            img: '/images/news/news-1.png',
            path: '#'
        },
        {
            id: 3,
            title: 'Як выкарыстоўваць дадатак для зарадкі Malanka New?',
            img: '/images/news/news-2.png',
            path: '#'
        }
    ],
    news: [
        {
            id: 4,
            title: 'Зарядные станции Malanka для любых электромобилей',
            img: '/images/news/news-4.jpg',
            path: '#'
        },
        {
            id: 5,
            title: 'Преимущества современных зарядных станций',
            img: '/images/news/news-5.jpg',
            path: '#'
        },
        {
            id: 6,
            title: 'Почему выбирают нас',
            img: '/images/news/news-6.jpg',
            path: '#'
        }
    ]
};

export const MainNews = () => {
    const [chosenSection, setChosenSection] = useState(1);

    return (
        <section className='main__news-wrapper'>
            <section className='news'>
                <h2 className='mb-32'>Хочаце даведацца больш пра зарадку электрамабіля? Навіны пра развіццё сеткі зарадных станцый Маланка?</h2>
                <div className='news__toggle mb-24'>
                    <button className={`btn-gray ${chosenSection === 1 ? 'active' : ''}`} onClick={() => setChosenSection(1)}>Пакупніку</button>
                    <button className={`btn-gray ${chosenSection === 2 ? 'active' : ''}`} onClick={() => setChosenSection(2)}>Навіны</button>
                </div>
                <div className='news__feed'>
                    {chosenSection === 1 ?
                        sectionsContent.clients.map(item => (
                            <Link to={item.path} className='news__link' key={item.id}>
                                <div className='img__wrapper'>
                                    <img src={item.img} loading='lazy' alt='news-cover' />
                                </div>
                                <h4>{item.title}</h4>
                            </Link>
                        ))
                        :
                        sectionsContent.news.map(item => (
                            <Link to={item.path} className='news__link' key={item.id}>
                                <div className='img__wrapper'>
                                    <img src={item.img} loading='lazy' alt='news-cover' />
                                </div>
                                <h4>{item.title}</h4>
                            </Link>
                        ))
                    }
                </div>
            </section>
        </section >
    )
}