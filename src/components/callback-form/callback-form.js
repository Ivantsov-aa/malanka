import { Link } from "react-router-dom"
import { Select } from "../select/select"
import { FlexWrap } from "../FlexWrap/FlexWrap"
import { useSelector } from "react-redux";

export const CallbackForm = ({ formFields, formSelect, formCheckbox, formRadioBtns }) => {
    const { language } = useSelector(store => store.localLanguage);
    return (
        <form className='callback-form'>
            {!formFields ?
                <>
                    <input type='text' placeholder={language === 'RU' ? 'Ваше имя' : (language === 'EN' ? 'Your name' : 'Ваша імя')} />
                    <input type='text' pattern={/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}/gi} placeholder={language === 'RU' ? 'Электронная почта' : (language === 'EN' ? 'E-mail' : 'Электронная пошта')} />
                </>
                :
                formFields.map((field, i) => (
                    <input name={field.name} type={field.type} placeholder={field.placeholder} key={i} />
                ))
            }
            {formSelect &&
                <input type="text" placeholder={formSelect[0].value} />
            }
            {formRadioBtns &&
                <div className='radio-btns__wrapper' direction='column' gap={16}>
                    <p className='regular-text medium'>{language === 'RU' ?
                        'Предполагаемое кол-во станций в сети *'
                        :
                        (language === 'EN' ?
                            'Pre-estimated number of stations within a network'
                            :
                            'Меркаваная колькасць станцый у сетцы'
                        )}</p>
                    <div className='radio-btns' gap={24}>
                        {formRadioBtns.map((item, i) => (
                            <div key={i}>
                                <input id={item.id} type='radio' name={item.name} value={item.value} key={i} />
                                <label className='radio' htmlFor={item.id}>
                                    <span className='regular-text medium'>{item.value}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            }
            <textarea placeholder={language === 'RU' ? 'Комментарий' : (language === 'EN' ? 'Message' : 'Паведамленне')} maxLength='150' />
            {formCheckbox && <div className='checkbox-btns' gap={24} wrap>
                {formCheckbox.map((item, i) => (
                    <div key={i}>
                        <input id={item.name} type='checkbox' name={item.name} value={item.value} />
                        <label htmlFor={item.name}>
                            {item.value}
                        </label>
                    </div>
                ))}
            </div>}
            <input type='checkbox' id='personal-agreement' />
            <label htmlFor='personal-agreement'>
                <span>
                    {language === 'RU' ?
                        <>
                            Я даю согласие на обработку <Link to='/'>Персональных данных</Link>
                        </>
                        :
                        (language === 'EN' ?
                            <>
                                I agree to <Link to='/'>Personal Data Processing</Link>
                            </>
                            :
                            <>
                                Я даю згоду на апрацоўку <Link to='/'>персанальных даных</Link>
                            </>
                        )
                    }
                </span>
            </label>
            <button className='btn-green'>{language === 'RU' ? 'Отправить' : (language === 'EN' ? 'Send' : 'Адправіць')}</button>
        </form>
    )
}