import { useEffect, useState } from "react";
import { FlexWrap } from "../../../FlexWrap/FlexWrap";
import { Breadcrumbs } from "../../../breadcrumbs/breadcrumbs";
import {
    IntegrationContainer,
    IntegrationList,
    IntegrationListItem,
    IntegrationListItemBenefit,
    IntegrationRateButton,
} from "../Intergation/Integration.style";
import { CallbackForm } from "../../../callback-form/callback-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handlerPageData } from "../../../../services/handlerPageData";
import { convertLink } from "../../../../services/convertLink";
import { url } from "../../../admin/AuthForm/AuthForm";
import {errorMessage} from "../../../../services/errorMessage";

export const Consalting = () => {
    const [chosenRate, setChosenRate] = useState(0);
    const { language } = useSelector((store) => store.localLanguage);
    const { userInfo } = useSelector((store) => store.authAdmin);

    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language]);

    const loadPage = () => {
        const main = document.querySelector("main");

        handlerPageData()
            .getContent(50, 1)
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
                buttons.forEach((button, i) => {
                    if (button === item) {
                        const checkboxes =
                            document.querySelector(".checkbox-btns");
                        const textarea =
                            document.querySelector("form textarea");

                        const formTitle = document.querySelector(
                            ".form-block__wrapper h3"
                        );
                        const title = button
                            .querySelector("h2")
                            .innerText.split(" ")
                            .reverse()
                            .join(" ");
                        formTitle.innerText = title;
                        button.classList.add("active");

                        if (i === 0) {
                            if (checkboxes) {
                                checkboxes.remove();
                            }
                        }

                        if (i === 1) {
                            if (checkboxes) {
                                checkboxes.remove();
                            }

                            const inputs = formCheckbox
                                .slice(0, formCheckbox.length - 2)
                                .map(
                                    (item) =>
                                        `<input id=${item.name} type='checkbox' name=${item.name} value="${item.value}" />
                                    <label for=${item.name}>
                                        ${item.value}
                                    </label>`
                                );
                            const template = `<div class='checkbox-btns'>
                                ${inputs.join("")}
                            </div >`;
                            textarea.insertAdjacentHTML("afterend", template);
                        }

                        if (i === 2) {
                            if (checkboxes) {
                                checkboxes.remove();
                            }

                            const inputs = formCheckbox.map(
                                (item) =>
                                    `<input id=${item.name} type='checkbox' name=${item.name} value=${item.value} />
                                    <label for=${item.name}>
                                        ${item.value}
                                    </label>`
                            );
                            const template = `<div class='checkbox-btns'>
                                ${inputs.join("")}
                            </div >`;
                            textarea.insertAdjacentHTML("afterend", template);
                        }
                    } else {
                        button.classList.remove("active");
                    }
                });
            });
        });
    };

    const rates = [
        {
            title: "S",
            list:
                language === "RU"
                    ? [
                          "Анализ локации и выбор наиболее перспективных вариантов",
                          "Оценка оптимального типа станций и их количества",
                          "Технико-экономическое обоснование",
                      ]
                    : language === "EN"
                    ? [
                          "Location analysis and monitoring of the most promising alternatives",
                          "Finding the optimal type and number of stations",
                          "Feasibility studies",
                      ]
                    : [
                          "Аналіз лакацыі і выбар найбольш перспектыўных варыянтаў",
                          "Ацэнка аптымальнага тыпу станцый і іх колькасці",
                          "Тэхніка-эканамічнае абгрунтаванне",
                      ],
        },
        {
            title: "M",
            list:
                language === "RU"
                    ? [
                          "Анализ локации и выбор наиболее перспективных вариантов",
                          "Оценка оптимального типа станций и их количества",
                          "Технико-экономическое обоснование",
                      ]
                    : language === "EN"
                    ? [
                          "Location analysis and monitoring of the most promising alternatives",
                          "Finding the optimal type and number of stations",
                          "Feasibility studies",
                      ]
                    : [
                          "Аналіз лакацыі і выбар найбольш перспектыўных варыянтаў",
                          "Ацэнка аптымальнага тыпу станцый і іх колькасці",
                          "Тэхніка-эканамічнае абгрунтаванне",
                      ],
            benefits:
                language === "RU"
                    ? [
                          "ТЗ на закупку зарядных станций, ПИР; СМР, программное обеспечение, техобслуживание",
                      ]
                    : language === "EN"
                    ? [
                          "Technical specification for the purchase of charging stations, design and survey work, building and construction work, software, servicing",
                      ]
                    : [
                          "ТЗ на закупку зарадных станцый, ПВР; БМР, праграмнае забеспячэнне, тэхабслугоўванне",
                      ],
        },
        {
            title: "L",
            list:
                language === "RU"
                    ? [
                          "Анализ локации и выбор наиболее перспективных вариантов",
                          "Оценка оптимального типа станций и их количества",
                          "Технико-экономическое обоснование",
                      ]
                    : language === "EN"
                    ? [
                          "Location analysis and monitoring of the most promising alternatives",
                          "Finding the optimal type and number of stations",
                          "Feasibility studies",
                      ]
                    : [
                          "Аналіз лакацыі і выбар найбольш перспектыўных варыянтаў",
                          "Ацэнка аптымальнага тыпу станцый і іх колькасці",
                          "Тэхніка-эканамічнае абгрунтаванне",
                      ],
            benefits:
                language === "RU"
                    ? [
                          "ТЗ на закупку зарядных станций, ПИР; СМР, программное обеспечение, техобслуживание",
                          "Проектирование и установка ЭЗС",
                      ]
                    : language === "EN"
                    ? [
                          "Technical specification for the purchase of charging stations, design and survey work, building and construction work, software, servicing",
                          "Design and installation of ECS",
                      ]
                    : [
                          "ТЗ на закупку зарадных станцый, ПВР; БМР, праграмнае забеспячэнне, тэхабслугоўванне",
                          "Праектаванне і ўсталяванне ЭЗС",
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
            name: "name",
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
    ];

    const formCheckbox = [
        {
            name: "tz_ezs",
            value:
                language === "RU"
                    ? "ТЗ на ЭЗC"
                    : language === "EN"
                    ? "Technical specification for ECS"
                    : "ТЗ на ЭЗС",
        },
        {
            name: "tz_smr",
            value:
                language === "RU"
                    ? "ТЗ на  СМР"
                    : language === "EN"
                    ? "Technical specification for building and construction work"
                    : "ТЗ на БМР",
        },
        {
            name: "tz_po",
            value:
                language === "RU"
                    ? "ТЗ на  ПО"
                    : language === "EN"
                    ? "Technical specification for software"
                    : "ТЗ на ПЗ",
        },
        {
            name: "tz_to",
            value:
                language === "RU"
                    ? "ТЗ на  ТО"
                    : language === "EN"
                    ? "Technical specification for servicing"
                    : "ТЗ на ТА",
        },
        {
            name: "tz_pir",
            value:
                language === "RU"
                    ? "ТЗ на ПИР"
                    : language === "EN"
                    ? "Technical specification for design and survey work"
                    : "ТЗ на ПВР",
        },
        {
            name: "design",
            value:
                language === "RU"
                    ? "Проектирование"
                    : language === "EN"
                    ? "Design"
                    : "Праектаванне",
        },
        {
            name: "ezs_install",
            value:
                language === "RU"
                    ? "Установка ЭЗС"
                    : language === "EN"
                    ? "Installation of ESC"
                    : "Усталяванне ЭЗС",
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
        const listValue = Array.from(
            document.querySelectorAll("form input[type=checkbox]")
        )
            .filter((item) => item.checked)
            .map((item) => item.value)
            .slice(0, -1);
        const comment = document.querySelector("form textarea");
        for (let i in inputs) {
            requestMail[Object.keys(inputs[i])] = Object.values(inputs[i])[0];
        }
        const tariff = document.querySelector(
            ".form-block__wrapper h3"
        ).innerText;
        let isValid = true;
        const checkboxBtns = document.querySelector('.checkbox-btns');

        if (checkboxBtns && listValue.length === 0) {
            errorMessage(checkboxBtns, 'Требуется выбрать минимум 1 опцию');
            isValid = false;
        }

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
                    listValue: listValue.join(", "),
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
        <main className="integration" data-id="50" data-count="1">
            {/* <Breadcrumbs
                currentPage={
                    language === "RU"
                        ? "Консалтинг по зарядной инфраструктуре"
                        : language === "EN"
                        ? "Information on charging infrastructure"
                        : "Кансалтынг па зараднай інфраструктуры"
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
                    ? "Консалтинг по зарядной инфраструктуре"
                    : language === "EN"
                    ? "Information on charging infrastructure"
                    : "Кансалтынг па зараднай інфраструктуры"}
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
                                <span>{rate.title}</span>
                                {language === "RU"
                                    ? " Тариф"
                                    : language === "EN"
                                    ? " Tariff"
                                    : " Тарыф"}
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
                        <CallbackForm
                            formFields={formFields}
                            formCheckbox={
                                chosenRate !== 0 &&
                                (chosenRate === 1
                                    ? formCheckbox.slice(
                                          0,
                                          formCheckbox.length - 2
                                      )
                                    : formCheckbox)
                            }
                        />
                    </div>
                </div>
            </div> */}
        </main>
    );
};
