import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom";
import { AdminPanelStyled } from "../AdminPanel/AdminPanel.style";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { handleLogIn } from "../../../redux/slices/authSlice";

export const AdminPanel = () => {
    const { isLogged, userInfo } = useSelector(store => store.authAdmin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem('logged')) {
            navigate('/admin');
            return;
        } else {
            const user = JSON.parse(localStorage.getItem('user'));
            const logged = JSON.parse(localStorage.getItem('logged'));
            dispatch(handleLogIn({ userInfo: user, isLogged: logged }))
        }
    }, [])

    return (
        userInfo &&
        <AdminPanelStyled>
            <Outlet />
            <AdminSidebar userInfo={userInfo} />
        </AdminPanelStyled>
    )
}