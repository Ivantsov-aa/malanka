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
        text: 'Open the Malanka New app',
        path: '/images/charging/charging-1.png'
    },
    {
        text: 'Scan the QR-code',
        path: '/images/charging/charging-2.png'
    },
    {
        text: 'Start the charging session',
        path: '/images/charging/charging-3.png'
    }
];

const faq = {
    title: 'First time with the Malanka New?',
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
                <Breadcrumbs padding link={{ name: 'How to charge an electric car', path: 'help' }} />
                <section className='charging__title block'>
                    <h2 className='mb-16'>How to charge an electric car</h2>
                    <div>
                        <h4 className='medium'>To charge your electric car at Malanka charging stations you need to download the Malanka New mobile app from the App Store or Google Play.</h4>
                        <AppLinks justify='flex-end' />
                    </div>
                </section>
                <div className='instructions-wrapper'>
                    <Instructions title='3 steps to charge your electric car!' list={instructionsList} />
                </div>
                <div className='block'>
                    <section className='faq-block'>
                        <h3>{faq.title}</h3>
                        <ul className='faq-block__accordion'>
                            <li class="accordion-item categories" data-id={generateId()}>
                                <h4 class="accordion-item-header">
                                    Charging
                                    <button className='faq-block__button'></button>
                                </h4>
                                <ul class="accordion-item-content">
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            How to plug the connector correctly ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>When plugging the connector, make sure that there are no chips on it, it is not blocked with snow or dirt.</p>
                                            <p>Plug the connector tighly until the locking system clicks.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            Do Malanka charging stations have Type1 or GB/T connectors?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Malanka charging stations are not equipped with Type 1 or GB/T connectors.</p>
                                            <p>Type2, CHAdeMO and CCS Combo2 connectors are available at our stations.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            Can multiple users charge at one stations at the same time?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Mode 4 charging stations (CHAdeMO or CCS) can charge only one vehicle at a time.</p>
                                            <p>If the station also has a Mode 3 connector (Type 2), then one Mode 4 connector and one Mode 3 connector can be used at a time.</p>
                                            <p>Mode 3 charging stations can charge two cars at the same time. Please note that only one charging session can be started from one account at a time.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            I cannot restart the charging session remotely.
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Plug the connector once again for successful restart.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            Is the output power lower than the capacity of the station?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>The power of the charging session depends on many parameters, such as the battery temperature, the degradation factor of the battery, the model of the electric vehicle, etc.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            How can I stop charging session in case of emergency?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>You can stop the charging session from the mobile app, or by pressing the emergency button on the station.</p>
                                            <p>ATTENTION! After emergency stop, disconnect the gun from the electric vehicle and release the button.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            What are the operating hours of charging stations?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Charging stations are available 24 hours a day.</p>
                                            <p>Access to charging stations located on the territory of third parties is carried out according to the work schedule of the organization.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            What electric vehicles can be charged?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Battery electric vehicles (BEV) and plug-in hybrids (PHEV) can be charged at the Malanka charging network.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            What is the output power at Malanka stations?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Mode 3 AC-powered charging stations with a Type 2 connector can provide a maximum voltage of up to 400 V, a current of 32 A, and a power of 22 kW. Usually it's 400 V 32 A ~ 22 kW with three-phase connection and 230 V 32 A ~ 7.4 kW with single-phase connection. Mode 3 can fully charge an electric vehicle in 6-8 hours.</p>
                                            <p>Powerful Mode 4 DC-powered charging stations with CHAdeMO and CSS connectors can charge the battery of an electric vehicle up to 80% in 30 minutes (with output power of 50 kW). CHAdeMO connectors are designed for a maximum voltage of 500 V and a current of 125 A with a power of up to 62.5 kW. The CSS connector is designed for 200-500 V at 200 A and a power of 100 kW. Fast Mode 4 charging station can charge the battery in just 7 minutes for 35 kilometers of travel - several trips around the city.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            Is it possible to charge an electric vehicle during rain/snow? How does low temperature affect the charging process?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Yes, without fear of electric shock or damage to the machine.</p>
                                            <p>The electric car and charger have several levels of protection for such cases. They are equipped with numerous safety functions for short circuit prevention. The charging session will not start (the current will not go) until the connection is securely protected. Until the electric car and charger "make sure" that everything is safe. Vice versa, when the connector is removed from the socket, the power supply stops before releasing the connector lock.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            Is it possible to charge at stations with capacity higher than the capacity of my electric car?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Electric vehicles can be charged at all compatible fast or slow Malanka charging stations.</p>
                                            <p>At stations with output power higher than the electric vehicle can consume, the output power of charging session will be equal to the maximum power allowed for this vehicle.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            How is cable theft protection provided in the case of using my own charging cable?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>During the charging session at the stations the charging cable is fixed in the connector of the electric vehicle and remains locked until you stop the session from the application.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            Does the cable disconnect automatically?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>The charging gun is fixed in the socket of the electric vehicle. To disconnect it, you need to press the button on the connector. The button is automatically locked after the start of the session and unlocked after the end of the session, but you need to remove the charging gun manually by pressing the button.</p>
                                            <p>Malanka draws the attention of electric vehicle owners: driving an electric vehicle connected to a charging station is strictly prohibited.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            Is it true that an electric car fills up 80% of the charge much faster than the next 20% ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>The charging speed depends on the chemical and physical processes occurring in the battery and the charging is carried out according to the algorithm. When charging at fast Malanka stations, the charging time of the last 20% of the battery capacity increases significantly. Manufacturers use this charging control method to increase the service life and performance of your electric vehicle's battery.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            Is it possible to leave an electric car without charging for a long time? For example, at the airport ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>In places designed for charging electric vehicles, you can leave the vehicle only during the charging session. </p>
                                        </div>
                                    </li>

                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            How to plug the connector correctly when using an adapter?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>1. Plug the adapter to the electric vehicle, then plug the connector to the adapter.</p>
                                            <p>2. When plugging, make sure that there are no chips on it, it is not blocked with snow or dirt.</p>
                                            <p>3. Plug the connector tightly until the locking system clicks.</p>
                                        </div>
                                    </li>

                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            I can't disconnect the CHAdeMO connector after the end of the charging session. What should I do?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>In order to disconnect the blocked connector, it is necessary to open the plug at the bottom of the connector base and softly pull the cable of the locking mechanism to yourself. Then, after hearing a signiture sound, you can remove the connector.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            What connector standards are used at Malanka stations?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>1. Type 2 (Mennekes): The 7-pin connector is typical for European electric vehicles. This connector can be used with a single-phase and three-phase system. Usually it provides 400 V 32 A ~ 22 kW with three-phase connection and 230 V 32 A ~ 7.4 kW with single-phase connection.</p>
                                            <p>2. CHAdeMO: 2-pin DC connector. Designed for use at high-power Mode 4 DC charging stations, allowing to charge the battery of an electric vehicle up to 80% in 30 minutes (with a capacity of 50 kW).</p>
                                            <p>3. CCS Combo (Type 2) is a combined connector that allows you to use both slow and fast charging points. The connector operation is possible due to the inverter technology converting direct current into alternating current. Charging with CSS Combo 2 is designed for 200-500 V at 200 A and a output power of 100 kW.</p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li class="accordion-item categories" data-id={generateId()}>
                                <h4 class="accordion-item-header">
                                    Mobile application
                                    <button className='faq-block__button'></button>
                                </h4>
                                <ul class="accordion-item-content">
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            How to delete a card from the application ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Go to "Payment" and click on "Deposit", then select the card and click on the trash icon in the upper right corner.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            Can you tell me how to install the Malanka application on my phone without the App Store / Play Market?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            Link to download the Malanka mobile app:
                                            <a class="download" href="https://apkpure.com/malanka/by.belorusneft.driverapp">Download</a>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            My account in the application is blocked, how can it be unblocked?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>An account can be blocked if you repeatedly enter an incorrect password when logging in. In this case, the period of blocking is 30 minutes.</p>
                                            <p>In case you have forgotten your password, you can use the recovery option (the "Change Password" button when you log in).</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            Where can I get (see) information about parking availability?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>In the personal profile window of the main menu, click on the right side of the screen and go to the window with the map of charging stations.</p>
                                            <p>In the opened window with the GPS map the current location of the user and electric charging stations are displayed with the marking of their status.</p>
                                            <p>To view electric charging station information, the user clicks on the green station label and the "Station Information / Route" button.</p>
                                            <p>In the case of restricted access to the parking lot near the electric charging station, the information will be displayed in the "Access" line.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            I can't see the stations on the map in the app. What should I do?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Make sure that your device has an active Internet connection.</p>
                                            <p>Try to reset the filter settings in the application by selecting the filter icon in the upper right corner and, in the lower right corner of the menu that appears, click "Reset".</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            How to start a charging session in the mobile app ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>To start the charging session, plug the connector to the electric car.</p>
                                            <p>In the app in the lower right corner, click on the lightning bolt icon - scan the QR code of the connector.</p>
                                            <p>Press the "Continue" button.</p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li class="accordion-item categories" data-id={generateId()}>
                                <h4 class="accordion-item-header">
                                    Payment questions
                                    <button className='faq-block__button'></button>
                                </h4>
                                <ul class="accordion-item-content">
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            The price of charging at Malanka?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Alternating current (AC) charging service: 0.40 BYN/kW*h;</p>
                                            <p>Direct current (DC) charging service: 0.49 BYN/kW*h.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            How to remove a bank card from the application ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Click on the cart icon in the upper right corner of the card, after selecting the amount of recharge.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            How to return the funds from the internal balance of the application ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>To return funds from the internal balance, you must submit the following documents to contact@beloil.by (duplicate information to malanka@beloil.by):</p>
                                            <p>1.  A scan of your approved application for a refund of the required amount;</p>
                                            <p>2. The receipt (can be downloaded from the Malanka mobile app, Payments section);</p>
                                            <p>3. A scan of the last pages of your passport, authorized by you.</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            What are the methods of payment in the Malanka network?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>1. Internal balance</p>
                                            <p>Internal Balance - a special account of the User in Malanka, reflecting the amount of money that the User is entitled to use to receive Services.
                                                In order to replenish the internal balance, you need to enter the "Payments" menu item.
                                                Then, select the amount to be recharged and click on "Deposit". Then you choose a bank card for recharging. After that your internal balance will be replenished on the amount, which was selected earlier.
                                                With this type of payment, there will be no preauthorization of funds and after selecting the connector you do not need to select a credit card.</p>
                                            <p>2. Preauthorization of funds</p>
                                            <p>If you are charging for the first time, after entering the card data, save it. For subsequent charging you will simply select the card by clicking on it, and then the charging session will start.
                                                If you want to enter another card data, select the "Enter card data" tab again.
                                                Important! At each charging session after selecting a card for payment you will be reserved an amount of money depending on the connector chosen:
                                                Type2: 12 rubles
                                                Chademo/CCS: 25 rubles </p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            Where can I get a check ?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Information about completed charging sessions can be found in the corresponding section of the main menu "Completed sessions".</p>
                                        </div>
                                    </li>
                                    <li class="accordion-item" data-id={generateId()}>
                                        <h6 class="accordion-item-header y">
                                            Is it safe to enter my debit card data?
                                            <button className='faq-block__button'></button>
                                        </h6>
                                        <div class="accordion-item-content">
                                            <p>Entering payment card data into the mobile app is absolutely safe.</p>
                                            <p>The data of the payment card stored in the application is stored on the User's device and is transmitted via secure data transfer channels for authorization directly to the processing center.</p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </section>
                    <section className='video-block'>
                        <h3 className='mb-8'>Video of charging process</h3>
                        <p className='regular-text mb-16'>All the most important functions – the start and the end of charging sessions, balance replenishment of the mobile app, statistics and charging session details – Malanka charging stations are available for you in a video format.</p>
                        <div className='video-block__container'>
                            <video width='100%' height='100%' src='https://joy1.videvo.net/videvo_files/video/free/2019-09/large_watermarked/190828_27_SuperTrees_HD_17_preview.mp4' />
                            <button className='play-btn'>
                                <div className='icon-wrapper'>
                                    <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M34 0.259766C27.3311 0.259766 20.8119 2.23734 15.2669 5.9424C9.72186 9.64746 5.40004 14.9136 2.84795 21.0749C0.29586 27.2362 -0.371884 34.0159 0.929162 40.5567C2.23021 47.0975 5.44161 53.1056 10.1573 57.8213C14.8729 62.5369 20.881 65.7483 27.4218 67.0494C33.9626 68.3504 40.7423 67.6827 46.9036 65.1306C53.0649 62.5785 58.3311 58.2567 62.0361 52.7116C65.7412 47.1666 67.7188 40.6475 67.7188 33.9785C67.7016 25.041 64.1436 16.4745 57.8238 10.1547C51.5041 3.83491 42.9375 0.276904 34 0.259766ZM45.8016 36.1508L30.2391 46.5258C29.8098 46.7914 29.3172 46.9369 28.8125 46.9473C28.3848 46.9469 27.9629 46.847 27.5805 46.6555C27.1658 46.4317 26.82 46.0991 26.58 45.6935C26.3401 45.288 26.2152 44.8247 26.2188 44.3535V23.6035C26.2152 23.1323 26.3401 22.6691 26.58 22.2635C26.82 21.8579 27.1658 21.5254 27.5805 21.3016C27.9968 21.0908 28.4608 20.9919 28.9269 21.0147C29.393 21.0374 29.8452 21.181 30.2391 21.4313L45.8016 31.8063C46.1628 32.042 46.4596 32.364 46.665 32.7433C46.8704 33.1226 46.978 33.5472 46.978 33.9785C46.978 34.4099 46.8704 34.8344 46.665 35.2137C46.4596 35.593 46.1628 35.9151 45.8016 36.1508Z" fill="#F4F4FD" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </section>
                    <section className='callback-form__wrapper'>
                        <div className='callback-form__left'>
                            <h3 className='mb-16'>Still have questions?</h3>
                            <p className='regular-text'>Please, e-mail us or contact our tech support, we’re always available to help you with any request.</p>
                        </div>
                        <CallbackForm />
                    </section>
                </div>
            </div >
        </main >
    )
}