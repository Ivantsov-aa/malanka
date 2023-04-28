import { DirectionLink, ListItem, PartnersContainer } from "./Partners.style";
import { FlexWrap } from '../FlexWrap/FlexWrap';
import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertLink } from "../../services/convertLink";
import { handlerPageData } from "../../services/handlerPageData";

const directions = [
    {
        id: 1,
        path: 'integration',
        cover: '/images/partners/integration.png',
        title: 'Інтэграцыя зарадных станцый у сетку Malanka',
        list_title: 'Звярнуўшыся да нас, Вы атрымаеце:',
        list: [
            'Інтэграцыю вашых ЭЗС у наша ПЗ',
            'Адлюстраванне ЭЗС на карце MALANKA',
            'Арганізацыю білінгу',
            'Дыспетчарызацыю званкоў на «гарачую лінію» MALANKA',
            'Тэхнічнае абслугоўванне'
        ]
    },
    {
        id: 2,
        path: 'consalting',
        cover: '/images/partners/consalting.png',
        title: 'Кансалтынг па зараднай інфраструктуры',
        list_title: 'Каманда Malanka гатова:',
        list: [
            'Ацаніць выбраную Вамі лакацыю',
            'Падабраць прыдатнае абсталяванне',
            'Дапамагчы з праектаваннем і будаўніцтвам',
            'Прадаставіць ПА для вырашэння пытанняў на этапе эксплуатацыі'
        ]
    },
    {
        id: 3,
        path: 'white-label',
        cover: '/images/partners/white-label.png',
        title: 'White Label – стварэнне сеткі зарадных станцый «пад ключ»',
        list_title: 'Праект любога маштабу для Вас:',
        list: [
            'Выбар лакацыі і ацэнку эканамічнай эфектыўнасці',
            'Праектаванне і будаўніцтва',
            'Распрацоўку ПА і арганізацыю білінгу',
            'Распрацоўку праектаў НПА і фарміраванне заканадаўчай базы',
            'Сертыфікацыю зараднай інфраструктуры як міжнароднага кліматычнага праекта'
        ]
    }
]

export const Partners = () => {
    const { language } = useSelector(store => store.localLanguage);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language])

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(58, 1)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
                convertLink(page.querySelectorAll('a'), navigate);
                main.innerHTML = page.innerHTML;
                eventNavigate();
            })
    }

    const eventNavigate = () => {
        const links = document.querySelectorAll('.partner__link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navigate(link.dataset.value);
            })
        })
    }

    return (
        <main className='partner' data-id='58' data-count='1'>
            <Breadcrumbs currentPage='Стаць партнёрам' />
            <h2>Разам будуем будучыню</h2>
            <FlexWrap className='categories-container ph-20' justify='space-between'>
                {directions.map(direction => (
                    <button className='partner__link' data-value={direction.path} key={direction.id}>
                        <FlexWrap className='partner__flex' direction='column' gap={8}>
                            <img src={direction.cover} alt='malanka' />
                            <h4>{direction.title}</h4>
                            <p className='regular-text'>{direction.list_title}</p>
                            <ul>
                                {direction.list.map((item, i) => (
                                    <ListItem className='regular-text partner__list-item' key={i}>{item}</ListItem>
                                ))}
                            </ul>
                        </FlexWrap>
                    </button>
                ))}
            </FlexWrap>
        </main>
    )
}