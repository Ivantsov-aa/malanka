import {AppLinks} from "../AppLinks/AppLinks";

export const MainTitle = ({language}) => {
    return (
        <div className='main__title-wrapper'>
            <section className='main__title'>
                <div className='main__title-text'>
                    <h1 className='mb-16'>
                        {language === 'RU' ?
                            'Маланка – Ваш способ зарядить электромобиль'
                            :
                            (language === 'EN' ?
                                'Malanka –  Your way to charge an electric car'
                                :
                                'Маланка – Ваш спосаб зарадзіць электрамабіль'
                            )}
                    </h1>
                    <ul className='mb-32'>
                        <li className='list-text'>
                            {language === 'RU' ?
                                'Зарядка электромобиля. Это очень просто!'
                                :
                                (language === 'EN' ?
                                    'To charge an electric car. Easy!'
                                    :
                                    'Зарадка электрамабіля. Гэта вельмі проста!'
                                )}
                        </li>
                        <li className='list-text'>
                            {language === 'RU' ?
                                'Как зарядить электромобиль? – Скачать приложение Malanka New.'
                                :
                                (language === 'EN' ?
                                    'How to charge an electric car? – Download the Malanka New App.'
                                    :
                                    'Як зарадзіць электрамабіль? – Спампаваць дадатак Malanka New.'
                                )}
                        </li>
                        <li className='list-text'>
                            {language === 'RU' ?
                                'Лучший способ получить доступ к крупнейшей сети зарядных станций для электромобилей.'
                                :
                                (language === 'EN' ?
                                    'The best way to get access to one of the largest electric car charging network.'
                                    :
                                    'Найлепшы спосаб атрымаць доступ да найбуйнейшай сеткі зарадных станцый для электрамабіляў.'
                                )}
                        </li>
                        <li className='list-text'>
                            {language === 'RU' ?
                                'Мобильное приложение Маланка – карта зарядных станций для электромобилей и гарантия того, что зарядка батареи электромобиля будет удобной и безопасной.'
                                :
                                (language === 'EN' ?
                                    'Malanka mobile аpp is a charging stations map and your guarantee of safe and comfortable electric car charging. '
                                    :
                                    'Мабільны дадатак Маланка – карта зарадных станцый для электрамабіляў і гарантыя таго, што зарадка батарэі электрамабіля будзе зручнай і бяспечнай.'
                                )}
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