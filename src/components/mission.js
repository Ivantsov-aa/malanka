import {Link, useNavigate} from "react-router-dom";
import {Breadcrumbs} from "./breadcrumbs/breadcrumbs"
import {Instructions} from "./instructions/instructions"
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {handlerPageData} from "../services/handlerPageData";
import {convertLink} from "../services/convertLink";

export const instructionsList = [
    {
        textRus: 'Откройте приложение Malanka New',
        textEng: 'Open the Malanka New app',
        textBel: 'Адкрыйце дадатак Malanka New',
        path: '/images/charging/charging-1.png'
    },
    {
        textRus: 'Отсканируйте QR-код',
        textEng: 'Scan QR-code',
        textBel: 'Адсканіруйце QR-код',
        path: '/images/charging/charging-2.png'
    },
    {
        textRus: 'Запустите процесс зарядки',
        textEng: 'Start charging',
        textBel: 'Запусціце працэс зарадкі',
        path: '/images/charging/charging-3.png'
    }
];

export const Mission = () => {
    const {language} = useSelector(store => store.localLanguage);
    const {isLogged, userInfo} = useSelector((store) => store.authAdmin);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language])

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(99, 1)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
                if (isLogged) {
                    convertLink(page.querySelectorAll('a'), navigate, `/admin/${userInfo.username}`);
                } else {
                    convertLink(page.querySelectorAll('a'), navigate);
                }
                main.innerHTML = page.innerHTML;
            })
    }

    return (
        <main className='mission' data-id='99' count='1'>
            {/* <div className='pt-16'>
                <Breadcrumbs padding link={{
                    name: language === 'RU' ?
                        'Миссия'
                        :
                        (language === 'EN' ?
                            'Mission'
                            :
                            'Місія'
                        )
                    , path: 'our-mission'
                }} />
                <div className='block'>
                    <div className='mission__title mb-32'>
                        <h2>
                            {language === 'RU' ?
                                'Маланка – мы делаем электромобили удобными для Вас.'
                                :
                                (language === 'EN' ?
                                    'Malanka – we make electric cars convenient for you.'
                                    :
                                    'Маланка – мы робім электрамабілі зручнымі для Вас.'
                                )}
                        </h2>
                    </div>
                    <div className='mission__banner-video mb-24'>
                        <div className='mission__banner-text'>
                            <h1 className="mb-16">
                                {language === 'RU' ?
                                    'Супербыстрая зарядка'
                                    :
                                    (language === 'EN' ?
                                        'Ultra-fast charging'
                                        :
                                        'Суперхуткая зарадка'
                                    )}
                            </h1>
                            <h3>
                                {language === 'RU' ?
                                    '10 мин. + 300 км'
                                    :
                                    (language === 'EN' ?
                                        '10 min. + 300 km'
                                        :
                                        '10 хв. + 300 км'
                                    )}
                            </h3>
                        </div>
                        <video width='100%' height='100%' src='https://joy1.videvo.net/videvo_files/video/free/2019-09/large_watermarked/190828_27_SuperTrees_HD_17_preview.mp4' loop autoPlay playsInline />
                    </div>
                    <h5>
                        {language === 'RU' ?
                            `Malanka это будущее, которое мы создаём сегодня. В динамике развития технологий, время является важнейшей ценностью. Всего 3 касания экрана Вашего смартфона и уже через 10 минут, запас хода электромобиля будет пополнен на 300 километров. И это только начало…`
                            :
                            (language === 'EN' ?
                                `Malanka is the future we create today. Technology dynamics makes time one of the most valuable things. 3 taps on your smartphone screen –and your electric car’s range is up to 300 km in 10 minutes. And this is just the beginning…`
                                :
                                `Malanka гэта будучыня, якое мы ствараем сёння. У дынаміцы развіцця тэхналогій час з'яўляецца найважнейшай каштоўнасцю. Усяго 3 дотыкі да экрана вашага смартфона – і ўжо праз 10 хвілін запас ходу электрамабіля будзе папоўнены на 300 кіламетраў. І гэта толькі пачатак…`
                            )}
                    </h5>
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
                </div>
            </div>
            <div className='price-page__footer'>
                <div className='wrapper'>
                    <div>
                        <h3 className='mb-16'>
                            {language === 'RU' ?
                                'Хотите больше?'
                                :
                                (language === 'EN' ?
                                    'Need more information?'
                                    :
                                    'Хочаце больш?'
                                )}
                        </h3>
                        <p className='regular-text'>
                            {language === 'RU' ?
                                'Мы рады поделиться последними новостями о развитии Malanka. Будьте в числе первых кто узнает о преимуществах крупнейшей сети зарядных станций Беларуси!'
                                :
                                (language === 'EN' ?
                                    'We are happy to share the latest Malanka news with you. Be among the first to learn about the advantages of Belarussian largest electric car charging network!'
                                    :
                                    'Мы рады падзяліцца апошнімі навінамі пра развіццё Malanka. Будзьце ў ліку першых, хто даведаецца пра перавагі найбуйнейшай сеткі зарадных станцый Беларусі!'
                                )}
                        </p>
                    </div>
                    <Link to='/news' className='btn-green-outline'>
                        {language === 'RU' ?
                            'Узнать больше'
                            :
                            (language === 'EN' ?
                                'Learn more'
                                :
                                'Даведацца больш'
                            )}
                    </Link>
                </div>
            </div> */}
        </main>
    )
}