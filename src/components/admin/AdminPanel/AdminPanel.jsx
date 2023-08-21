import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminPanelStyled } from "../AdminPanel/AdminPanel.style";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { handleLogIn, handleLogOut } from "../../../redux/slices/authSlice";

export const AdminPanel = () => {
    const { isLogged, userInfo } = useSelector((store) => store.authAdmin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const logged = JSON.parse(localStorage.getItem("logged"));

        if (!localStorage.getItem("logged")) {
            navigate("/admin");
            return;
        } else {
            if (user.loggedDate + 420_120_000 >= Date.now()) {
                dispatch(handleLogIn({ userInfo: user, isLogged: logged }));
            } else {
                navigate("/admin");
                dispatch(handleLogOut());
            }
        }
    }, []);

    return (
        userInfo && (
            <AdminPanelStyled>
                <Outlet />
                <AdminSidebar userInfo={userInfo} />
            </AdminPanelStyled>
        )
    );
};
