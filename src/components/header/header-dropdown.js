import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { handlerLocalStorage } from "../../services/handlerLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { handleChange } from "../../redux/slices/localSlice";

export const HeaderDropdown = ({ burgerRef, dropdown, dropdownRef, setDropdownState, admin }) => {
    const [dropdownCategories, setDropdownCategories] = useState(null);
    const { language } = useSelector(store => store.localLanguage);
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
            category.id === id ? { ...category, selected: !category.selected } : { ...category, selected: false }
        ));

        setDropdownCategories(activeCategory);
    }

    return (
        <>
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
                                                subcat.pageHeadingRus
                                                :
                                                (language === 'EN' ? subcat.pageHeadingEng : subcat.pageHeadingBel)
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
                                </h6>
                                <ul className='subcategories__list'>
                                    {category.subcategories.map(subcat => (
                                        <li key={subcat.id}><Link to={`${admin ? '.' : ''}${subcat.style ? subcat.style.alignment : subcat.path}`} onClick={() => {
                                            closeDropdown();
                                        }}>
                                            {language === 'RU' ?
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