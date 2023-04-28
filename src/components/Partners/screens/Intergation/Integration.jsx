import { useState } from "react";
import { Breadcrumbs } from "../../../breadcrumbs/breadcrumbs"
import { CallbackForm } from "../../../callback-form/callback-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { handlerPageData } from "../../../../services/handlerPageData";
import { convertLink } from "../../../../services/convertLink";
import { useNavigate } from "react-router-dom";

export const Integration = () => {
    const [chosenRate, setChosenRate] = useState(0);
    const { language } = useSelector(store => store.localLanguage);

    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language])

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(91, 1)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
                convertLink(page.querySelectorAll('a'), navigate);
                main.innerHTML = page.innerHTML;
                addEvents();
            })
    }

    const addEvents = () => {
        const buttons = document.querySelectorAll('.integration-list__button');
        buttons.forEach(item => {
            item.addEventListener('click', () => {
                buttons.forEach(button => {
                    if (button === item) {
                        const formTitle = document.querySelector('.form-block__wrapper h4');
                        const title = button.querySelector('h3').innerText;
                        formTitle.innerText = title;
                        button.classList.add('active');

                    } else {
                        button.classList.remove('active')
                    }
                })
            })
        })
    }

    const rates = [
        {
            title: 'Basic',
            list: language === 'RU' ? [
                'Отображение зарядной станции в мобильном приложении Malanka',
                'Обеспечение взимания платы за услуги по зарядке электромобилей',
                'Самостоятельное управление тарификацией на зарядной станции.'
            ] : (
                language === 'EN' ? [
                    'Display of the charging station in the MALANKA mobile app',
                    'Ensuring payment for electric car charging',
                    'Independent pricing management at charging stations.'
                ]
                    :
                    [
                        'Адлюстраванне зараднай станцыі ў мабільным дадатку Malanka',
                        'Забеспячэнне збірання платы за паслугі па зарадцы электрамабіляў',
                        'Самастойнае кіраванне тарыфікацыяй на зараднай станцыі.'
                    ]
            )
        },
        {
            title: 'Comfort',
            list: language === 'RU' ? [
                'Отображение зарядной станции в мобильном приложении Malanka',
                'Обеспечение взимания платы за услуги по зарядке электромобилей',
                'Самостоятельное управление тарификацией на зарядной станции'
            ] : (
                language === 'EN' ? [
                    'Display of the charging station in the MALANKA mobile app',
                    'Ensuring payment for electric car charging',
                    'Independent pricing management at charging stations.'
                ]
                    :
                    [
                        'Адлюстраванне зараднай станцыі ў мабільным дадатку Malanka',
                        'Забеспячэнне збірання платы за паслугі па зарадцы электрамабіляў',
                        'Самастойнае кіраванне тарыфікацыяй на зараднай станцыі.'
                    ]
            ),
            benefits: language === 'RU' ? [
                'Техподдержка 24/7'
            ] : (
                language === 'EN' ? [
                    'A 24-hour technical support'
                ]
                    :
                    [
                        'Тэхпадтрымка 24/7'
                    ]
            ),
        },
        {
            title: 'Maximum',
            list: language === 'RU' ? [
                'Отображение зарядной станции в мобильном приложении Malanka',
                'Обеспечение взимания платы за услуги по зарядке электромобилей',
                'Самостоятельное управление тарификацией на зарядной станции.'
            ] : (
                language === 'EN' ? [
                    'Display of the charging station in the MALANKA mobile app',
                    'Ensuring payment for electric car charging',
                    'Independent pricing management at charging stations.'
                ]
                    :
                    [
                        'Адлюстраванне зараднай станцыі ў мабільным дадатку Malanka',
                        'Забеспячэнне збірання платы за паслугі па зарадцы электрамабіляў',
                        'Самастойнае кіраванне тарыфікацыяй на зараднай станцыі.'
                    ]
            ),
            benefits: language === 'RU' ? [
                'Техподдержка 24/7',
                'Регламентное техобслуживание зарядных станций и текущий ремонт'
            ] : (
                language === 'EN' ? [
                    'A 24-hour technical support',
                    'Routine and running maintenance of charging stations'
                ]
                    :
                    [
                        'Тэхпадтрымка 24/7',
                        'Рэгламентнае тэхабслугоўванне зарадных станцый і бягучы рамонт',
                    ]
            )
        }
    ];

    const formFields = [
        {
            name: 'name_company',
            type: 'text',
            placeholder: language === 'RU' ?
                'Наименование организации *'
                :
                (language === 'EN' ?
                    'Company’s name *'
                    :
                    'Найменне арганізацыі *'
                )
        },
        {
            name: 'prn',
            type: 'number',
            placeholder: language === 'RU' ?
                'УНП *'
                :
                (language === 'EN' ?
                    'TRN *'
                    :
                    'УНП *'
                )
        },
        {
            name: 'contact_name',
            type: 'text',
            placeholder: language === 'RU' ?
                'Контактное лицо *'
                :
                (language === 'EN' ?
                    'Contact person *'
                    :
                    'Кантактная асоба *'
                )
        },
        {
            name: 'phone_number',
            type: 'tel',
            placeholder: language === 'RU' ?
                'Телефон *'
                :
                (language === 'EN' ?
                    'Telephone number *'
                    :
                    'Тэлефон *'
                )
        },
        {
            name: 'email',
            type: 'email',
            placeholder: language === 'RU' ?
                'Электронная почта *'
                :
                (language === 'EN' ?
                    'E-mail *'
                    :
                    'Электронная пошта *'
                )
        }
    ];

    const formSelect = [
        {
            name: language === 'RU' ?
                'Модель и тип станции *'
                :
                (language === 'EN' ?
                    'Station model and type *'
                    :
                    'Мадэль і тып станцый *'
                )
            ,
            value: language === 'RU' ?
                'Модель и тип станции *'
                :
                (language === 'EN' ?
                    'Station model and type *'
                    :
                    'Мадэль і тып станцый *'
                )
            ,
        }
    ];

    return (
        <main className='integration' data-id='91' data-count='1'>
            <Breadcrumbs
                currentPage={language === 'RU' ?
                    'Интеграция зарядных станций в сеть Malanka'
                    :
                    (
                        language === 'EN' ?
                            'Integration of charging stations in Malanka network'
                            :
                            'Інтэграцыя зарадных станцый у сетку Malanka'
                    )
                }
                link={{
                    name: language === 'RU' ?
                        'Стать партнером'
                        :
                        (
                            language === 'EN' ?
                                'Become a partner'
                                :
                                'Стаць партнёрам'
                        )
                    ,
                    path: './partner'
                }} />
            <h2>{language === 'RU' ?
                'Интеграция зарядных станций в сеть Malanka'
                :
                (
                    language === 'EN' ?
                        'Integration of charging stations in Malanka network'
                        :
                        'Інтэграцыя зарадных станцый у сетку Malanka'
                )
            }</h2>
            <div className='integration-list mb-64' justify='space-between' gap={16}>
                {rates.map((rate, i) => (
                    <div className='integration-list__button' key={i}>
                        <div className='integration__col'>
                            <h3>
                                {language === 'RU' ?
                                    'Тариф '
                                    :
                                    (language === 'EN' ?
                                        'Tariff '
                                        :
                                        'Тарыф '
                                    )}
                                <span>{rate.title}</span>
                            </h3>
                            <div className='integration__col gap-8'>
                                <ul>
                                    {rate.list.map((item, i) => (
                                        <li className='integration-list__item regular-text' key={i}>{item}</li>
                                    ))}
                                </ul>
                                <ul>
                                    {rate.benefits &&
                                        rate.benefits.map((benefit, i) => (
                                            <li className='integration-list__item-benefit regular-text' key={i}>{benefit}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='integration__col'>
                <h3>{language === 'RU' ?
                    'Заполните форму обратной связи'
                    :
                    (language === 'EN' ?
                        'Please, fill in the feedback form'
                        :
                        'Запоўніце форму зваротнай сувязі'
                    )}</h3>
                <div className='form-block__wrapper' justify='space-between' gap={64}>
                    <img className='form-cover' src='/images/main-2.png' alt='malanka' />
                    <div className='integration__col'>
                        <h4>
                            {language === 'RU' ?
                                'Тариф '
                                :
                                (language === 'EN' ?
                                    'Tariff '
                                    :
                                    'Тарыф '
                                )}
                            {rates[chosenRate].title}
                        </h4>
                        <CallbackForm formFields={formFields} formSelect={formSelect} />
                    </div>
                </div>
            </div>
        </main>
    )
}