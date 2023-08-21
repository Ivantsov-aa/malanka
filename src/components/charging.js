import {Breadcrumbs} from "./breadcrumbs/breadcrumbs"
import {AppLinks} from "./AppLinks/AppLinks"
import {CallbackForm} from "./callback-form/callback-form";
import {Instructions} from "./instructions/instructions"
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {handlerPageData} from "../services/handlerPageData";
import {convertLink} from "../services/convertLink";
import {useNavigate} from "react-router-dom";
import {url} from "./admin/AuthForm/AuthForm";
import {errorMessage} from "../services/errorMessage";

const generateId = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

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

const faq = {
    title: 'Першы раз з Malanka New?',
    items: [
        {
            name: 'Зарядка',
            text: 'Пользователей в новом приложении ждет обновленный дизайн и улучшенная эргономика приложения. Теперь заряжаться и просматривать необходимую информацию о зарядной сессии стало ещё удобнее. Изменено взаимодействие с пользователем через push-уведомления. Добавлены новые возможности и увеличен функционал. Улучшена скорость и качество работы приложения, теперь запустить сессию можно ещё быстрее. Основным нововведением стала возможность быстрого переключения между способами оплаты.',
            list: [
                'эластичный смесовый хлопок',
                'сделано из переработанных волокон',
                'средняя посадка',
                'фирменный эластичный пояс Calvin Klein',
                '57% хлопок 38% переработанный полиэстер 5% эластан'
            ]
        },
        {
            name: 'Мобильное приложение',
            text: 'Пользователей в новом приложении ждет обновленный дизайн и улучшенная эргономика приложения. Теперь заряжаться и просматривать необходимую информацию о зарядной сессии стало ещё удобнее. Изменено взаимодействие с пользователем через push-уведомления. Добавлены новые возможности и увеличен функционал. Улучшена скорость и качество работы приложения, теперь запустить сессию можно ещё быстрее. Основным нововведением стала возможность быстрого переключения между способами оплаты.',
            list: [
                'эластичный смесовый хлопок',
                'сделано из переработанных волокон',
                'средняя посадка',
                'фирменный эластичный пояс Calvin Klein',
                '57% хлопок 38% переработанный полиэстер 5% эластан'
            ]
        },
        {
            name: 'Вопросы оплаты',
            text: 'Пользователей в новом приложении ждет обновленный дизайн и улучшенная эргономика приложения. Теперь заряжаться и просматривать необходимую информацию о зарядной сессии стало ещё удобнее. Изменено взаимодействие с пользователем через push-уведомления. Добавлены новые возможности и увеличен функционал. Улучшена скорость и качество работы приложения, теперь запустить сессию можно ещё быстрее. Основным нововведением стала возможность быстрого переключения между способами оплаты.',
            list: [
                'эластичный смесовый хлопок',
                'сделано из переработанных волокон',
                'средняя посадка',
                'фирменный эластичный пояс Calvin Klein',
                '57% хлопок 38% переработанный полиэстер 5% эластан'
            ]
        }
    ]
}

export const Charging = () => {
    const {isLogged, userInfo} = useSelector((store) => store.authAdmin);
    const {language} = useSelector(store => store.localLanguage);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language])

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(58, 1)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
                const button = document.querySelector('.play-btn');
                if (isLogged) {
                    convertLink(page.querySelectorAll('a'), navigate, `/admin/${userInfo.username}`);
                } else {
                    convertLink(page.querySelectorAll('a'), navigate);
                }
                main.innerHTML = page.innerHTML;
                addDropdownEvent();
                if (button) {
                    addPlayBtnEvent();
                }
                document.querySelector('form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    sendEmail();
                });
            })
    }

    const addDropdownEvent = () => {
        const faqBlockCategory = document.querySelectorAll('.accordion-item.categories >.accordion-item-header');
        faqBlockCategory.forEach(category => {
            category.addEventListener('click', (e) => {
                faqBlockCategory.forEach(el => {
                    if (e.target.parentElement.dataset.id === el.parentElement.dataset.id || el.parentElement.children[1].contains(e.target) || el.contains(e.target)) {
                        if (el.parentElement.classList.contains('show') && e.target.parentElement === category.parentElement || el.parentElement.classList.contains('show') && e.target.parentElement.parentElement === category.parentElement) {
                            el.parentElement.classList.remove('show');
                        } else {
                            el.parentElement.classList.add('show');
                            el.parentElement.parentElement.scrollIntoView({block: "start", behavior: "smooth"});
                        }
                    } else {
                        el.parentElement.classList.remove('show');
                    }
                })
            });
        })

        const faqBlockSubcategory = document.querySelectorAll('.accordion-item .y');
        faqBlockSubcategory.forEach(subcategory => {
            subcategory.addEventListener('click', (e) => {
                faqBlockSubcategory.forEach(subelem => {
                    if (e.target.parentElement.dataset.id === subelem.parentElement.dataset.id || e.target.parentElement.parentElement.dataset.id === subelem.parentElement.dataset.id) {
                        if (subelem.parentElement.classList.contains('show')) {
                            subelem.parentElement.classList.remove('show');
                        } else {
                            subelem.parentElement.classList.add('show');
                        }
                    } else {
                        subelem.parentElement.classList.remove('show');
                    }
                })
            })
        })
    }

    const addPlayBtnEvent = () => {
        const button = document.querySelector('.play-btn');
        const video = document.querySelector('video');

        button.addEventListener('click', () => {
            if (!video.paused) {
                video.pause();
                video.parentElement.classList.remove('play');
            } else {
                video.play();
                video.parentElement.classList.add('play');
            }
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
        <main className='charging' data-id='58' data-count='1'>
            {/* <div className='pt-16'>
                <Breadcrumbs padding link={{name: 'Як зарадзіць электрамабіль', path: 'help'}} />
                <section className='charging__title block'>
                    <h2 className='mb-16'>Як зарадзіць электрамабіль</h2>
                    <div>
                        <h4 className='medium'>Для таго каб зарадзіць электрамабіль на зарадных станцыях Маланка, неабходна спампаваць мабільны дадатак Malanka New у App Store або Google Play</h4>
                        <AppLinks justify='flex-end' />
                    </div>
                </section>
                <div className='instructions-wrapper'>
                    <Instructions title='Зарадка электрамабіля ў 3 крокі!' list={instructionsList} />
                </div>
                <div className='block'>
                    <section className='faq-block'>
                        <h3>{faq.title}</h3>
                        <ul className='faq-block__accordion'>
                            <li className="accordion-item categories" data-id={generateId()}>
                                <h4 className="accordion-item-header">
                                    Зарадка
                                    <button className='faq-block__button'></button>
                                </h4>
                                <ul className="accordion-item-content">
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Як правільна падключыць канектар?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Пры падключэнні канектара пераканайцеся, што на ім няма сколаў, ён не забіты снегам або брудам.</p>
                                            <p>Шчыльна падключыце канектар да пстрычкі сістэмы блакіроўкі.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Ці ёсць на зарадных станцыях "Malanka" раз’ёмы Type1 або GB/T?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Зарадныя станцыі "Malanka" не абсталяваны канектарамі тыпу Type1 і ці GB/T</p>
                                            <p>На нашых станцыях прадстаўлены раз’ём Type2, CHAdeMO і CCS Combo2</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Ці можна зараджацца адразу некалькім карыстальнікам на адной зараднай станцыі?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>На зарадных станцыях Mode 4 (CHAdeMO або CCS) можна зараджаць толькі адзін электрамабіль адначасова.</p>
                                            <p>Калі такая станцыя мае яшчэ раз'ём Mode 3 (Type2), то адначасова можна выкарыстоўваць 1 раз'ём Mode 4 і адзін раз'ём Mode 3.</p>
                                            <p>На зарадных станцыях Mode 3 можна зараджаць адначасова 2 аўтамабілі ад слупка. Звярніце ўвагу, што з аднаго акаўнта можна адначасова запусціць толькі адну зарадную сесію.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Не атрымалася перазапусціць зарадную сесію выдалена?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Для паспяховага запуску зараднай сесіі неабходна далучыць канектар зноў.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Магутнасць зараднай сесіі ніжэй за намінальную магутнасць станцыі?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Магутнасць зараднай сесіі залежыць ад шматлікіх параметраў, такіх як тэмпература батарэі, ступень дэградацыі батарэі, мадэлі электрамабіля і г.д.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Як я магу спыніць зарадку ў экстранай сітуацыі?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Зарадную сесію вы можаце спыніць з мабільнай прылады альбо аварыйнай кнопкай на станцыі.</p>
                                            <p>УВАГА! Пасля прыпынку сесіі аварыйнай кнопкай адключыце пісталет ад электрамабіля і адцісніце кнопку.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Час працы зарадных станцый?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Зарадныя станцыі працуюць кругласутачна.</p>
                                            <p>Доступ да зарадных станцый, размешчаных на тэрыторыі трэціх асоб, ажыццяўляецца згодна з графікам работы арганізацыі.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Якія электрамабілі можна зарадзіць?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>У сетцы ЭЗС Malanka могуць зараджацца акумулятарныя электрамабілі (BEV) і гібрыды (PHEV), якія падключаюцца.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Якая магутнасць зарадкі на станцыях Malanka?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>На зарадных станцыях, якія працуюць ад пераменнага току, Mode 3 з раздымам Type2 максімальная напруга можа дасягаць 400 У, сіла току 32 А і магутнасць 22 квт. Звычайна 400 У 32 А ~ 22 квт пры трохфазным падлучэнні і 230 У 32 А ~ 7,4 квт пры аднафазным падлучэнні. На станцыях тыпу Mode 3 электрамабіль можа поўнасцю зарадзіцца за 6-8 гадзін.</p>
                                            <p>На магутных зарадных станцыях, якія працуюць ад сталага току, Mode 4 з раздымамі CHAdeMO і CCS, можна зараджаць батарэю электрамабіля да 80% на працягу 30 хвілін (на магутнасці 50 квт). Раз'ём CHAdeMO разлічаны на максімальную напругу 500 У і сілу току 125 А з магутнасцю да 62,5 квт. Раз'ём CCS разлічаны на 200-500 У пры 200 А і магутнасці 100 квт. На хуткіх Mode 4 можна зарадзіць акумулятар усяго за 7 хвілін на 35 кіламетраў шляху – гэта некалькі паездак па горадзе.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Ці можна зараджаць электрамабіль падчас дажджу/снегу? Як уплывае нізкая тэмпература на працэс зарадкі?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Можна. Прычым не баючыся ўдару электрычным токам або пашкоджання машыны.</p>
                                            <p>Справа ў тым, што і электрамабіль, і зарадная прылада маюць некалькі ўзроўняў абароны для такіх выпадкаў, абсталяваны шматлікімі функцыямі бяспекі для прадухілення кароткага замыкання. Зарадная сесія не пачнецца (ток не пайдзе), пакуль злучэнне не будзе надзейна абаронена. Гэта значыць, пакуль электрамабіль і зарадная прылада не пераканаюцца, што ўсё бяспечна. І наадварот, калі канектар выцягваюць з раздыма, падача электраэнергіі спыняецца перад здыманнем блакавання канектара</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Ці можна зараджацца на станцыях з намінальнай магутнасцю большай, чым у майго электрамабіля?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Электрамабілі могуць зараджацца на ўсіх сумяшчальных хуткіх або павольных зарадных станцыях Malanka.</p>
                                            <p>На станцыях з максімальнай магутнасцю зарадкі большай, чым зможа спажыць электрамабіль, зарадная сесія будзе ажыццяўляцца з максімальна дапушчальнай для дадзенага аўтамабіля магутнасцю.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Як забяспечана абарона ад крадзяжоў у выпадку выкарыстання ўласнага зараднага кабеля?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Пры запуску зараднай сесіі, кабель блакуецца ў зарадным раздыме электрамабіля і застаецца заблакаваным, пакуль зарадная сесія не будзе спынена.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Ці адключаецца кабель аўтаматычна?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Пісталет станцыі фіксуецца ў раздыме электрамабіля. Каб дастаць яго, неабходна націснуць кнопку на раздыме. Кнопка аўтаматычна блакуецца пасля старту сесіі і разблакуецца пасля завяршэння сесіі, але вынімаць пісталет неабходна ўручную, націскам на кнопку.</p>
                                            <p>Malanka звартае ўвагу ўладальнікаў электрамабіляў: рух на электрамабілі, падлучанаму да зараднай станцыі, катэгарычна забаронены.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Ці праўда, што электрамабіль папаўняе 80% зараду значна хутчэй, чым наступныя 20%?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Хуткасць зарадкі залежыць ад хімічных і фізічных працэсаў, якія адбываюцца ў батарэі, і ажыццяўляецца згодна з алгарытмам. Таму пры зарадцы на хуткіх станцыях Malanka час папаўнення апошніх 20% ёмістасць батарэі істотна ўзрастае. Вытворцы выкарыстоўваюць дадзены падыход кантролю зарадкі, каб павялічыць тэрмін службы і прадукцыйнасць акумулятарнай батарэі Вашага электрамабіля</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Ці можна пакінуць электрамабіль без зарадкі надоўга? Напрыклад, у аэрапорце?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>На месцах, прызначаных для зарадкі электрамабіляў, пакідаць аўтамабіль можна толькі на час зараднай сесіі.</p>
                                        </div>
                                    </li>

                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Як правільна падключаць канектар пры выкарыстанні перахадніка?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>1. Падключаем перахаднік да электрамабіля, затым падключаем канектар да перахадніка.</p>
                                            <p>2. Пры падключэнні канектара пераканайцеся, што на ім няма сколаў, ён не забіты снегам або брудам.</p>
                                            <p>Шчыльна падлучайце канектар да пстрычкі сістэмы блакавання.</p>
                                        </div>
                                    </li>

                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Не магу адключыць канектар CHAdeMO пасля завяршэння зараднай сесіі. Што рабіць ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Для таго каб ад’яднаць заблакаваны канектар, неабходна ў ніжняй частцы падставы канектара адкрыць заглушку і плаўна пацягнуць тросік блакавальнага механізму на сябе. Далей, пачуўшы характэрны гук, можаце  даставаць канектар.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Якія стандарты канектараў выкарыстоўваюцца на станцыях Malanka?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>1. Type 2 (Mennekes): 7-кантактны раз'ём характэрны ў асноўным для еўрапейскіх электрамабіляў. Асаблівасць раздыма заключаецца ў магчымасці выкарыстоўваць аднафазную і трохфазную сетку. Звычайна 400 У 32 А ~ 22 квт пры трохфазным падлучэнні і 230 У 32 А ~ 7,4 квт пры аднафазным падлучэнні.</p>
                                            <p>2. CHAdeMO: 2-кантактны канектар пастаяннага току. Разлічаны для выкарыстання на магутных зарадных станцыях, якія працуюць ад пастаяннага току ў рэжыме Mode 4, якія дазваляюць зараджаць батарэю электрамабіля да 80% на працягу 30 хвілін (пры намінальнай магутнасці 50 квт).</p>
                                            <p>3. CCS Combo (Type 2) Камбінаваны тып канектара, які дазваляе вам выкарыстоўваць як павольныя, так і хуткія кропкі зарадкі. Праца раздыма магчыма, дзякуючы інвертарнай тэхналогіі, якая пераўтварае пастаянны ток у пераменны. Зарадка пры дапамозе CSS Combo 2 разлічана на 200-500 У пры 200 А і магутнасці 100 квт.</p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className="accordion-item categories" data-id={generateId()}>
                                <h4 className="accordion-item-header">
                                    Мабільны дадатак
                                    <button className='faq-block__button'></button>
                                </h4>
                                <ul className="accordion-item-content">
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Як выдаліць карту з прыкладання?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Зайсці ў раздзел "Мой кашалёк" і націснуць на кнопку "Папоўніць", пасля чаго выбярыце карту і націсніце на значок кошыка ў правым верхнім куце.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Падкажыце, як усталяваць дадатак “Malanka” на тэлефон без App Store/Play Market?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            Спасылка на запампоўку мабільнага дадатку “Malanka”:
                                            <a className="download" href="https://apkpure.com/malanka/by.belorusneft.driverapp ">Спампаваць</a>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Заблакіраваны ўліковы запіс у дадатку, як можна яго разблакаваць?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Уліковы запіс можа блакавацца пры неаднаразовым няправільным уводзе пароля пры ўваходзе. У дадзеным выпадку тэрмін дзеяння блакіроўкі – 30 хвілін.</p>
                                            <p>У выпадку, калі Вы забылі свой пароль, можаце скарыстацца опцыяй аднаўлення (кнопка "Змяніць пароль" пры ўваходзе).</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Дзе можна атрымаць (паглядзець/убачыць) інфармацыю аб даступнасці паркоўкі?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>У акне асабістага профіля асноўнага меню націскаем на правую частку экрана і пераходзім на акно з картай зарадных станцый.</p>
                                            <p>У якім адкрылася акне з картай па GPS адлюстроўваецца бягучае месцазнаходжанне карыстальніка і электразарадныя станцыі з адзнакай іх стану.</p>
                                            <p>Для прагляду інфармацыі электразараднай станцыі карыстальнік націскае на зялёны цэтлік станцыі і кнопку "Інфармацыя аб станцыі / Маршрут".</p>
                                            <p>У выпадку абмежаванага доступу на паркоўку каля электразараднай станцыі інфармацыя адлюструецца ў радку "Доступ".</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Не адлюстроўваюцца станцыі на карце ў дадатку. Што рабіць?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Упэўніцеся, што на Вашай прыладзе Інтэрнэт-злучэнне актыўна.</p>
                                            <p>Паспрабуйце скінуць наладкі фільтра ў дадатку, для гэтага ў верхнім правым куце абярыце значок фільтра і, калі ў правым ніжнім куце з'явіцца меню, націсніце кнопку Скід</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Як запусціць зарадную сесію ў мабільным дадатку?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Для запуску зараднай сесіі падключыце канектар да электрамабіля.</p>
                                            <p>У дадатку ў правым ніжнім куце націсніце на значок маланкі – адскануйце QR-код канектара</p>
                                            <p>Націсніце кнопку Працягнуць</p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className="accordion-item categories" data-id={generateId()}>
                                <h4 className="accordion-item-header">
                                    Пытанні аплаты
                                    <button className='faq-block__button'></button>
                                </h4>
                                <ul className="accordion-item-content">
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Кошт паслуг на у сеті Malanka?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Паслуга зарадкі пераменным токам (AC): 0,40 руб. / кВт * ч;</p>
                                            <p>Паслуга зарадкі пастаянным токам (DC): 0,49 руб./кВт*г.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Як выдаліць банкаўскую карту з прыкладання?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Націсніце на значок кошыка ў правым верхнім куце карты пасля выбару сумы папаўнення.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Як вярнуць грошы з унутранага балансу прыкладання?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Для вяртання сродкаў з унутранага балансу неабходна падаць на электронны адрас contact@beloil.by (прадубліраваць інфармацыю на malanka@beloil.by) наступныя дакументы:</p>
                                            <p>1. Даць скан завізаванай Вамі заявы на вяртанне неабходнай сумы.</p>
                                            <p>2. Прыкласці чэк (можна спампаваць з мабільнага прыкладання Malanka, раздзел Плацяжы).</p>
                                            <p>3. Даць скан апошніх старонак пашпарта, завізаванага Вамі.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Якія спосабы аплаты ў сетцы Malanka?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>1. Унутраны баланс</p>
                                            <p>Унутраны баланс – спецыяльны рахунак Карыстальніка ў сэрвісе Malanka, які адлюстроўвае колькасць сродкаў, якім Карыстальнік мае права карыстацца для атрымання Паслуг. Для таго, каб папоўніць унутраны баланс, Вам неабходна зайсці ў пункт меню «Плацяжы». Пасля чаго неабходна абраць суму для папаўнення і націснуць кнопку "Папоўніць". Далей Вы выбіраеце банкаўскую карту для папаўнення. Пасля чаго Ваш унутраны баланс папоўніцца на суму, якая была абрана раней. Пры дадзеным тыпе аплаты прэаўтарызацыя сродкаў будзе адсутнічаць, і пасля выбару канектара выбіраць крэдытную карту ўжо не трэба.</p>
                                            <p>2. Прэаўтарызацыя сродкаў</p>
                                            <p>Калі Вы зараджаецеся ўпершыню, то пасля ўводу дадзеных карты захавайце іх. Пры наступнай зарадцы Вы будзеце проста выбіраць карту, націскаючы на яе, пасля чаго будзе пачынацца зарадная сесія. Калі Вы жадаеце ўвесці дадзеныя яшчэ адной карты, яшчэ раз абярыце ўкладку «Увесці дадзеныя карты». Важна! Пры кожнай зараднай сесіі пасля выбару карты для аплаты ў Вас будзе зарэзерваваная сума грошай у залежнасці ад абранага канектара: Type2: 12 рублёў Chademo/CCS: 25 рублёў</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Дзе я магу атрымаць чэк?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>З інфармацыяй аб завершаных зарадных сесіях можна азнаёміцца ў адпаведным раздзеле асноўнага меню "Завершаныя сесіі"</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Ці небяспечны ўвод дадзеных маёй плацёжнай карты?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Увод дадзеных плацёжнай карты ў мабільнае прыкладанне абсалютна бяспечные.</p>
                                            <p>Дадзеныя захаванай у дадатку плацежнай карты захоўваюцца на прыладзе Карыстальніка і перадаюцца па абароненых каналах перадачы даных на аўтарызацыю напрамую ў працэсінгавы цэнтр.</p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </section>
                    <section className='video-block'>
                        <h3 className='mb-8'>Відэаінструкцыя працэсу зарадкі электрамабіля</h3>
                        <p className='regular-text mb-16'>Усе самыя важныя функцыі – старт і завяршэнне зараднай сесіі, папаўненне балансу мабільнага дадатка, статыстыка і інфармацыя пра зарадную сесію – зарадныя станцыі Маланка для Вас у відэафармаце.</p>
                        <div className='video-block__container'>
                            <video width='100%' height='100%' src='https://joy1.videvo.net/videvo_files/video/free/2019-09/large_watermarked/190828_27_SuperTrees_HD_17_preview.mp4' />
                            <button className='play-btn'>
                                <div className='icon-wrapper'>
                                    <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M34 0.259766C27.3311 0.259766 20.8119 2.23734 15.2669 5.9424C9.72186 9.64746 5.40004 14.9136 2.84795 21.0749C0.29586 27.2362 -0.371884 34.0159 0.929162 40.5567C2.23021 47.0975 5.44161 53.1056 10.1573 57.8213C14.8729 62.5369 20.881 65.7483 27.4218 67.0494C33.9626 68.3504 40.7423 67.6827 46.9036 65.1306C53.0649 62.5785 58.3311 58.2567 62.0361 52.7116C65.7412 47.1666 67.7188 40.6475 67.7188 33.9785C67.7016 25.041 64.1436 16.4745 57.8238 10.1547C51.5041 3.83491 42.9375 0.276904 34 0.259766ZM45.8016 36.1508L30.2391 46.5258C29.8098 46.7914 29.3172 46.9369 28.8125 46.9473C28.3848 46.9469 27.9629 46.847 27.5805 46.6555C27.1658 46.4317 26.82 46.0991 26.58 45.6935C26.3401 45.288 26.2152 44.8247 26.2188 44.3535V23.6035C26.2152 23.1323 26.3401 22.6691 26.58 22.2635C26.82 21.8579 27.1658 21.5254 27.5805 21.3016C27.9968 21.0908 28.4608 20.9919 28.9269 21.0147C29.393 21.0374 29.8452 21.181 30.2391 21.4313L45.8016 31.8063C46.1628 32.042 46.4596 32.364 46.665 32.7433C46.8704 33.1226 46.978 33.5472 46.978 33.9785C46.978 34.4099 46.8704 34.8344 46.665 35.2137C46.4596 35.593 46.1628 35.9151 45.8016 36.1508Z" fill="#FFF" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </section>
                    <section className='callback-form__wrapper'>
                        <div className='callback-form__left'>
                            <h3 className='mb-16'>Засталіся пытанні?</h3>
                            <p className='regular-text'>Напішыце нам або звярніцеся ў службу тэхнічнай падтрымкі, мы заўсёды гатовы дапамагчы з любым запытам</p>
                        </div>
                        <CallbackForm />
                    </section>
                </div>
            </div > */}
        </main >
    )
}