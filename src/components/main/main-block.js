import { Link } from "react-router-dom"

export const MainBlock = ({ title, text, list, imgPath, link }) => {
    return (
        <div className='main__block-wrapper'>
            <section className='main__block'>
                <div>
                    <h2 className='mb-16'>{title}</h2>
                    <p className={list ? 'text mb-16' : 'list-text mb-32'}>{text}</p>
                    {list && <ul className='mb-32'>
                        {list.map((item, i) => (
                            <li className='list-text' key={i}>{item}</li>
                        ))}
                    </ul>}
                    <Link to={`.${link.path}`} className='btn-green'>{link.name}</Link>
                </div>
                <img src={imgPath} alt='main-block' />
            </section >
        </div >
    )
}