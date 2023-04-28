import { DirectionLink, ListItem, PartnersContainer } from "./Partners.style";
import { FlexWrap } from '../FlexWrap/FlexWrap';
import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";

const directions = [
    {
        id: 1,
        path: 'integration',
        cover: '/images/partners/integration.png',
        title: 'Интеграция зарядных станций в сеть Malanka',
        list_title: 'Обратившись к нам, Вы получите:',
        list: [
            'Интеграцию Ваших ЭЗС в наше ПО',
            'Отображение ЭЗС на карте MALANKA',
            'Организацию биллинга',
            'Диспетчеризацию звонков на «горячую линию» MALANKA',
            'Техническое обслуживание'
        ]
    },
    {
        id: 2,
        path: 'consalting',
        cover: '/images/partners/consalting.png',
        title: 'Консалтинг по зарядной инфраструктуре',
        list_title: 'Команда Malanka готова:',
        list: [
            'Оценить выбранную Вами локацию',
            'Подобрать подходящее оборудование',
            'Помочь с проектированием и строительством',
            'Предоставить ПО для решения вопросов на этапе эксплуатации'
        ]
    },
    {
        id: 3,
        path: 'white-label',
        cover: '/images/partners/white-label.png',
        title: 'White Label – создание сети зарядных станций «под ключ»',
        list_title: 'Проект любого масштаба для Вас:',
        list: [
            'Выбор локации и оценку экономической эффективности',
            'Проектирование и строительство',
            'Разработку ПО и организацию биллинга',
            'Разработку проектов НПА и формирование законодательной базы',
            'Сертификацию зарядной инфраструктуры как международного климатического проекта'
        ]
    }
]

export const Partners = () => {
    return (
        <PartnersContainer data-id='58' count='1'>
            <Breadcrumbs currentPage='Стать партнером' />
            <h2>Вместе строим будущее</h2>
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