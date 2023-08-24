import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import { FlexWrap } from "../FlexWrap/FlexWrap";
import { useEffect } from "react";
import { CallbackForm } from "../callback-form/callback-form";
import Swiper, { Navigation, Pagination } from "swiper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handlerPageData } from "../../services/handlerPageData";
import { convertLink } from "../../services/convertLink";
import { url } from "../admin/AuthForm/AuthForm";
import { errorMessage } from "../../services/errorMessage";

const slides = [
    "/images/adv/adv-slide.png",
    "/images/adv/adv-image.png",
    "/images/adv/adv-slide.png",
    "/images/adv/adv-slide.png",
];

export const Advertising = ({ innerWidth }) => {
    const { userInfo } = useSelector((store) => store.authAdmin);
    const { language } = useSelector((store) => store.localLanguage);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language]);

    const loadPage = () => {
        const main = document.querySelector("main");

        handlerPageData()
            .getContent(38, 1)
            .then((result) => {
                const parser = new DOMParser();
                const page = parser
                    .parseFromString(result, "text/html")
                    .querySelector("main");
                convertLink(page.querySelectorAll("a"), navigate);
                main.innerHTML = page.innerHTML;
                swiperTitleInit();
                swiperZoomInit();
                document
                    .querySelector("form")
                    .addEventListener("submit", (e) => {
                        e.preventDefault();
                        sendEmail();
                    });
            });
    };

    const swiperZoomInit = () => {
        const swiper = new Swiper(".news-page__slider", {
            slidesPerView: 1,
            slidesPerGroup: 1,
            modules: [Navigation, Pagination],
            navigation: {
                nextEl:
                    window.innerWidth <= 768
                        ? ".slider__control-panel.mobile .slider-next-btn"
                        : ".slider__control-panel.desk .slider-next-btn",
                prevEl:
                    window.innerWidth <= 768
                        ? ".slider__control-panel.mobile .slider-prev-btn"
                        : ".slider__control-panel.desk .slider-prev-btn",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
            },
        });

        swiper.init();

        document
            .querySelector(".news-page__slider")
            .addEventListener("mouseenter", () => {
                const zoomBg = document.querySelector(".zoom-bg");
                zoomBg.style.display = "none";
            });
        document
            .querySelector(".news-page__slider")
            .addEventListener("mousemove", () => {
                const zoomBg = document.querySelector(".zoom-bg");
                zoomBg.style.display = "none";
            });

        const zoomSliderImage = document.querySelectorAll(
            ".news-page__slider img"
        );

        zoomSliderImage.forEach((image) => {
            image.addEventListener("mousemove", zoomTargetImage);
            image.addEventListener("mouseleave", () => {
                const canvas = document.querySelector("#canvas");
                canvas.width = 0;
                canvas.height = 0;
            });
        });

        const currentSlide =
            window.innerWidth <= 768
                ? document.querySelector(
                      ".slider__control-panel.mobile .current"
                  )
                : document.querySelector(".slider__control-panel .current");

        const pagesCount =
            window.innerWidth <= 768
                ? document.querySelector(".slider__control-panel.mobile .pages")
                : document.querySelector(".slider__control-panel .pages");

        swiper.on("slideChange", (e) => {
            currentSlide.innerHTML = e.activeIndex + 1;
        });

        pagesCount.innerHTML = swiper.el.swiper.slides.length;
    };

    const swiperTitleInit = () => {
        const slidesPage = Array.from(
            document.querySelectorAll(".swiper-wrapper img")
        );
        const sliderPreview = document.querySelector(".slider-preview img");
        const swiper = new Swiper(".swiper", {
            slidesPerView: "auto",
            slidesPerGroup: 1,
            spaceBetween: 0,
            breakpoints: {
                500: {
                    spaceBetween: 60,
                },
            },
            modules: [Navigation, Pagination],
            navigation: {
                nextEl: ".slider-title__control-panel .slider-next-btn",
                prevEl: ".slider-title__control-panel .slider-prev-btn",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },
        });

        swiper.init();

        sliderPreview.setAttribute("src", slidesPage[swiper.activeIndex].src);

        slidesPage.forEach((slide, i) => {
            slide.addEventListener("click", () => {
                sliderPreview.setAttribute("src", slide.src);
                swiper.slideTo(i);
            });
        });

        swiper.on("slideChange", (e) => {
            sliderPreview.setAttribute("src", slidesPage[e.activeIndex].src);
        });
    };

    const zoomTargetImage = (e) => {
        const { offsetX, offsetY, screenX, screenY } = e;
        const size = window.innerHeight / 3;
        let image = e.target;
        const zoomBg = document.querySelector(".zoom-bg");
        zoomBg.style.display = "flex";

        if (image) {
            const canvas = document.querySelector("#canvas");
            canvas.style.top = `${offsetY - size}px`;
            canvas.style.left = `${offsetX - size}px`;
            if (screenX < size) {
                canvas.style.left = `${offsetX}px`;
            }

            if (screenY < size) {
                canvas.style.top = `${offsetY}px`;
            }

            canvas.style.display = "block";
            const ctx = canvas.getContext("2d");
            canvas.width = size;
            canvas.height = size;
            ctx.drawImage(
                image,
                -offsetX * 4 + size / 2,
                -offsetY * 4 + offsetY / 2 + size / 4,
                image.width * 4,
                image.height * 4
            );
        }
    };

    const sendEmail = async () => {
        const inputs = Array.from(
            document.querySelectorAll("form input[type=text]")
        ).map((item) => item);
        const comment = document.querySelector("form textarea");
        let isValid = true;

        if (!inputs[0].value) {
            errorMessage(inputs[0], "Поле обязательно для заполнения");
            isValid = false;
        }

        if (!/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}/gi.test(inputs[1].value)) {
            errorMessage(inputs[1], "E-mail введён некорректно");
            isValid = false;
        }

        if (!comment.value) {
            errorMessage(comment, "Поле обязательно для заполнения");
            isValid = false;
        }

        if (isValid) {
            const formBtn = document.querySelector("form button");
            formBtn.innerText = "";
            formBtn.insertAdjacentHTML(
                "afterbegin",
                '<img src="/images/svg/spinner.svg" alt="" />'
            );
            await fetch(`${url}/mail-contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: inputs[0].value,
                    email: inputs[1].value,
                    comment: comment.value,
                }),
            })
                .then((response) => response.json())
                .then((result) => {
                    result && document.querySelector("form").reset();
                    formBtn.innerText = "Отправлено";
                    setTimeout(() => {
                        formBtn.innerText = "Отправить";
                    }, 3000);
                });
        }
    };

    return (
        <main className="advertising pb-128" data-id="38" data-count="1">
            {/* <Breadcrumbs className="mb-32" currentPage="Рэклама" />
            <h2>Рэклама на зарадных станцыях і ў дадатку Malanka New</h2>
            <FlexWrap
                className="advertising__container pb-128"
                justify="space-between"
                direction={innerWidth < 1400 ? "column-reverse" : "row"}
                gap={32}
            >
                <FlexWrap className="slider-container" gap={64}>
                    <FlexWrap
                        justify="center"
                        align="center"
                        className="slider-preview"
                    >
                        <img src={slides[0]} alt="malanka" />
                    </FlexWrap>
                    <FlexWrap className="slider-wrap" direction="column">
                        <div className="swiper">
                            <div className="swiper-wrapper">
                                {slides.map((item, i) => (
                                    <div className="swiper-slide" key={i}>
                                        <img src={item} alt="malanka" />
                                    </div>
                                ))}
                            </div>
                            <FlexWrap
                                className="slider__control-panel"
                                justify="flex-start"
                            >
                                <div className="swiper-pagination"></div>
                                <div className="slider-btns">
                                    <button className="slider-prev-btn">
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.8"
                                                d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z"
                                                fill="#7A7A95"
                                            />
                                        </svg>
                                    </button>
                                    <button className="slider-next-btn">
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.8"
                                                d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z"
                                                fill="#7A7A95"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </FlexWrap>
                        </div>
                    </FlexWrap>
                </FlexWrap>
                <FlexWrap className="adv-title" direction="column" gap={32}>
                    <FlexWrap direction="column" gap={16}>
                        <h3>
                            Вас абавязкова заўважаць уладальнікі электрамабіляў
                            Беларусі
                        </h3>
                        <p className="regular-text">
                            Рэкламныя банеры ў мабільным дадатку найбуйнейшай
                            сеткі зарадных станцый Маланка. Экраны зарадных
                            станцый, лайтбоксы, а таксама LED-экран магазіна без
                            персаналу. Мэтавая аўдыторыя электрамабілістаў у
                            вашым распараджэнні.
                        </p>
                    </FlexWrap>
                    <FlexWrap direction="column" gap={16}>
                        <h3>Вэб-сайт Malanka і сацыяльныя сеткі</h3>
                        <p className="regular-text">
                            Партнёрскія матэрыялы і рэкламныя банеры на нашым
                            сайце, раздзеле Навіны, Telegram, Instagram Маланка.
                        </p>
                    </FlexWrap>
                    <button className="btn-green-outline">
                        Прайс-ліст спампаваць
                    </button>
                </FlexWrap>
            </FlexWrap>
            <FlexWrap
                className="advertising__screens pb-128"
                direction={innerWidth <= 1024 ? "column" : "row"}
                gap={32}
            >
                <FlexWrap className="pt-64" direction="column" gap={32}>
                    <h3>Экраны зарадных станцый</h3>
                    <p className="regular-text">
                        Ваш рэкламны банер будзе размешчаны на выбраных
                        лакацыях, кліенты зараднай сеткі і мінакі абавязкова
                        заўважаць рэкламнае паведамленне на ВК-маніторы.
                    </p>
                </FlexWrap>
                <img src="/images/adv/example.png" alt="malanka" />
                <FlexWrap direction="column" className="pt-64" gap={32}>
                    <h4>
                        А яшчэ станцыю можна абклеіць у ваш унікальны дызайн!
                    </h4>
                    <img src="/images/adv/bn-bg.png" alt="malanka" />
                </FlexWrap>
            </FlexWrap>
            <FlexWrap
                className="news-page zoom-container pb-128"
                direction="column"
            >
                <h3 className="mb-8">Суперхуткія зарадныя комплексы</h3>
                <div className="mb-16 slider__title">
                    <p>
                        Лайтбоксы, LED-экран, стэла – электрамабілі і іх
                        уладальнікі ў Вашым фокусе.
                    </p>
                    <div className="slider__control-panel">
                        <p>
                            <span className="current">1</span> /{" "}
                            <span className="pages">1</span>
                        </p>
                        <div className="slider-btns">
                            <button className="slider-prev-btn">
                                <svg
                                    width="26"
                                    height="26"
                                    viewBox="0 0 26 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.8"
                                        d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z"
                                        fill="#7A7A95"
                                    />
                                </svg>
                            </button>
                            <button className="slider-next-btn">
                                <svg
                                    width="26"
                                    height="26"
                                    viewBox="0 0 26 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.8"
                                        d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z"
                                        fill="#7A7A95"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="news-page__slider">
                    <div className="swiper-wrapper">
                        {["/images/main-1.png", "/images/main-2.png"].map(
                            (item, i) => (
                                <div className="swiper-slide zoom" key={i}>
                                    <img
                                        src={item}
                                        loading="lazy"
                                        alt="slide-cover"
                                        onMouseMove={zoomTargetImage}
                                        onMouseLeave={() => {
                                            const canvas =
                                                document.querySelector(
                                                    "#canvas"
                                                );
                                            canvas.style.display = "none";
                                        }}
                                    />
                                </div>
                            )
                        )}
                    </div>
                    <div className="swiper-pagination"></div>
                    <div className="zoom-bg">
                        <p>Наведите, чтобы рассмотреть получше</p>
                    </div>
                </div>
                <canvas id="canvas"></canvas>
            </FlexWrap>
            <FlexWrap
                className="form-pr"
                direction={innerWidth <= 1024 ? "column" : "row"}
                gap={128}
            >
                <h3 className="left">Зацікавіліся ці паўсталі пытанні?</h3>
                <CallbackForm />
            </FlexWrap> */}
        </main>
    );
};
