import {Link, useNavigate} from "react-router-dom";
import {Breadcrumbs} from "../breadcrumbs/breadcrumbs";
import {useEffect} from "react";
import {calculateExpendDay, chargeTypes, expendsList, fuelTypes} from "./CalculatorVariables";
import {useSelector} from "react-redux";
import {Chart, registerables} from "chart.js";
import {handlerPageData} from "../../services/handlerPageData";
import {convertLink} from "../../services/convertLink";
Chart.register(...registerables);

let chartFuel;
let chartCharge;

export const Calculator = ({innerWidth}) => {
    const {language} = useSelector(store => store.localLanguage);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language])

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(77, 1)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
                convertLink(page.querySelectorAll('a'), navigate);
                main.innerHTML = page.innerHTML;
                main.querySelector('form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    onSubmit();
                })
                document.querySelectorAll("[type=number]").forEach(input => {
                    input.addEventListener("input", (e) => {
                        e.target.value = e.target.value.replace("-", "");

                        if (e.target.name === "expend_fuel") {
                            document.querySelector("[name=expend_charge]").value = e.target.value;
                        }

                        if (e.target.name === "expend_charge") {
                            document.querySelector("[name=expend_fuel]").value = e.target.value;
                        }
                    })
                });
            })
    }

    const Result = `
        <div class='result'>
            <div class='result-chart'>
                <div class='chart-side'>
                    <div class='space-between'>
                        <h2>${language === 'RU' ? 'Топливо' : (language === 'EN' ? 'Fuel' : 'Паліва')}</h2>
                        <p class='tabs'>${language === 'RU' ? 'Вид топлива:' : (language === 'EN' ? 'Type of fuel:' : 'Від паліва:')} <span class='type-fuel'></span></p>
                    </div >
                    <div>
                        <p class='axes-title'>BYN</p>
                        <canvas id='fuel-chart'></canvas>
                    </div>
                </div >
                <div class='chart-side'>
                    <div class='space-between'>
                        <h2>${language === 'RU' ? 'Электричество' : (language === 'EN' ? 'Electricity' : 'Электрычнасьць')}</h2>
                        <p class='tabs'>${language === 'RU' ? 'Тип зарядки:' : (language === 'EN' ? 'Type of charging:' : 'Тып зарадкі:')} <span class='type-charge'></span></p>
                    </div>
                    <div>
                        <p class='axes-title'>BYN</p>
                        <canvas id='charge-chart'></canvas>
                    </div>
                </div>
            </div >
            <div class='result-profit'>
                <img src='/images/svg/profit-icon.svg' alt='malanka' />
                <h3>
                    ${language === 'RU' ? 'Выгода:' : (language === 'EN' ? 'Benefit:' : 'Выгада')} <span class='profit-value'></span> ${language === 'RU' ? 'р / месяц' : (language === 'EN' ? 'BYN/month' : 'р / месяц')}
                </h3>
            </div>
        </div >
    `;

    const loadChartParams = (type, language, data) => {
        return {
            type: 'bar',
            data: {
                labels: language === 'RU' ? ['День', 'Неделя', 'Месяц'] : (language === 'EN' ? ['Day', 'Week', 'Month'] : ['Дзень', 'Тыдзень', 'Месяц']),
                datasets: [{
                    label: false,
                    data: [
                        calculateExpendDay(type === 'fuel' ? 'fuel' : '', data),
                        calculateExpendDay(type === 'fuel' ? 'fuel' : '', data) * 7,
                        calculateExpendDay(type === 'fuel' ? 'fuel' : '', data) * 30.41,
                    ],
                    borderWidth: 1,
                    backgroundColor: type === 'fuel' ? '#A3A3A7' : '#76D275'
                }]
            },
            options: {
                scales: {
                    y: {
                        yAxes: {
                            ticks: {
                                min: 0,
                                max: 1000,
                                step: 50
                            }
                        },
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    customCanvasBackground: {
                        color: 'transparent'
                    },
                    title: {
                        display: true,
                        text: 'Период',
                        position: 'bottom',
                        font: {
                            size: 16,
                            weight: 600
                        }
                    }
                }
            }
        }
    }

    const loadChartFuel = (data) => {
        const profitValue = document.querySelector('.profit-value');
        const fuelChart = document.querySelector('#fuel-chart');
        const fuelValue = document.querySelector('.type-fuel');
        fuelValue.innerText = language === 'RU' ? fuelTypes[data.fuel].titleRus : (language === 'EN' ? fuelTypes[data.fuel].titleEng : fuelTypes[data.fuel].titleBel);
        profitValue.innerText = Math.floor(calculateExpendDay('fuel', data) * 30.41 - calculateExpendDay('charge', data) * 30.41);

        if (chartFuel) {
            chartFuel.destroy();
            chartFuel = new Chart(fuelChart, loadChartParams('fuel', language, data));
        } else {
            chartFuel = new Chart(fuelChart, loadChartParams('fuel', language, data));
        }

        fuelChart.parentElement.parentElement.scrollIntoView({block: 'start', behavior: 'smooth'});
    }

    const loadChartCharge = (data) => {
        const chargeChart = document.querySelector('#charge-chart');
        const chargeValue = document.querySelector('.type-charge');
        chargeValue.innerText = language === 'RU' ? chargeTypes[data.charge].titleRus : (language === 'EN' ? chargeTypes[data.charge].titleEng : chargeTypes[data.charge].titleBel);

        if (chartCharge) {
            chartCharge.destroy();
            chartCharge = new Chart(chargeChart, loadChartParams('charge', language, data));
        } else {
            chartCharge = new Chart(chargeChart, loadChartParams('charge', language, data));
        }

        chargeChart.parentElement.parentElement.scrollIntoView({block: 'start', behavior: 'smooth'});
    }

    const onSubmit = () => {
        const result = document.querySelector('.result');
        const block = document.querySelector('.calculator .block');
        let data = {};
        const inputs = document.querySelectorAll('input');

        inputs.forEach(input => {
            if (input.type === 'radio' && input.checked) {
                data[input.name] = +input.value;
            }

            if (input.type !== 'radio') {
                data[input.name] = +input.value;
            }
        })

        console.log(data);

        if (result) {
            result.remove();
            block.insertAdjacentHTML('beforeend', Result);
            loadChartFuel(data);
            loadChartCharge(data);
        } else {
            block.insertAdjacentHTML('beforeend', Result);
            loadChartFuel(data);
            loadChartCharge(data);
        }
    }

    return (
        <main className='calculator' data-id='77' data-count='1'>
            {/* <div className='block'>
                <Breadcrumbs currentPage={language === 'RU' ?
                    'Калькулятор'
                    :
                    (language === 'EN' ?
                        'Calculator'
                        :
                        'Калькулятар')} />
                <h2>
                    {language === 'RU' ?
                        'Рассчитайте свою выгоду'
                        :
                        (language === 'EN' ?
                            'Calculate your savings'
                            :
                            'Разлічыце сваю выгаду')}
                </h2>
                <form className='calculator-form pb-128'>
                    <div className='calculator-form__step mb-64'>
                        <div className='title'>
                            <div className='count'>
                                1
                            </div>
                            <h4>
                                {language === 'RU' ?
                                    'Количество километров в день'
                                    :
                                    (language === 'EN' ?
                                        'Kilometers/day'
                                        :
                                        'Колькасць кіламетраў у дзень')}
                            </h4>
                        </div>
                        <input
                            type='number'
                            className='mw-439'
                            required
                            placeholder={language === 'RU' ?
                                'Введите ваш километраж'
                                :
                                (language === 'EN' ?
                                    'Enter your mileage'
                                    :
                                    'Увядзіце ваш кіламетраж')}
                            name='mileage'
                        />
                    </div>
                    <div className='calculator-form__step mb-64'>
                        <div className='title'>
                            <div className='count'>
                                2
                            </div>
                            <h4>
                                {language === 'RU' ?
                                    'Средний расход'
                                    :
                                    (language === 'EN' ?
                                        'Average consumption'
                                        :
                                        'Сярэдні расход')} <span>
                                    {language === 'RU' ?
                                        '(на 100 км)'
                                        :
                                        (language === 'EN' ?
                                            '(per 100 km)'
                                            :
                                            '(на 100 км)')}
                                </span></h4>
                        </div>
                        <div className='step-wrap'>
                            <div className='step-col'>
                                <div className='step-col__fields'>
                                    <h4>
                                        {language === 'RU' ?
                                            'Топливо'
                                            :
                                            (language === 'EN' ?
                                                'Fuel'
                                                :
                                                'Паліва')}
                                    </h4>
                                    <div className='row-top'>
                                        <div className='flex-block'>
                                            <h6>
                                                {language === 'RU' ?
                                                    'Расход на 100 км'
                                                    :
                                                    (language === 'EN' ?
                                                        'Consumption per 100 km'
                                                        :
                                                        'Расход на 100 км')}
                                            </h6>
                                            <input type='number' className='mw-280' defaultValue={10} name='expend_fuel' />
                                        </div>
                                        <div className='radio-wrap'>
                                            <h6>
                                                {language === 'RU' ?
                                                    'Вид топлива'
                                                    :
                                                    (language === 'EN' ?
                                                        'Type of fuel'
                                                        :
                                                        'Від паліва')}
                                            </h6>
                                            <div className='radio-container'>
                                                {fuelTypes.map((fuel, i) => (
                                                    <div className='radio vertical' key={i}>
                                                        <input type='radio' defaultChecked={i === 0} id={fuel.titleEng} value={i} name='fuel' />
                                                        <label htmlFor={fuel.titleEng}>
                                                            {language === 'RU' ?
                                                                fuel.titleRus
                                                                :
                                                                (language === 'EN' ? fuel.titleEng : fuel.titleBel)
                                                            }
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row-bottom' direction='column' gap={16}>
                                        <div className='table-row'>
                                            <h6>
                                                {language === 'RU' ?
                                                    'Вид ТО'
                                                    :
                                                    (language === 'EN' ?
                                                        'Type of servicing'
                                                        :
                                                        'Від ТА')}
                                            </h6>
                                            <h6>
                                                {language === 'RU' ?
                                                    'Стоимость в BYN/год'
                                                    :
                                                    (language === 'EN' ?
                                                        'Price BYN/year'
                                                        :
                                                        'Кошт у BYN/год')}
                                            </h6>
                                        </div>
                                        {expendsList.map((item, i) => (
                                            <div className='table-row' key={i}>
                                                <p className='regular-text'>
                                                    {language === 'RU' ?
                                                        item.titleRus
                                                        :
                                                        (language === 'EN' ? item.titleEng : item.titleBel)
                                                    }
                                                </p>
                                                <input type='number' defaultValue={item.value} className='mw-239' name={item.name} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='step-col'>
                                <div className='step-col__fields' gap={32}>
                                    <h4>
                                        {language === 'RU' ?
                                            'Электричество'
                                            :
                                            (language === 'EN' ?
                                                'Electricity'
                                                :
                                                'Электрычнасьць')}

                                    </h4>
                                    <div className='row-top' direction={(innerWidth <= 1024 && innerWidth > 768) || innerWidth < 500 ? 'column' : 'row'} gap={64}>
                                        <div className='flex-block' direction='column' gap={24}>
                                            <h6>
                                                {language === 'RU' ?
                                                    'Расход на 100 км'
                                                    :
                                                    (language === 'EN' ?
                                                        'Consumption per 100 km'
                                                        :
                                                        'Расход на 100 км')}
                                            </h6>
                                            <input type='number' defaultValue={18} className='mw-280' name='expend_charge' />
                                        </div>
                                        <div className='radio-wrap'>
                                            <h6>
                                                {language === 'RU' ?
                                                    'Тип зарядки'
                                                    :
                                                    (language === 'EN' ?
                                                        'Type of charging'
                                                        :
                                                        'Тып зарадкі')}
                                            </h6>
                                            <div className='radio-container vertical'>
                                                {chargeTypes.map((fuel, i) => (
                                                    <div className='radio' key={i}>
                                                        <input type='radio' defaultChecked={i === 0} id={fuel.titleEng} value={i} name='charge' />
                                                        <label htmlFor={fuel.titleEng}>
                                                            {language === 'RU' ?
                                                                fuel.titleRus
                                                                :
                                                                (language === 'EN' ? fuel.titleEng : fuel.titleBel)
                                                            }
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row-bottom' direction='column' gap={16}>
                                        <p className='regular-text'>
                                            {language === 'RU' ?
                                                'Для автомобиля и электромобиля рекомендуемое сервисное обслуживание составляет 2 года или 30 000 км. В среднем, обслуживание авто с ДВС в течение первых 12 лет его эксплуатации составляет от 10 000 до 12 000 тысяч белорусских рублей, а электрического – в среднем около 3 900 белорусских рублей.'
                                                :
                                                (language === 'EN' ?
                                                    'Recommended servicing for cars and electric vehicles is 2 years or 30 000 km. On the average, the cost of servicing for a car with engine during first 12 years is rated between 10 000 to 12 000 BYN. While the cost of electric car servicing is about 3 900 BYN.'
                                                    :
                                                    'Для аўтамабіля і электрамабіля рэкамендаванае сэрвіснае абслугоўванне складае 2 гады, або 30 000 км. У сярэднім, абслугоўванне аўто з РУЗ на працягу першых 12 гадоў яго эксплуатацыі складае ад 10 000 да 12 000 тысяч беларускіх рублёў, а электрычнага – у сярэднім каля 3 900 беларускіх рублёў.')}
                                        </p>
                                        <p className='regular-text bold'>
                                            {language === 'RU' ?
                                                'Приведенные суммы являются ориентировочными, однако очевиден факт того, что обслуживание электромобиля значительно дешевле.'
                                                :
                                                (language === 'EN' ?
                                                    'The figures above are a guide, anyway it becomes absolutely evident that electric car service is considerably cheaper.'
                                                    :
                                                    `Прыведзеныя сумы з'яўляюцца арыенціровачнымі, аднак відавочны факт таго, што абслугоўванне электрамабіля значна танней.`)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='btn-green'>
                        {language === 'RU' ?
                            'Рассчитать'
                            :
                            (language === 'EN' ?
                                'Calculate'
                                :
                                'Разлічыць')}
                    </button>
                </form>
            </div>
            <div className='price-page__footer'>
                <div className='wrapper'>
                    <div>
                        <h3 className='mb-16'>
                            {language === 'RU' ?
                                'Остались вопросы?'
                                :
                                (language === 'EN' ?
                                    'Still have questions?'
                                    :
                                    'Засталіся пытанні?')}
                        </h3>
                        <p className='regular-text'>
                            {language === 'RU' ?
                                'Пожалуйста, посетите раздел сайта Маланка который содержит ответы на все, что связано с процессом зарядки электромобиля и даже больше.'
                                :
                                (language === 'EN' ?
                                    'Please, go to page on Malanka website with answers to all questions related to electric car charging and even more.'
                                    :
                                    'Калі ласка, наведайце раздзел сайта Маланка, які змяшчае адказы на ўсё, што звязана з працэсам зарадкі электрамабіля і нават больш.')}
                        </p>
                    </div>
                    <Link to='/help' className='btn-green-outline'>
                        {language === 'RU' ?
                            'Как зарядиться'
                            :
                            (language === 'EN' ?
                                'How to charge'
                                :
                                'Як зарадзіцца')}
                    </Link>
                </div>
            </div> */}
        </main>
    )
}