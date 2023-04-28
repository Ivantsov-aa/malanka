import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../Button/button"
import { Input } from "../../Input/Input"
import { AuthForm, AuthWrap } from "../AuthForm/AuthForm.style"
import { handleLogIn } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux"
import { NotificationPopUp } from "../../NotificationPopUp/NotificationPopUp"

export const Authorization = () => {
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('logged')) {
            const user = JSON.parse(localStorage.getItem('user'));
            const logged = JSON.parse(localStorage.getItem('logged'));
            navigate(`/admin/${user.username}`);
            dispatch(handleLogIn({ userInfo: user, isLogged: logged }))
        }
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        await fetch('http://89.223.71.123:8080/malanka/authorize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: loginValue,
                password: passwordValue
            })
        })
            .then(response => response.json())
            .then(result => {
                if (!result.message) {
                    navigate(`/admin/${result.username}`);
                    dispatch(handleLogIn({ userInfo: result, isLogged: true }));
                } else {
                    setError({ icon: '/images/svg/error-icon.svg', description: result.message });
                }
            })
    }

    return (
        <AuthWrap>
            <AuthForm onSubmit={onSubmit}>
                <Link to='/'>
                    <img src='/images/svg/logo.svg' alt='logo' />
                </Link>
                <h1>Авторизация</h1>
                <div>
                    <Input type='text' placeholder='Логин' value={loginValue} onChange={(e) => setLoginValue(e.target.value)} />
                    <Input type='password' placeholder='Пароль' value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
                </div>
                <Button type='submit' primary>Войти</Button>
            </AuthForm>
            {error &&
                <NotificationPopUp
                    {...error}
                    onClick={() => setError(null)}
                />
            }
        </AuthWrap>
    )
}