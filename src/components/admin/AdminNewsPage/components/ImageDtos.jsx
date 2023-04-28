import {useState} from "react";
import {ContentEditControlContainerStyled, ContentEditControlStyled} from "../AdminNewsPage.style"
import {useRef} from "react";

export const ImageDtos = ({item, i, setNotification, token, handleReplaceRows, handleDelete}) => {
    const [bannerImage, setBannerImage] = useState(item.imageLink);
    const [formDataImage, setFormDataImage] = useState(null);

    const uploadBanner = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        const fileToRequest = new FormData();
        fileToRequest.append('file', e.target.files[0]);

        reader.onload = () => {
            setBannerImage(reader.result);
            setFormDataImage(fileToRequest);
        }

        reader.readAsDataURL(file);
    }

    const uploadBannerToServer = async () => {
        await fetch(`http://89.223.71.123:8080/malanka/article/image/484?type=BANNER&position=${item.position}&horizontalPosition=0`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formDataImage
        })
            .then(response => response.json())
            .then(result => {
                setBannerImage(`http://89.223.71.123:8080/malanka/image/${result.id}`);
                setNotification({icon: '/images/svg/success-icon.svg', description: 'Изображение добавлено'});
            })
    }

    return (
        <ContentEditControlContainerStyled className='news-page__cover mb-16' row={item.position}>
            <ContentEditControlStyled justify='flex-end' gap={32}>
                <button type='button' onClick={() => handleReplaceRows(item.position, 'top')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.92 15.05L13.4 8.53001C12.63 7.76001 11.37 7.76001 10.6 8.53001L4.07999 15.05" stroke="black" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button type='button' onClick={() => handleReplaceRows(item.position, 'bottom')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.92 8.95001L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.07999 8.95001" stroke="black" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button
                    type='button'
                    onClick={() => handleDelete(i)}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 5V22H19.5V5H4.5Z" stroke="black" strokeWidth="3" strokeLinejoin="round" />
                        <path d="M10 10V16.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 10V16.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 5H22" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 5L9.6445 2H14.3885L16 5H8Z" stroke="black" strokeWidth="3" strokeLinejoin="round" />
                    </svg>
                </button>
                <button
                    type='button'
                    onClick={uploadBannerToServer}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L10 17L20 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </ContentEditControlStyled>
            <label>
                <img src={bannerImage} alt='news-cover' style={{width: item.style.width, height: item.style.height + 'px'}} />
                <input type='file' accept='image/*' onChange={uploadBanner} />
            </label>
        </ContentEditControlContainerStyled>
    )
}