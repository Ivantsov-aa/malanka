import {useEffect, useState} from "react";
import {MainBlock} from "./main/main-block"
import {MainMap} from "./main/main-map"
import {MainNews} from "./main/main-news"
import {MainTitle} from "./main/main-title"
import {useSelector} from "react-redux";
import {handlerPageData} from "../services/handlerPageData";
import {useNavigate} from "react-router-dom";
import {convertLink} from "../services/convertLink";
import {url} from "./admin/AuthForm/AuthForm";

const defaultState = {
    center: [53.902292, 27.561821],
    zoom: 9,
    controls: ["zoomControl", "fullscreenControl", "geolocationControl"]
};

let map;
let script;
let clientSection;

export const Main = () => {
    const {language} = useSelector(store => store.localLanguage);
    const {isLogged, userInfo} = useSelector((store) => store.authAdmin);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
        loadNews(language === 'RU' ? 'RUS' : (language === 'EN' ? 'ENG' : 'BEL'));
    }, [language]);

    const loadNews = async (language) => {
        await fetch(`${url}/article?language=${language}&page=0`)
            .then(response => response.json())
            .then(result => {
                if (result.message) {
                    loadNews('RUS');
                } else {
                    handleToggleTabs(result.slice(0, 3));
                }
            })
    }

    const blockContent = {
        first: {
            title: language === 'RU' ?
                'В будущее вместе'
                :
                (language === 'EN' ?
                    'Together in future'
                    :
                    'У будучыню разам'
                ),
            list: [
                // 'Создать собственную сеть зарядных станций «под ключ»? Ваша станция в сети Маланка? Собственный бизнес по зарядке электромобилей или просто установить зарядную станцию для сотрудников и клиентов? Мы знаем, что и как правильно!',
                // 'To launch your own electric car charging network on a “turnkey” basis? Your station within Malanka network? Your own electric car charging business or just to install a charging station for employees or clients? We know how to do the right thing!',
                'Стварыць уласную сетку зарадных станцый "пад ключ"? Ваша станцыя ў сетцы Маланка? Уласны бізнес па зарадцы электрамабіляў або проста ўсталяваць зарадную станцыю для супрацоўнікаў і кліентаў? Мы ведаем, што і як правільна!',

                // 'Комплексные пакетные решения по интеграции, организация биллинга, диспетчеризация звонков пользователей ЭЗС и техническое обслуживание. Консалтинг установки станции, оптимальной мощности, окупаемости и больше.',
                // 'Comprehensive package integration solutions, billing, ECS-users call dispatch and maintenance. Consulting on the issues of installation of a charging station, optimal capacity, return on investment and more.',
                'Комплексныя пакетныя рашэнні па інтэграцыі, арганізацыя білінгу, дыспетчарызацыя званкоў карыстальнікаў ЭЗС і тэхнічнае абслугоўванне. Кансалтынг усталявання станцыі, аптымальнай магутнасці, акупнасці і болей.',
            ],
            imgPath: '/images/main-1.png',
            link: {
                name: language === 'RU' ?
                    ' Стать партнером'
                    :
                    (language === 'EN' ?
                        'Become a partner'
                        :
                        'Стаць партнёрам'
                    ),
                path: './partner'
            }
        },
        second: {
            title: language === 'RU' ?
                'Магазин безоператорной торговли'
                :
                (language === 'EN' ?
                    'A cashierless shop'
                    :
                    'Магазін безаператарнага гандлю'
                ),
            text: language === 'RU' ?
                'Зарядил электромобиль – заряди себя! Способ покупки будущего доступен с Маланка уже сегодня. Безоператорный магазин автономной торговли Malanka shop 247. Для Вас свежий кофе, закуски и все необходимое для пополнения запаса калорий и не только.'
                :
                (language === 'EN' ?
                    'Charged your electric car – charge yourself! Purchasing of the future is already available with Malanka. Cashierless automated торговли Malanka shop 247. Fresh coffee, snacks and all you need to refresh yourself and even more for you.'
                    :
                    'Зарадзіў электрамабіль – зарадзі сябе! Спосаб купляння будучыні даступны з Маланка ўжо сёння. Безаператарны магазін аўтаномнага гандлю Malanka shop 247. Для Вас свежая кава, закускі і ўсё неабходнае для папаўнення запасу калорый і не толькі.'
                ),
            list: null,
            imgPath: '/images/main-2.png',
            link: {
                name: 'Malanka shop 247',
                path: './shop247'
            }
        }
    };

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(29, 1)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
                page.querySelector('.main__title-text').children[2].classList.add('app-links');
                convertLink(page.querySelectorAll('a.btn-green'), navigate);
                main.innerHTML = page.innerHTML;
                document.querySelector(".title__image img").style.transform = "translate(0, 0) scale(1)";
                loadMap();
            })
    }

    const scrollFunc = () => {
        const titleImage = document.querySelector('.title__image img');
        let scrollTop = window.scrollY;
        const {height} = titleImage.getBoundingClientRect();
        titleImage.style.transform = `translate(0, -${scrollTop / 5}px) scale(${(((height - (scrollTop / 5)) / height))})`;
    }

    const init = (ymaps, placemarks) => {
        const searchControl = new ymaps.control.SearchControl({
            options: {
                fitMaxWidth: true,
                maxWidth: ['small', 'large'],
                size: ['small', 'large'],
                provider: 'yandex#search'
            }
        });

        map = new ymaps.Map("map", defaultState);
        map.controls.add(searchControl);
        const objectManager = new ymaps.ObjectManager();
        objectManager.add(placemarks);
        map.geoObjects.add(objectManager);
        map.geoObjects.events.add('click', () => {
            window.open('https://customer.malankabn.by/map', '_blank');
        })

        return map;
    }

    const loadPlacemarks = async (ymaps) => {
        await fetch('https://apigateway.malankabn.by/central-system/api/v1/locations/map/points')
            .then(response => response.json())
            .then(result => {
                const placemarksTemplates = result.map(mark => (
                    {
                        type: "Feature",
                        id: mark.locationId,
                        geometry: {
                            type: "Point",
                            coordinates: [
                                mark.latitude,
                                mark.longitude
                            ]
                        },
                        options: {
                            iconLayout: 'default#image',
                            iconImageHref: `data:image/png;base64,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`,
                            iconImageSize: [35, 44],
                            iconImageOffset: [-18, -37],
                            location: mark
                        }
                    }
                ))
                ymaps.ready(init(ymaps, placemarksTemplates));
            })
    }

    const loadMap = () => {
        if (map) {
            map.destroy();
        }

        if (script) {
            script.remove();
        }

        if (window['ymaps_' + language.toLowerCase()]) {
            window['ymaps_' + language.toLowerCase()] = '';
        }

        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://api-maps.yandex.ru/2.1?apikey=8334e7a6-6bb1-44c2-a061-4d1f8662219d&onload=init_' +
            (language.toLowerCase()) +
            '&lang=' +
            (language === 'BY' ? 'ru' : language.toLowerCase()) +
            '_RU&ns=ymaps_' +
            (language.toLowerCase())

        document.body.append(script);

        window['init_' + language.toLowerCase()] = function () {
            loadPlacemarks(window['ymaps_' + language.toLowerCase()]);
        }
    }

    const handleToggleTabs = (news) => {
        const tabs = document.querySelectorAll('.news__toggle button');
        const feed = document.querySelector('.news__feed');

        tabs[0].addEventListener('click', () => {
            if (clientSection) {
                feed.innerHTML = '';
                feed.innerHTML = clientSection;
            }
            tabs[0].classList.add('active');
            tabs[1].classList.remove('active');
            convertLink('', navigate, 'news');
        })

        tabs[1].addEventListener('click', () => {
            let newsFeed;
            news.forEach(item => {
                const coverImage = item.imageDtos.map(el => (
                    el.imageType === "MAIN" && `<img src='${url}${`/image/${el.id}`}' alt="news-cover" />`)
                ).filter(el => el);
                newsFeed += `<a class="news__link" href=${'/news/' + item.id}>
                    <div class="img__wrapper">
                        ${item.imageDtos.length > 0 ?
                        coverImage
                        :
                        `<img src='/images/main-2.png' alt="news-cover" />`
                    }   
                    </div>
                    <h5>${item.title}</h5>
                </a>`
            })

            if (!clientSection) {
                clientSection = feed.innerHTML;
            }

            feed.innerHTML = '';
            tabs[1].classList.add('active');
            tabs[0].classList.remove('active');
            feed.innerHTML = newsFeed.replace('undefined', '');
            convertLink('', navigate, 'news');
        })
    }

    return (
        <main className='main-page' data-id='29' data-count='1'>
            {/* <MainTitle language={language} />
            <MainMap language={language} />
            <MainBlock {...blockContent.first} language={language} />
            <MainNews language={language} />
            <MainBlock {...blockContent.second} language={language} /> */}
        </main>
    )
}