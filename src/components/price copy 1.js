import { useState } from 'react';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs';
import { PriceTableCol } from './price/price-table';
import { AppLinks } from './AppLinks/AppLinks';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@pbe/react-yandex-maps';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { handlerPageData } from '../services/handlerPageData';
import { convertLink } from '../services/convertLink';

const tableInfo = [
    {
        title: 'Маланка Mode 4 (DC)',
        power: '0,49 BYN',
        listOfBenefits: [
            'Хуткія зарадныя станцыі паблізу кропак прыцягнення',
            'Зарадка каля буйных гандлёвых цэнтраў',
            'Хуткая зарадка на трасе М',
            'Суперхуткія зарадныя станцыі',
            'Зарадка электрамабіля CCS Combo 2, зарадка CHAdeMO, зарадка GBT'
        ],
        listOfExpenses: [
            {
                power: '0,49 BYN',
                title: 'Зарадка на хуткіх зарадных станцыях',
                watt: 'да 50 кВт*',
                desc: 'Хуткія зарадныя станцыі каля гандлёвых цэнтраў, вакзалаў, месцаў прыцягнення, дзе зручна пакінуць аўтамабіль для зарадкі да 1 гадзіны.'
            },
            {
                power: '0,49 BYN',
                title: 'Паскораная зарадка',
                watt: 'да 150 кВт*',
                desc: 'Зарадка ў горадзе і на трасе, якая дазваляе атрымаць неабходную колькасць энергіі яшчэ хутчэй.'
            },
            {
                power: '0,49 BYN',
                title: 'Суперхуткія зарадныя станцыі',
                watt: 'да 350 кВт*',
                desc: 'Зарадка ў горадзе і на трасе, дзе хуткасць зарадкі павінна быць максімальнай. Суперхуткія зарадныя станцыі, якія дазваляюць зараджаць электрамабіль так жа хутка, як на АЗС.'
            }
        ]
    },
    {
        title: 'Маланка Mode 3 (AC)',
        power: '0,40 BYN',
        listOfBenefits: [
            'Павольныя зарадныя станцыі для зарадкі электрамабіляў',
            'Размяшчаюцца на паркоўках у месцах доўгачасовага знаходжання электрамабіля',
            'Зарадныя канектары Type 2, разетка Type 2'
        ],
        listOfExpenses: [
            {
                power: '0,40 BYN',
                title: 'Зарадка на павольных зарадных станцыях',
                watt: 'да 22 кВт*',
                desc: 'Зарадныя станцыі, размешчаныя там, дзе Вы праводзіце вялікі прамежак часу. Праца, дом. Паркінгі бізнес-цэнтраў, шматузроўневыя і наземныя. Там, дзе зручна пакінуць электрамабіль.'
            }
        ]
    }
]

const paymentMenu = [
    {
        title: 'Унутраны баланс карыстальніка ў дадатку Malanka New',
        firstText: 'Унутраны баланс – спецыяльны рахунак Карыстальніка ў дадатку. На ім адлюстроўваецца колькасць сродкаў, якімі Карыстальнік можа скарыстацца для аплаты паслуг.',
        listHeader: 'Папаўненне ўнутранага балансу акаўнта Маланка:',
        list: [
            'Зайсці ў пункт меню «Плацяжы»',
            'Выбраць суму для папаўнення',
            'Націснуць кнопку «Папоўніць»',
            'Выбраць банкаўскую карту для папаўнення ўнутранага балансу'
        ],
        secondText: 'Пасля вышэйапісаных дзеянняў унутраны баланс папоўніцца на выбраную суму. Пры дадзеным тыпе аплаты прэаўтарызацыя сродкаў з Вашай плацежнай карты АДСУТНІЧАЕ.'
    },
    {
        title: 'Прэаўтарызацыя сродкаў карыстальніка ў дадатку Malanka New',
        firstText: 'Сума ў 25 BYN часова рэзервуецца на вашай плацежнай карце на час зараднай сесіі. Па завяршэнні зараднай сесіі розніца паміж сумай рэзервавання і коштам вашай зараднай сесіі будзе вернута не пазней за 72 гадзіны з моманту рэзервавання.',
    }
];

export const Price = () => {
    const { language } = useSelector(store => store.localLanguage);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
        addDropdownEvent();
    }, [language])

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(50, 3)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
                convertLink(page.querySelectorAll('a.btn-green'), navigate);
                convertLink(page.querySelectorAll('a.btn-green-outline'), navigate);
                main.innerHTML = page.innerHTML;
            })
    }

    const addDropdownEvent = () => {
        const faqBlockCategory = document.querySelectorAll('.payment-faq__dropdown-title');
        faqBlockCategory.forEach(category => {
            category.addEventListener('click', (e) => {
                faqBlockCategory.forEach(el => {
                    if (e.currentTarget.parentElement.dataset.id === el.parentElement.dataset.id || el.parentElement.children[1].contains(e.target)) {
                        if (el.parentElement.classList.contains('open')) {
                            el.parentElement.classList.remove('open');
                        } else {
                            el.parentElement.classList.add('open');
                        }
                    } else {
                        el.parentElement.classList.remove('open');
                    }
                })
            });
        })
    }

    return (
        <main className='price-page'>
            <div className='pt-16 block'>
                <Breadcrumbs link={{ name: 'Цана', path: 'price' }} />
                <div className='container'>
                    <h2 className='mb-32'>Цана</h2>
                    <section className='price-page__table mb-16'>
                        {
                            tableInfo.map((table, i) => (
                                <PriceTableCol {...table} key={i} />
                            ))
                        }
                    </section>
                    <p className='mb-64 subscription'>* магутнасць зараднай сесіі залежыць ад многіх параметраў, такіх як мадэль электрамабіля, тэмпература батарэі, ступень дэградацыі батарэі і г. д. Калі ласка, уважліва азнаёмцеся з інструкцыяй па эксплуатацыі Вашага электрамабіля.</p>
                    <Link to='/calculator' className='btn-green mb-64 center'>Разлічыць эканомію</Link>
                    <h3 className='mb-8'>Аплата</h3>
                    <p className='regular-text mb-32'>Для вашай зручнасці мы прапануем два віды аплаты зараднай сесіі</p>
                    <div className='payment-faq'>
                        {paymentMenu.map((item, i) => (
                            <div className='payment-faq__dropdown' data-id={i + 1} key={i}>
                                <div className='payment-faq__dropdown-title'>
                                    <h4>{item.title}</h4>
                                    <button className='faq-block__button'></button>
                                </div>
                                <div className='payment-faq__dropdown-content'>
                                    <p>{item.firstText}</p>
                                    {item.listHeader && < h6 > {item.listHeader}</h6>}
                                    {item.list && <ol>
                                        {item.list.map((el, index) => (
                                            <li key={index}>{el}</li>
                                        ))}
                                    </ol>}
                                    {item.secondText && <p>{item.secondText}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex-wrapper block'>
                        <div>
                            <h3 className='mb-16'>Зарадка з дапамогай дадатка Malanka New</h3>
                            <h4 className='medium mb-16'>Дадатак Маланка – Ваш пропуск у свет будучыні. Поўны кантроль працэсу зарадкі электрамабіля. Запампуйце і адкрыйце для сябе спосаб запраўкі 21 стагоддзя!</h4>
                            <ul className='mb-32'>
                                <li className='list-text'>Сачыце за станам зараднай прылады і кіруйце ёю аддалена з мабільнага тэлефона або web-партала</li>
                                <li className='list-text'>Праглядайце статыстыку зарадкі ў рэальным часе і па завяршэнні зараднай сесіі</li>
                                <li className='list-text'>Кантралюйце спажыванне электраэнергіі і выдаткі з дапамогай графікаў і дыяграм</li>
                            </ul>
                            <AppLinks />
                        </div>
                        <img src='/images/price-img.png' loading='lazy' alt='price-bg' />
                    </div>
                </div>
            </div>
            <div className='price-page__footer'>
                <div className='wrapper'>
                    <div>
                        <h3 className='mb-16'>Засталіся пытанні?</h3>
                        <p className='regular-text'>Калі ласка, наведайце раздзел сайта Маланка, які змяшчае адказы на ўсё, што звязана з працэсам зарадкі электрамабіля і нават больш.</p>
                    </div>
                    <Link to='/help' className='btn-green-outline'>Як зарадзіцца</Link>
                </div>
            </div>
        </main >
    )
}