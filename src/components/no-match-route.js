import {useSelector} from "react-redux"
import {Link} from "react-router-dom"

export const NoMatchRoute = () => {
    const {language} = useSelector(store => store.localLanguage);

    return (
        <main className='no-match-route'>
            <div className='wrapper'>
                <div>
                    <h4 className='medium mb-8'>{
                        language === 'RU' ?
                            'Страница не найдена'
                            :
                            (language === 'EN' ?
                                'Page not found'
                                :
                                'Старонка не знойдзена'
                            )
                    }</h4>
                    <p className='regular-text mb-32'>
                        {
                            language === 'RU' ?
                                'Извините. Содержимое, которое вы ищете, не существует. Либо оно было удалено, либо вы неправильно ввели ссылку.'
                                :
                                (language === 'EN' ?
                                    'Sorry. The information you’re looking for doesn’t exist. It has been deleted or you have entered the link incorrectly.'
                                    :
                                    'Выбачайце. Змесціва, якое вы шукаеце, не існуе. Альбо яно было выдалена, альбо вы няправільна ўвялі спасылку.'
                                )
                        }
                    </p>
                    <Link to='/' className='btn-green'>
                        {
                            language === 'RU' ?
                                'На главную'
                                :
                                (language === 'EN' ?
                                    'Go to Home Page'
                                    :
                                    'На Галоўную'
                                )
                        }
                    </Link>
                </div>
                <div>
                    <img src='/images/news/support.png' loading='lazy' alt='support' />
                    <span>404</span>
                </div>
            </div>
        </main>
    )
}