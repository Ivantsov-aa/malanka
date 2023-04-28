import { Link } from "react-router-dom"
import { AppLinks } from './AppLinks/AppLinks';
import { Select } from "./select/select";
import { useState } from "react";
import { useSelector } from "react-redux";

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

export const Footer = ({ footerNav, admin }) => {
    const [selectTitle, setSelectTitle] = useState(telNumber[0]);
    const { language } = useSelector(store => store.localLanguage);

    return (
        <footer>
            <div className='footer__wrapper'>
                <div className='footer__row'>
                    <div className='footer__col'>
                        <Link to={`${admin ? '.' : ''}/`} className='logo__wrapper'>
                            <img src='/images/svg/logo.svg' alt='logo' />
                        </Link>
                        <div className='footer__contacts'>
                            <a href='mailto:malanka@beloil.by'>malanka@beloil.by</a>
                            <Select title={selectTitle.name} list={telNumber} action={setSelectTitle} />
                        </div>
                        <div className='socialLinks'>
                            <a href='#'>
                                <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.0608 3.87012C23.0487 3.87012 23.0367 3.87041 23.0246 3.87099C22.7636 3.88361 22.5075 3.94624 22.2702 4.05537L2.70588 11.6017L2.70586 11.6017L2.69778 11.6049C2.31533 11.7575 1.98231 11.943 1.72701 12.1674C1.47722 12.3869 1.24158 12.6994 1.19945 13.1022C1.15413 13.5355 1.34976 13.8948 1.6118 14.1385C1.85781 14.3673 2.17911 14.517 2.51227 14.615L7.39469 16.159C7.53885 16.2065 7.69178 16.2214 7.84246 16.2026C7.99441 16.1836 8.14015 16.1308 8.26899 16.0481L15.3381 11.5882L10.3663 16.078C10.2591 16.1646 10.171 16.2728 10.1078 16.3958C10.0361 16.5356 9.99869 16.6904 9.99869 16.8475C9.99869 17.0046 10.0361 17.1594 10.1078 17.2991C10.1785 17.4368 10.2805 17.556 10.4056 17.6471L18.3591 23.5211C18.3848 23.5401 18.4116 23.5573 18.4394 23.5728C18.9939 23.8821 19.6652 24.067 20.2961 23.7823C20.9292 23.4965 21.2421 22.8644 21.3798 22.2055C21.3799 22.2051 21.38 22.2046 21.38 22.2042L24.7126 6.49696C24.8776 5.81956 24.8339 5.17211 24.5167 4.66197C24.1866 4.13106 23.6333 3.87012 23.0608 3.87012Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a href='#'>
                                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.646 9.00965C3.646 7.71365 4.15851 6.47072 5.07078 5.5543C5.98305 4.63788 7.22036 4.12305 8.5105 4.12305H18.2395C19.5296 4.12305 20.7669 4.63788 21.6792 5.5543C22.5915 6.47072 23.104 7.71365 23.104 9.00965V18.7829C23.104 20.0789 22.5915 21.3218 21.6792 22.2382C20.7669 23.1546 19.5296 23.6695 18.2395 23.6695H8.5105C7.22036 23.6695 5.98305 23.1546 5.07078 22.2382C4.15851 21.3218 3.646 20.0789 3.646 18.7829V9.00965Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.7266 13.8964C9.7266 14.8684 10.111 15.8006 10.7952 16.4879C11.4794 17.1752 12.4074 17.5614 13.375 17.5614C14.3426 17.5614 15.2706 17.1752 15.9548 16.4879C16.639 15.8006 17.0233 14.8684 17.0233 13.8964C17.0233 12.9244 16.639 11.9922 15.9548 11.3049C15.2706 10.6176 14.3426 10.2314 13.375 10.2314C12.4074 10.2314 11.4794 10.6176 10.7952 11.3049C10.111 11.9922 9.7266 12.9244 9.7266 13.8964Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    {footerNav.map((item, i) => (
                        i === 0 ?
                            <div className='footer__col' key={item.id}>
                                <h6>
                                    {language === 'RU' ?
                                        item.titleRus
                                        :
                                        (language === 'EN' ? item.titleEng : item.titleBel)
                                    }
                                </h6>
                                <ul>
                                    {item.subcategories.map(subcat => (
                                        <li key={subcat.id}><Link to={`${admin ? '.' : ''}${subcat.style ? subcat.style.alignment : subcat.path}`}>
                                            {language === 'RU' ?
                                                subcat.pageHeadingRus
                                                :
                                                (language === 'EN' ? subcat.pageHeadingEng : subcat.pageHeadingBel)
                                            }
                                        </Link>
                                        </li>
                                    ))}
                                    <AppLinks outline='outline' />
                                </ul>
                            </div>
                            :
                            <div className='footer__col' key={item.id}>
                                <h6>
                                    {language === 'RU' ?
                                        item.titleRus
                                        :
                                        (language === 'EN' ? item.titleEng : item.titleBel)
                                    }
                                </h6>
                                <ul>
                                    {item.subcategories.map(subcat => (
                                        <li key={subcat.id}><Link to={`${admin ? '.' : ''}${subcat.style ? subcat.style.alignment : subcat.path}`}>
                                            {language === 'RU' ?
                                                subcat.pageHeadingRus
                                                :
                                                (language === 'EN' ? subcat.pageHeadingEng : subcat.pageHeadingBel)
                                            }
                                        </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                    ))}
                </div>
                <div className='footer__row'>
                    <div className='footer__caption'>
                        <p>© MALANKA 2023</p>
                        <a href='#'>
                            {language === 'RU' ?
                                'Политика конфиденциальности'
                                :
                                (language === 'EN' ? 'Privacy Policy' : 'Палітыка канфідэнцыяльнасці')
                            }
                        </a>
                        <a href='#'>
                            {language === 'RU' ?
                                'Информация о cookies'
                                :
                                (language === 'EN' ? 'Cookies Policy' : 'Інфармацыя пра cookies')
                            }
                        </a>
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
                <div className='footer__row'>
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
            </div>
        </footer>
    )
}