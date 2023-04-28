import { useEffect } from "react"
import { FlexWrap } from "../../FlexWrap/FlexWrap"
import { CalculatorFormBlockStyled } from "../Calculator.style"
import { ResultProfitStyled, ResultStyled } from "./Result.style"
import Chart from "chart.js/auto"
import { useSelector } from "react-redux"

function sum() {
    let result = 0;

    for (let i = 0; i < arguments.length; i++) {
        result += arguments[i];
    }

    return result;
}

const calculateFuelExpend = (mileage, expendFuel, ratio) => {
    return (mileage / 100) * (expendFuel * ratio);
}

const convertExpendYearsToDay = (expend) => {
    return expend / 365;
}

export const Result = ({ data, fuelTypes, chargeTypes }) => {
    const { language } = useSelector(store => store.localLanguage);

    useEffect(() => {
        loadChartFuel();
        loadChartCharge();
    }, []);

    const calculateExpendDay = (type) => {
        if (type === 'fuel') {
            return +sum(
                calculateFuelExpend(data.mileage, data.expend_fuel, fuelTypes[data.fuel].ratio),
                convertExpendYearsToDay(data.oil),
                convertExpendYearsToDay(data.air_filter),
                convertExpendYearsToDay(data.brake_pads),
                convertExpendYearsToDay(data.fuel_filter),
                convertExpendYearsToDay(data.candle),
                convertExpendYearsToDay(data.grm)
            ).toFixed(2);
        } else {
            return (
                calculateFuelExpend(data.mileage, data.expend_charge, chargeTypes[data.charge].ratio)
            ).toFixed(2);
        }
    }

    const loadChartParams = (type) => {
        return {
            type: 'bar',
            data: {
                labels: language === 'RU' ? ['День', 'Неделя', 'Месяц'] : (language === 'EN' ? ['Day', 'Week', 'Month'] : ['День', 'Неделя', 'Месяц']),
                datasets: [{
                    label: false,
                    data: [
                        calculateExpendDay(type === 'fuel' ? 'fuel' : ''),
                        calculateExpendDay(type === 'fuel' ? 'fuel' : '') * 7,
                        calculateExpendDay(type === 'fuel' ? 'fuel' : '') * 30.41,
                    ],
                    borderWidth: 1,
                    backgroundColor: type === 'fuel' ? '#A3A3A7' : '#76D275'
                }]
            },
            options: {
                scales: {
                    y: {
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

    const loadChartFuel = () => {
        const fuelChart = document.querySelector('#fuel-chart');

        let chart = new Chart(fuelChart, loadChartParams('fuel'));
        console.log(fuelChart);
        chart.destroy();
        chart = new Chart(fuelChart, loadChartParams('fuel'));
    }

    const loadChartCharge = () => {
        const chargeChart = document.querySelector('#charge-chart');

        let chart = new Chart(chargeChart, loadChartParams());
        chart.destroy();
        chart = new Chart(chargeChart, loadChartParams());
    }

    return (
        <div className='result'>
            <div className='result-chart'>
                <div className='chart-side'>
                    <div className='space-between'>
                        <h4>Расход топлива</h4>
                        <p className='list-text'>Вид топлива: {fuelTypes[data.fuel].title}</p>
                    </div>
                    <canvas id='fuel-chart'></canvas>
                </div>
                <div className='chart-side'>
                    <div className='space-between'>
                        <h4>Расход электричества</h4>
                        <p className='list-text'>Тип зарядки: {chargeTypes[data.charge].title}</p>
                    </div>
                    <canvas id='charge-chart'></canvas>
                </div>
            </div>
            <div className='result-profit'>
                <div className='img__wrapper'>
                    <img src='/images/svg/green-checked.svg' alt='malanka' />
                </div>
                <h4>Benefit: <span>{Math.floor(calculateExpendDay('fuel') * 30.41 - calculateExpendDay() * 30.41)}</span> BYN/month</h4>
            </div>
        </div>
    )
}