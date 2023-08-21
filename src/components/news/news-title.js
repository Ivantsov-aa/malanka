import {useSelector} from "react-redux"
import {url} from "../admin/AuthForm/AuthForm";
import {Link} from "react-router-dom";

const mainNews = {
    date: '30 января, 2023',
    title: 'MALANKA запускает новое мобильное приложение по зарядке электромобиля',
    desc: 'Сеть зарядных станций MALANKA анонсирует запуск нового мобильного приложения по зарядке электромобиля. Сеть зарядных станций MALANKA анонсирует запуск нового мобильного приложения по зарядке электромобиля.Сеть зарядных станций MALANKA анонсирует запуск нового мобильного приложения по зарядке электромобиля. Сеть зарядных станций MALANKA.'
}

const monthsArray = {
    rus: [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ],
    eng: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    bel: [
        "студзеня",
        "лютага",
        "сакавіка",
        "красавіка",
        "траўня",
        "чэрвеня",
        "ліпеня",
        "жніўня",
        "верасня",
        "кастрычніка",
        "лістапада",
        "снежня",
    ],
};

export const dateConverter = (currentDate, lang) => {
    const date = new Date(currentDate);
    const day = date.getDate();
    const month =
        lang === "RU"
            ? monthsArray.rus[date.getMonth()]
            : lang === "EN"
                ? monthsArray.eng[date.getMonth()]
                : monthsArray.bel[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
};

export const NewsTitle = ({news, currentPage}) => {
    const {language} = useSelector((store) => store.localLanguage);
    const date = news.dateModified.split('T');
    return (
        <Link to={`/news/${news.id}`} state={{currentPage: currentPage}} className='news__title'>
            <div className='title__col'>
                <p className='news-date mb-8'>{dateConverter(date[0], language)} в {date[1].split(':').slice(0, 2).join(':')}</p>
                <h2 className='mb-16'>{news.title}</h2>
                <p className='text'>{news.preview}</p>
            </div>
            <div className='img__wrapper'>
                {news.imageDtos.map((item, i) => (
                    item.imageType === 'MAIN' && <img src={url + `/image/${item.id}`} alt='news-cover' key={i} />
                ))}
            </div>
        </Link>
    )
}