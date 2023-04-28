export const fuelTypes = [
    {
        titleRus: 92,
        titleEng: 92,
        titleBel: 92,
        ratio: 2.3
    },
    {
        titleRus: 95,
        titleEng: 95,
        titleBel: 95,
        ratio: 2.4
    },
    {
        titleRus: 98,
        titleEng: 98,
        titleBel: 98,
        ratio: 2.62
    },
    {
        titleRus: 'ДТ',
        titleEng: 'DF',
        titleBel: 'ДП',
        ratio: 2.4
    },
];

export const chargeTypes = [
    {
        titleRus: 'Быстрая',
        titleEng: 'Fast',
        titleBel: 'Хуткая',
        ratio: 0.4
    },
    {
        title: 'Медленная',
        titleEng: 'Slow',
        titleBel: 'Павольная',
        ratio: 0.4
    },
];

export const expendsList = [
    {
        titleRus: 'Масло моторное, Фильтр масляный',
        titleEng: 'Motor oil, oil filter',
        titleBel: 'Масла маторнае, фільтр масляны',
        name: 'oil',
        value: 300
    },
    {
        titleRus: 'Фильтр воздушный двигателя',
        titleEng: 'Engine air filter',
        titleBel: 'Фільтр паветраны рухавіка',
        name: 'air_filter',
        value: 81
    },
    {
        titleRus: 'Колодки и диски тормозные',
        titleEng: 'Brake pads and brake discs',
        titleBel: 'Калодкі і дыскі тармазныя',
        name: 'brake_pads',
        value: 300
    },
    {
        titleRus: 'Фильтр топливный',
        titleEng: 'Fuel filters',
        titleBel: 'Фільтр паліўны',
        name: 'fuel_filter',
        value: 150
    },
    {
        titleRus: 'Свечи зажигания/накаливания',
        titleEng: 'Spark plugs and glow plugs',
        titleBel: 'Свечкі запальвання/напальвання',
        name: 'candle',
        value: 100
    },
    {
        titleRus: 'Замена комплекта ГРМ, помпы, охлаждающей жидкости',
        titleEng: 'Replacement of a timing kit, a pump and cooling liquid',
        titleBel: 'Замена камплекту ГРМ, помпы, астуджальнай вадкасці',
        name: 'grm',
        value: 200
    },
];

export function sum() {
    let result = 0;

    for (let i = 0; i < arguments.length; i++) {
        result += arguments[i];
    }

    return result;
}

export const calculateFuelExpend = (mileage, expendFuel, ratio) => {
    return (mileage / 100) * (expendFuel * ratio);
}

export const convertExpendYearsToDay = (expend) => {
    return expend / 365;
}

export const calculateExpendDay = (type, data) => {
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