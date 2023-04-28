import { Link } from 'react-router-dom';
import Button from '../Button/button'
import { FlexWrap } from '../FlexWrap/FlexWrap'
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs'
import { IndividualEntrepreneurBenefitItemStyled, IndividualEntrepreneurForWhomItemStyled, IndividualEntrepreneurListRegStepsItemStyled, IndividualEntrepreneurListRegStepsStyled, IndividualEntrepreneurStyled } from './IndividualEntrepreneur.style'

const regSteps = [
    <h5>Ознакомьтесь с <Link to='/'>Договором публичной оферты</Link></h5>,
    <h5>Заполните с <Link to='/'>заявку для регистрации</Link> и направьте ее на фирменном бланке организации на адрес <a href='mailto:malanka@beloil.by'>malanka@beloil.by</a></h5>,
    <h5>Получите на электронную почту сообщение с реквизитами доступа в <Link to='/'>Личный кабинет</Link></h5>,
];

const benefits = [
    'Безналичный расчет за зарядку',
    'Один учетный документ по результатам месяца',
    'Бонусная программа',
];

const forWhom = [
    {
        title: 'Руководителей',
        list: [
            'Снижение затрат на содержание автопарка (стоимость зарядки и то)',
            'Прогрессивная шкала скидок'
        ]
    },
    {
        title: 'Менеджера',
        list: [
            'Доступ к статистике зарядных сессий',
            'Возможность добавлять/ исключать пользователей',
            'Контроль остатка баланса'
        ]
    },
    {
        title: 'Водителей',
        list: [
            'Круглосуточная техподдержка',
            'Удобный просмотр локаций',
            'Доступ к статусу зарядных станций',
            'Бесплатная парковка на платных коммунальных парковках'
        ]
    }
];

export const IndividualEntrepreneur = () => {
    return (
        <main className='individual' data-id='70' data-count='1'>
            <div className='block'>
                <Breadcrumbs currentPage='Маланка для юридических лиц' />
                <h2>Маланка для юридических лиц</h2>
                <div className='ip-title'>
                    <div justify='space-between' align='center'>
                        <div className='ip-title__text' direction='column' gap={16}>
                            <h3>Станьте нашим клиентом и получите доступ к личному кабинету за 15 минут</h3>
                            <p className='regular-text mb-16'>Статистика и история зарядных сессий, регистрация неограниченного количества водителей, общий баланса, расход и поступление средств, остаток денежных средств на балансе и многое другое.</p>
                            <Link to='' className='btn-green-outline'>Войти в личный кабинет</Link>
                        </div>
                        <img src='/images/individual/inividual-title.png' alt='malanka' />
                    </div>
                </div>
                <div className='individual-regSteps mt-128' direction='column' align='center' gap={32}>
                    <div className='individual-regSteps__title' direction='column' gap={8}>
                        <h3>Стать партнером легко</h3>
                        <p className='default-text'>Чтобы стать пользователем программного модуля для юридических лиц Маланка нужно сделать всего три простых шага.</p>
                    </div>
                    <div className='individualRegStepList' justify='space-between'>
                        {regSteps.map((item, i) => (
                            <div className='individualRegStepListItem' direction='column' align='center' gap={27} key={i}>
                                <p className='h1'>{i + 1}</p>
                                {item}
                            </div>
                        ))}
                    </div>
                    <Link to='/partner' className='btn-green'>Стать клиентом</Link>
                </div>
                <div className='individual-block mt-128' direction='column' gap={32}>
                    <h3>Преимущества</h3>
                    <div className='individualRegBenefitItem' justify='space-between' gap={32}>
                        {benefits.map((item, i) => (
                            <FlexWrap align='center' gap={32} key={i}>
                                <div className='img-wrapper'></div>
                                <h4>{item}</h4>
                            </FlexWrap>
                        ))}
                    </div>
                </div>
                <div className='individual-block mt-128' direction='column' gap={32}>
                    <h3>Для кого</h3>
                    <div className='individualRegBenefitItem' justify='space-between' gap={32}>
                        {forWhom.map((item, i) => (
                            <FlexWrap direction='column' gap={20} key={i}>
                                <h4>{item.title}</h4>
                                <ul>
                                    {item.list.map((item, j) => (
                                        <li className='individualForWhomItem' key={j}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </FlexWrap>
                        ))}
                    </div>
                </div>
            </div>
            <div className='price-page__footer'>
                <div className='wrapper'>
                    <div>
                        <h3 className='mb-16'>Остались вопросы?</h3>
                        <p className='regular-text'>Напишите нам или обратитесь в службу технической поддержки, мы всегда готовы помочь с любым запросом</p>
                    </div>
                    <Link to='/contact-us' className='btn-green-outline'>Как зарядится</Link>
                </div>
            </div>
        </main>
    )
}