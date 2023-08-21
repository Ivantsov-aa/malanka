import { Link, useNavigate } from "react-router-dom";
import { FlexWrap } from "../FlexWrap/FlexWrap";
import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import { useSelector } from "react-redux";
import { handlerPageData } from "../../services/handlerPageData";
import { convertLink } from "../../services/convertLink";
import { useEffect } from "react";

const regStepsRus = [
    <h5>
        Ознакомьтесь с <Link to="/">Договором публичной оферты</Link>
    </h5>,
    <h5>
        Заполните с <Link to="/">заявку для регистрации</Link> и направьте ее на
        фирменном бланке организации на адрес{" "}
        <a href="mailto:malanka@beloil.by">malanka@beloil.by</a>
    </h5>,
    <h5>
        Получите на электронную почту сообщение с реквизитами доступа в{" "}
        <Link to="/">Личный кабинет</Link>
    </h5>,
];

const regStepsEng = [
    <h5>
        Please, see <Link to="/">Public Offer Agreement</Link>
    </h5>,
    <h5>
        Fill out a <Link to="/">registration application</Link> and e-mail it to{" "}
        <a href="mailto:malanka@beloil.by">malanka@beloil.by</a> on the
        company’s letterhead
    </h5>,
    <h5>
        Then receive an-email with access details for your{" "}
        <Link to="/">Personal Account</Link>
    </h5>,
];

const regStepsBel = [
    <h5>
        Азнаёмцеся з <Link to="/">Дагаворам публічнай аферты</Link>
    </h5>,
    <h5>
        Запоўніце <Link to="/">заяўку для рэгістрацыі</Link> і накіруйце яе на
        фірменным бланку арганізацыі на адрас{" "}
        <a href="mailto:malanka@beloil.by">malanka@beloil.by</a>
    </h5>,
    <h5>
        Атрымайце на электронную пошту паведамленне з рэквізітамі доступу ў{" "}
        <Link to="/">Асабісты кабінет</Link>
    </h5>,
];

const benefitsRus = [
    "Безналичный расчет за зарядку",
    "Один учетный документ по результатам месяца",
    "Бонусная программа",
];

const benefitsEng = [
    "Bank transfer for charging",
    "One accounting document in the end of the month",
    "Bonuses",
];

const benefitsBel = [
    "Безнаяўны разлік за зарадку",
    "Адзін уліковы дакумент па выніках месяца",
    "Бонусная праграма",
];

const forWhomRus = [
    {
        title: "Руководителей",
        list: [
            "Снижение затрат на содержание автопарка (стоимость зарядки и то)",
            "Прогрессивная шкала скидок",
        ],
    },
    {
        title: "Менеджера",
        list: [
            "Доступ к статистике зарядных сессий",
            "Возможность добавлять/ исключать пользователей",
            "Контроль остатка баланса",
        ],
    },
    {
        title: "Водителей",
        list: [
            "Круглосуточная техподдержка",
            "Удобный просмотр локаций",
            "Доступ к статусу зарядных станций",
            "Бесплатная парковка на платных коммунальных парковках",
        ],
    },
];

const forWhomEng = [
    {
        title: "Executives",
        list: [
            "Reducing the cost of maintaining a fleet (the cost of charging and servicing)",
            "Progressive discount scale",
        ],
    },
    {
        title: "Managers",
        list: [
            "Access to charging sessions statistics",
            "Options to add/remove users",
            "Monitor the remaining balance",
        ],
    },
    {
        title: "Drivers",
        list: [
            "A 24-hour technical support",
            "Easy location browsing",
            "Access to charging stations status",
            "Free parking on paid communal parkings",
        ],
    },
];

const forWhomBel = [
    {
        title: "Кіраўнікоў",
        list: [
            "Зніжэнне выдаткаў на ўтрыманне аўтапарка (кошт зарадкі і ТА)",
            "Прагрэсіўная шкала зніжак",
        ],
    },
    {
        title: "Менеджара",
        list: [
            "Доступ да статыстыкі зарадных сесій",
            "Магчымасць дадаваць/выключаць карыстальнікаў",
            "Кантроль астатку балансу",
        ],
    },
    {
        title: "Кіроўцаў",
        list: [
            "Кругласутачная тэхпадтрымка",
            "Зручны прагляд лакацый",
            "Доступ да статусу зарадных станцый",
            "Бясплатная паркоўка на платных камунальных паркоўках",
        ],
    },
];

export const IndividualEntrepreneur = () => {
    const { language } = useSelector((store) => store.localLanguage);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language]);

    const loadPage = () => {
        const main = document.querySelector("main");

        handlerPageData()
            .getContent(81, 1)
            .then((result) => {
                const parser = new DOMParser();
                const page = parser
                    .parseFromString(result, "text/html")
                    .querySelector("main");
                convertLink(page.querySelectorAll("a"), navigate);
                main.innerHTML = page.innerHTML;
            });
    };

    return (
        <main className="individual" data-id="81" data-count="1">
            {/* <div className="block">
                <Breadcrumbs
                    currentPage={
                        language === "RU"
                            ? "Маланка для юридических лиц"
                            : language === "EN"
                            ? "Malanka for legal entities"
                            : "Маланка для юрыдычных асоб"
                    }
                />
                <h2>
                    {language === "RU"
                        ? "Маланка для юридических лиц"
                        : language === "EN"
                        ? "Malanka for legal entities"
                        : "Маланка для юрыдычных асоб"}
                </h2>
                <div className="ip-title">
                    <div justify="space-between" align="center">
                        <div
                            className="ip-title__text"
                            direction="column"
                            gap={16}
                        >
                            <h3>
                                {language === "RU"
                                    ? "Станьте нашим клиентом и получите доступ к личному кабинету за 15 минут"
                                    : language === "EN"
                                    ? "Become our partner and get access to your personal account in 15 minutes"
                                    : "Станьце нашым кліентам і атрымайце доступ да асабістага кабінета за 15 хвілін"}
                            </h3>
                            <p className="regular-text mb-16">
                                {language === "RU"
                                    ? `Статистика и история зарядных сессий,
                                    регистрация неограниченного количества
                                    водителей, общий баланса, расход и поступление
                                    средств, остаток денежных средств на балансе и
                                    многое другое.`
                                    : language === "EN"
                                    ? `Statistics and history of charging sessions,
                                    registration of unlimited amount of drivers,
                                    total balance, expenditures and income, cash
                                    balance and much more.`
                                    : `Статыстыка і гісторыя зарадных сесій,
                                    рэгістрацыя неабмежаванай колькасці кіроўцаў,
                                    агульны баланс, расход і паступленне сродкаў,
                                    астатак грашовых сродкаў на балансе і многае
                                    іншае.`}
                            </p>
                            <Link to="" className="btn-green-outline">
                                {language === "RU"
                                    ? "Войти в личный кабинет"
                                    : language === "EN"
                                    ? "Enter your personal account"
                                    : "Увайсці ў асабісты кабінет"}
                            </Link>
                        </div>
                        <img
                            src="/images/individual/inividual-title.png"
                            alt="malanka"
                        />
                    </div>
                </div>
                <div
                    className="individual-regSteps mt-128"
                    direction="column"
                    align="center"
                    gap={32}
                >
                    <div
                        className="individual-regSteps__title"
                        direction="column"
                        gap={8}
                    >
                        <h3>
                            {language === "RU"
                                ? "Стать партнером легко"
                                : language === "EN"
                                ? "To become a partner – easy"
                                : "Стаць партнёрам лёгка"}
                        </h3>
                        <p className="default-text">
                            {language === "RU"
                                ? `Чтобы стать пользователем программного модуля для
                                юридических лиц Маланка нужно сделать всего три
                                простых шага.`
                                : language === "EN"
                                ? `Just 3 steps to become the user of the Malanka
                                software module for legal entities.`
                                : `Каб стаць карыстальнікам праграмнага модуля для
                                юрыдычных асоб Маланка, трэба зрабіць усяго тры
                                простыя крокі.`}
                        </p>
                    </div>
                    <div
                        className="individualRegStepList"
                        justify="space-between"
                    >
                        {(language === "RU"
                            ? regStepsRus
                            : language === "EN"
                            ? regStepsEng
                            : regStepsBel
                        ).map((item, i) => (
                            <div
                                className="individualRegStepListItem"
                                direction="column"
                                align="center"
                                gap={27}
                                key={i}
                            >
                                <p className="h1">{i + 1}</p>
                                {item}
                            </div>
                        ))}
                    </div>
                    <Link to="/partner" className="btn-green">
                        {language === "RU"
                            ? "Стать клиентом"
                            : language === "EN"
                            ? "Become a partner"
                            : "Стаць кліентам"}
                    </Link>
                </div>
                <div
                    className="individual-block mt-128"
                    direction="column"
                    gap={32}
                >
                    <h3>
                        {language === "RU"
                            ? "Преимущества"
                            : language === "EN"
                            ? "Advantages"
                            : "Перавагі"}
                    </h3>
                    <div
                        className="individualRegBenefitItem"
                        justify="space-between"
                        gap={32}
                    >
                        {(language === "RU"
                            ? benefitsRus
                            : language === "EN"
                            ? benefitsEng
                            : benefitsBel
                        ).map((item, i) => (
                            <div
                                className="row"
                                align="center"
                                gap={32}
                                key={i}
                            >
                                <div className="img-wrapper"></div>
                                <h4>{item}</h4>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="individual-block mt-128"
                    direction="column"
                    gap={32}
                >
                    <h3>
                        {language === "RU"
                            ? "Для кого"
                            : language === "EN"
                            ? "To whom"
                            : "Для каго"}
                    </h3>
                    <div
                        className="individualRegBenefitItem"
                        justify="space-between"
                        gap={32}
                    >
                        {(language === "RU"
                            ? forWhomRus
                            : language === "EN"
                            ? forWhomEng
                            : forWhomBel
                        ).map((item, i) => (
                            <div
                                className="col"
                                direction="column"
                                gap={20}
                                key={i}
                            >
                                <h4>{item.title}</h4>
                                <ul>
                                    {item.list.map((item, j) => (
                                        <li
                                            className="individualForWhomItem"
                                            key={j}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="price-page__footer">
                <div className="wrapper">
                    <div>
                        <h3 className="mb-16">
                            {language === "RU"
                                ? "Остались вопросы?"
                                : language === "EN"
                                ? "Still have questions?"
                                : "Засталіся пытанні?"}
                        </h3>
                        <p className="regular-text">
                            {language === "RU"
                                ? `Напишите нам или обратитесь в службу технической
                                поддержки, мы всегда готовы помочь с любым запросом`
                                : language === "EN"
                                ? `Please, e-mail us or contact our tech support, we’re
                                always available to help you with any request`
                                : `Напішыце нам або звярніцеся ў службу тэхнічнай
                                падтрымкі, мы заўсёды гатовы дапамагчы з любым
                                запытам`}
                        </p>
                    </div>
                    <Link to="/contact-us" className="btn-green-outline">
                        {language === "RU"
                            ? "Как зарядится"
                            : language === "EN"
                            ? "How to charge"
                            : "Як зарадзіцца"}
                    </Link>
                </div>
            </div> */}
        </main>
    );
};
