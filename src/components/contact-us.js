import {useSelector} from "react-redux";
import {Breadcrumbs} from "./breadcrumbs/breadcrumbs"
import {CallbackForm} from "./callback-form/callback-form"
import {useNavigate} from "react-router-dom";
import {handlerPageData} from "../services/handlerPageData";
import {convertLink} from "../services/convertLink";
import {useEffect} from "react";
import {url} from "./admin/AuthForm/AuthForm";
import {errorMessage} from "../services/errorMessage";

export const ContactUs = () => {
    const {language} = useSelector(store => store.localLanguage);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language])

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(72, 1)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
                convertLink(page.querySelectorAll('a'), navigate);
                main.innerHTML = page.innerHTML;
                document.querySelector('form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    sendEmail();
                });
            })
    }

    const sendEmail = async () => {
        const inputs = Array.from(document.querySelectorAll('form input[type=text]')).map(item => item);
        const comment = document.querySelector('form textarea');
        let isValid = true;

        if (!inputs[0].value) {
            errorMessage(inputs[0], 'Поле обязательно для заполнения');
            isValid = false;
        }

        if (!/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}/gi.test(inputs[1].value)) {
            errorMessage(inputs[1], 'E-mail введён некорректно');
            isValid = false;
        }

        if (!comment.value) {
            errorMessage(comment, 'Поле обязательно для заполнения');
            isValid = false;
        }

        if (isValid) {
            const formBtn = document.querySelector('form button');
            formBtn.innerText = '';
            formBtn.insertAdjacentHTML('afterbegin', '<img src="/images/svg/spinner.svg" alt="" />');
            await fetch(`${url}/mail-contact`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: inputs[0].value,
                    email: inputs[1].value,
                    comment: comment.value
                })
            })
                .then(response => response.json())
                .then(result => {
                    result && document.querySelector("form").reset();
                    formBtn.innerText = 'Отправлено';
                    setTimeout(() => {
                        formBtn.innerText = 'Отправить';
                    }, 3000);
                })
        }
    }

    return (
        <main className='contact-us block' data-id='72' data-count='1'>
            {/* <div className='pt-16'>
                <Breadcrumbs link={{
                    name: language === 'RU' ?
                        'Связаться с нами'
                        :
                        (language === 'EN' ?
                            'Contact us'
                            :
                            'Звязацца з намі')
                    , path: 'contact-us'
                }} />
                <div className='container'>
                    <h2 className='mb-32'>
                        {language === 'RU' ?
                            'Связаться с нами'
                            :
                            (language === 'EN' ?
                                'Contact us'
                                :
                                'Звязацца з намі')}
                    </h2>
                    <section className='callback-form__wrapper'>
                        <div className='callback-form__left contacts'>
                            <h4 className='mb-16'>
                                {language === 'RU' ?
                                    'Контакты'
                                    :
                                    (language === 'EN' ?
                                        'Contacts'
                                        :
                                        'Кантакты')}
                            </h4>
                            <div className='flex-wrapper'>
                                <div>
                                    <h6>
                                        {language === 'RU' ?
                                            'Телефоны'
                                            :
                                            (language === 'EN' ?
                                                'Telephone numbers'
                                                :
                                                'Тэлефоны')}
                                    </h6>
                                    <ul className='mb-16'>
                                        <li><a href='tel:+375296431431'>+375 29 6-431-431</a></li>
                                        <li><a href='tel:+375336431431'>+375 33 6-431-431</a></li>
                                        <li><a href='tel:+375256431431'>+375 25 6-431-431</a></li>
                                        <li className='col'>
                                            {language === 'RU' ?
                                                'По вопросам работы с юридическими лицами'
                                                :
                                                (language === 'EN' ?
                                                    'For legal entities'
                                                    :
                                                    'Па пытаннях працы з юрыдычнымі асобамі')}
                                            <a href='tel:+375232793476'>+375 23 279-34-76</a>
                                        </li>
                                        <li className='col'>
                                            {language === 'RU' ?
                                                'Сотрудничество со СМИ'
                                                :
                                                (language === 'EN' ?
                                                    'For Media'
                                                    :
                                                    'Супрацоўніцтва са СМІ')}
                                            <a href='tel:+375232793357'>+375 23 279-33-57</a>
                                        </li>
                                    </ul>
                                    <a href='mailto:malanka@beloil.by' className='email-link'>malanka@beloil.by</a>
                                </div>
                                <div>
                                    <div className='mb-32'>
                                        <h6>
                                            {language === 'RU' ?
                                                'Адрес'
                                                :
                                                (language === 'EN' ?
                                                    'Address'
                                                    :
                                                    'Адрас')}
                                        </h6>
                                        <p>
                                            {language === 'RU' ?
                                                'ул. Рогачёвская, 9, г. Гомель, 246003, Республика Беларусь'
                                                :
                                                (language === 'EN' ?
                                                    '9 Rogachevskaya Street, Gomel, 246003, Belarus'
                                                    :
                                                    'вул. Рагачоўская, 9, г. Гомель, 246003, Рэспубліка Беларусь')}
                                        </p>
                                    </div>
                                    <div>
                                        <h6>
                                            {language === 'RU' ?
                                                'Режим работы'
                                                :
                                                (language === 'EN' ?
                                                    'Working hours'
                                                    :
                                                    'Рэжым працы')}
                                        </h6>
                                        <p>{language === 'RU' ?
                                            'с'
                                            :
                                            (language === 'EN' ?
                                                'from'
                                                :
                                                'з')} 08:00 {language === 'RU' ?
                                                    'до'
                                                    :
                                                    (language === 'EN' ?
                                                        'to'
                                                        :
                                                        'па')} 17:00</p>
                                        <p className='break-time'>
                                            {language === 'RU' ?
                                                'перерыв'
                                                :
                                                (language === 'EN' ?
                                                    'breaks'
                                                    :
                                                    'перапынак')} 12:00 – 13:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='form-wrap'>
                            <h4>
                                {language === 'RU' ?
                                    'Заполните форму'
                                    :
                                    (language === 'EN' ?
                                        'Fill in the form'
                                        :
                                        'Запоўніце форму')}
                            </h4>
                            <CallbackForm />
                        </div>
                    </section>
                </div>
            </div> */}
        </main>
    )
}