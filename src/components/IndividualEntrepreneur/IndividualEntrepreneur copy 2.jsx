import { Link } from 'react-router-dom';
import Button from '../Button/button'
import { FlexWrap } from '../FlexWrap/FlexWrap'
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs'
import { IndividualEntrepreneurBenefitItemStyled, IndividualEntrepreneurForWhomItemStyled, IndividualEntrepreneurListRegStepsItemStyled, IndividualEntrepreneurListRegStepsStyled, IndividualEntrepreneurStyled } from './IndividualEntrepreneur.style'

const regSteps = [
    <h5>Please, see <Link to='/'>Public Offer Agreement</Link></h5>,
    <h5>Fill out a <Link to='/'>registration application</Link> and e-mail it to <a href='mailto:malanka@beloil.by'>malanka@beloil.by</a> on the company’s letterhead</h5>,
    <h5>Then receive an-email with access details for your <Link to='/'>Personal Account</Link></h5>,
];

const benefits = [
    'Bank transfer for charging',
    'One accounting document in the end of the month',
    'Bonuses',
];

const forWhom = [
    {
        title: 'Executives',
        list: [
            'Reducing the cost of maintaining a fleet (the cost of charging and servicing)',
            'Progressive discount scale'
        ]
    },
    {
        title: 'Managers',
        list: [
            'Access to charging sessions statistics',
            'Options to add/remove users',
            'Monitor the remaining balance'
        ]
    },
    {
        title: 'Drivers',
        list: [
            'A 24-hour technical support',
            'Easy location browsing',
            'Access to charging stations status',
            'Free parking on paid communal parkings'
        ]
    }
];

export const IndividualEntrepreneur = () => {
    return (
        <main className='individual' data-id='70' data-count='1'>
            <div className='block'>
                <Breadcrumbs currentPage='Malanka for legal entities' />
                <h2>Malanka for legal entities</h2>
                <div className='ip-title'>
                    <div justify='space-between' align='center'>
                        <div className='ip-title__text' direction='column' gap={16}>
                            <h3>Become our partner and get access to your personal account in 15 minutes</h3>
                            <p className='regular-text mb-16'>Statistics and history of charging sessions, registration of unlimited amount of drivers, total balance, expenditures and income, cash balance and much more.</p>
                            <Link to='' className='btn-green-outline'>Enter your personal account</Link>
                        </div>
                        <img src='/images/individual/inividual-title.png' alt='malanka' />
                    </div>
                </div>
                <div className='individual-regSteps mt-128' direction='column' align='center' gap={32}>
                    <div className='individual-regSteps__title' direction='column' gap={8}>
                        <h3>To become a partner – easy</h3>
                        <p className='default-text'>Just 3 steps to become the user of the Malanka software module for legal entities.</p>
                    </div>
                    <div className='individualRegStepList' justify='space-between'>
                        {regSteps.map((item, i) => (
                            <div className='individualRegStepListItem' direction='column' align='center' gap={27} key={i}>
                                <p className='h1'>{i + 1}</p>
                                {item}
                            </div>
                        ))}
                    </div>
                    <Link to='/partner' className='btn-green'>Become a partner</Link>
                </div>
                <div className='individual-block mt-128' direction='column' gap={32}>
                    <h3>Advantages</h3>
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
                    <h3>To whom</h3>
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
                        <h3 className='mb-16'>Still have questions?</h3>
                        <p className='regular-text'>Please, e-mail us or contact our tech support, we’re always available to help you with any request</p>
                    </div>
                    <Link to='/contact-us' className='btn-green-outline'>How to charge</Link>
                </div>
            </div>
        </main>
    )
}