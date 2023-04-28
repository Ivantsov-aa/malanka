import { Link } from "react-router-dom";
import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import { useEffect } from "react";
import { calculateExpendDay, chargeTypes, expendsList, fuelTypes } from "./CalculatorVariables";
import { useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

let chartFuel;
let chartCharge;

export const Calculator = ({ innerWidth }) => {
    const { language } = useSelector(store => store.localLanguage);

    useEffect(() => {
    }, [language])

    const Result = `
        <div class='result'>
            <div class='result-chart'>
                <div class='chart-side'>
                    <div class='space-between'>
                        <h4>${language === 'RU' ? 'Расход топлива' : (language === 'EN' ? 'Fuel consumption' : 'Расход паліва')}</h4>
                        <p class='list-text'>${language === 'RU' ? 'Вид топлива:' : (language === 'EN' ? 'Type of fuel' : 'Від паліва')} <span class='type-fuel'></span></p>
                    </div >
                    <div>
                        <p class='axes-title'>BYN</p>
                        <canvas id='fuel-chart'></canvas>
                    </div>
                </div >
                <div class='chart-side'>
                    <div class='space-between'>
                        <h4>${language === 'RU' ? 'Расход электричества' : (language === 'EN' ? 'Electricity consumption' : 'Расход электрычнасьці')}</h4>
                        <p class='list-text'>${language === 'RU' ? 'Тип зарядки:' : (language === 'EN' ? 'Type of charging' : 'Тып зарадкі')} <span class='type-charge'></span></p>
                    </div>
                    <div>
                        <p class='axes-title'>BYN</p>
                        <canvas id='charge-chart'></canvas>
                    </div>
                </div>
            </div >
            <div class='result-profit'>
                <img src='/images/svg/profit-icon.svg' alt='malanka' />
                <h4>
                    ${language === 'RU' ? 'Выгода:' : (language === 'EN' ? 'Benefit:' : 'Выгада')} <span class='profit-value'></span> ${language === 'RU' ? 'р / месяц' : (language === 'EN' ? 'BYN/month' : 'р / месяц')}
                </h4>
            </div>
        </div >
    `;

    const loadChartParams = (type, language, data) => {
        return {
            type: 'bar',
            data: {
                labels: language === 'RU' ? ['День', 'Неделя', 'Месяц'] : (language === 'EN' ? ['Day', 'Week', 'Month'] : ['День', 'Неделя', 'Месяц']),
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
        fuelValue.innerText = fuelTypes[data.fuel].title;
        profitValue.innerText = Math.floor(calculateExpendDay('fuel', data) * 30.41 - calculateExpendDay('charge', data) * 30.41);

        if (chartFuel) {
            chartFuel.destroy();
            chartFuel = new Chart(fuelChart, loadChartParams('fuel', language, data));
        } else {
            chartFuel = new Chart(fuelChart, loadChartParams('fuel', language, data));
        }

        fuelChart.parentElement.parentElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    const loadChartCharge = (data) => {
        const chargeChart = document.querySelector('#charge-chart');
        const chargeValue = document.querySelector('.type-charge');
        chargeValue.innerText = chargeTypes[data.charge].title;

        if (chartCharge) {
            chartCharge.destroy();
            chartCharge = new Chart(chargeChart, loadChartParams('charge', language, data));
        } else {
            chartCharge = new Chart(chargeChart, loadChartParams('charge', language, data));
        }

        chargeChart.parentElement.parentElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    const onSubmit = () => {
        const result = document.querySelector('.result');
        const block = document.querySelector('.calculator .block');
        let data = {};
        const inputs = document.querySelectorAll('input');

        inputs.forEach(input => {
            if (input.type === 'radio' && input.checked) {
                data[input.name] = +input.value;
            } else {
                data[input.name] = +input.value;
            }
        })

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
        <main className='calculator' data-id='87' count='1'>
            <div className='block'>
                <Breadcrumbs currentPage='Калькулятор стоимости' />
                <h2>Рассчитайте свою выгоду</h2>
                <form className='calculator-form pb-128'>
                    <div className='calculator-form__step mb-64'>
                        <div className='title'>
                            <div className='count'>
                                1
                            </div>
                            <h4>Количество километров в день</h4>
                        </div>
                        <input type='number' className='mw-439' required placeholder='Введите ваш километраж' name='mileage' />
                    </div>
                    <div className='calculator-form__step mb-64'>
                        <div className='title'>
                            <div className='count'>
                                2
                            </div>
                            <h4>Средний расход <span>(на 100 км)</span></h4>
                        </div>
                        <div className='step-wrap'>
                            <div className='step-col'>
                                <div className='step-col__fields'>
                                    <h4>Топливо</h4>
                                    <div className='row-top'>
                                        <div className='flex-block'>
                                            <h6>Расход на 100 км</h6>
                                            <input type='number' className='mw-280' defaultValue={10} name='expend_fuel' />
                                        </div>
                                        <div className='radio-wrap'>
                                            <h6>Вид топлива</h6>
                                            <div className='radio-container'>
                                                {fuelTypes.map((fuel, i) => (
                                                    <div className='radio vertical' key={i}>
                                                        <input type='radio' defaultChecked={i === 0} id={fuel.title} value={i} name='fuel' />
                                                        <label htmlFor={fuel.title}>{fuel.title}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row-bottom' direction='column' gap={16}>
                                        <div className='table-row'>
                                            <h6>Вид ТО</h6>
                                            <h6>Стоимость в BYN/год</h6>
                                        </div>
                                        {expendsList.map((item, i) => (
                                            <div className='table-row' key={i}>
                                                <p className='regular-text'>{item.title}</p>
                                                <input type='number' defaultValue={item.value} className='mw-239' name={item.name} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='step-col'>
                                <div className='step-col__fields' gap={32}>
                                    <h4>Электричество</h4>
                                    <div className='row-top' direction={(innerWidth <= 1024 && innerWidth > 768) || innerWidth < 500 ? 'column' : 'row'} gap={64}>
                                        <div className='flex-block' direction='column' gap={24}>
                                            <h6>Расход на 100 км</h6>
                                            <input type='number' defaultValue={18} className='mw-280' name='expend_charge' />
                                        </div>
                                        <div className='radio-wrap'>
                                            <h6>Тип зарядки</h6>
                                            <div className='radio-container vertical'>
                                                {chargeTypes.map((fuel, i) => (
                                                    <div className='radio' key={i}>
                                                        <input type='radio' defaultChecked={i === 0} id={fuel.title} value={i} name='charge' />
                                                        <label htmlFor={fuel.title}>{fuel.title}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row-bottom' direction='column' gap={16}>
                                        <p className='regular-text'>
                                            Для автомобиля и электромобиля рекомендуемое сервисное обслуживание составляет 2 года или 30 000 км. В среднем, обслуживание авто с ДВС в течение первых 12 лет его эксплуатации составляет от 10 000 до 12 000 тысяч белорусских рублей, а электрического – в среднем около 3 900 белорусских рублей.
                                        </p>
                                        <p className='regular-text bold'>
                                            Приведенные суммы являются ориентировочными, однако очевиден факт того, что обслуживание электромобиля значительно дешевле.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='btn-green'>Рассчитать</button>
                </form>
            </div>
            <div className='price-page__footer'>
                <div className='wrapper'>
                    <div>
                        <h3 className='mb-16'>Остались вопросы?</h3>
                        <p className='regular-text'>Пожалуйста, посетите раздел сайта Маланка который содержит ответы на все, что связано с процессом зарядки электромобиля и даже больше.</p>
                    </div>
                    <Link to='/help' className='btn-green-outline'>Как зарядится</Link>
                </div>
            </div>
        </main>
    )
}