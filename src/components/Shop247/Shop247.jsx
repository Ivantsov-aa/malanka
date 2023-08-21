import { useEffect } from "react";
import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import { VideoBlock } from "../VideoBlock/VideoBlock";
import { SliderGallery } from "../SliderGallery/SliderGallery";
import Swiper, { Navigation, Pagination } from "swiper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handlerPageData } from "../../services/handlerPageData";
import { convertLink } from "../../services/convertLink";

const photos = [
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
    "/images/news/slider.png",
];

export const Shop247 = ({ innerWidth }) => {
    const { language } = useSelector((store) => store.localLanguage);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language]);

    const loadPage = () => {
        const main = document.querySelector("main");

        handlerPageData()
            .getContent(104, 1)
            .then((result) => {
                const parser = new DOMParser();
                const page = parser
                    .parseFromString(result, "text/html")
                    .querySelector("main");
                convertLink(page.querySelectorAll("a"), navigate);
                main.innerHTML = page.innerHTML;
                showInstructions();
                sliderInit();
                const playBtn = document.querySelector(".play-btn");
                if (playBtn) {
                    addPlayBtnEvent();
                }
            });
    };

    const addPlayBtnEvent = () => {
        const button = document.querySelector(".play-btn");
        const video = document.querySelector("video");

        button.addEventListener("click", () => {
            if (!video.paused) {
                video.pause();
                video.parentElement.classList.remove("play");
            } else {
                video.play();
                video.parentElement.classList.add("play");
            }
        });
    };

    const principles =
        language === "RU"
            ? [
                  "Регистрация клиента - клиент регистрируется в мобильном приложении Malanka Shop, вводя свои данные и привязывая свою банковскую карту.",
                  "Вход в магазин - клиент сканирует QR - код на входе в магазин, используя свой смартфон.",
                  "Выбор товаров - клиент выбирает нужные товары, сканируя их с помощью мобильного приложения или просто берет их со стеллажей.",
                  "Оплата - после того как клиент выбрал все нужные товары, оплата происходит автоматически с использованием привязанной карточки.",
                  "Выход из магазина - после оплаты клиент может покинуть магазин сразу, не стоя в очереди и не общаясь с продавцами.",
              ]
            : language === "EN"
            ? [
                  "Client’s registration - the client registers in the Malanka Shop app by entering personal information and linking a credit card.",
                  "Entrance to the shop – the client scans the QR-code with his/her smartphone at the entrance to the shop.",
                  "Making a choice of goods – the client chooses the goods scanning them in the mobile app or simply picking them up from the shelves.",
                  "Payment – when the client has chosen all the necessary goods, the payment is made from the linked card automatically ",
                  "Leaving the shop – when the payment is made the client is free to leave the shop eliminating lines and having no interaction with cashiers.",
              ]
            : [
                  "Рэгістрацыя кліента – кліент рэгіструецца ў мабільным дадатку Malanka Shop, уводзячы свае даныя і прывязваючы сваю банкаўскую карту.",
                  "Уваход у магазін – кліент сканіруе QR-код на ўваходзе ў магазін, выкарыстоўваючы свой смартфон.",
                  "Выбар тавараў – кліент выбірае патрэбныя тавары, сканіруючы іх з дапамогай мабільнага дадатка або проста бярэ іх са стэлажоў.",
                  "Аплата – пасля таго, як кліент выбраў усе патрэбныя тавары, аплата адбываецца аўтаматычна з выкарыстаннем прывязанай карткі.",
                  "Выхад з магазіна – пасля аплаты кліент можа пакінуць магазін адразу, не стоячы ў чарзе і не стасуючыся з прадаўцамі.",
              ];
    const stepsRegistration =
        language === "RU"
            ? [
                  "Скачай мобильное приложение Malanka Shop",
                  "Зарегистрируйся, введя номер мобильного телефона",
                  "Введи учетные данные профиля",
                  "Привяжи банковскую карту в профиле",
                  "В приложении открой сканер qr-кода “В магазин”",
                  "Отсканируй qr-код на welcome-стенде",
                  "Дождись зеленого сигнала стрелки турникета и можешь входить",
                  "Добро пожаловать! Ты в магазине будущего",
              ]
            : language === "EN"
            ? [
                  "Download Malanka Shop mobile app",
                  "Register by entering your mobile number",
                  "Enter profile credentials",
                  "Link a bank card in your profile",
                  "In the app, open the QR code scanner “Go To Store”",
                  "Scan the qr-code at the welcome-stand",
                  "Wait for the green signal of the turnstile arrow and you can enter",
                  "Welcome! You're in the store of the future",
              ]
            : [
                  "Спампаваць мабільны дадатак Malanka Shop",
                  "Зарэгіструйцеся, увёўшы нумар мабільнага тэлефона",
                  "Увядзі ўліковыя дадзеныя профіля",
                  "Прывяжы банкаўскую карту ў профілі",
                  'У дадатку адкрый сканер qr-кода "У краму"',
                  "Адсканіруй qr-код на welcome-стэндзе",
                  "Дачакайся зялёнага сігналу стрэлкі турнікета і можаш уваходзіць",
                  "Сардэчна запрашаем! Ты ў краме будучыні",
              ];

    const rules = [
        {
            titleRus: "Передумал?",
            titleEng: "Changed your mind?",
            titleBel: "Раздумаўся?",
            bodyRus: `Просто верни товар на тоже место. 
            Если положить товар не на свое место, при выходе из магазина за него спишутся деньги`,
            bodyEng: `Just return the item to the same place.
            If you put the goods in the wrong place, when you leave the store, money will be written off for it`,
            bodyBel: `Проста вярні тавар на тое ж месца.
            Калі пакласці тавар не на сваё месца, пры выхадзе з магазіна за яго спішуцца грошы`,
        },
        {
            titleRus: "Только один человек!",
            titleBel: "Only one person!",
            titleEng: "Толькі адзін чалавек!",
            bodyRus: `Если идешь с кем-то, то зайди в магазин сам, а затем запусти гостя, проскандировав для его входа  qr-код еще раз своим телефоном`,
            bodyEng: `If you go with someone, then go to the store yourself, and then launch the guest by scanning the qr code again with your phone to enter`,
            bodyBel: `Калі ідзеш з кімсьці, то зайдзі ў краму сам, а затым запусці госця, праскандзіраваўшы для яго ўваходу qr-код яшчэ раз сваім тэлефонам`,
        },
        {
            titleRus: "НЕ Ломись",
            titleEng: "DO NOT Crack",
            titleBel: "НЕ Ламіся",
            bodyRus: `Проходить через турникет необходимо по одному! Не пытайтесь пролезть друг за другом! Все действия фиксируются`,
            bodyEng: `You must go through the turnstile one at a time! Do not try to climb one after the other! All actions are recorded`,
            bodyBel: `Праходзіць праз турнікет неабходна па адным! Не спрабуйце пралезці сябар за сябрам! Усе дзеянні фіксуюцца`,
        },
        {
            titleRus: "НЕт денег на карте",
            titleEng: "No money on the card",
            titleBel: "Няма грошаў на мапе",
            bodyRus: `При входе в магазин на карте должно быть не менее 5-ти рублей, в противном случае попасть в магазин не удаться`,
            bodyEng: `At the entrance to the store, the card must have at least 5 rubles, otherwise it will not be possible to get into the store`,
            bodyBel: `Пры ўваходзе ў краму на карце павінна быць не менш за 5 рублёў, у адваротным выпадку патрапіць у краму не ўдацца.`,
        },
        {
            titleRus: "ВХОД ТОЛЬКО ЧЕРЕЗ ТУРНИКЕТ!",
            titleEng: "ENTRY ONLY THROUGH THE tourniquet!",
            titleBel: "УВАХОД ТОЛЬКІ ПРАЗ ТУРНІКЕТ!",
            bodyRus: `Любое проникновение в магазин, за исключением авторизованного входа запрещено`,
            bodyEng: `Any entry into the store other than authorized entry is prohibited.`,
            bodyBel: `Любое пранікненне ў краму, за выключэннем аўтарызаванага ўваходу забаронена`,
        },
        {
            titleRus: "ВЫХОД",
            titleEng: "Exit",
            titleBel: "ВЫХАД",
            bodyRus: `Просто прокрути турникет на выходе и открой дверь, и даже если отключится электричество, ты все равно покинешь помещение`,
            bodyEng: `Just scroll the turnstile at the exit and open the door, and even if the electricity goes out, you will still leave the premises`,
            bodyBel: `Проста пракруці турнікет на выхадзе і адчыні дзверы, і нават калі адключыцца электрычнасць, ты ўсё роўна пакінеш памяшканне`,
        },
    ];

    const showInstructions = () => {
        const block = document.querySelectorAll(".opacity-block");
        const blockStep = document.querySelectorAll(".opacity-block-step");
        let time = 0;
        let timeStep = 0;

        block.forEach((item) => {
            setTimeout(() => {
                item.style.opacity = 1;
            }, time);
            time += 300;
        });

        blockStep.forEach((item) => {
            setTimeout(() => {
                item.style.opacity = 1;
            }, timeStep);
            timeStep += 300;
        });
    };

    const sliderInit = () => {
        const swiper = new Swiper(".swiper", {
            spaceBetween: 32,
            slidesPerView: 1,
            slidesPerGroup: 1,
            breakpoints: {
                500: {
                    slidesPerGroup: 3,
                    slidesPerView: 3,
                },
            },
            modules: [Navigation, Pagination],
            navigation: {
                nextEl: ".slider-btns .slider-next-btn",
                prevEl: ".slider-btns .slider-prev-btn",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
            },
        });

        swiper.init();

        const currentSlide = document.querySelector(
            ".slider-gallery__control .current"
        );
        const pagesCount = document.querySelector(
            ".slider-gallery__control .pages"
        );
        pagesCount.innerHTML =
            innerWidth < 500
                ? swiper.el.swiper.slides.length
                : swiper.el.swiper.slides.length / 3;

        swiper.on("slideChange", (e) => {
            currentSlide.innerHTML =
                innerWidth < 500 ? e.activeIndex + 1 : e.activeIndex / 3 + 1;
        });
    };

    return (
        <main className="shop247" data-id="104" data-count="1">
            {/* <Breadcrumbs currentPage="Malanka Shop 24 / 7" />
            <h2>Malanka Shop 24 / 7</h2>
            <h5 className="mb-32">
                {language === "RU"
                    ? "Магазин без кассира - это автоматизированный магазин, который использует технологии искусственного интеллекта, компьютерного зрения и машинного обучения для обеспечения покупателям быстрой и удобной покупки без очередей и кассиров."
                    : language === "EN"
                    ? "Cashierless shop is an automated shop combining artificial intelligence, computer vision and machine-learning technologies aiming to provide fast and easy shopping with no  lines and no interaction with cashiers"
                    : "Магазін без касіра – гэта аўтаматызаваны магазін, які выкарыстоўвае тэхналогіі штучнага інтэлекту, камп'ютарнага зроку і машыннага навучання для забеспячэння пакупнікам хуткай і зручнай куплі без чэргаў і касіраў."}
            </h5>
            <div className="flex column gap-8 mb-32" direction="column" gap={8}>
                <p className="regular-text">
                    {language === "RU"
                        ? "Принцип работы магазина без кассира основан на следующих шагах:"
                        : language === "EN"
                        ? "Сashierless shop operation principles:"
                        : "Прынцып працы магазіна без касіра заснаваны на наступных кроках:"}
                </p>
                <ol>
                    {principles.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ol>
            </div>
            <div className="flex column gap-64">
                <div className="flex column">
                    <h3>
                        {language === "RU"
                            ? "Инструкция по использованию"
                            : language === "EN"
                            ? "Instructions for use"
                            : "Інструкцыя па выкарыстанні"}
                    </h3>
                    <div className="flex adaptive">
                        <div className="flex gap-16 column">
                            <div className="opacity-block dark padding">
                                <img
                                    src="/images/news/support.png"
                                    alt="shop24/7"
                                />
                                <p className="regular-text medium">
                                    {language === "RU"
                                        ? `Привет!
                                        Я первый умный магазин в стране,
                                        давай знакомиться!`
                                        : language === "EN"
                                        ? `Hi!
                                            I am the first smart store in the country,
                                            let's get acquainted!`
                                        : `Прывітанне!
                                            Я першы разумны магазін у краіне,
                                            давай знаёміцца!`}
                                </p>
                            </div>
                            <div className="opacity-block flex-end mw-50 padding">
                                <p className="regular-text medium">
                                    {language === "RU"
                                        ? `Привет!
                                        Как я могу что-нибудь купить здесь?`
                                        : language === "EN"
                                        ? `Hi!
                                            How can I buy something here?`
                                        : `Прывітанне!
                                            Як я магу што-небудзь купіць тут?`}
                                </p>
                            </div>
                            <div className="opacity-block dark padding">
                                <img
                                    src="/images/news/support.png"
                                    alt="shop24/7"
                                />
                                <p className="regular-text medium">
                                    {language === "RU" ? (
                                        <>
                                            <span>
                                                Все очень просто: бери товар и
                                                выходи!
                                            </span>
                                            Сканируй qr-код на входе с помощью
                                            мобильного приложения Malanka Shop,
                                            бери необходимый товар и просто
                                            выходи из магазина. Чек будет готов
                                            через пару минут
                                        </>
                                    ) : language === "EN" ? (
                                        <>
                                            <span>
                                                It's so easy: take the goods and
                                                go out!
                                            </span>
                                            Scan the QR code at the entrance
                                            using the Malanka Shop mobile
                                            application, take the necessary
                                            goods and just leave the store. The
                                            check will be ready in a couple of
                                            minutes
                                        </>
                                    ) : (
                                        <>
                                            <span>
                                                Усё вельмі проста: бяры тавар і
                                                выходзь!
                                            </span>
                                            Скануй qr-код на ўваходзе з
                                            дапамогай мабільнага прыкладання
                                            Malanka Shop, бяры неабходны тавар і
                                            проста выходзь з крамы. Чэк будзе
                                            гатовы праз пару хвілін
                                        </>
                                    )}
                                </p>
                            </div>
                            <h2>
                                {language === "RU"
                                    ? "И немного правил..."
                                    : language === "EN"
                                    ? "And some rules..."
                                    : "І крыху правілаў..."}
                            </h2>
                        </div>
                        <div className="flex gap-16 wrap">
                            {stepsRegistration.map((step, i) => (
                                <div
                                    className="opacity-block-step mw-2 dark"
                                    key={i}
                                >
                                    <p className="count">{i + 1}</p>
                                    <p className="regular-text medium">
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-16 wrap">
                        {rules.map((rule, i) => (
                            <div
                                className="opacity-block mw-adaptive padding dark"
                                key={i}
                            >
                                <p className="regular-text medium">
                                    <span className="upper">
                                        {language === "RU"
                                            ? rule.titleRus
                                            : language === "EN"
                                            ? rule.titleEng
                                            : rule.titleBel}
                                    </span>
                                    {language === "RU"
                                        ? rule.bodyRus
                                        : language === "EN"
                                        ? rule.bodyEng
                                        : rule.bodyBel}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex column">
                    <p className="regular-text">
                        {language === "RU"
                            ? "Для обеспечения работы магазина без кассира используется большое количество датчиков и камер, которые расположены на стеллажах, потолке и стенах. Они отслеживают движение товаров и покупателей в магазине, а также определяют какие товары были выбраны клиентом. Эта информация затем используется для автоматического списания оплаты за покупки и ведения инвентаризации товаров."
                            : language === "EN"
                            ? "A lot of sensors and cameras on the shelves, ceiling and the walls ensure proper operation of the cashierless shop. They control the goods and clients inside as well as detect which goods the client has chosen. This information is later used for automatic payment as well as for inventory."
                            : "Для забеспячэння працы магазіна без касіра выкарыстоўваецца вялікая колькасць датчыкаў і камер, якія размешчаны на стэлажах, столі і сценах. Яны адсочваюць рух тавараў і пакупнікоў у магазіне, а таксама вызначаюць, якія тавары былі выбраны кліентам. Гэта інфармацыя затым выкарыстоўваецца для аўтаматычнага спісання платы за пакупкі і вядзення інвентарызацыі тавараў."}
                    </p>
                    <p className="regular-text">
                        {language === "RU"
                            ? "Таким образом, магазин без кассира позволяет клиентам быстро и удобно совершать покупки, не тратя время на ожидание в очередях и взаимодействие с продавцами. Автоматизированная система магазина позволяет быстро обрабатывать заказы и оплаты, а также снижать расходы на содержание персонала."
                            : language === "EN"
                            ? "Thus, a cashierless shop provides clients with opportunity to do fast and easy shopping eliminating lines and having no interaction with cashiers. Automated system enables to process orders and payment quickly as well as to reduce staff costs."
                            : "Такім чынам, магазін без касіра дазваляе кліентам хутка і зручна рабіць пакупкі, не марнуючы час на чаканне ў чэргах і ўзаемадзеянне з прадаўцамі. Аўтаматызаваная сістэма магазіна дазваляе хутка апрацоўваць заказы і аплаты, а таксама зніжаць выдаткі на ўтрыманне персаналу."}
                    </p>
                </div>
                <VideoBlock
                    title={`${
                        language === "RU"
                            ? "Видеообзор"
                            : language === "EN"
                            ? "Video review"
                            : "Відэаагляд"
                    } Malanka Shop 24 / 7`}
                    video="https://www.youtube.com/embed/2j5vdIF2tDg"
                />
                <SliderGallery
                    innerWidth={innerWidth}
                    title={`${
                        language === "RU"
                            ? "Заголовок"
                            : language === "EN"
                            ? "Title"
                            : "Загаловак"
                    } Malanka Shop 24 / 7`}
                    photos={photos}
                />
            </div> */}
        </main>
    );
};
