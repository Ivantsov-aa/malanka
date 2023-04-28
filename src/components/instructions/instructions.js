import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Instructions = ({ title, list, subtitle }) => {
    const { language } = useSelector(store => store.localLanguage);
    return (
        <section className='instructions'>
            <div className={`instructions__title ${subtitle ? 'mb-64' : 'mb-16'}`}>
                <div>
                    <h3>{title}</h3>
                    {subtitle && <p>{subtitle}</p>}
                </div>
                {subtitle && <Link to='/help' className='btn-green-outline'>{language === 'RU' ? 'Узнать больше' : (language === 'EN' ? 'Learn more' : 'Даведацца больш')}</Link>}
            </div>
            <ol className='instructions-list'>
                {list.map((item, i) => (
                    <li key={i}>
                        <div>
                            <div className='list-title'>
                                <p className='count'>{i + 1}</p>
                                <p>{item.text}</p>
                            </div>
                            <img src={item.path} loading='lazy' alt='instruction-step' />
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    )
}