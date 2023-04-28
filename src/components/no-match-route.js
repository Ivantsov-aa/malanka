import { Link } from "react-router-dom"

export const NoMatchRoute = () => {
    return (
        <main className='no-match-route'>
            <div className='wrapper'>
                <div>
                    <h4 className='medium mb-8'>Страница не найдена</h4>
                    <p className='regular-text mb-32'>Извините. Содержимое, которое вы ищете, не существует. Либо оно было удалено, либо вы неправильно ввели ссылку.</p>
                    <Link to='/' className='btn-green'>На главную</Link>
                </div>
                <div>
                    <img src='/images/news/support.png' loading='lazy' alt='support' />
                    <span>404</span>
                </div>
            </div>
        </main>
    )
}