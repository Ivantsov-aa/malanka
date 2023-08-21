import { useState } from "react";
import { Breadcrumbs } from "../../../breadcrumbs/breadcrumbs";
import { CallbackForm } from "../../../callback-form/callback-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { handlerPageData } from "../../../../services/handlerPageData";
import { convertLink } from "../../../../services/convertLink";
import { useNavigate } from "react-router-dom";
import { url } from "../../../admin/AuthForm/AuthForm";
import { errorMessage } from "../../../../services/errorMessage";

export const Integration = () => {
    const [chosenRate, setChosenRate] = useState(0);
    const { language } = useSelector((store) => store.localLanguage);

    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language]);

    const loadPage = () => {
        const main = document.querySelector("main");

        handlerPageData()
            .getContent(46, 1)
            .then((result) => {
                const parser = new DOMParser();
                const page = parser
                    .parseFromString(result, "text/html")
                    .querySelector("main");
                convertLink(page.querySelectorAll("a"), navigate);
                main.innerHTML = page.innerHTML;
                addEvents();
            });
    };

    const addEvents = () => {
        document.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            sendEmail();
        });
        const buttons = document.querySelectorAll(".integration-list__button");
        buttons.forEach((item) => {
            item.addEventListener("click", () => {
                buttons.forEach((button) => {
                    if (button === item) {
                        const formTitle = document.querySelector(
                            ".form-block__wrapper h3"
                        );
                        const title = button.querySelector("h2").innerText;
                        formTitle.innerText = title;
                        button.classList.add("active");
                    } else {
                        button.classList.remove("active");
                    }
                });
            });
        });
    };

    const rates = [
        {
            title: "Basic",
            list:
                language === "RU"
                    ? [
                          "Отображение зарядной станции в мобильном приложении Malanka",
                          "Обеспечение взимания платы за услуги по зарядке электромобилей",
                          "Самостоятельное управление тарификацией на зарядной станции.",
                      ]
                    : language === "EN"
                    ? [
                          "Display of the charging station in the MALANKA mobile app",
                          "Ensuring payment for electric car charging",
                          "Independent pricing management at charging stations.",
                      ]
                    : [
                          "Адлюстраванне зараднай станцыі ў мабільным дадатку Malanka",
                          "Забеспячэнне збірання платы за паслугі па зарадцы электрамабіляў",
                          "Самастойнае кіраванне тарыфікацыяй на зараднай станцыі.",
                      ],
        },
        {
            title: "Comfort",
            list:
                language === "RU"
                    ? [
                          "Отображение зарядной станции в мобильном приложении Malanka",
                          "Обеспечение взимания платы за услуги по зарядке электромобилей",
                          "Самостоятельное управление тарификацией на зарядной станции",
                      ]
                    : language === "EN"
                    ? [
                          "Display of the charging station in the MALANKA mobile app",
                          "Ensuring payment for electric car charging",
                          "Independent pricing management at charging stations.",
                      ]
                    : [
                          "Адлюстраванне зараднай станцыі ў мабільным дадатку Malanka",
                          "Забеспячэнне збірання платы за паслугі па зарадцы электрамабіляў",
                          "Самастойнае кіраванне тарыфікацыяй на зараднай станцыі.",
                      ],
            benefits:
                language === "RU"
                    ? ["Техподдержка 24/7"]
                    : language === "EN"
                    ? ["A 24-hour technical support"]
                    : ["Тэхпадтрымка 24/7"],
        },
        {
            title: "Maximum",
            list:
                language === "RU"
                    ? [
                          "Отображение зарядной станции в мобильном приложении Malanka",
                          "Обеспечение взимания платы за услуги по зарядке электромобилей",
                          "Самостоятельное управление тарификацией на зарядной станции.",
                      ]
                    : language === "EN"
                    ? [
                          "Display of the charging station in the MALANKA mobile app",
                          "Ensuring payment for electric car charging",
                          "Independent pricing management at charging stations.",
                      ]
                    : [
                          "Адлюстраванне зараднай станцыі ў мабільным дадатку Malanka",
                          "Забеспячэнне збірання платы за паслугі па зарадцы электрамабіляў",
                          "Самастойнае кіраванне тарыфікацыяй на зараднай станцыі.",
                      ],
            benefits:
                language === "RU"
                    ? [
                          "Техподдержка 24/7",
                          "Регламентное техобслуживание зарядных станций и текущий ремонт",
                      ]
                    : language === "EN"
                    ? [
                          "A 24-hour technical support",
                          "Routine and running maintenance of charging stations",
                      ]
                    : [
                          "Тэхпадтрымка 24/7",
                          "Рэгламентнае тэхабслугоўванне зарадных станцый і бягучы рамонт",
                      ],
        },
    ];

    const formFields = [
        {
            name: "organization",
            type: "text",
            placeholder:
                language === "RU"
                    ? "Наименование организации *"
                    : language === "EN"
                    ? "Company’s name *"
                    : "Найменне арганізацыі *",
        },
        {
            name: "unp",
            type: "number",
            placeholder:
                language === "RU"
                    ? "УНП *"
                    : language === "EN"
                    ? "TRN *"
                    : "УНП *",
        },
        {
            name: "contact",
            type: "text",
            placeholder:
                language === "RU"
                    ? "Контактное лицо *"
                    : language === "EN"
                    ? "Contact person *"
                    : "Кантактная асоба *",
        },
        {
            name: "phoneNumber",
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
        {
            name: "stationType",
            type: "text",
            placeholder:
                language === "RU"
                    ? "Модель и тип станции *"
                    : language === "EN"
                    ? "Station model and type *"
                    : "Мадэль і тып станцый *",
        },
    ];

    const sendEmail = async () => {
        const requestMail = {};
        const inputs = Array.from(document.querySelectorAll("form input"))
            .filter((item) => item.type !== "checkbox")
            .map((item) => {
                return {
                    [item.name]: item.value,
                };
            });
        const comment = document.querySelector("form textarea");
        for (let i in inputs) {
            requestMail[Object.keys(inputs[i])] = Object.values(inputs[i])[0];
        }
        const tariff = document.querySelector(
            ".form-block__wrapper h3"
        ).innerText;
        let isValid = true;

        Array.from(document.querySelectorAll("form input"))
            .filter((item) => item.type !== "checkbox")
            .forEach((input) => {
                if (
                    input.getAttribute("type") !== "tel" &&
                    input.getAttribute("type") !== "email" &&
                    !input.value
                ) {
                    errorMessage(input, "Поле обязательно для заполнения");
                    isValid = false;
                }

                if (
                    input.getAttribute("type") === "tel" &&
                    !/((8|\+374|\+994|\+995|\+375|\+7|\+380|\+38|\+996|\+998|\+993)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?/.test(
                        input.value
                    )
                ) {
                    errorMessage(input, "Номер введён некорректно");
                    isValid = false;
                }

                if (
                    input.getAttribute("type") === "email" &&
                    !/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}/gi.test(input.value)
                ) {
                    errorMessage(input, "E-mail введён некорректно");
                    isValid = false;
                }
            });

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
                    tariff: tariff,
                    ...requestMail,
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
        <main className="integration" data-id="46" data-count="1">
            {/* <Breadcrumbs
                currentPage={
                    language === "RU"
                        ? "Интеграция зарядных станций в сеть Malanka"
                        : language === "EN"
                        ? "Integration of charging stations in Malanka network"
                        : "Інтэграцыя зарадных станцый у сетку Malanka"
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
            <h2>
                {language === "RU"
                    ? "Интеграция зарядных станций в сеть Malanka"
                    : language === "EN"
                    ? "Integration of charging stations in Malanka network"
                    : "Інтэграцыя зарадных станцый у сетку Malanka"}
            </h2>
            <div
                className="integration-list mb-64"
                justify="space-between"
                gap={16}
            >
                {rates.map((rate, i) => (
                    <div className="integration-list__button" key={i}>
                        <div className="integration__col">
                            <h3>
                                {language === "RU"
                                    ? "Тариф "
                                    : language === "EN"
                                    ? "Tariff "
                                    : "Тарыф "}
                                <span>{rate.title}</span>
                            </h3>
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
                                <ul>
                                    {rate.benefits &&
                                        rate.benefits.map((benefit, i) => (
                                            <li
                                                className="integration-list__item-benefit regular-text"
                                                key={i}
                                            >
                                                {benefit}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="integration__col">
                <h3>
                    {language === "RU"
                        ? "Заполните форму обратной связи"
                        : language === "EN"
                        ? "Please, fill in the feedback form"
                        : "Запоўніце форму зваротнай сувязі"}
                </h3>
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
                        <h4>
                            {language === "RU"
                                ? "Тариф "
                                : language === "EN"
                                ? "Tariff "
                                : "Тарыф "}
                            {rates[chosenRate].title}
                        </h4>
                        <CallbackForm formFields={formFields} />
                    </div>
                </div>
            </div> */}
        </main>
    );
};
