import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "./breadcrumbs/breadcrumbs"
import { Instructions } from "./instructions/instructions"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { handlerPageData } from "../services/handlerPageData";
import { convertLink } from "../services/convertLink";

const instructionsList = [
    {
        text: 'Адкрыйце дадатак Malanka New',
        path: '/images/charging/charging-1.png'
    },
    {
        text: 'Адсканіруйце QR-код',
        path: '/images/charging/charging-2.png'
    },
    {
        text: 'Запусціце працэс зарадкі',
        path: '/images/charging/charging-3.png'
    }
];

export const Mission = () => {
    const { language } = useSelector(store => store.localLanguage);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language])

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(66, 1)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
                convertLink(page.querySelectorAll('a'), navigate);
                main.innerHTML = page.innerHTML;
            })
    }

    return (
        <main className='mission' data-id='66' count='1'>
            <div className='pt-16'>
                <Breadcrumbs padding link={{ name: 'Місія', path: 'our-mission' }} />
                <div className='block'>
                    <div className='mission__title mb-32'>
                        <h2>Маланка – мы робім электрамабілі зручнымі для Вас.</h2>
                    </div>
                    <div className='mission__banner-video mb-24'>
                        <div className='mission__banner-text'>
                            <h1 className="mb-16">Суперхуткая зарадка</h1>
                            <h3>10 хв. + 300 км</h3>
                        </div>
                        <video width='100%' height='100%' src='https://joy1.videvo.net/videvo_files/video/free/2019-09/large_watermarked/190828_27_SuperTrees_HD_17_preview.mp4' loop autoPlay />
                    </div>
                    <h5>
                        Malanka гэта будучыня, якое мы ствараем сёння. У дынаміцы развіцця тэхналогій час з'яўляецца найважнейшай каштоўнасцю. Усяго 3 дотыкі да экрана вашага смартфона – і ўжо праз 10 хвілін запас ходу электрамабіля будзе папоўнены на 300 кіламетраў. І гэта толькі пачатак…
                    </h5>
                    <Instructions title='Зарадка электрамабіля ў 3 крокі!' list={instructionsList} subtitle='Цяпер каб зарадзіць свой электрамабіль вам трэба ўсяго тры клікі ў смартфоне' />
                </div>
            </div>
            <div className='price-page__footer'>
                <div className='wrapper'>
                    <div>
                        <h3 className='mb-16'>Хочаце больш?</h3>
                        <p className='regular-text'>Мы рады падзяліцца апошнімі навінамі пра развіццё Malanka. Будзьце ў ліку першых, хто даведаецца пра перавагі найбуйнейшай сеткі зарадных станцый Беларусі!</p>
                    </div>
                    <Link to='/news' className='btn-green-outline'>Даведацца больш</Link>
                </div>
            </div>
        </main>
    )
}