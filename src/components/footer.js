import {Link} from "react-router-dom"
import {AppLinks} from './AppLinks/AppLinks';
import {Select} from "./select/select";
import {useState} from "react";
import {useSelector} from "react-redux";

const payMethods = [
    '/images/pay/visa.png',
    '/images/pay/visa-secure.png',
    '/images/pay/mastercard.png',
    '/images/pay/id-check.png',
    '/images/pay/belkart.png',
    '/images/pay/belkart-ip.png',
    '/images/pay/be-paid.png'
]

const telNumber = [
    {
        name: '+375 29 6-431-431',
    },
    {
        name: '+375 33 6-431-431',
    },
    {
        name: '+375 25 6-431-431',
    },
    {
        name: '+375 23 279-34-76',
    },
    {
        name: '+375 23 279-33-57',
    }
]

export const Footer = ({footerNav, admin, footerAddLinks, footerSocialLinks}) => {
    const [selectTitle, setSelectTitle] = useState(telNumber[0]);
    const {language} = useSelector(store => store.localLanguage);

    return (
        <footer>
            <div className='footer__wrapper'>
                <div className='footer__row'>
                    <div className='footer__col'>
                        <div>
                            <Link to={`${admin ? '.' : ''}/`} className='logo__wrapper'>
                                <img src='/images/svg/logo-text.svg' alt='logo' />
                            </Link>
                            <p className="mobile-caption">© MALANKA 2023</p>
                        </div>
                        <div className='footer__contacts'>
                            <div className="flex">
                                <a className="h5" href='mailto:malanka@beloil.by'>malanka@beloil.by</a>
                                <Select title={selectTitle.name} list={telNumber} action={setSelectTitle} />
                            </div>
                            <div className='socialLinks'>
                                {footerSocialLinks.map((item, i) => (
                                    <a href={item.style.alignment} target="_blank" key={i}>
                                        {item.sideHeadingRus === 'Telegram' ? <TelegramSvg /> : <InstagramSvg />}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mobile-apps">
                        <AppLinks outline='outline' />
                    </div>
                    {footerNav.map((item, i) => (
                        i === 0 ?
                            <div className='footer__col' key={item.id}>
                                <h5 className="tabs">
                                    {language === 'RU' ?
                                        item.titleRus
                                        :
                                        (language === 'EN' ? item.titleEng : item.titleBel)
                                    }
                                </h5>
                                <ul>
                                    {item.subcategories.map(subcat => (
                                        <li key={subcat.id}>
                                            {subcat.id === 204 ?
                                                <a href={subcat.style.alignment} className="regular-text" target="_blank">
                                                    {subcat.pageHeadingRus ?
                                                        (language === 'RU' ?
                                                            subcat.pageHeadingRus
                                                            :
                                                            (language === 'EN' ? subcat.pageHeadingEng : subcat.pageHeadingBel)
                                                        )
                                                        :
                                                        (language === 'RU' ?
                                                            subcat.sideHeadingRus
                                                            :
                                                            (language === 'EN' ? subcat.sideHeadingEng : subcat.sideHeadingBel)
                                                        )
                                                    }
                                                </a>
                                                :
                                                <Link to={`${admin ? '.' : ''}${!subcat.path ? subcat.style.alignment : subcat.path}`} className="regular-text">
                                                    {subcat.pageHeadingRus ?
                                                        (language === 'RU' ?
                                                            subcat.pageHeadingRus
                                                            :
                                                            (language === 'EN' ? subcat.pageHeadingEng : subcat.pageHeadingBel)
                                                        )
                                                        :
                                                        (language === 'RU' ?
                                                            subcat.sideHeadingRus
                                                            :
                                                            (language === 'EN' ? subcat.sideHeadingEng : subcat.sideHeadingBel)
                                                        )
                                                    }
                                                </Link>
                                            }
                                        </li>
                                    ))}
                                    <AppLinks outline='outline' />
                                </ul>
                            </div>
                            :
                            <div className='footer__col' key={item.id}>
                                <h5 className="tabs">
                                    {language === 'RU' ?
                                        item.titleRus
                                        :
                                        (language === 'EN' ? item.titleEng : item.titleBel)
                                    }
                                </h5>
                                <ul>
                                    {item.subcategories.map(subcat => (
                                        <li key={subcat.id}>
                                            {subcat.id >= 205 && subcat.id <= 214 ?
                                                <a href={subcat.style.alignment} className="regular-text" target="_blank">
                                                    {subcat.pageHeadingRus ?
                                                        (language === 'RU' ?
                                                            subcat.pageHeadingRus
                                                            :
                                                            (language === 'EN' ? subcat.pageHeadingEng : subcat.pageHeadingBel)
                                                        )
                                                        :
                                                        (language === 'RU' ?
                                                            subcat.sideHeadingRus
                                                            :
                                                            (language === 'EN' ? subcat.sideHeadingEng : subcat.sideHeadingBel)
                                                        )
                                                    }
                                                </a>
                                                :
                                                <Link to={`${admin ? '.' : ''}${subcat.style ? subcat.style.alignment : subcat.path}`} className="regular-text">
                                                    {subcat.pageHeadingRus ?
                                                        (language === 'RU' ?
                                                            subcat.pageHeadingRus
                                                            :
                                                            (language === 'EN' ? subcat.pageHeadingEng : subcat.pageHeadingBel)
                                                        )
                                                        :
                                                        (language === 'RU' ?
                                                            subcat.sideHeadingRus
                                                            :
                                                            (language === 'EN' ? subcat.sideHeadingEng : subcat.sideHeadingBel)
                                                        )
                                                    }
                                                </Link>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                    ))}
                </div>
                <div className='footer__row'>
                    <div className='footer__caption'>
                        <p>© MALANKA 2023</p>
                        {footerAddLinks && footerAddLinks.map(link => (
                            <a href={link.style.alignment} key={link.id}>{link.pageHeadingRus ?
                                (language === 'RU' ?
                                    link.pageHeadingRus
                                    :
                                    (language === 'EN' ? link.pageHeadingEng : link.pageHeadingBel)
                                )
                                :
                                (language === 'RU' ?
                                    link.sideHeadingRus
                                    :
                                    (language === 'EN' ? link.sideHeadingEng : link.sideHeadingBel)
                                )
                            }</a>
                        ))}
                        <a href='https://www.medialine.by/' target='_blank'>
                            {language === 'RU' ?
                                'Дизайн и разработка сайта: '
                                :
                                (language === 'EN' ? 'Website design and development: ' : 'Дызайн і распрацоўка сайта: ')
                            }
                            Media Line
                        </a>
                    </div>
                    <div className='footer__caption pay-methods'>
                        {payMethods.map((item, i) => (
                            <img src={item} alt='pay-method' key={i} />
                        ))}
                    </div>
                </div>
                <div className='footer__row desk'>
                    <span>
                        {language === 'RU' ?
                            `Режим работы Центрального аппарата РУП «Производственное объединение «Белоруснефть»
                            с 08.00 до 17.00, обеденный перерыв – 12.00 – 13.00`
                            :
                            (language === 'EN' ?
                                `Working hours of Production Association Belorusneft Central office - 08.00 -17.00, lunch hours – 12.00 – 13.00`
                                :
                                `Рэжым працы цэнтральнага апарата РУП "Вытворчае аб'яднанне "Беларуснафта" з 08.00 да 17.00, абедзенны перапынак – 12.00 – 13.00`
                            )
                        }
                    </span>
                    <span>
                        {language === 'RU' ?
                            `Государственное производственное объединение «Белоруснефть»
                            Адрес: ул. Рогачевская, 9, г. Гомель, 246003,
                            Республика Беларусь`
                            :
                            (language === 'EN' ?
                                `State Production Assosiation Belorusneft 
                                Address: 9 Rogachevskaya Street, Gomel, 246003,
                                Republic of Belarus`
                                :
                                `Дзяржаўнае вытворчае аб'яднанне "Беларуснафта" Адрас: вул. Рагачоўская, 9, г. Гомель, 246003, Рэспубліка Беларусь`
                            )
                        }
                    </span>
                    <span>
                        {language === 'RU' ?
                            `Регистрация: Гомельоблисполком от 23.03.2005
                            (Н.А. Протосовицкий) УНП 400051902 ОКПО 00137012
                            BY10 BPSB 3012 1111 1123 7933 0000 белорусские рубли
                            ОАО «БПС-Сбербанк» БИК BPSBBY2X`
                            :
                            (language === 'EN' ?
                                `Registration: Gomel oblast executive committee, dated March 23, 2005 (N.А. Protosovitskiy) TRN 400051902 ОKPO code  00137012 BY10 BPSB 3012 1111 1123 7933 0000 BYN "BPS-Sberbank" JSC BIC BPSBBY2X`
                                :
                                `Рэгістрацыя: Гомельаблвыканкам ад 23.03.2005 (М.А. Пратасавіцкі) УНП 400051902 АКПА 00137012 BY10 BPSB 3012 1111 1123 7933 0000 беларускія рублі ААТ "Сбер Банк" БІК BPSBBY2X`
                            )
                        }
                    </span>
                </div>
                <div className='footer__row mobile'>
                    <span>
                        {language === 'RU' ?
                            <>
                                <span>Центральный аппарат РУП «Производственное объединение «Белоруснефть»
                                </span>
                                <span>
                                    Режим работы: с 08.00 до 17.00, обеденный перерыв – 12.00 – 13.00
                                </span>
                            </>
                            :
                            (language === 'EN' ?
                                <>
                                    <span>Production Association Belorusneft Central office
                                    </span>
                                    <span>
                                        Working hours: 08.00-17.00, lunch hours – 12.00 – 13.00
                                    </span>
                                </>
                                :
                                <>
                                    <span>Цэнтральны апарат РУП "Вытворчае аб'яднанне "Беларуснафта"
                                    </span>
                                    <span>
                                        Рэжым працы: з 08.00 да 17.00, абедзенны перапынак – 12.00 – 13.00
                                    </span>
                                </>
                            )
                        }
                    </span>
                    <span>
                        {language === 'RU' ?
                            <>
                                <span>Государственное производственное объединение «Белоруснефть»
                                </span>
                                <span>
                                    Адрес: ул. Рогачевская, 9, г. Гомель, 246003,
                                    Республика Беларусь
                                </span>
                            </>
                            :
                            (language === 'EN' ?
                                <>
                                    <span>State Production Assosiation Belorusneft
                                    </span>
                                    <span>
                                        Address: 9 Rogachevskaya Street, Gomel, 246003,
                                        Republic of Belarus
                                    </span>
                                </>
                                :
                                <>
                                    <span>Дзяржаўнае вытворчае аб'яднанне "Беларуснафта"
                                    </span>
                                    <span>
                                        Адрас: вул. Рагачоўская, 9, г. Гомель, 246003, Рэспубліка Беларусь
                                    </span>
                                </>
                            )
                        }
                    </span>
                    <span>
                        {language === 'RU' ?
                            <>
                                <span>Регистрация
                                </span>
                                <span>
                                    Гомельоблисполком от 23.03.2005
                                    (Н.А. Протосовицкий) УНП 400051902 ОКПО 00137012
                                    BY10 BPSB 3012 1111 1123 7933 0000 белорусские рубли
                                    ОАО «БПС-Сбербанк» БИК BPSBBY2X
                                </span>
                            </>
                            :
                            (language === 'EN' ?
                                <>
                                    <span>Registration
                                    </span>
                                    <span>
                                        Gomel oblast executive committee, dated March 23, 2005 (N.А. Protosovitskiy) TRN 400051902 ОKPO code  00137012 BY10 BPSB 3012 1111 1123 7933 0000 BYN "BPS-Sberbank" JSC BIC BPSBBY2X
                                    </span>
                                </>
                                :
                                <>
                                    <span>Рэгістрацыя
                                    </span>
                                    <span>
                                        Гомельаблвыканкам ад 23.03.2005 (М.А. Пратасавіцкі) УНП 400051902 АКПА 00137012 BY10 BPSB 3012 1111 1123 7933 0000 беларускія рублі ААТ "Сбер Банк" БІК BPSBBY2X
                                    </span>
                                </>
                            )
                        }
                    </span>
                    <div className='footer__caption pay-methods-mobile'>
                        {payMethods.map((item, i) => (
                            <img src={item} alt='pay-method' key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

const InstagramSvg = () => {
    return (
        <svg width="26" height="27" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.27753 7.59024C3.27753 6.56151 3.68434 5.57492 4.40846 4.8475C5.13259 4.12008 6.11472 3.71143 7.13879 3.71143H14.8613C15.8854 3.71143 16.8675 4.12008 17.5916 4.8475C18.3158 5.57492 18.7226 6.56151 18.7226 7.59024V15.3479C18.7226 16.3766 18.3158 17.3632 17.5916 18.0906C16.8675 18.818 15.8854 19.2267 14.8613 19.2267H7.13879C6.11472 19.2267 5.13259 18.818 4.40846 18.0906C3.68434 17.3632 3.27753 16.3766 3.27753 15.3479V7.59024Z" stroke="black" strokeWidth="1.40713" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.10399 11.4689C8.10399 12.2405 8.4091 12.9804 8.95219 13.526C9.49529 14.0715 10.2319 14.378 10.9999 14.378C11.768 14.378 12.5046 14.0715 13.0477 13.526C13.5908 12.9804 13.8959 12.2405 13.8959 11.4689C13.8959 10.6974 13.5908 9.95744 13.0477 9.41187C12.5046 8.86631 11.768 8.55981 10.9999 8.55981C10.2319 8.55981 9.49529 8.86631 8.95219 9.41187C8.4091 9.95744 8.10399 10.6974 8.10399 11.4689Z" stroke="black" strokeWidth="1.40713" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const TelegramSvg = () => {
    return (
        <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.0608 3.87012C23.0487 3.87012 23.0367 3.87041 23.0246 3.87099C22.7636 3.88361 22.5075 3.94624 22.2702 4.05537L2.70588 11.6017L2.70586 11.6017L2.69778 11.6049C2.31533 11.7575 1.98231 11.943 1.72701 12.1674C1.47722 12.3869 1.24158 12.6994 1.19945 13.1022C1.15413 13.5355 1.34976 13.8948 1.6118 14.1385C1.85781 14.3673 2.17911 14.517 2.51227 14.615L7.39469 16.159C7.53885 16.2065 7.69178 16.2214 7.84246 16.2026C7.99441 16.1836 8.14015 16.1308 8.26899 16.0481L15.3381 11.5882L10.3663 16.078C10.2591 16.1646 10.171 16.2728 10.1078 16.3958C10.0361 16.5356 9.99869 16.6904 9.99869 16.8475C9.99869 17.0046 10.0361 17.1594 10.1078 17.2991C10.1785 17.4368 10.2805 17.556 10.4056 17.6471L18.3591 23.5211C18.3848 23.5401 18.4116 23.5573 18.4394 23.5728C18.9939 23.8821 19.6652 24.067 20.2961 23.7823C20.9292 23.4965 21.2421 22.8644 21.3798 22.2055C21.3799 22.2051 21.38 22.2046 21.38 22.2042L24.7126 6.49696C24.8776 5.81956 24.8339 5.17211 24.5167 4.66197C24.1866 4.13106 23.6333 3.87012 23.0608 3.87012Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}