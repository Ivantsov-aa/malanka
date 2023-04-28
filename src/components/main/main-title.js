import { AppLinks } from "../AppLinks/AppLinks";

export const MainTitle = () => {
    return (
        <div className='main__title-wrapper'>
            <section className='main__title'>
                <div className='main__title-text'>
                    <h1 className='mb-16'>Маланка – Ваш спосаб зарадзіць электрамабіль</h1>
                    <ul className='mb-32'>
                        <li className='list-text'>
                            Зарадка электрамабіля. Гэта вельмі проста!
                        </li>
                        <li className='list-text'>
                            Як зарадзіць электрамабіль? – Спампаваць дадатак Malanka New.
                        </li>
                        <li className='list-text'>
                            Найлепшы спосаб атрымаць доступ да найбуйнейшай сеткі зарадных станцый для электрамабіляў.
                        </li>
                        <li className='list-text'>
                            Мабільны дадатак Маланка – карта зарадных станцый для электрамабіляў і гарантыя таго, што зарадка батарэі электрамабіля будзе зручнай і бяспечнай.
                        </li>
                    </ul>
                    <AppLinks />
                </div>
                <div className='title__image'>
                    <img src='/images/title-bg.png' alt='malanka' />
                </div>
            </section>
        </div>
    )
}