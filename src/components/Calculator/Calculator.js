import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import { useEffect } from "react";
import { calculateExpendDay, chargeTypes, expendsList, fuelTypes } from "./CalculatorVariables";
import { useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
import { handlerPageData } from "../../services/handlerPageData";
import { convertLink } from "../../services/convertLink";
Chart.register(...registerables);

let chartFuel;
let chartCharge;

export const Calculator = ({ innerWidth }) => {
    const { language } = useSelector(store => store.localLanguage);
    const navigate = useNavigate();

    useEffect(() => {
        loadPage();
    }, [language])

    const loadPage = () => {
        const main = document.querySelector('main');

        handlerPageData().getContent(87, 1)
            .then(result => {
                const parser = new DOMParser();
                const page = parser.parseFromString(result, 'text/html').querySelector('main');
                convertLink(page.querySelectorAll('a'), navigate);
                main.innerHTML = page.innerHTML;
                main.querySelector('form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    onSubmit();
                })
            })
    }

    const Result = `
        <div class='result'>
            <div class='result-chart'>
                <div class='chart-side'>
                    <div class='space-between'>
                        <h4>${language === 'RU' ? 'Расход топлива' : (language === 'EN' ? 'Fuel consumption' : 'Расход паліва')}</h4>
                        <p class='list-text'>${language === 'RU' ? 'Вид топлива:' : (language === 'EN' ? 'Type of fuel:' : 'Від паліва:')} <span class='type-fuel'></span></p>
                    </div >
                    <div>
                        <p class='axes-title'>BYN</p>
                        <canvas id='fuel-chart'></canvas>
                    </div>
                </div >
                <div class='chart-side'>
                    <div class='space-between'>
                        <h4>${language === 'RU' ? 'Расход электричества' : (language === 'EN' ? 'Electricity consumption' : 'Расход электрычнасьці')}</h4>
                        <p class='list-text'>${language === 'RU' ? 'Тип зарядки:' : (language === 'EN' ? 'Type of charging:' : 'Тып зарадкі:')} <span class='type-charge'></span></p>
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
        fuelValue.innerText = language === 'RU' ? fuelTypes[data.fuel].titleRus : (language === 'EN' ? fuelTypes[data.fuel].titleEng : fuelTypes[data.fuel].titleBel);
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
        chargeValue.innerText = language === 'RU' ? chargeTypes[data.charge].titleRus : (language === 'EN' ? chargeTypes[data.charge].titleEng : chargeTypes[data.charge].titleBel);

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
            }

            if (input.type !== 'radio') {
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
        <main className='calculator' data-id='87' data-count='1'>
            <div className='block'>
                <Breadcrumbs currentPage='Калькулятар' />
                <h2>Разлічыце сваю выгаду</h2>
                <form className='calculator-form pb-128'>
                    <div className='calculator-form__step mb-64'>
                        <div className='title'>
                            <div className='count'>
                                1
                            </div>
                            <h4>Колькасць кіламетраў у дзень</h4>
                        </div>
                        <input type='number' className='mw-439' required placeholder='Увядзіце ваш кіламетраж' name='mileage' />
                    </div>
                    <div className='calculator-form__step mb-64'>
                        <div className='title'>
                            <div className='count'>
                                2
                            </div>
                            <h4>Сярэдні расход <span>(на 100 км)</span></h4>
                        </div>
                        <div className='step-wrap'>
                            <div className='step-col'>
                                <div className='step-col__fields'>
                                    <h4>Паліва</h4>
                                    <div className='row-top'>
                                        <div className='flex-block'>
                                            <h6>Расход на 100 км</h6>
                                            <input type='number' className='mw-280' defaultValue={10} name='expend_fuel' />
                                        </div>
                                        <div className='radio-wrap'>
                                            <h6>Від паліва</h6>
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
                                            <h6>Від ТА</h6>
                                            <h6>Кошт у BYN/год</h6>
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
                                    <h4>Электрычнасьць</h4>
                                    <div className='row-top' direction={(innerWidth <= 1024 && innerWidth > 768) || innerWidth < 500 ? 'column' : 'row'} gap={64}>
                                        <div className='flex-block' direction='column' gap={24}>
                                            <h6>Расход на 100 км</h6>
                                            <input type='number' defaultValue={18} className='mw-280' name='expend_charge' />
                                        </div>
                                        <div className='radio-wrap'>
                                            <h6>Тып зарадкі</h6>
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
                                            Для аўтамабіля і электрамабіля рэкамендаванае сэрвіснае абслугоўванне складае 2 гады, або 30 000 км. У сярэднім, абслугоўванне аўто з РУЗ на працягу першых 12 гадоў яго эксплуатацыі складае ад 10 000 да 12 000 тысяч беларускіх рублёў, а электрычнага – у сярэднім каля 3 900 беларускіх рублёў.
                                        </p>
                                        <p className='regular-text bold'>
                                            Прыведзеныя сумы з'яўляюцца арыенціровачнымі, аднак відавочны факт таго, што абслугоўванне электрамабіля значна танней.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='btn-green'>Разлічыць</button>
                </form>
            </div>
            <div className='price-page__footer'>
                <div className='wrapper'>
                    <div>
                        <h3 className='mb-16'>Засталіся пытанні?</h3>
                        <p className='regular-text'>Калі ласка, наведайце раздзел сайта Маланка, які змяшчае адказы на ўсё, што звязана з працэсам зарадкі электрамабіля і нават больш.</p>
                    </div>
                    <Link to='/help' className='btn-green-outline'>Як зарадзіцца</Link>
                </div>
            </div>
        </main>
    )
}