export const MainMap = ({language}) => {
    return (
        <section className='map__wrapper'>
            <section className='map__container'>
                <div className='map__title mb-32'>
                    <div>
                        <h3 className='mb-16'>
                            {language === 'RU' ?
                                'Веб-версия Malanka New – зарядные станции на расстоянии нескольких кликов'
                                :
                                (language === 'EN' ?
                                    'Malanka New web version – charging stations in a few clicks'
                                    :
                                    'Вэб - версія Malanka New – зарадныя станцыі на адлегласці некалькіх клікаў'
                                )}
                        </h3>
                        <p className='list-text'>
                            {language === 'RU' ?
                                'Откройте для себя все преимущества электромобиля, используя быстрые зарядные станции в Беларуси. Супербыстрые зарядные станции и быстрые доступны для Вас. Зарядки в Минске и областных центрах расположены там, где комфортно Вам. Карта электрозаправок Маланка постоянно пополняется. Наши современные зарядные станции Mode 4 оснащены востребованными коннекторами. Зарядка CCS Combo 2, зарядка CHAdeMO, зарядка GBT – мы зарядим Ваш электромобиль!'
                                :
                                (language === 'EN' ?
                                    'Discover all the benefits of an electric car using fast charging stations in Belarus. Ultra-fast charging stations are available for you. Charging in Minsk and all regional centers are located in places comfortable for you. Malanka charging stations map is being constantly updated. Our modern charging stations Mode 4 are equipped with the most popular connectors. Charging: CCS Combo 2, CHAdeMO, GBT – we will charge your electric car!'
                                    :
                                    'Адкрыйце для сябе ўсе перавагі электрамабіля, выкарыстоўваючы хуткія зарадныя станцыі ў Беларусі. Супер хуткія зарадныя станцыі і хуткія даступны для Вас. Зарадкі ў Мінску і абласных цэнтрах размешчаны там, дзе камфортна вам. Карта электразаправак Маланка пастаянна папаўняецца. Нашы сучасныя зарадныя станцыі Mode 4 аснашчаны запатрабаванымі канектарамі. Зарадка CCS Combo 2, зарадка CHAdeMO, зарадка GBT – мы зарадзім ваш электрамабіль!'
                                )}
                        </p>
                    </div>
                    <a href="https://customer.malankabn.by/map" className='btn-green' target="_blank">
                        {language === 'RU' ?
                            'Перейти'
                            :
                            (language === 'EN' ?
                                'Go to page'
                                :
                                'Перайсці'
                            )}
                    </a>
                </div>
                <div className='main__map'>
                    <div id='map' style={{width: '100%', height: '100%'}}></div>
                </div>
            </section>
        </section>
    )
}