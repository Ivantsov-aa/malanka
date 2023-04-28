import { useSelector } from "react-redux"
import { FlexWrap } from "../FlexWrap/FlexWrap"

export const PriceTableCol = ({ title, power, listOfBenefits, listOfExpenses }) => {
    const { language } = useSelector(store => store.localLanguage);
    return (
        <section className='price-page__table-col'>
            <div className='price-page__table-row'>
                <div className='title'>
                    <h4>{title}</h4>
                    <h4>{power}</h4>
                </div>
                <ul className='icon-point'>
                    {listOfBenefits.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className='price-page__table-row'>
                {listOfExpenses.map((el, i) => (
                    <div className='flex-wrapper' key={i}>
                        <h6>
                            {el.power}
                        </h6>
                        <div>
                            <h6>{el.title}</h6>
                            {el.watt && <p><span>{language === 'RU' ? 'Мощность' : (language === 'EN' ? 'Power' : 'Магутнасць')}</span>{el.watt}</p>}
                            <p>{el.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}