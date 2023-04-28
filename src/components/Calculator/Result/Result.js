export const Result = `<div class='result'>
    <div class='result-chart'>
        <div class='chart-side'>
            <div class='space-between'>
                <h4>Расход топлива</h4>
                <p class='list-text'>Вид топлива: <span class='type-fuel'></span></p>
            </div>
            <div>
                <p class='axes-title'>BYN</p>
                <canvas id='fuel-chart'></canvas>
            </div>
        </div>
        <div class='chart-side'>
            <div class='space-between'>
                <h4>Расход электричества</h4>
                <p class='list-text'>Тип зарядки: <span class='type-charge'></span></p>
            </div>
            <div>
                <p class='axes-title'>BYN</p>
                <canvas id='charge-chart'></canvas>
            </div>
        </div>
    </div>
    <div class='result-profit'>
        <img src='/images/svg/profit-icon.svg' alt='malanka' />
        <h4>Выгода: <span class='profit-value'></span> р / месяц</h4>
    </div>
</div>`;