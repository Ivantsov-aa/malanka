import { handlerLocalStorage } from './handlerLocalStorage';

export const handlerPageData = () => {
    const getContent = async (id, count) => {
        let requestId;
        const language = handlerLocalStorage().get('language');

        switch (language) {
            case 'RU':
                requestId = id;
                break;
            case 'EN':
                requestId = id + count;
                break;
            case 'BY':
                requestId = id + count + 1;
                break;
            default:
                break;
        }

        if (requestId) {
            let page;
            await fetch(`http://89.223.71.123:8080/malanka/page/${requestId}`)
                .then(response => response.json())
                .then(result => page = result.body);
            
            if (page) {
                return page;
            }
        }
    }

    return {
        getContent
    }
}