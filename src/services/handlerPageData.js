import {url} from '../components/admin/AuthForm/AuthForm';
import { handlerLocalStorage } from './handlerLocalStorage';
import {renameImageSources} from './sourceConvert';

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
            await fetch(`${url}/page/${requestId}`)
                .then(response => response.json())
                .then(result => page = result.body);
            
            if (page) {
                return renameImageSources(page);
            }
        }
    }

    return {
        getContent
    }
}