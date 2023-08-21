import { AdminNewsStyled, DeletePopUpStyled } from "./AdminNews.style";
import { NewsContent } from "../../news/news-content";
import { newsArray } from "../../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { url } from "../AuthForm/AuthForm";
import { NotificationPopUp } from "../../NotificationPopUp/NotificationPopUp";
import { useRef } from "react";

export const AdminNews = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [openPopUp, setOpenPopUp] = useState(null);
    const { language } = useSelector((store) => store.localLanguage);
    const { userInfo } = useSelector((store) => store.authAdmin);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        await fetch(
            `${url}/article?language=${
                language === "RU" ? "RUS" : language === "EN" ? "ENG" : "BEL"
            }&page=${currentPage}`
        )
            .then((response) => response.json())
            .then((result) => {
                setNews(result);
            });
    };

    const deleteArticle = async () => {
        await fetch(`${url}/article/${openPopUp}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
            .then((response) => response.json())
            .then((result) => {
                if (!result.message) {
                    setError({
                        icon: "/images/svg/success-icon.svg",
                        description: "Новость успешно удалена",
                    });
                } else {
                    setError({
                        icon: "/images/svg/error-icon.svg",
                        description: "Что-то пошло не так...",
                    });
                }
                
                handleOpenPopUp(null);
            });
    };

    const handleOpenPopUp = (id) => {
        setOpenPopUp(id);
    };

    return (
        <AdminNewsStyled className={openPopUp ? "disabled-bg" : ""}>
            <NewsContent
                {...props}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                news={news}
                setNews={setNews}
                onDeleteArticle={handleOpenPopUp}
            />
            {error && (
                <NotificationPopUp {...error} onClick={() => setError(null)} />
            )}
            {openPopUp && (
                <DeletePopUp
                    deleteArticle={deleteArticle}
                    handleOpenPopUp={handleOpenPopUp}
                />
            )}
        </AdminNewsStyled>
    );
};

export const DeletePopUp = ({ handleOpenPopUp, deleteArticle }) => {
    const popUpRef = useRef();

    useEffect(() => {
        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (e) => {
        if (popUpRef && !popUpRef.current.contains(e.target)) {
            handleOpenPopUp(null);
        }
    };

    return (
        <DeletePopUpStyled ref={popUpRef}>
            <h2>Вы уверены, что хотите удалить новость?</h2>
            <div>
                <button
                    className="btn-green-outline"
                    onClick={() => handleOpenPopUp(null)}
                >
                    Отменить
                </button>
                <button className="btn-green" onClick={deleteArticle}>
                    Подтвердить
                </button>
            </div>
        </DeletePopUpStyled>
    );
};
