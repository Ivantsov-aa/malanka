import { Link } from "react-router-dom";
import { Breadcrumbs } from "./breadcrumbs/breadcrumbs"
import { Instructions } from "./instructions/instructions"

const instructionsList = [
    {
        text: 'Откройте приложение Malanka New',
        path: '/images/charging/charging-1.png'
    },
    {
        text: 'Отсканируйте QR-код',
        path: '/images/charging/charging-2.png'
    },
    {
        text: 'Запустите процесс зарядки',
        path: '/images/charging/charging-3.png'
    }
];

export const Mission = () => {
    return (
        <main className='mission' data-id='66'>
            <div className='pt-16'>
                <Breadcrumbs padding link={{ name: 'Миссия', path: 'our-mission' }} />
                <div className='block'>
                    <div className='mission__title mb-32'>
                        <h2>Маланка – мы делаем электромобили удобными для Вас.</h2>
                    </div>
                    <div className='mission__banner-video mb-24'>
                        <div className='mission__banner-text'>
                            <h1 className="mb-16">Супербыстрая зарядка</h1>
                            <h3>10 мин. + 300 км</h3>
                        </div>
                        <video width='100%' height='100%' src='https://joy1.videvo.net/videvo_files/video/free/2019-09/large_watermarked/190828_27_SuperTrees_HD_17_preview.mp4' loop autoPlay />
                    </div>
                    <h5>
                        Malanka это будущее, которое мы создаём сегодня. В динамике развития технологий, время является важнейшей ценностью. Всего 3 касания экрана Вашего смартфона и уже через 10 минут, запас хода электромобиля будет пополнен на 300 километров. И это только начало…
                    </h5>
                    <Instructions title='Зарядка электромобиля в 3 шага!' list={instructionsList} subtitle='Сейчас чтобы зарядить свой электромобиль вам нужно всего три клика в смартфоне' />
                </div>
            </div>
            <div className='price-page__footer'>
                <div className='wrapper'>
                    <div>
                        <h3 className='mb-16'>Хотите больше?</h3>
                        <p className='regular-text'>Мы рады поделиться последними новостями о развитии Malanka. Будьте в числе первых кто узнает о преимуществах крупнейшей сети зарядных станций Беларуси!</p>
                    </div>
                    <Link to='/news' className='btn-green-outline'>Узнать больше</Link>
                </div>
            </div>
        </main>
    )
}