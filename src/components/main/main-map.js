export const MainMap = () => {
    return (
        <section className='map__wrapper'>
            <section className='map__container'>
                <div className='map__title mb-32'>
                    <div>
                        <h3 className='mb-16'>Вэб-версія Malanka New – зарадныя станцыі на адлегласці некалькіх клікаў</h3>
                        <p className='list-text'>Адкрыйце для сябе ўсе перавагі электрамабіля, выкарыстоўваючы хуткія зарадныя станцыі ў Беларусі. Супер хуткія зарадныя станцыі і хуткія даступны для Вас. Зарадкі ў Мінску і абласных цэнтрах размешчаны там, дзе камфортна вам. Карта электразаправак Маланка пастаянна папаўняецца. Нашы сучасныя зарадныя станцыі Mode 4 аснашчаны запатрабаванымі канектарамі. Зарадка CCS Combo 2, зарадка CHAdeMO, зарадка GBT – мы зарадзім ваш электрамабіль!</p>
                    </div>
                    <a href="https://customer.malankabn.by/map" className='btn-green' target="_blank">Перайсці</a>
                </div>
                <div className='main__map'>
                    <div id='map' style={{ width: '100%', height: '100%' }}></div>
                </div>
            </section>
        </section>
    )
}