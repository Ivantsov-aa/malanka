import { useSelector } from "react-redux";
import { Breadcrumbs } from "./breadcrumbs/breadcrumbs"
import { CallbackForm } from "./callback-form/callback-form"
import { useNavigate } from "react-router-dom";
import { handlerPageData } from "../services/handlerPageData";
import { convertLink } from "../services/convertLink";
import { useEffect } from "react";

export const ContactUs = () => {
    const { language } = useSelector(store => store.localLanguage);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language])

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(74, 1)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
                convertLink(page.querySelectorAll('a'), navigate);
                main.innerHTML = page.innerHTML;
            })
    }

    return (
        <main className='contact-us block' data-id='74' data-count='1'>
            <div className='pt-16'>
                <Breadcrumbs link={{ name: 'Звязацца з намі', path: 'contact-us' }} />
                <div className='container'>
                    <h2 className='mb-32'>
                        Звязацца з намі
                    </h2>
                    <section className='callback-form__wrapper'>
                        <div className='callback-form__left contacts'>
                            <h4 className='mb-16'>Кантакты</h4>
                            <div className='flex-wrapper'>
                                <div>
                                    <h6>Тэлефоны</h6>
                                    <ul className='mb-16'>
                                        <li><a href='tel:+375296431431'>+375 29 6-431-431</a></li>
                                        <li><a href='tel:+375336431431'>+375 33 6-431-431</a></li>
                                        <li><a href='tel:+375256431431'>+375 25 6-431-431</a></li>
                                        <li className='col'>
                                            Па пытаннях працы з юрыдычнымі асобамі
                                            <a href='tel:+375232793476'>+375 23 279-34-76</a>
                                        </li>
                                        <li className='col'>
                                            Супрацоўніцтва са СМІ
                                            <a href='tel:+375232793357'>+375 23 279-33-57</a>
                                        </li>
                                    </ul>
                                    <a href='mailto:malanka@beloil.by' className='email-link'>malanka@beloil.by</a>
                                </div>
                                <div>
                                    <div className='mb-32'>
                                        <h6>Адрас</h6>
                                        <p>вул. Рагачоўская, 9, г. Гомель, 246003, Рэспубліка Беларусь</p>
                                    </div>
                                    <div>
                                        <h6>Рэжым працы</h6>
                                        <p>з 08:00 па 17:00</p>
                                        <p className='break-time'>перапынак 12:00 – 13:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='form-wrap'>
                            <h4>Запоўніце форму</h4>
                            <CallbackForm />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}