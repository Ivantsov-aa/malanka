import { useEffect } from "react"
import { NotificationPopUpStyled } from "./NotificationPopUpStyled"

export const NotificationPopUp = ({ icon, description, onClick }) => {
    useEffect(() => {
        setTimeout(() => {
            onClick();
        }, 5000)
    }, [])

    return (
        <NotificationPopUpStyled>
            <img src={icon} alt='malanka' />
            <p>{description}</p>
            <button onClick={onClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 7L17 17" stroke="#7A7A95" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 17L17 7" stroke="#7A7A95" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </NotificationPopUpStyled>
    )
}