export const InternetExplorerPlug = () => {
    return (
        <div className='ie-plug'>
            <h3 className='mb-16'>Вы используете браузер Internet Explorer</h3>
            <p className='regular-text'>Данный сайт построен на передовых, современных технологиях и не поддерживает Internet Explorer. Настоятельно рекомендуем выбрать и установить любой из современных браузеров. Это бесплатно и займет всего несколько минут</p>
            <div className='ie-plug__links mb-64'>
                <a href='#' className='safari'>
                    <img src='./images/ie-plug/safari.svg' className='mb-32' loading='lazy' alt='safari' />
                    <p>Apple Safari</p>
                </a>
                <a href='#' className='opera'>
                    <img src='./images/ie-plug/opera.svg' className='mb-32' loading='lazy' alt='safari' />
                    <p>opera</p>
                </a>
                <a href='#' className='firefox'>
                    <img src='./images/ie-plug/firefox.svg' className='mb-32' loading='lazy' alt='safari' />
                    <p>mozila firefoX</p>
                </a>
                <a href='#' className='chrome'>
                    <img src='./images/ie-plug/chrome.svg' className='mb-32' loading='lazy' alt='safari' />
                    <p>google chrome</p>
                </a>
            </div>
            <div className='contacts'>
                <h4 className='medium mb-16'>Наши контакты</h4>
                <a href='mailto:malanka@beloil.by' className='mb-8'>malanka@beloil.by</a>
                <select>
                    <option>+375 29 6-431-431</option>
                    <option>+375 29 6-431-431</option>
                    <option>+375 29 6-431-431</option>
                </select>
            </div>
        </div>
    )
}