import { useState } from 'react';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs';
import { PriceTableCol } from './price/price-table';
import { AppLinks } from './AppLinks/AppLinks';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Link } from 'react-router-dom';
import { Button } from '@pbe/react-yandex-maps';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { handlerPageData } from '../services/handlerPageData';

const tableInfo = [
    {
        title: 'Malanka Mode 4 (DC)',
        power: '0,49 BYN',
        listOfBenefits: [
            'Fast charging stations in the most crowded places',
            'Charging near large shopping malls',
            'Fast charging on the M- Highway',
            'Ultra-fast charging stations',
            'CCS Combo 2, CHAdeMO, GBT chargers'
        ],
        listOfExpenses: [
            {
                power: '0,49 BYN',
                title: 'Charging at fast charging stations',
                watt: 'up to 50 kW*',
                desc: 'Fast charging stations close to shopping malls, railway/bus stations, places of attraction where you can comfortably leave your car to be charged for about an hour.'
            },
            {
                power: '0,49 BYN',
                title: 'Rapid Charging',
                watt: 'up to 150 kW*',
                desc: 'Charging in the city and on the road allowing to get charged much faster.'
            },
            {
                power: '0,49 BYN',
                title: 'Ultra-fast charging stations',
                watt: ' up to 350 kW*',
                desc: 'Charging in the city and on the road when the charging session must be the fastest. Ultra-fast charging stations charge an electric car as fast as if you are filling your car at the gas station.'
            }
        ]
    },
    {
        title: 'Malanka Mode 3 (AC)',
        power: '0,40 BYN',
        listOfBenefits: [
            'Slow charging stations for electric car charging',
            'They are located in places where electric cars can stay for a long time',
            'Type 2 charging connector, Type 2 plug'
        ],
        listOfExpenses: [
            {
                power: '0,40 BYN',
                title: 'Charging at slow charging stations',
                watt: 'up to 22 kW*',
                desc: 'Charging stations are located in places where you spend a lot of time. At work, at home. Multilevel and ground car parkings near business centers. Places, where it is convenient to leave your electric car.'
            }
        ]
    }
]

const paymentMenu = [
    {
        title: 'User’s internal balance in the Malanka New app',
        firstText: 'Internal balance – a special User’s account in the application. It shows the amount of money the User can spend to make payment for the service.',
        listHeader: 'Replenishment of your internal balance in Malanka account:',
        list: [
            'Enter «Payments» menu item',
            'Choose the amount to replenish',
            'Click «Replenish»',
            'Choose a bank card to replenish your internal balance'
        ],
        secondText: 'After the above steps the internal balance will be replenished with a chosen amount. This type of payment includes NO preauthorization of money from your bank card'
    },
    {
        title: 'Preauthorization of money in the Malanka New app',
        firstText: '25 BYN will be temporary reserved on your bank card during the charging session. On termination of the charging session the difference between the amount reserved and the charging session cost will be returned not later than within 72 hours from the reservation.',
    },
]

export const Price = () => {
    const { language } = useSelector(store => store.localLanguage);

    useEffect(() => {
        // loadPage();
        addDropdownEvent();
    }, [language])

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(40, 8)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
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
                <Breadcrumbs link={{ name: 'Price', path: 'price' }} />
                <div className='container'>
                    <h2 className='mb-32'>Цена</h2>
                    <section className='price-page__table mb-16'>
                        {
                            tableInfo.map((table, i) => (
                                <PriceTableCol {...table} key={i} />
                            ))
                        }
                    </section>
                    <p className='mb-64 subscription'>*the power of a charging session depends on many factors: electric car model, battery temperature and it’s degradation, etc. Please, study your electric car owner’s manual carefully. </p>
                    <Link to='/calculator' className='btn-green mb-64 center'>Calculate your savings</Link>
                    <h3 className='mb-8'>Payment</h3>
                    <p className='regular-text mb-32'>Two payment methods for your convenience</p>
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
                            <h3 className='mb-16'>Charging with the Malanka New app</h3>
                            <h4 className='medium mb-16'>Malanka app is your pass to the world of future. Manage the charging process to the full. Download and discover 21st century charging method!</h4>
                            <ul className='mb-32'>
                                <li className='list-text'>Check the charger and control it remotely on your mobile phone or a web-portal</li>
                                <li className='list-text'>Check charging statistics in real-time and on termination of the charging session</li>
                                <li className='list-text'>Control energy consumption and your costs with the help of graphs and diagrams</li>
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
                        <h3 className='mb-16'>Still have questions?</h3>
                        <p className='regular-text'>Please, go to page on Malanka website with answers to all questions related to electric car charging and even more.</p>
                    </div>
                    <Link to='/help' className='btn-green-outline'>How to charge</Link>
                </div>
            </div>
        </main >
    )
}