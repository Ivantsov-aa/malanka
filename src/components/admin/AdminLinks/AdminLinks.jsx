import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import Button from "../../Button/button";
import { InputStyled } from "../../Input/Input.style";
import {
    AdminLinksContainer,
    AdminLinksNewUser,
    AdminLinksPassword,
    ErrorMessage,
} from "./AdminLinks.style";
import { NotificationPopUp } from "../../NotificationPopUp/NotificationPopUp";
import { url } from "../AuthForm/AuthForm";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        setError,
        reset,
    } = useForm();
    return {
        register,
        errors,
        handleSubmit,
        getValues,
        setError,
        setValue,
        reset,
    };
};

export const AdminLinks = ({ othersLinks, footerSocialLinks }) => {
    const [notification, setNotification] = useState(null);

    const forms = {
        editLinks_204: RegisterForm(),
        editLinks_205: RegisterForm(),
        editLinks_206: RegisterForm(),
        editLinks_207: RegisterForm(),
        editLinks_208: RegisterForm(),
        editLinks_209: RegisterForm(),
        editLinks_210: RegisterForm(),
        editLinks_211: RegisterForm(),
        editLinks_212: RegisterForm(),
        editLinks_213: RegisterForm(),
        editLinks_214: RegisterForm(),
        editLinks_215: RegisterForm(),
        editLinks_216: RegisterForm(),
        editLinks_217: RegisterForm(),
        editLinks_218: RegisterForm(),
        editLinks_219: RegisterForm(),
        editLinks_226: RegisterForm(),
        editLinks_227: RegisterForm(),
    };

    const { userInfo } = useSelector((store) => store.authAdmin);

    const handleEditLinks = async (data) => {
        const id = Object.keys(data)[0].split("_")[1];
        const dataValues = Object.values(data);
        await fetch(`${url}/side-heading/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify({
                id: +id,
                sideHeadingRus: dataValues[0],
                sideHeadingEng: dataValues[1],
                sideHeadingBel: dataValues[2],
                style: {
                    size: 15,
                    weight: "bold",
                    family: "Arial",
                    alignment: dataValues[3],
                    marginBottom: 0,
                },
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (!result.message) {
                    setNotification({
                        icon: "/images/svg/success-icon.svg",
                        description: "Изменения приняты",
                    });
                } else {
                    setNotification({
                        icon: "/images/svg/error-icon.svg",
                        description: result.message ? result.message : "Что-то пошло не так...",
                    });
                }
            });
    };

    return (
        <AdminLinksContainer>
            <h1>Сторонние ссылки</h1>
            {othersLinks && footerSocialLinks &&
                [...othersLinks, ...footerSocialLinks].map((link) => {
                    return (
                        <AdminLinksPassword
                            id={`editLinks_${link.id}`}
                            superadmin={
                                userInfo.role === "ROLE_SUPER_ADMIN"
                                    ? true
                                    : false
                            }
                            onSubmit={forms[
                                `editLinks_${link.id}`
                            ].handleSubmit(handleEditLinks)}
                            key={link.id}
                        >
                            <label>
                                <InputStyled
                                    type="text"
                                    placeholder="Введите название"
                                    defaultValue={link.sideHeadingRus}
                                    {...forms[`editLinks_${link.id}`].register(
                                        "sideHeadingRus_" + link.id
                                    )}
                                />
                            </label>
                            <label>
                                <InputStyled
                                    type="text"
                                    placeholder="Введите название"
                                    defaultValue={link.sideHeadingEng}
                                    {...forms[`editLinks_${link.id}`].register(
                                        "sideHeadingEng_" + link.id
                                    )}
                                />
                            </label>
                            <label>
                                <InputStyled
                                    type="text"
                                    placeholder="Введите название"
                                    defaultValue={link.sideHeadingBel}
                                    {...forms[`editLinks_${link.id}`].register(
                                        "sideHeadingBel_" + link.id
                                    )}
                                />
                            </label>
                            <label>
                                <InputStyled
                                    type="text"
                                    placeholder="Введите ссылку"
                                    defaultValue={link.style.alignment}
                                    {...forms[`editLinks_${link.id}`].register(
                                        "path_" + link.id
                                    )}
                                />
                            </label>
                            <Button primary>Изменить</Button>
                        </AdminLinksPassword>
                    );
                })}
            {notification && (
                <NotificationPopUp
                    {...notification}
                    onClick={() => setNotification(null)}
                />
            )}
        </AdminLinksContainer>
    );
};
