import { Outlet } from "react-router-dom";
import { Footer } from "../../footer";
import { Header } from "../../header";
import { AdminPagesControl } from "../AdminPagesContol/AdminPagesControl";
import {
    AdminPanelSiteContainer,
    AdminPanelSiteDisableButton,
} from "./AdminPanelSite.style";
import { AdminPagesSaveButton } from "../AdminPagesContol/AdminPagesControl.style";
import { useSelector } from "react-redux";
import { NotificationPopUp } from "../../NotificationPopUp/NotificationPopUp";
import { useState } from "react";
import { disableLinks, enableLinks } from "../../../services/disableLinks";
import { url } from "../AuthForm/AuthForm";

export const AdminPanelSite = (props) => {
    const [stateLinks, setStateLinks] = useState(false);
    const [notification, setNotification] = useState(null);
    const { userInfo } = useSelector((store) => store.authAdmin);
    const { language } = useSelector((store) => store.localLanguage);

    const changeStateLinks = () => {
        if (!stateLinks) {
            disableLinks();
            setStateLinks(true);
        } else {
            enableLinks();
            setStateLinks(false);
        }
    };

    const setPagesToServer = async () => {
        const DOM = document.querySelector("main").outerHTML;

        await fetch(`${url}/page-heading/page/form`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${userInfo.token}`,
            },
            body: new URLSearchParams({
                body: DOM,
                pageHeadingId: 103,
                originalVersionId: 104,
                language: "BEL",
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (!result.message && !result.error) {
                    setNotification({
                        icon: "/images/svg/success-icon.svg",
                        description: "Страница создана",
                    });
                } else {
                    setNotification({
                        icon: "/images/svg/error-icon.svg",
                        description: result.message ? result.message : "",
                    });
                }
            });
    };

    const updatePageToServer = async () => {
        const { id, count } = document.querySelector("main").dataset;
        let DOM = document.querySelector("main").outerHTML;
        const checkboxBtns = document.querySelector(".checkbox-btns");
        const buttonsPartner = document.querySelectorAll(
            ".integration-list__button"
        );

        const sliderCurrentPagination = document.querySelectorAll(
            "span.current"
        );

        if (sliderCurrentPagination.length) {
            sliderCurrentPagination.forEach((span) => {
                span.innerText = 1;
            })
        }

        if (buttonsPartner) {
            buttonsPartner.forEach((button, i) => {
                if (i === 0) {
                    button.classList.add("active");
                    if (+id === 95) {
                        document.querySelector(
                            ".form-block__wrapper h3"
                        ).innerText = button
                            .querySelector("h2")
                            .innerText.split(" ")
                            .reverse()
                            .join(" ");
                    } else {
                        document.querySelector(
                            ".form-block__wrapper h3"
                        ).innerText = button.querySelector("h2").innerText;
                    }
                } else {
                    button.classList.remove("active");
                }
            });
            DOM = document.querySelector("main").outerHTML;
        }

        if (checkboxBtns) {
            checkboxBtns.remove();
        }

        if (+id === 29) {
            const titleImage = document.querySelector(".title__image img");
            titleImage.style.transform = "translate(0, 0) scale(1)";
            const deleteMap = DOM.split(
                '<ymaps class="ymaps-2-1-79-map" style'
            );
            const deleteMap2 = deleteMap[1].split("</ymaps>");
            DOM = deleteMap[0] + deleteMap2.pop();
        }

        if (+id === 77) {
            const main = document.querySelector("main");
            const result = main.querySelector(".result");
            if (result) {
                result.remove();
            }
            DOM = main.outerHTML;
        }

        if (+id === 104) {
            const uploadButton = document.querySelectorAll(
                ".upload-video__button"
            );
            uploadButton.forEach((button) => {
                button.remove();
            });
        }

        await fetch(
            `${url}/page/form/${
                language === "RU"
                    ? id
                    : language === "EN"
                    ? parseInt(id) + parseInt(count)
                    : parseInt(id) + parseInt(count) + 1
            }`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${userInfo.token}`,
                },
                body: new URLSearchParams({ body: DOM }),
            }
        )
            .then((response) => response.json())
            .then((result) => {
                if (!result.message && !result.error) {
                    setNotification({
                        icon: "/images/svg/success-icon.svg",
                        description: "Изменения приняты",
                    });
                } else {
                    setNotification({
                        icon: "/images/svg/error-icon.svg",
                        description: result.message ? result.message : "",
                    });
                }
            });
    };

    return (
        <AdminPanelSiteContainer className="request">
            <Header nav={props.navBar} admin={true} />
            <Outlet />
            <AdminPagesControl {...props} />
            <AdminPagesSaveButton primary onClick={updatePageToServer}>
                Сохранить
            </AdminPagesSaveButton>
            {notification && (
                <NotificationPopUp
                    {...notification}
                    onClick={() => setNotification(null)}
                />
            )}
            {props.navBar && (
                <Footer
                    {...props.navBar}
                    footerAddLinks={props.footerAddLinks}
                    footerSocialLinks={props.footerSocialLinks}
                    admin={true}
                />
            )}
        </AdminPanelSiteContainer>
    );
};
