import { useState } from "react";
import { Breadcrumbs } from "../../../breadcrumbs/breadcrumbs";
import { CallbackForm } from "../../../callback-form/callback-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handlerPageData } from "../../../../services/handlerPageData";
import { useEffect } from "react";
import { convertLink } from "../../../../services/convertLink";
import { url } from "../../../admin/AuthForm/AuthForm";
import { errorMessage } from "../../../../services/errorMessage";

export const WhiteLabel = () => {
    const [chosenRate, setChosenRate] = useState(0);
    const { language } = useSelector((store) => store.localLanguage);

    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language]);

    const loadPage = () => {
        const main = document.querySelector("main");

        handlerPageData()
            .getContent(54, 1)
            .then((result) => {
                const parser = new DOMParser();
                const page = parser
                    .parseFromString(result, "text/html")
                    .querySelector("main");
                convertLink(page.querySelectorAll("a"), navigate);
                main.innerHTML = page.innerHTML;
                document
                    .querySelector("form")
                    .addEventListener("submit", (e) => {
                        e.preventDefault();
                        sendEmail();
                    });
            });
    };

    const rates = [
        {
            title:
                language === "RU"
                    ? "Консалтинг"
                    : language === "EN"
                    ? "Consulting"
                    : "Кансалтынг",
            list:
                language === "RU"
                    ? [
                          "Опыт логистического обеспечения АЗС с 2006 года",
                          "Опыт реализации крупных проектов в сфере ВИЭ",
                          "Опыт эксплуатации СНЭЭ в составе супербыстрых зарядных комплексов",
                          "Уникальная модель размещения зарядных комплексов и станций",
                          "Опыт сотрудничества с международными организациями",
                      ]
                    : language === "EN"
                    ? [
                          "Experience in gas stations logistics since 2006",
                          "Experience in implementation of projects in the sphere of Renewable energy ",
                          "Experience in operation with Electric Energy Storage Systems in ultra-fast charging complexes ",
                          "A unique model of charging complexes and stations location ",
                          "Experience in cooperation with international organizations ",
                      ]
                    : [
                          "Вопыт лагістычнага забеспячэння АЗС з 2006 года ",
                          "Вопыт рэалізацыі буйных праектаў у сферы АКЭ ",
                          "Вопыт эксплуатацыі СНЭЭ ў складзе суперхуткіх зарадных комплексаў ",
                          "Унікальная мадэль размяшчэння зарадных комплексаў і станцый ",
                          "Вопыт супрацоўніцтва з міжнароднымі арганізацыямі ",
                      ],
        },
        {
            title:
                language === "RU"
                    ? "Техкомпетенции"
                    : language === "EN"
                    ? "Technical competencies"
                    : "Тэхкампетэнцыі",
            list:
                language === "RU"
                    ? [
                          "Более 9 лет опыта эксплуатации крупнейшей в СНГ зарядной сети",
                          "Глубокая интеграция зарядных станций и ПО",
                          "Использование ТЗ, соответствующих практике эксплуатации ЭЗС",
                          "Постоянное взаимодействие с производителями оборудования",
                          "Полное сопровождение: от проектирования до эксплуатации",
                      ]
                    : language === "EN"
                    ? [
                          "More than 9 years of experience in operation with the largest charging station in CIS ",
                          "Deep integration of charging stations and software ",
                          "Use of technical specifications relevant with ECS operational practice",
                          "Ongoing interaction with equipment manufacturers",
                          "Full support: from design to operational stage ",
                      ]
                    : [
                          "Больш за 9 гадоў вопыту эксплуатацыі найбуйнейшай у СНД зараднай сеткі ",
                          "Глыбокая інтэграцыя зарадных станцый і ПЗ ",
                          "Выкарыстанне ТЗ, адпаведных практыцы эксплуатацыі ЭЗС ",
                          "Пастаяннае ўзаемадзеянне з вытворцамі абсталявання ",
                          "Поўнае суправаджэнне: ад праектавання да эксплуатацыі",
                      ],
        },
        {
            title:
                language === "RU"
                    ? "ПО"
                    : language === "EN"
                    ? "Software"
                    : "ПЗ",
            list:
                language === "RU"
                    ? [
                          "Программное обеспечение собственной разработки",
                          "Уникальный UX мобильного приложения",
                          "Бэкенд для глубокого мониторинга состояния инфраструктуры",
                          "Fleet-платформа, модуль субпартнеров и юридических лиц",
                          "Гибкая адаптация модулей под потребности пользователей",
                      ]
                    : language === "EN"
                    ? [
                          "Self-developed software",
                          "Unique UX of the mobile app",
                          "Back-end for the purposes of extensive infrastructure monitoring",
                          "Fleet-platform, a module for sub-partners and legal entities",
                          "Flexible modules tailored to users’ needs",
                      ]
                    : [
                          "Праграмнае забеспячэнне ўласнай распрацоўкі",
                          "Унікальны UX мабільнага дадатка",
                          "Бэкэнд для глыбокага маніторынгу стану інфраструктуры",
                          "Fleet-платформа, модуль субпартнёраў і юрыдычных асоб",
                          "Гнуткая адаптацыя модуляў пад патрэбы карыстальнікаў",
                      ],
        },
        {
            title:
                language === "RU"
                    ? "Законодательство"
                    : language === "EN"
                    ? "Legislation"
                    : "Заканадаўства",
            list:
                language === "RU"
                    ? [
                          "Указ Президента Республики Беларусь №92 (три редакции)",
                          "Программа создания государственной зарядной сети",
                          "Комплексная программа развития электротранспорта на 2021-2025 годы",
                          "Методические рекомендации по размещению зарядных станций",
                          "Банк низкоуглеродных и цифровых технологий ЕАЭС",
                      ]
                    : language === "EN"
                    ? [
                          "Decree of the President of the Republic of Belarus №92 (three versions)",
                          "State charging network programme",
                          "A comprehensive programme for electric vehicle development for the period of 2021-2025",
                          "Guidelines for charging stations location ",
                          "Bank of low-carbon and digital technologies of EAEU",
                      ]
                    : [
                          "Указ Прэзідэнта Рэспублікі Беларусь №92(тры рэдакцыі)",
                          "Праграма стварэння дзяржаўнай зараднай сеткі",
                          "Комплексная праграма развіцця электратранспарту на 2021–2025 гады",
                          "Метадычныя рэкамендацыі па размяшчэнні зарадных станцый",
                          "Банк нізкавугляродных і лічбавых тэхналогій ЕАЭС",
                      ],
        },
    ];

    const formFields = [
        {
            name: "name_company",
            type: "text",
            placeholder:
                language === "RU"
                    ? "Наименование организации *"
                    : language === "EN"
                    ? "Company’s name *"
                    : "Найменне арганізацыі *",
        },
        {
            name: "prn",
            type: "number",
            placeholder:
                language === "RU"
                    ? "УНП *"
                    : language === "EN"
                    ? "TRN *"
                    : "УНП *",
        },
        {
            name: "contact_name",
            type: "text",
            placeholder:
                language === "RU"
                    ? "Контактное лицо *"
                    : language === "EN"
                    ? "Contact person *"
                    : "Кантактная асоба *",
        },
        {
            name: "phone_number",
            type: "tel",
            placeholder:
                language === "RU"
                    ? "Телефон *"
                    : language === "EN"
                    ? "Telephone number *"
                    : "Тэлефон *",
        },
        {
            name: "email",
            type: "email",
            placeholder:
                language === "RU"
                    ? "Электронная почта *"
                    : language === "EN"
                    ? "E-mail *"
                    : "Электронная пошта *",
        },
    ];

    const formSelect = [
        {
            name:
                language === "RU"
                    ? "Регион развития *"
                    : language === "EN"
                    ? "Network region *"
                    : "Рэгіён развіцця сеткі *",
            value:
                language === "RU"
                    ? "Регион развития *"
                    : language === "EN"
                    ? "Network region *"
                    : "Рэгіён развіцця сеткі *",
        },
        {
            name:
                language === "RU"
                    ? "Регион развития *"
                    : language === "EN"
                    ? "Network region *"
                    : "Рэгіён развіцця сеткі *",
            value:
                language === "RU"
                    ? "Регион развития *"
                    : language === "EN"
                    ? "Network region *"
                    : "Рэгіён развіцця сеткі *",
        },
        {
            name:
                language === "RU"
                    ? "Регион развития *"
                    : language === "EN"
                    ? "Network region *"
                    : "Рэгіён развіцця сеткі *",
            value:
                language === "RU"
                    ? "Регион развития *"
                    : language === "EN"
                    ? "Network region *"
                    : "Рэгіён развіцця сеткі *",
        },
    ];

    const formRadioBtns = [
        {
            id: "less_50",
            name: "quantity",
            value:
                language === "RU"
                    ? "50 и менее"
                    : language === "EN"
                    ? "50 and less"
                    : "50 і менш",
        },
        {
            id: "51_100",
            name: "quantity",
            value: "51-100",
        },
        {
            id: "101_200",
            name: "quantity",
            value: "101-200",
        },
        {
            id: "201_500",
            name: "quantity",
            value: "201-500",
        },
        {
            id: "more_500",
            name: "quantity",
            value:
                language === "RU"
                    ? "Больше 500"
                    : language === "EN"
                    ? "More than 500"
                    : "Больш за 500",
        },
    ];

    const sendEmail = async () => {
        const requestMail = {};
        const inputs = Array.from(document.querySelectorAll("form input"))
            .filter((item) => item.type !== "checkbox")
            .map((item) => {
                if (item.type !== "radio") {
                    return {
                        [item.name]: item.value,
                    };
                } else {
                    if (item.checked) {
                        return {
                            [item.name]: item.value,
                        };
                    }
                }
            });
        const listValue = Array.from(
            document.querySelectorAll("form input[type=checkbox]")
        )
            .filter((item) => item.checked)
            .map((item) => item.value)
            .slice(0, -1);
        const comment = document.querySelector("form textarea");
        for (let i in inputs) {
            if (inputs[i]) {
                requestMail[Object.keys(inputs[i])] = Object.values(
                    inputs[i]
                )[0];
            }
        }

        let isValid = true;
        const checkboxBtns = document.querySelector(".checkbox-btns");

        if (checkboxBtns && listValue.length === 0) {
            errorMessage(checkboxBtns, "Должна быть выбрана минимум 1 опция");
            isValid = false;
        }

        Array.from(document.querySelectorAll("form input"))
            .filter((item) => item.type !== "checkbox")
            .forEach((input) => {
                if (
                    input.type !== "tel" &&
                    input.type !== "email" &&
                    !input.value
                ) {
                    errorMessage(input, "Поле обязательно для заполнения");
                    isValid = false;
                }

                if (
                    input.type === "tel" &&
                    !/((8|\+374|\+994|\+995|\+375|\+7|\+380|\+38|\+996|\+998|\+993)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?/.test(
                        input.value
                    )
                ) {
                    errorMessage(input, "Номер введён некорректно");
                    isValid = false;
                }

                if (
                    input.type === "email" &&
                    !/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}/gi.test(input.value)
                ) {
                    errorMessage(input, "E-mail введён некорректно");
                    isValid = false;
                }
            });

        if (!requestMail.listValue) {
            const radioBtns = document.querySelector('.radio-btns__wrapper');
            errorMessage(radioBtns, "Необходимо выбрать количество");
            isValid = false;
        }

        if (!comment.value) {
            errorMessage(comment, "Поле обязательно для заполнения");
            isValid = false;
        }

        if (isValid) {
            const formBtn = document.querySelector('form button');
            formBtn.innerText = '';
            formBtn.insertAdjacentHTML('afterbegin', '<img src="/images/svg/spinner.svg" alt="" />');
            await fetch(`${url}/mail-contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tariff: "White Label",
                    ...requestMail,
                    listValuesTitle: "шт.",
                    comment: comment.value,
                }),
            })
                .then((response) => response.json())
                .then((result) => {
                    result && document.querySelector("form").reset();
                    formBtn.innerText = 'Отправлено';
                    setTimeout(() => {
                        formBtn.innerText = 'Отправить';
                    }, 3000);
                });
        }
    };

    return (
        <main className="white-label" data-id="54" data-count="1">
            {/* <Breadcrumbs
                currentPage={
                    language === "RU"
                        ? "White Label – создание сети зарядных станций «под ключ»"
                        : language === "EN"
                        ? "White Label – setting up an electric car charging network on a «turnkey» basis"
                        : "White Label – стварэнне сеткі зарадных станцый «пад ключ»"
                }
                link={{
                    name:
                        language === "RU"
                            ? "Стать партнером"
                            : language === "EN"
                            ? "Become a partner"
                            : "Стаць партнёрам",
                    path: "./partner",
                }}
            />
            <div className="wl-title">
                <h2 className="mb-8">
                    {language === "RU"
                        ? "White Label – создание сети зарядных станций «под ключ»"
                        : language === "EN"
                        ? "White Label – setting up an electric car charging network on a «turnkey» basis"
                        : "White Label – стварэнне сеткі зарадных станцый «пад ключ»"}
                </h2>
                <p className="mb-4">
                    {language === "RU"
                        ? "Электромобили – это уже не просто тренд, а объективная реальность. А собственная зарядная сеть – не просто «зеленый» маркетинг, а коммерчески выгодный проект"
                        : language === "EN"
                        ? "Electric cars – it’s not just a trend now, but objective reality. Your own charging network – it’s not just «green» marketing, but a profitable commercial project."
                        : "Электрамабілі – гэта ўжо не проста трэнд, а аб'ектыўная рэальнасць. А ўласная зарадная сетка – не проста «зялёны» маркетынг, а камерцыйна выгадны праект"}
                </p>
                <p>
                    {language === "RU"
                        ? "Команда Malanka прошла долгий путь, принимая участие в разработке и внедрении правил функционирования электромобильного рынка в нашей стране, теперь мы готовы помочь Вам!"
                        : language === "EN"
                        ? "Malanka team has come a long way taking part in developing and introducing rules for EV market in our country and now we are ready to help you!"
                        : "Каманда Malanka прайшла доўгі шлях, прымаючы ўдзел у распрацоўцы і ўкараненні правілаў функцыянавання электрамабільнага рынку ў нашай краіне, зараз мы гатовы дапамагчы Вам!"}
                </p>
            </div>
            <ul className="white-label-list">
                {rates.map((rate, i) => (
                    <li
                        className="white-label-list__item"
                        direction="column"
                        gap={32}
                        key={i}
                    >
                        <div>
                            <h6 className="mb-8">0{i + 1}</h6>
                            <h4>{rate.title}</h4>
                        </div>
                        <div className="integration__col gap-8">
                            <ul>
                                {rate.list.map((item, i) => (
                                    <li
                                        className="integration-list__item regular-text"
                                        key={i}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="integration__col mt-128">
                <div
                    className="form-block__wrapper"
                    justify="space-between"
                    gap={64}
                >
                    <img
                        className="form-cover"
                        src="/images/main-2.png"
                        alt="malanka"
                    />
                    <div className="integration__col">
                        <div className="integration__col gap-8">
                            <h4>
                                {language === "RU"
                                    ? "Заполните форму обратной связи"
                                    : language === "EN"
                                    ? "Please, fill in the feedback form"
                                    : "Запоўніце форму зваротнай сувязі"}
                            </h4>
                            <p className="regular-text">
                                {language === "RU"
                                    ? "Мы свяжемся с Вами и ответим на все возможные вопросы"
                                    : language === "EN"
                                    ? "We will contact you and answer all the questions you have"
                                    : "Мы звяжамся з Вамі і адкажам на ўсе магчымыя пытанні"}
                            </p>
                        </div>
                        <CallbackForm
                            formFields={formFields}
                            formSelect={formSelect}
                            formRadioBtns={formRadioBtns}
                        />
                    </div>
                </div>
            </div> */}
        </main>
    );
};
