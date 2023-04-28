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
                <Breadcrumbs currentPage='Calculator' />
                <h2>Calculate your savings</h2>
                <form className='calculator-form pb-128'>
                    <div className='calculator-form__step mb-64'>
                        <div className='title'>
                            <div className='count'>
                                1
                            </div>
                            <h4>Kilometers/day</h4>
                        </div>
                        <input type='number' className='mw-439' required placeholder='Enter your mileage' name='mileage' />
                    </div>
                    <div className='calculator-form__step mb-64'>
                        <div className='title'>
                            <div className='count'>
                                2
                            </div>
                            <h4>Average consumption <span>(per 100 km)</span></h4>
                        </div>
                        <div className='step-wrap'>
                            <div className='step-col'>
                                <div className='step-col__fields'>
                                    <h4>Fuel</h4>
                                    <div className='row-top'>
                                        <div className='flex-block'>
                                            <h6>Consumption per 100 km</h6>
                                            <input type='number' className='mw-280' defaultValue={10} name='expend_fuel' />
                                        </div>
                                        <div className='radio-wrap'>
                                            <h6>Type of fuel</h6>
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
                                            <h6>Type of servicing</h6>
                                            <h6>Price BYN/year</h6>
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
                                    <h4>Electricity</h4>
                                    <div className='row-top' direction={(innerWidth <= 1024 && innerWidth > 768) || innerWidth < 500 ? 'column' : 'row'} gap={64}>
                                        <div className='flex-block' direction='column' gap={24}>
                                            <h6>Consumption per 100 km</h6>
                                            <input type='number' defaultValue={18} className='mw-280' name='expend_charge' />
                                        </div>
                                        <div className='radio-wrap'>
                                            <h6>Type of charging</h6>
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
                                            Recommended servicing for cars and electric vehicles is 2 years or 30 000 km. On the average, the cost of servicing for a car with engine during first 12 years is rated between 10 000 to 12 000 BYN. While the cost of electric car servicing is about 3 900 BYN.
                                        </p>
                                        <p className='regular-text bold'>
                                            The figures above are a guide, anyway it becomes absolutely evident that electric car service is considerably cheaper.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='btn-green'>Calculate</button>
                </form>
            </div>
            <div className='price-page__footer'>
                <div className='wrapper'>
                    <div>
                        <h3 className='mb-16'>Still have questions?</h3>
                        <p className='regular-text'>Please, go to page on Malanka website with answers to all questions related to electric car charging and even more.</p>
                    </div>
                    <Link to='/help' className='btn-green-outline'>How to charge</Link>
                </div>
            </div>
        </main>
    )
}