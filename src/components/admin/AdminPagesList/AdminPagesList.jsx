import { AdminPagesListContainer, PagesListFlex, PagesListItem } from "./AdminPagesList.style";

const pagesList = [
    {
        title: 'Главная',
        preview: '/images/admin/main.webp',
        path: '../'
    },
    {
        title: 'Как зарядиться',
        preview: '/images/admin/help.webp',
        path: '../help'
    },
    {
        title: 'Новости',
        preview: '/images/admin/news.webp',
        path: '../news'
    },
    {
        title: 'Миссия',
        preview: '/images/admin/mission.webp',
        path: '../our-mission'
    },
    {
        title: 'Цена',
        preview: '/images/admin/price.webp',
        path: '../price'
    },
    {
        title: 'Свяжитесь с нами',
        preview: '/images/admin/contact-us.webp',
        path: '../contact-us'
    }
]

export const AdminPagesList = () => {
    return (
        <AdminPagesListContainer>
            <h1>Список страниц</h1>
            <PagesListFlex>
                {pagesList.map((item, i) => (
                    <PagesListItem to={item.path} key={i}>
                        <div className='img-wrapper'>
                            <img src={item.preview} alt='malanka' />
                        </div>
                        <h6>{item.title}</h6>
                    </PagesListItem>
                ))}
            </PagesListFlex>
        </AdminPagesListContainer>
    )
};