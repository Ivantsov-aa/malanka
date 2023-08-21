import {useState} from "react"

export const Select = ({form, title, list, action, primary}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`select${primary ? '_primary' : ''} ${form ? 'form' : ''} ${isOpen ? 'active' : ''}`}>
            <div
                className={`select__header ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.8" d="M9.86522 12.7243L10 12.8472L10.1348 12.7243L16.1333 7.25264L17.7032 8.68464L10 15.7112L2.29677 8.68464L3.86667 7.25264L9.86522 12.7243Z" fill="#7A7A95" stroke="#FFF" strokeWidth="0.4" />
                </svg>
            </div>
            {
                isOpen &&
                <ul className='select__list'>
                    {list.map((item, i) => (
                        <li className='select__list-item' onClick={() => {
                            action(item);
                            setIsOpen(false);
                        }} key={i}>{item.name}</li>
                    ))}
                </ul>
            }
        </div>
    )
}