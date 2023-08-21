import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {handlerLocalStorage} from "../../services/handlerLocalStorage";
import {useDispatch, useSelector} from "react-redux";
import {handleChange} from "../../redux/slices/localSlice";
import {AppLinks} from "../AppLinks/AppLinks";
import Button from "../Button/button";

export const HeaderDropdown = ({burgerRef, dropdown, dropdownRef, setDropdownState, admin}) => {
    const [dropdownCategories, setDropdownCategories] = useState(null);
    const {language} = useSelector(store => store.localLanguage);
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);

        setDropdownCategories(dropdown);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);


    const closeDropdown = () => {
        setDropdownState(false);
        document.body.classList.remove('scroll-disable');
    }

    const handleClickOutside = (e) => {
        const header = document.querySelector('header');
        if (header.classList.contains('active') && dropdownRef.current && !burgerRef.current.contains(e.target) && !dropdownRef.current.contains(e.target)) {
            closeDropdown();
        }
    }

    const handleCategoriesClick = (id) => {
        const activeCategory = dropdownCategories.map(category => (
            category.id === id ? {...category, selected: !category.selected} : {...category, selected: false}
        ));

        setDropdownCategories(activeCategory);
    }

    return (
        <>
            <div className="wrapper">
                <div className='dropdown__side left'>
                    {
                        dropdownCategories && dropdownCategories.map(category => (
                            window.innerWidth > 1024 ?
                                category.type === 'web' && <div className={`dropdown__col ${category.selected ? 'active' : ''}`} key={category.id}>
                                    <h6>
                                        {language === 'RU' ?
                                            category.titleRus
                                            :
                                            (language === 'EN' ? category.titleEng : category.titleBel)
                                        }
                                    </h6>
                                    <ul className='subcategories__list'>
                                        {category.subcategories.map(subcat => (
                                            <li key={subcat.id}><Link to={`${admin ? '.' : ''}${subcat.style ? subcat.style.alignment : subcat.path}`} onClick={() => {
                                                closeDropdown();
                                            }}>
                                                {language === 'RU' ?
                                                    subcat.sideHeadingRus
                                                    :
                                                    (language === 'EN' ? subcat.sideHeadingEng : subcat.sideHeadingBel)
                                                }
                                            </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                :
                                <div className={`dropdown__col ${category.selected ? 'active' : ''}`} key={category.id}>
                                    <h6 onClick={() => handleCategoriesClick(category.id)}>
                                        {language === 'RU' ?
                                            category.titleRus
                                            :
                                            (language === 'EN' ? category.titleEng : category.titleBel)
                                        }
                                        <svg width="8" height="16" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.99805 1.11963L11.998 11.1196L1.99805 21.1196" stroke="#C0C0DB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </h6>
                                    <ul className='subcategories__list'>
                                        {category.subcategories.map(subcat => (
                                            <li key={subcat.id}><Link to={`${admin ? '.' : ''}${subcat.style ? subcat.style.alignment : subcat.path}`} onClick={() => {
                                                closeDropdown();
                                            }}>
                                                {subcat.sideHeadingRus ?
                                                    (language === 'RU' ?
                                                        subcat.sideHeadingRus
                                                        :
                                                        (language === 'EN' ? subcat.sideHeadingEng : subcat.sideHeadingBel))
                                                    :
                                                    language === 'RU' ?
                                                        subcat.pageHeadingRus
                                                        :
                                                        (language === 'EN' ? subcat.pageHeadingEng : subcat.pageHeadingBel)
                                                }
                                            </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                        ))
                    }
                </div>
                <a href="https://customer.malankabn.by/map" className="btn-green charging" target="_blank">{
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
                <AppLinks outline="outline" horizontal="horizontal" />
            </div>
            <div className='dropdown__side right'>
                {['BY', 'RU', 'EN'].map((item, i) => (
                    <button className={language === item ? 'active' : ''} onClick={() => {
                        handlerLocalStorage().set("language", item);
                        dispatch(handleChange(item));
                        closeDropdown();
                    }} key={i}>{item}</button>
                ))}
            </div>
        </>
    )
}