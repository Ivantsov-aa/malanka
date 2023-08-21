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
            'Быстрые зарядные станции вблизи точек притяжения',
            'Зарядка около крупных торговых центров',
            'Быстрая зарядка на трассе М',
            'Супербыстрые зарядные станции',
            'Зарядка электромобиля CCS Combo 2, зарядка CHAdeMO, зарядка GBT'
        ],
        listOfExpenses: [
            {
                power: '0,49 BYN',
                title: 'Зарядка на быстрых зарядных станциях',
                watt: 'до 50 кВт*',
                desc: 'Быстрые зарядные станции около торговых центров, вокзалов, мест притяжения где удобно оставить автомобиль для зарядки до 1 часа.'
            },
            {
                power: '0,49 BYN',
                title: 'Ускоренная зарядка',
                watt: 'до 150 кВт*',
                desc: 'Зарядка в городе и на трассе позволяющая получить необходимое количество энергии еще быстрее.'
            },
            {
                power: '0,49 BYN',
                title: 'Супербыстрые зарядные станции',
                watt: 'до 350 кВт*',
                desc: 'Зарядка в городе и на трассе, где скорость зарядки должна быть максимальной. Супербыстрые зарядные станции которые позволяют заряжать электромобиль также быстро как на АЗС.'
            }
        ]
    },
    {
        title: 'Маланка Mode 3 (AC)',
        power: '0,40 BYN',
        listOfBenefits: [
            'Медленные зарядные станции для зарядки электромобилей',
            'Располагаются на парковках в местах долговременного пребывания электромобиля',
            'Зарядные коннектора Type 2, розетка Type 2'
        ],
        listOfExpenses: [
            {
                power: '0,40 BYN',
                title: 'Зарядка на медленных зарядных станциях',
                watt: 'до 22 кВт*',
                desc: 'Зарядные станции, расположенные там, где Вы проводите большой промежуток времени. Работа, дом. Паркинги бизнес-центров, многоуровневые и наземные. Там, где удобно оставить электромобиль.'
            }
        ]
    }
]

const paymentMenu = [
    {
        title: 'Внутренний баланс пользователя в приложении Malanka New',
        firstText: 'Внутренний баланс – специальный счет Пользователя в приложении. На нем отражается количество средств, которыми Пользователь может воспользоваться для оплаты услуг.',
        listHeader: 'Пополнение внутреннего баланса аккаунта Маланка:',
        list: [
            'Зайти в пункт меню «Платежи»',
            'Выбрать сумму для пополнения',
            'Нажать кнопку «Пополнить»',
            'Выбрать банковскую карту для пополнения внутреннего баланса'
        ],
        secondText: 'После вышеописанных действий внутренний баланс пополнится на выбранную сумму. При данном типе оплаты, преавторизация средств с Вашей платежной карты ОТСУТСТВУЕТ.'
    },
    {
        title: 'Преавторизация средств пользователя в приложении Malanka New',
        firstText: 'Сумма в 25 BYN временно резервируются на Вашей платёжной карте на время зарядной сессии. По завершении зарядной сессии разница между суммой резервирования и стоимостью вашей зарядной сессии будет возвращена не позднее 72 часов с момента резервирования.',
    },
]

export const Price = () => {
    const { language } = useSelector(store => store.localLanguage);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
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
                addDropdownEvent();
            })
    }

    const addDropdownEvent = () => {
        const faqBlockCategory = document.querySelectorAll('.payment-faq__dropdown-title');
        faqBlockCategory.forEach(category => {
            category.addEventListener('click', (e) => {
                faqBlockCategory.forEach(el => {
                    if (e.target.parentElement.dataset.id === el.parentElement.dataset.id || e.currentTarget.parentElement.dataset.id === el.parentElement.dataset.id) {
                        if (el.parentElement.classList.contains('open') && e.target.parentElement === category.parentElement || el.parentElement.classList.contains('open') && e.currentTarget.parentElement === category.parentElement) {
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
        <main className='price-page' data-id='32' data-count='1'>
            <div className='pt-16 block'>
                <Breadcrumbs link={{ name: 'Цена', path: 'price' }} />
                <div className='container'>
                    <h2 className='mb-32'>Цена</h2>
                    <section className='price-page__table mb-16'>
                        {
                            tableInfo.map((table, i) => (
                                <PriceTableCol {...table} key={i} />
                            ))
                        }
                    </section>
                    <p className='mb-64 subscription'>* мощность зарядной сессии зависит от многих параметров, таких как модель электромобиля, температура батареи, степень деградации батареи и т.д. пожалуйста, внимательно ознакомьтесь с руководством по эксплуатации Вашего электромобиля</p>
                    <Link to='/calculator' className='btn-green mb-64 center'>Рассчитать экономию</Link>
                    <h3 className='mb-8'>Оплата</h3>
                    <p className='regular-text mb-32'>Для вашего удобства мы предлагаем два вида оплаты зарядной сессии</p>
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
                            <h3 className='mb-16'>Зарядка с помощью приложения Malanka New</h3>
                            <h4 className='medium mb-16'>Приложение Маланка - Ваш пропуск в мир будущего. Полный контроль процесса зарядки электромобиля. Скачайте и откройте для себя способ заправки 21 века!</h4>
                            <ul className='mb-32'>
                                <li className='list-text'>Следите за состоянием зарядного устройства и управляйте им удаленно с мобильного телефона или web-портала</li>
                                <li className='list-text'>Просматривайте статистику зарядки в реальном времени и по завершении зарядной сессии</li>
                                <li className='list-text'>Контролируйте потребление электроэнергии и расходы с помощью графиков и диаграмм</li>
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
                        <h3 className='mb-16'>Остались вопросы?</h3>
                        <p className='regular-text'>Пожалуйста, посетите раздел сайта Маланка который содержит ответы на все, что связано с процессом зарядки электромобиля и даже больше.</p>
                    </div>
                    <Link to='/help' className='btn-green-outline'>Как зарядиться</Link>
                </div>
            </div>
        </main >
    )
}