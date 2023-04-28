import { useEffect, useState } from "react"

export const Pagination = ({ pageQuantity, current, handleChosenPage, actionPrev, actionNext }) => {
    const [pagesNumbers, setPagesNumbers] = useState([]);

    useEffect(() => {
        let pages = [];

        for (let i = 1; i <= pageQuantity; i++) {
            pages.push(i);
        }

        const pagesToState = pages.map(page => {
            if (page === 1 || page === pages.length) {
                return page;
            } else {
                if (current < 5) {
                    return page <= 5 ? page : '...'
                } else if (current > pages.length - 4) {
                    return page >= pages.length - 4 ? page : '...'
                } else if (current > 4 && current < pages.length - 3) {
                    return page >= current - 1 && page <= current + 1 ? page : '...'
                } else {
                    return page;
                }
            }
        });

        const filterPages = pagesToState.filter((page, i) => pagesToState[i] !== pagesToState[i + 1]);

        setPagesNumbers(filterPages);
    }, [current, pageQuantity])


    return (
        <div className='pagination'>
            <button className='pagination__btn-prev' disabled={current === 1 ? true : false} onClick={actionPrev}>
                <svg width="9" height="16" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.99805 1.11963L11.998 11.1196L1.99805 21.1196" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {pagesNumbers && pagesNumbers.map((page, i) => (
                page !== '...' ?
                    <button className={`pagination__button ${current === page ? 'active' : ''}`} onClick={() => {handleChosenPage(page)}} key={i}>{page}</button>
                    :
                    <span key={i}>{page}</span>
            ))}
            <button className='pagination__btn-next' disabled={current === pageQuantity ? true : false} onClick={actionNext}>
                <svg width="9" height="16" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.99805 1.11963L11.998 11.1196L1.99805 21.1196" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    )
}