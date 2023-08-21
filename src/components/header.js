import {useRef, useState} from "react"
import {Link, useLocation} from "react-router-dom"
import Button from "./Button/button"
import {HeaderDropdown} from "./header/header-dropdown"
import {FlexWrap} from "./FlexWrap/FlexWrap"
import {useEffect} from "react"
import {useSelector} from "react-redux"

const navBar = [
    {
        id: 79,
        path: 'help',
        name: 'Как зарядиться'
    },
    {
        id: 51,
        path: 'price',
        name: 'Цена'
    },
    {
        id: 55,
        path: 'partner',
        name: 'Партнерам'
    }
    , {
        id: 61,
        path: 'advertising',
        name: 'Реклама'
    }
]

export const Header = ({nav, admin}) => {
    const [dropdownState, setDropdownState] = useState(false);
    const dropdownRef = useRef();
    const burgerRef = useRef();
    const location = useLocation();
    const {language} = useSelector(store => store.localLanguage);
    const {isLogged} = useSelector((store) => store.authAdmin);

    return (
        <header className={`header ${dropdownState ? 'active' : ''} ${isLogged ? "admin" : ""}`}>
            <div className='header__row'>
                <Link to={`${admin ? '.' : ''}/`} className='logo__wrapper'>
                    <img src='/images/svg/logo.svg' alt='logo' />
                </Link>
                <nav>
                    <ul>
                        {nav ?
                            nav.header.map(link => (
                                <li key={link.id}>
                                    <Link
                                        to={`${admin ? '.' : ''}${link.style.alignment}`} className={location.pathname.includes(link.style.alignment) ? 'active' : ''}
                                    >
                                        {language === 'RU' ?
                                            link.pageHeadingRus
                                            :
                                            (language === 'EN' ? link.pageHeadingEng : link.pageHeadingBel)
                                        }
                                    </Link>
                                </li>
                            ))
                            :
                            navBar.map((link, i) => (
                                <li key={i}><Link to={`${admin ? '.' : ''}/${link.path}`} className={location.pathname.includes(link.path) ? 'active' : ''}>{link.name}</Link></li>
                            ))
                        }
                    </ul>
                </nav>
                <div className='header__btns'>
                    <a href="https://customer.malankabn.by/map" className="btn-green" target="_blank">{
                        language === 'RU' ?
                            'Зарядись онлайн'
                            :
                            (
                                language === 'EN' ?
                                    'Charge online'
                                    :
                                    'Зарадзіся анлайн'
                            )
                    }</a>
                    <button
                        className={`header__burger ${dropdownState ? 'active' : ''}`}
                        onClick={() => {
                            setDropdownState(!dropdownState);
                            !dropdownState ? document.body.classList.add('scroll-disable') : document.body.classList.remove('scroll-disable');
                        }}
                        ref={burgerRef}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
            <div className='header__row header__dropdown' ref={dropdownRef}>
                <FlexWrap className='flex' justify='space-between' gap={50}>
                    {nav && nav.dropdown && <HeaderDropdown burgerRef={burgerRef} dropdownRef={dropdownRef} setDropdownState={setDropdownState} admin={admin} {...nav} />}
                </FlexWrap>
            </div>
        </header>
    )
}