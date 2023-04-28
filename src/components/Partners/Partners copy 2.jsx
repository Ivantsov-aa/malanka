import { DirectionLink, ListItem, PartnersContainer } from "./Partners.style";
import { FlexWrap } from '../FlexWrap/FlexWrap';
import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";

const directions = [
    {
        id: 1,
        path: 'integration',
        cover: '/images/partners/integration.png',
        title: 'Integration of charging stations in Malanka network',
        list_title: 'If you come to us you will get:',
        list: [
            'Integration of your electric charging stations (ECS) with our Software',
            'ECS will be displayed on MALANKA map',
            'Billing',
            'Call dispatch to MALANKA «hot line»',
            'Servicing'
        ]
    },
    {
        id: 2,
        path: 'consalting',
        cover: '/images/partners/consalting.png',
        title: 'Information on charging infrastructure',
        list_title: 'Malanka team is ready to:',
        list: [
            'Check the chosen location',
            'Find the right equipment',
            'Provide assistance with design and construction',
            'Provide with software to address issues during the operational stage'
        ]
    },
    {
        id: 3,
        path: 'white-label',
        cover: '/images/partners/white-label.png',
        title: 'White Label – setting up an electric car charging network on a «turnkey» basis',
        list_title: 'Projects of any scale for you:',
        list: [
            'Finding a location and checking economic efficiency',
            'Design and construction',
            'Software development and billing',
            'Developing legal projects and legislative assistance',
            'Certification of charging infrastructure as an international climate project'
        ]
    }
]

export const Partners = () => {
    return (
        <PartnersContainer data-id='58' count='1'>
            <Breadcrumbs currentPage='Become a partner' />
            <h2>We make the future together</h2>
            <FlexWrap className='categories-container ph-20' justify='space-between'>
                {directions.map(direction => (
                    <DirectionLink to={`./${direction.path}`} key={direction.id}>
                        <FlexWrap direction='column' gap={8}>
                            <img src={direction.cover} alt='malanka' />
                            <h4>{direction.title}</h4>
                            <p>{direction.list_title}</p>
                            <ul>
                                {direction.list.map((item, i) => (
                                    <ListItem className='regular-text' key={i}>{item}</ListItem>
                                ))}
                            </ul>
                        </FlexWrap>
                    </DirectionLink>
                ))}
            </FlexWrap>
        </PartnersContainer>
    )
}