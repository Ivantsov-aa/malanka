import { Link, useNavigate } from 'react-router-dom';
import { FlexWrap } from '../FlexWrap/FlexWrap'
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs'
import { useSelector } from 'react-redux';
import { handlerPageData } from '../../services/handlerPageData';
import { convertLink } from '../../services/convertLink';
import { useEffect } from 'react';

const regSteps = [
    <h5>Азнаёмцеся з <Link to='/'>Дагаворам публічнай аферты</Link></h5>,
    <h5>Запоўніце <Link to='/'>заяўку для рэгістрацыі</Link> і накіруйце яе на фірменным бланку арганізацыі на адрас <a href='mailto:malanka@beloil.by'>malanka@beloil.by</a></h5>,
    <h5>Атрымайце на электронную пошту паведамленне з рэквізітамі доступу ў <Link to='/'>Асабісты кабінет</Link></h5>,
];

const benefits = [
    'Безнаяўны разлік за зарадку',
    'Адзін уліковы дакумент па выніках месяца',
    'Бонусная праграма',
];

const forWhom = [
    {
        title: 'Кіраўнікоў',
        list: [
            'Зніжэнне выдаткаў на ўтрыманне аўтапарка (кошт зарадкі і ТА)',
            'Прагрэсіўная шкала зніжак'
        ]
    },
    {
        title: 'Менеджара',
        list: [
            'Доступ да статыстыкі зарадных сесій',
            'Магчымасць дадаваць/выключаць карыстальнікаў',
            'Кантроль астатку балансу'
        ]
    },
    {
        title: 'Кіроўцаў',
        list: [
            'Кругласутачная тэхпадтрымка',
            'Зручны прагляд лакацый',
            'Доступ да статусу зарадных станцый',
            'Бясплатная паркоўка на платных камунальных паркоўках'
        ]
    }
];

export const IndividualEntrepreneur = () => {
    const { language } = useSelector(store => store.localLanguage);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language])

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(70, 1)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
                convertLink(page.querySelectorAll('a'), navigate);
                main.innerHTML = page.innerHTML;
            })
    }

    return (
        <main className='individual' data-id='70' data-count='1'>
            <div className='block'>
                <Breadcrumbs currentPage='Маланка для юрыдычных асоб' />
                <h2>Маланка для юрыдычных асоб</h2>
                <div className='ip-title'>
                    <div justify='space-between' align='center'>
                        <div className='ip-title__text' direction='column' gap={16}>
                            <h3>Станьце нашым кліентам і атрымайце доступ да асабістага кабінеце за 15 хвілін</h3>
                            <p className='regular-text mb-16'>Статыстыка і гісторыя зарадных сесій, рэгістрацыя неабмежаванай колькасці кіроўцаў, агульны баланс, расход і паступленне сродкаў, астатак грашовых сродкаў на балансе і многае іншае.</p>
                            <Link to='' className='btn-green-outline'>Увайсці ў асабісты кабінет</Link>
                        </div>
                        <img src='/images/individual/inividual-title.png' alt='malanka' />
                    </div>
                </div>
                <div className='individual-regSteps mt-128' direction='column' align='center' gap={32}>
                    <div className='individual-regSteps__title' direction='column' gap={8}>
                        <h3>Стаць партнёрам лёгка</h3>
                        <p className='default-text'>Каб стаць карыстальнікам праграмнага модуля для юрыдычных асоб Маланка, трэба зрабіць усяго тры простыя крокі.</p>
                    </div>
                    <div className='individualRegStepList' justify='space-between'>
                        {regSteps.map((item, i) => (
                            <div className='individualRegStepListItem' direction='column' align='center' gap={27} key={i}>
                                <p className='h1'>{i + 1}</p>
                                {item}
                            </div>
                        ))}
                    </div>
                    <Link to='/partner' className='btn-green'>Стаць кліентам</Link>
                </div>
                <div className='individual-block mt-128' direction='column' gap={32}>
                    <h3>Перавагі</h3>
                    <div className='individualRegBenefitItem' justify='space-between' gap={32}>
                        {benefits.map((item, i) => (
                            <div className='row' align='center' gap={32} key={i}>
                                <div className='img-wrapper'></div>
                                <h4>{item}</h4>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='individual-block mt-128' direction='column' gap={32}>
                    <h3>Для каго</h3>
                    <div className='individualRegBenefitItem' justify='space-between' gap={32}>
                        {forWhom.map((item, i) => (
                            <div className='col' direction='column' gap={20} key={i}>
                                <h4>{item.title}</h4>
                                <ul>
                                    {item.list.map((item, j) => (
                                        <li className='individualForWhomItem' key={j}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='price-page__footer'>
                <div className='wrapper'>
                    <div>
                        <h3 className='mb-16'>Засталіся пытанні?</h3>
                        <p className='regular-text'>Напішыце нам або звярніцеся ў службу тэхнічнай падтрымкі, мы заўсёды гатовы дапамагчы з любым запытам</p>
                    </div>
                    <Link to='/contact-us' className='btn-green-outline'>Як зарадзіцца</Link>
                </div>
            </div>
        </main>
    )
}