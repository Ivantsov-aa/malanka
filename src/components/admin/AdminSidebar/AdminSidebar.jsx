import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleLogOut } from "../../../redux/slices/authSlice";
import { AdminSidebarStyled } from "./AdminSidebar.style";

const navBar = [
    {
        icon: "pages",
        path: `/pages`,
        title: "Список страниц",
    },
    {
        icon: "news",
        path: `/news`,
        title: "Список новостей",
    },
    {
        icon: "article",
        path: `/article-create`,
        title: "Создать новость",
    },
    {
        icon: "links",
        path: `/links`,
        title: "Редактировать ссылки",
    },
    {
        icon: "settings",
        path: `/settings`,
        title: "Настройки",
    },
    {
        icon: "logout",
        title: "Выйти",
    },
];

export const AdminSidebar = ({ userInfo }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const activePage = pathname.split("/").pop();

    return (
        <AdminSidebarStyled>
            <nav>
                <ul>
                    <li>
                        <Link to={`/admin/${userInfo.username}`}>
                            <img src="/images/svg/logo.svg" alt="malanka" />
                            <span>Сайт</span>
                        </Link>
                    </li>
                    {navBar.map((tab, i) =>
                        tab.path ? (
                            <li
                                className={
                                    activePage && tab.path.includes(activePage)
                                        ? "active"
                                        : ""
                                }
                                key={i}
                            >
                                <Link
                                    to={`/admin/${userInfo.username}${tab.path}`}
                                >
                                    <svg width="50" height="50">
                                        <use
                                            href={`/images/svg/admin/${tab.icon}.svg#${tab.icon}`}
                                        />
                                    </svg>
                                    <span>{tab.title}</span>
                                </Link>
                            </li>
                        ) : (
                            <li key={i}>
                                <button
                                    onClick={() => {
                                        dispatch(handleLogOut());
                                        navigate("/admin");
                                    }}
                                >
                                    <svg width="50" height="50">
                                        <use
                                            href={`/images/svg/admin/${tab.icon}.svg#${tab.icon}`}
                                        />
                                    </svg>
                                    <span>{tab.title}</span>
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </nav>
        </AdminSidebarStyled>
    );
};
