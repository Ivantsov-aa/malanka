import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Breadcrumbs = ({ padding, link, currentPage }) => {
    const { language } = useSelector(store => store.localLanguage);
    return (
        <div className={padding ? 'breadcrumbs block' : 'breadcrumbs'}>
            <Link to='/'>{language === 'RU' ? 'Главная' : (language === 'EN' ? 'Home' : 'Галоўная')}</Link>
            {link && <Link to={`/${link.path}`}>{link.name}</Link>}
            {currentPage && <span>{currentPage}</span>}
        </div>
    )
}