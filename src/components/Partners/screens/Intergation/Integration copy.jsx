import { useState } from "react";
import { Breadcrumbs } from "../../../breadcrumbs/breadcrumbs"
import { CallbackForm } from "../../../callback-form/callback-form";
import { useSelector } from "react-redux";

export const Integration = () => {
    const [chosenRate, setChosenRate] = useState(0);
    const { language } = useSelector(store => store.localLanguage);

    const rates = [
        {
            title: 'Basic',
            list: language === 'RU' ? [
                'Отображение зарядной станции в мобильном приложении Malanka',
                'Обеспечение взимания платы за услуги по зарядке электромобилей',
                'Самостоятельное управление тарификацией на зарядной станции.'
            ] : (
                language === 'EN' ? [
                    'Отображение зарядной станции в мобильном приложении Malanka',
                    'Обеспечение взимания платы за услуги по зарядке электромобилей',
                    'Самостоятельное управление тарификацией на зарядной станции.'
                ]
                    :
                    [
                        'Отображение зарядной станции в мобильном приложении Malanka',
                        'Обеспечение взимания платы за услуги по зарядке электромобилей',
                        'Самостоятельное управление тарификацией на зарядной станции.'
                    ]
            )
        },
        {
            title: 'Comfort',
            list: [
                'Отображение зарядной станции в мобильном приложении Malanka',
                'Обеспечение взимания платы за услуги по зарядке электромобилей',
                'Самостоятельное управление тарификацией на зарядной станции'
            ],
            benefits: [
                'Техподдержка 24/7'
            ]
        },
        {
            title: 'Maximum',
            list: [
                'Отображение зарядной станции в мобильном приложении Malanka',
                'Обеспечение взимания платы за услуги по зарядке электромобилей',
                'Самостоятельное управление тарификацией на зарядной станции.'
            ],
            benefits: [
                'Техподдержка 24/7',
                'Регламентное техобслуживание зарядных станций и текущий ремонт'
            ]
        }
    ];

    const formFields = [
        {
            name: 'name_company',
            type: 'text',
            placeholder: 'Наименование организации *'
        },
        {
            name: 'prn',
            type: 'number',
            placeholder: 'УНП *'
        },
        {
            name: 'contact_name',
            type: 'text',
            placeholder: 'Контактное лицо *'
        },
        {
            name: 'phone_number',
            type: 'tel',
            placeholder: 'Телефон *'
        },
        {
            name: 'email',
            type: 'email',
            placeholder: 'Электронная почта *'
        }
    ];

    const formSelect = [
        { name: 'Модель и тип станции *', value: 'Модель и тип станции *' },
        { name: 'Модель и тип станции', value: 'Модель и тип станции' },
        { name: 'Модель и тип станции', value: 'Модель и тип станции' },
    ];

    return (
        <main className='integration'>
            <Breadcrumbs currentPage='Интеграция зарядных станций в сеть Malanka' link={{ name: 'Стать партнером', path: './partner' }} />
            <h2>Integration of charging stations in Malanka network</h2>
            <h2>Интеграция зарядных станций в сеть Malanka</h2>
            <div className='integration-list mb-64' justify='space-between' gap={16}>
                {rates.map((rate, i) => (
                    <div className='integration-list__button' key={i}>
                        <div className='integration__col'>
                            <h3>Тариф <span>{rate.title}</span></h3>
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
                <h3>Заполните форму обратной связи</h3>
                <div className='form-block__wrapper' justify='space-between' gap={64}>
                    <img className='form-cover' src='/images/main-2.png' alt='malanka' />
                    <div className='integration__col'>
                        <h4>Тариф {rates[chosenRate].title}</h4>
                        <CallbackForm formFields={formFields} formSelect={formSelect} />
                    </div>
                </div>
            </div>
        </main>
    )
}