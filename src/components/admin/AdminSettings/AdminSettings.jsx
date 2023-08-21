import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import Button from "../../Button/button";
import { InputStyled } from "../../Input/Input.style";
import {
    AdminSettingsContainer,
    AdminSettingsNewUser,
    AdminSettingsPassword,
    ErrorMessage,
} from "./AdminSettings.style";
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

export const AdminSettings = () => {
    const [notification, setNotification] = useState(null);

    const forms = {
        changePassword: RegisterForm(),
        changeEmail: RegisterForm(),
        createAdmin: RegisterForm(),
    };

    const { userInfo } = useSelector((store) => store.authAdmin);

    useEffect(() => {
        loadCurrentMail();
    }, []);

    const loadCurrentMail = async () => {
        await fetch(`${url}/mail-info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
            .then((response) => response.json())
            .then((result) => {
                forms.changeEmail.setValue("email", result.address);
            });
    };

    const handleChangePassword = async (data) => {
        await fetch(`${url}/admin`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (!result.message) {
                    setNotification({
                        icon: "/images/svg/success-icon.svg",
                        description: "Пароль успешно изменён",
                    });
                    forms.changePassword.reset();
                } else {
                    forms.changePassword.setError({
                        oldPassword: { message: "Неверный пароль" },
                    });
                }
            });
    };

    const handleCreateUser = async (data) => {
        await fetch(`${url}/admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                middleName: data.middleName,
                email: data.email,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (!result.message && !result.error) {
                    forms.createAdmin.reset();
                    setNotification({
                        icon: "/images/svg/success-icon.svg",
                        description: "Пользователь успешно добавлен",
                    });
                } else {
                    forms.createAdmin.setError({
                        error: {
                            message: result.message
                                ? result.message
                                : "Что-то пошло не так...",
                        },
                    });
                }
            });
    };

    const handleChangeEmail = async (data) => {
        await fetch(`${url}/mail-info`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify({
                address: data.email,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (!result.message) {
                    setNotification({
                        icon: "/images/svg/success-icon.svg",
                        description: "E-mail успешно изменён",
                    });
                } else {
                    forms.changeEmail.setError({
                        email: { message: "Неверный пароль" },
                    });
                }
            });
    };

    return (
        <AdminSettingsContainer>
            <h1>Настройки</h1>
            {/* <h2>{}</h2> */}
            <h4>Сменить пароль</h4>
            <AdminSettingsPassword
                id="changePassword"
                superadmin={userInfo.role === "ROLE_SUPER_ADMIN" ? true : false}
                onSubmit={forms.changePassword.handleSubmit(
                    handleChangePassword
                )}
            >
                <label>
                    <InputStyled
                        type="password"
                        placeholder="Введите старый пароль"
                        {...forms.changePassword.register("oldPassword")}
                    />
                    {forms.changePassword.errors.oldPassword && (
                        <ErrorMessage>
                            {forms.changePassword.errors.oldPassword.message}
                        </ErrorMessage>
                    )}
                </label>
                <label>
                    <InputStyled
                        type="password"
                        placeholder="Введите новый пароль"
                        {...forms.changePassword.register("newPassword", {
                            required: "Необходимо указать новый пароль",
                            pattern: {
                                value: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/gi,
                                message: "Слишком простой пароль",
                            },
                            minLength: {
                                value: 8,
                                message:
                                    "Пароль должен содержать не менее 8 символов",
                            },
                        })}
                    />
                    {forms.changePassword.errors.newPassword && (
                        <ErrorMessage>
                            {forms.changePassword.errors.newPassword.message}
                        </ErrorMessage>
                    )}
                </label>
                <label>
                    <InputStyled
                        type="password"
                        placeholder="Повторите новый пароль"
                        name="newPassword"
                        {...forms.changePassword.register(
                            "repeat_newPassword",
                            {
                                validate: (value) => {
                                    const password =
                                        forms.changePassword.getValues(
                                            "newPassword"
                                        );
                                    return (
                                        value === password ||
                                        "Пароли не совпадают"
                                    );
                                },
                            }
                        )}
                    />
                    {forms.changePassword.errors.repeat_newPassword && (
                        <ErrorMessage>
                            {
                                forms.changePassword.errors.repeat_newPassword
                                    .message
                            }
                        </ErrorMessage>
                    )}
                </label>
                <Button primary>Подтвердить пароль</Button>
            </AdminSettingsPassword>
            <h4>Изменить почту для форм обратной связи</h4>
            <AdminSettingsPassword
                id="changeEmail"
                superadmin={true}
                onSubmit={forms.changeEmail.handleSubmit(handleChangeEmail)}
            >
                <label>
                    <InputStyled
                        placeholder="E-mail"
                        name="email"
                        type="text"
                        {...forms.changeEmail.register("email", {
                            required: "Необходимо указать e-mail",
                            pattern: {
                                value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}/gi,
                                message: "E-mail введён некорректно",
                            },
                        })}
                    />
                    {forms.changeEmail.errors.email && (
                        <ErrorMessage>
                            {forms.changeEmail.errors.email.message}
                        </ErrorMessage>
                    )}
                </label>
                <Button primary>Изменить почту</Button>
            </AdminSettingsPassword>
            {userInfo.role === "ROLE_SUPER_ADMIN" && (
                <>
                    <h4>Добавить нового администратора</h4>
                    <AdminSettingsNewUser
                        id="createAdmin"
                        onSubmit={forms.createAdmin.handleSubmit(
                            handleCreateUser
                        )}
                    >
                        <label>
                            <InputStyled
                                placeholder="Логин"
                                type="text"
                                {...forms.createAdmin.register("username", {
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Логин должен содержать не менее 8 символов",
                                    },
                                })}
                            />
                            {forms.createAdmin.errors.username && (
                                <ErrorMessage>
                                    {forms.createAdmin.errors.username.message}
                                </ErrorMessage>
                            )}
                        </label>
                        <label>
                            <InputStyled
                                placeholder="E-mail"
                                name="email"
                                type="text"
                                {...forms.createAdmin.register("email", {
                                    required: "Необходимо указать e-mail",
                                    pattern: {
                                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}/gi,
                                        message: "E-mail введён некорректно",
                                    },
                                })}
                            />
                            {forms.createAdmin.errors.email && (
                                <ErrorMessage>
                                    {forms.createAdmin.errors.email.message}
                                </ErrorMessage>
                            )}
                        </label>
                        <InputStyled
                            placeholder="Фамилия"
                            type="text"
                            {...forms.createAdmin.register("lastName")}
                        />
                        <InputStyled
                            placeholder="Имя"
                            required
                            type="text"
                            {...forms.createAdmin.register("firstName")}
                        />
                        <InputStyled
                            placeholder="Отчество"
                            type="text"
                            {...forms.createAdmin.register("middleName")}
                        />
                        <label>
                            <InputStyled
                                placeholder="Введите пароль"
                                type="password"
                                {...forms.createAdmin.register("password", {
                                    required: "Необходимо указать новый пароль",
                                    pattern: {
                                        value: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/gi,
                                        message: "Слишком простой пароль",
                                    },
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Пароль должен содержать не менее 8 символов",
                                    },
                                })}
                            />
                            {forms.createAdmin.errors.password && (
                                <ErrorMessage>
                                    {forms.createAdmin.errors.password.message}
                                </ErrorMessage>
                            )}
                        </label>
                        <label>
                            <InputStyled
                                placeholder="Повторите пароль"
                                type="password"
                                {...forms.createAdmin.register(
                                    "password_repeat",
                                    {
                                        validate: (value) => {
                                            const password =
                                                forms.createAdmin.getValues(
                                                    "password"
                                                );
                                            return (
                                                value === password ||
                                                "Пароли не совпадают"
                                            );
                                        },
                                    }
                                )}
                            />
                            {forms.createAdmin.errors.password_repeat && (
                                <ErrorMessage>
                                    {
                                        forms.createAdmin.errors.password_repeat
                                            .message
                                    }
                                </ErrorMessage>
                            )}
                        </label>
                        <Button primary>Добавить</Button>
                    </AdminSettingsNewUser>
                </>
            )}
            {notification && (
                <NotificationPopUp
                    {...notification}
                    onClick={() => setNotification(null)}
                />
            )}
        </AdminSettingsContainer>
    );
};
