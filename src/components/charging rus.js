import { useRef, useState } from "react";
import { Breadcrumbs } from "./breadcrumbs/breadcrumbs"
import { AppLinks } from "./AppLinks/AppLinks"
import { CallbackForm } from "./callback-form/callback-form";
import { Instructions } from "./instructions/instructions"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { handlerPageData } from "../services/handlerPageData";

const generateId = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

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

const faq = {
    title: 'Первый раз с Malanka New?',
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
    const { language } = useSelector(store => store.localLanguage);
    useEffect(() => {
        addDropdownEvent();
        addPlayBtnEvent();
    }, []);

    useEffect(() => {
        // loadPage();
    }, [language])

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(34)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
                main.innerHTML = page.innerHTML;
            })
    }

    const addDropdownEvent = () => {
        const faqBlockCategory = document.querySelectorAll('.accordion-item.categories >.accordion-item-header');
        faqBlockCategory.forEach(category => {
            category.addEventListener('click', (e) => {
                faqBlockCategory.forEach(el => {
                    if (e.target.parentElement.dataset.id === el.parentElement.dataset.id || el.parentElement.children[1].contains(e.target)) {
                        if (el.parentElement.classList.contains('show') && e.target.parentElement === category.parentElement) {
                            el.parentElement.classList.remove('show');
                        } else {
                            el.parentElement.classList.add('show');
                            el.parentElement.parentElement.scrollIntoView({ block: "start", behavior: "smooth" });
                            const faqBlockSubcategory = el.parentElement.querySelectorAll('.accordion-item .y');
                            faqBlockSubcategory.forEach(subcategory => {
                                subcategory.addEventListener('click', (e) => {
                                    faqBlockSubcategory.forEach(subelem => {
                                        if (e.target.parentElement.dataset.id === subelem.parentElement.dataset.id) {
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
                    } else {
                        el.parentElement.classList.remove('show');
                    }
                })
            });
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

    return (
        <main className='charging'>
            <div className='pt-16'>
                <Breadcrumbs padding link={{ name: 'Как зарядиться', path: 'help' }} />
                <section className='charging__title block'>
                    <h2 className='mb-16'>Как зарядить электромобиль</h2>
                    <div>
                        <h4 className='medium'>Для того чтобы зарядить электромобиль на зарядных станциях Маланка, необходимо скачать мобильное приложение Malanka New в App Store или Google Play</h4>
                        <AppLinks justify='flex-end' />
                    </div>
                </section>
                <div className='instructions-wrapper'>
                    <Instructions title='Зарядка электромобиля в 3 клика' list={instructionsList} />
                </div>
                <div className='block'>
                    <section className='faq-block'>
                        <h3>{faq.title}</h3>
                        <ul className='faq-block__accordion'>
                            <li className="accordion-item categories" data-id={generateId()}>
                                <h4 className="accordion-item-header">
                                    Зарядка
                                    <button className='faq-block__button'></button>
                                </h4>
                                <ul className="accordion-item-content">
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Как правильно подключить коннектор ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>При подключении коннектора убедитесь, что на нем нет сколов, он не забит снегом или грязью.</p>
                                            <p>Плотно подключите коннектор, до щелчка системы блокировки.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Имеются ли на зарядных станциях “Malanka” разъемы Type1 или GB/T ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Зарядные станции “Malanka” не оборудованы коннекторами типа Type1 и или GB/T</p>
                                            <p>На наших станциях представлены разъемы Type2, CHAdeMO и CCS Combo2</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Можно ли заряжаться сразу нескольким пользователям на одной зарядной станции ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>На зарядных станциях Mode 4 (CHAdeMO либо CCS) можно заряжать только один электромобиль одновременно.</p>
                                            <p>Если такая станция имеет ещё разъем Mode 3 (Type2), то одновременно можно использовать 1 разъем Mode 4 и один разъем Mode 3.</p>
                                            <p>На зарядных станциях Mode 3 можно заряжать одновременно 2 автомобиля от столбика. Обратите внимание, что с одного аккаунта можно единовременно запустить только одну зарядную сессию.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Не получилось перезапустить зарядную сессию удаленно ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Для успешного запуска зарядной сессии необходимо подключить коннектор снова.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Мощность зарядной сессии ниже номинальной мощности станции ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Мощность зарядной сессии зависит от многих параметров, таких как температура батареи, степень деградации батареи, модели электромобиля и т.д.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Как я могу остановить зарядку в экстренной ситуации ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Зарядную сессию вы можете остановить из мобильного приложения, либо аварийной кнопкой на станции.</p>
                                            <p>ВНИМАНИЕ! После остановки сессии аварийной кнопкой, отключите пистолет от электромобиля и отожмите кнопку.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Время работы зарядных станций ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Зарядные станции работают круглосуточно.</p>
                                            <p>Доступ к зарядным станциям, расположенным на территории третьих лиц, осуществляется согласно графику работы организации.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Какие электромобили можно зарядить ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>В сети ЭЗС Malanka могут заряжаться аккумуляторные электромобили (BEV) и подключаемые гибриды (PHEV).</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Какая мощность зарядки на станциях Malanka ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>На зарядных станциях, работающих от переменного тока, Mode 3 с разъемом Type2 максимальное напряжение может достигать 400 В, сила тока 32 А, и мощность 22 кВт. Обычно 400 В 32 А ~ 22 кВт при трехфазном подключении и 230 В 32 А ~ 7,4 кВт при однофазном подключении. На станциях типа Mode 3 электромобиль может полностью зарядиться за 6-8 часов.</p>
                                            <p>На мощных зарядных станциях, работающих от постоянного тока, Mode 4 с разъемами CHAdeMO и CCS, возможно заряжать батарею электромобиля до 80% в течении 30 минут (на мощности 50 кВт). Разъем CHAdeMO рассчитан на максимальное напряжение 500 В и силу тока 125 А с мощностью до 62,5 кВт. Разъем CCS рассчитан на 200-500 В при 200 А и мощности 100 кВт. На быстрых Mode 4 можно зарядить аккумулятор всего за 7 минут на 35 километров пути ー это несколько поездок по городу.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Можно ли заряжать электромобиль во время дождя/снега ? Как влияет низкая температура на процесс зарядки ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Можно. Причем, не опасаясь удара электрическим током или повреждения машины.</p>
                                            <p>Дело в том, что и электромобиль, и зарядное устройство имеют несколько уровней защиты для таких случаев, оснащены многочисленными функциями безопасности для предотвращения короткого замыкания. Зарядная сессия не начнется (ток не пойдет), пока соединение не будет надежно защищено. То есть, пока электромобиль и зарядное устройство «не убедятся» что все безопасно. И наоборот, когда коннектор вытаскивают из разъема, подача электроэнергии прекращается перед снятием блокировки коннектора</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Можно ли заряжаться на станциях, с номинальной мощностью большей, чем у моего электромобиля ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Электромобили могут заряжаться на всех совместимых быстрых либо медленных зарядных станциях Malanka.</p>
                                            <p>На станциях с максимальной мощностью зарядки большей, чем сможет потребить электромобиль, зарядная сессия будет осуществляться с максимально допустимой для данного автомобиля мощностью.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Как обеспечена защита от краж в случае использования собственного зарядного кабеля ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>При запуске зарядной сессии, кабель блокируется в зарядном разъеме электромобиля и остается заблокированным, пока зарядная сессия не будет прекращена.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Отключается ли кабель автоматически ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Пистолет станции фиксируется в разъеме электромобиля, чтобы достать его, необходимо нажать кнопку на разъеме. Кнопка автоматически блокируется после старта сессии и разблокируется после завершения сессии, но вынуть пистолет необходимо вручную, нажатием на кнопку.</p>
                                            <p>Malanka обращает внимание владельцев электромобилей: движение на электромобиле, подключенному к зарядной станции, категорически запрещено.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Правда ли, что электромобиль восполняет 80% заряда гораздо быстрее чем последующие 20% ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Скорость зарядки зависит от происходящих в батарее химических и физических процессов и происходит согласно алгоритму. Поэтому при зарядке на быстрых станциях Malanka время пополнения последних 20% емкость батареи существенно возрастает. Производители используют данный подход контроля зарядки, чтобы увеличить срок службы и производительность аккумуляторной батареи Вашего электромобиля.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Можно ли оставить электромобиль без зарядки надолго? Например, в аэропорту ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>На местах предназначенных для зарядки электромобилей оставлять автомобиль можно только на время зарядной сессии. </p>
                                        </div>
                                    </li>

                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Как правильно подключать коннектор при использовании переходника?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>1. Подключаем переходник к электромобилю, затем подключаем коннектор к переходнику.</p>
                                            <p>2. При подключении коннектора убедитесь, что на нем нет сколов, он не забит снегом или грязью.</p>
                                            <p>Плотно подключайте коннектор, до щелчка системы блокировки.</p>
                                        </div>
                                    </li>

                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Не могу отключить коннектор CHAdeMO после завершения зарядной сессии. Что делать ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Для того что бы отсоединить заблокированный коннектор необходимо в нижней части основания коннектора открыть заглушку и плавно потянуть тросик блокирующего механизма на себя. Далее, услышав характерный звук, можете извлекать коннектор.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Какие стандарты коннекторов используются на станциях Malanka ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>1. Type 2 (Mennekes): 7-ми контактный разъем характерный в основном для европейских электромобилей. Особенность разъема заключается в возможности использовать однофазную и трехфазную сеть. Обычно 400 В 32 А ~ 22 кВт при трехфазном подключении и 230 В 32 А ~ 7,4 кВт при однофазном подключении.</p>
                                            <p>2. CHAdeMO: 2-контактный коннектор постоянного тока. Рассчитан для использования на мощных зарядных станциях работающих от постоянного тока в режиме Mode 4, позволяющих заряжать батарею электромобиля до 80% в течении 30 минут (при номинальной мощности 50 кВт).</p>
                                            <p>3. CCS Combo (Type 2) Комбинированный тип коннектора, который позволяет вам использовать как медленные, так и быстрые точки зарядки. Работа разъема возможна благодаря инверторной технологии преобразующей постоянный ток в переменный. Зарядка при помощи CSS Combo 2 рассчитана на 200-500 В при 200 А и мощности 100 кВт.</p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className="accordion-item categories" data-id={generateId()}>
                                <h4 className="accordion-item-header">
                                    Мобильное приложение
                                    <button className='faq-block__button'></button>
                                </h4>
                                <ul className="accordion-item-content">
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Как удалить карту из приложения ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Зайти в раздел "Мой кошелек" и нажать на кнопку "Пополнить", после чего выберите карту и нажмите на значок корзины в правом верхнем углу.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Подскажите, как установить приложение “Malanka” на телефон без App Store/Play Market ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            Ссылка на скачивание мобильного приложения “Malanka”:
                                            <a className="download" href="https://apkpure.com/malanka/by.belorusneft.driverapp ">Скачать</a>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Заблокирована учетная запись в приложении, как можно ее разблокировать ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Учётная запись может блокироваться при неоднократном, неправильном вводе пароля при входе. В данном случае срок действия блокировки – 30 минут.</p>
                                            <p>В случае, если Вы забыли свой пароль, можете воспользоваться опцией восстановления (кнопка «Сменить пароль» при входе).</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Где можно получить(посмотреть/увидеть) информацию о доступности парковки?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>В окне личного профиля основного меню  нажимаем на правую часть экрана и переходим на окно с картой зарядных станций.</p>
                                            <p>В открывшемся окне с картой по GPS отображается текущее местоположение пользователя и  электрозарядные станции с отметкой их состояния.</p>
                                            <p>Для просмотра информации электрозарядной станции, пользователь нажимает на зеленый ярлык станции и кнопку «Информация о станции / Маршрут».</p>
                                            <p>В случае ограниченного доступа на парковку возле электрозарядной станции, информация отобразится в строке «Доступ».</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Не отображаются станции на карте в приложении. Что делать ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Убедитесь, что на Вашем устройстве активно Интернет-соединение.</p>
                                            <p>Попробуйте сбросить настройки фильтра в приложении, для этого в верхнем правом углу выберите значок фильтра и, в правом нижнем углу появившегося меню, нажмите кнопку Сброс</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Как запустить зарядную сессию в мобильном приложении ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Для запуска зарядной сессии подключите коннектор к электромобилю.</p>
                                            <p>В приложении в правом нижнем углу нажмите на значок молнии – отсканируйте QR-код коннектора</p>
                                            <p>Нажмите кнопку Продолжить</p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className="accordion-item categories" data-id={generateId()}>
                                <h4 className="accordion-item-header">
                                    Вопросы оплаты
                                    <button className='faq-block__button'></button>
                                </h4>
                                <ul className="accordion-item-content">
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Стоимость услуг в сети Malanka ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Услуга зарядки переменным током (AC): 0,40 руб./кВт*ч;</p>
                                            <p>Услуга зарядки постоянным током (DC): 0,49 руб./кВт*ч.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Как удалить банковскую карту из приложения ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Нажать на значок корзины в правом верхнем углу карты, после выбора суммы пополнения.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Как вернуть деньги с внутреннего баланса приложения ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Для возврата средств с внутреннего баланса необходимо предоставить на электронный адрес contact@beloil.by (продублировать информацию на malanka@beloil.by) следующие документы:</p>
                                            <p>1. Предоставить скан завизированного Вами заявления на возврат необходимой суммы;</p>
                                            <p>2. Приложить чек (можно скачать из мобильного приложения Malanka, раздел Платежи);</p>
                                            <p>3. Предоставить скан последних страниц паспорта, завизированного Вами.</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Какие способы оплаты в сети Malanka ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>1. Внутренний баланс</p>
                                            <p>Внутренний баланс – специальный счет Пользователя в сервисе Malanka, отражающий количество средств, которым Пользователь имеет право воспользоваться для получения Услуг.
                                                Для того, чтобы пополнить внутренний баланс, Вам необходимо зайти в пункт меню «Платежи».
                                                После чего необходимо выбрать сумму для пополнения и нажать кнопку «Пополнить». Далее Вы выбираете банковскую карту для пополнения. После чего Ваш внутренний баланс пополнится на сумму, которая была выбрана ранее.
                                                При данном типе оплаты, преавторизация средств будет отсутствовать и после выбора коннектора выбирать кредитную карту уже не нужно.</p>
                                            <p>2. Преавторизация средств</p>
                                            <p>Если Вы заряжаетесь впервые, то, после ввода данных карты, сохраните их. При последующей зарядке Вы будете просто выбирать карту, нажимая на нее, после чего будет начинаться зарядная сессия.
                                                Если Вы хотите ввести данные еще одной карты, еще раз выберите вкладку «Ввести данные карты».
                                                Важно! При каждой зарядной сессии после выбора карты для оплаты у Вас будет зарезервирована сумма денег в зависимости от выбранного коннектора:
                                                Type2: 12 рублей
                                                Chademo/CCS: 25 рублей</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Где я могу получить чек ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>С информацией о завершённых зарядных сессиях можно ознакомиться в соответствующем разделе основного меню «Завершенные сессии»</p>
                                        </div>
                                    </li>
                                    <li className="accordion-item" data-id={generateId()}>
                                        <h6 className="accordion-item-header y">
                                            Безопасен ли ввод данных моей платёжной карты ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div className="accordion-item-content">
                                            <p>Ввод данных платёжной карты в мобильное приложение абсолютно безопасен.</p>
                                            <p>Данные сохраненной в приложении платёжной карты хранятся на устройстве Пользователя и передаются по защищенным каналам передачи данных на авторизацию напрямую в процессинговый центр.</p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </section>
                    <section className='video-block'>
                        <h3 className='mb-8'>Видеоинструкция процесса зарядки электромобиля</h3>
                        <p className='regular-text mb-16'>Все самые важные функции – старт и завершение зарядной сессии, пополнение баланса мобильного приложения, статистика и информация о зарядной сессии – зарядные станции Маланка для Вас в видеоформате.</p>
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
                            <h3 className='mb-16'>Остались вопросы?</h3>
                            <p className='regular-text'>Напишите нам или обратитесь в службу технической поддержки, мы всегда готовы помочь с любым запросом</p>
                        </div>
                        <CallbackForm />
                    </section>
                </div>
            </div >
        </main >
    )
}