import {useEffect, useRef, useState} from "react"
import {MediaUploaderContentStyled, MediaUploaderNavItemStyled, MediaUploaderNavStyled, MediaUploaderPreviewStyled, MediaUploaderStyled, UploaderButtonStyled} from "./MediaUploader.style"
import {FlexWrap} from "../FlexWrap/FlexWrap";
import Button from "../Button/button";
import {Input} from "../Input/Input";
import {useSelector} from "react-redux";

const formRadioBtns = [
    {
        id: 'image',
        name: 'type',
        value: 'Изображение',
    },
    {
        id: 'adv',
        name: 'type',
        value: 'Реклама',
    }
];

export const MediaUploader = ({setUploaderTarget, target, type, direct, y}) => {
    const [mediaType, setMediaType] = useState(type);
    const [image, setImage] = useState('');
    const [videoPath, setVideoPath] = useState('');
    const [advLink, setAdvLink] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const uploaderRef = useRef();
    const [imageType, setImageType] = useState('image');
    const [videoType, setVideoType] = useState('video');

    const {userInfo} = useSelector(store => store.authAdmin);

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        document.body.classList.add('scroll-disable');
        setImage(target.getAttribute('src'));
        if (type === 'video') {
            setVideoLink(target.children[0].src);
        }

        if (direct) {
            setImageType(direct);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
            document.body.classList.remove('scroll-disable');
        }
    }, []);

    const handleClickOutside = (e) => {
        if (uploaderRef.current && !uploaderRef.current.contains(e.target)) {
            setUploaderTarget(null);
        }
    }

    const uploadMedia = async (e, type) => {
        const fileToRequest = new FormData();
        fileToRequest.append('file', e.target.files[0]);

        if (type === 'image') {
            await fetch('http://89.223.71.123:8080/malanka/image', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: fileToRequest
            })
                .then(response => response.json())
                .then(result => {
                    if (result.generatedFilename) {
                        const mediaFile = `http://89.223.71.123:8080/malanka/unsecure/image/${result.generatedFilename}`;
                        setImage(mediaFile);
                        target.setAttribute('src', mediaFile);
                    }
                })
        } else {
            await fetch('http://89.223.71.123:8080/malanka/video', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: fileToRequest
            })
                .then(response => response.json())
                .then(result => {
                    if (result.generatedFilename) {
                        const mediaFile = `http://89.223.71.123:8080/malanka/unsecure/video/${result.generatedFilename}`;
                        setVideoLink(mediaFile);
                    }
                })
        }
    }

    const uploadAdvertising = () => {
        const template = `<a href=${advLink} class='advertising-img' target='_blank'><img src="${image}" alt='malanka' /></a>`;
        if (direct) {
            if (y < 200) {
                target.insertAdjacentHTML('beforebegin', template);
            } else {
                target.insertAdjacentHTML('afterend', template);
            }
        } else {
            target.outerHTML = `<a href=${advLink} target='_blank'>${target.outerHTML}</a>`;
        }
    }

    const uploadImageContent = () => {
        return (
            <MediaUploaderContentStyled>
                <FlexWrap gap={32}>
                    <FlexWrap direction='column' gap={32}>
                        <FlexWrap justify='space-between' align='center' gap={32}>
                            <Button
                                className={imageType === 'image' ? 'active' : ''}
                                primary={imageType === 'image' ? true : false}
                                onClick={() => setImageType('image')}
                            >Изображение</Button>
                            <Button
                                className={imageType === 'adv' ? 'active' : ''}
                                primary={imageType === 'adv' ? true : false}
                                onClick={() => setImageType('adv')}
                            >Реклама</Button>
                        </FlexWrap>
                        <MediaUploaderPreviewStyled>
                            <img src={image ? image : '/images/svg/image-plug.svg'} alt='malanka' />
                        </MediaUploaderPreviewStyled>
                        <FlexWrap direction='column' align='center' justify='center' gap={32}>
                            {imageType === 'adv' &&
                                <Input placeholder='Введите ссылку на рекламодателя, пример: https://malankabn.by' value={advLink} onChange={(e) => setAdvLink(e.target.value)} />
                            }
                            <FlexWrap justify='space-between' gap={32}>
                                <UploaderButtonStyled>
                                    <input type='file' accept="image/*" onChange={(e) => uploadMedia(e, 'image')} />
                                    Загрузить изображение
                                </UploaderButtonStyled>
                                {imageType === 'adv' &&
                                    <Button
                                        disabled={/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/gi.test(advLink) ? false : true}
                                        primary
                                        onClick={uploadAdvertising}
                                    >
                                        Добавить рекламу
                                    </Button>
                                }
                            </FlexWrap>
                        </FlexWrap>
                    </FlexWrap>
                </FlexWrap>
            </MediaUploaderContentStyled>
        )
    }

    const uploadVideoContent = () => {
        return (
            <MediaUploaderContentStyled>
                <FlexWrap gap={32}>
                    <FlexWrap direction='column' gap={32}>
                        <MediaUploaderPreviewStyled>
                            {videoLink.includes('http://89.223.71.123:8080') ?
                                <div className='video-block__container'>
                                    <video width='100%' height='100%' src={videoLink} />
                                    <button className='play-btn' onClick={(e) => {
                                        const previewVideo = e.target.parentElement.children[0];
                                        if (previewVideo.paused) {
                                            previewVideo.play();
                                            e.target.parentElement.classList.add('play');
                                        } else {
                                            previewVideo.pause();
                                            e.target.parentElement.classList.remove('play');
                                        }
                                    }}>
                                        <div className='icon-wrapper'>
                                            <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M34 0.259766C27.3311 0.259766 20.8119 2.23734 15.2669 5.9424C9.72186 9.64746 5.40004 14.9136 2.84795 21.0749C0.29586 27.2362 -0.371884 34.0159 0.929162 40.5567C2.23021 47.0975 5.44161 53.1056 10.1573 57.8213C14.8729 62.5369 20.881 65.7483 27.4218 67.0494C33.9626 68.3504 40.7423 67.6827 46.9036 65.1306C53.0649 62.5785 58.3311 58.2567 62.0361 52.7116C65.7412 47.1666 67.7188 40.6475 67.7188 33.9785C67.7016 25.041 64.1436 16.4745 57.8238 10.1547C51.5041 3.83491 42.9375 0.276904 34 0.259766ZM45.8016 36.1508L30.2391 46.5258C29.8098 46.7914 29.3172 46.9369 28.8125 46.9473C28.3848 46.9469 27.9629 46.847 27.5805 46.6555C27.1658 46.4317 26.82 46.0991 26.58 45.6935C26.3401 45.288 26.2152 44.8247 26.2188 44.3535V23.6035C26.2152 23.1323 26.3401 22.6691 26.58 22.2635C26.82 21.8579 27.1658 21.5254 27.5805 21.3016C27.9968 21.0908 28.4608 20.9919 28.9269 21.0147C29.393 21.0374 29.8452 21.181 30.2391 21.4313L45.8016 31.8063C46.1628 32.042 46.4596 32.364 46.665 32.7433C46.8704 33.1226 46.978 33.5472 46.978 33.9785C46.978 34.4099 46.8704 34.8344 46.665 35.2137C46.4596 35.593 46.1628 35.9151 45.8016 36.1508Z" fill="#F4F4FD" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                                :
                                <iframe src={videoLink} title="Malanka video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            }
                        </MediaUploaderPreviewStyled>
                        <FlexWrap direction='column' align='center' justify='center' gap={32}>
                            <Input placeholder='Введите ссылку для загрузки видео' value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
                            <FlexWrap justify='space-between' gap={32}>
                                <UploaderButtonStyled>
                                    <input type='file' accept="video/*" onChange={(e) => uploadMedia(e, 'video')} />
                                    Загрузить видео
                                </UploaderButtonStyled>
                                <Button
                                    primary
                                    onClick={uploadVideo}
                                >
                                    Добавить видео
                                </Button>
                            </FlexWrap>
                        </FlexWrap>
                    </FlexWrap>
                </FlexWrap>
            </MediaUploaderContentStyled >
        )
    }

    const uploadVideo = () => {
        const videoTag = target.children[0];
        if (videoLink.includes('http://89.223.71.123:8080')) {
            if (videoTag === 'VIDEO') {
                videoTag.src = videoLink;
            } else {
                videoTag.remove();
                const videoTemplate = `
                    <video width="100%" height="100%" src="${videoLink}"></video>
                    <button class="play-btn">
                        <div class="icon-wrapper">
                            <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34 0.259766C27.3311 0.259766 20.8119 2.23734 15.2669 5.9424C9.72186 9.64746 5.40004 14.9136 2.84795 21.0749C0.29586 27.2362 -0.371884 34.0159 0.929162 40.5567C2.23021 47.0975 5.44161 53.1056 10.1573 57.8213C14.8729 62.5369 20.881 65.7483 27.4218 67.0494C33.9626 68.3504 40.7423 67.6827 46.9036 65.1306C53.0649 62.5785 58.3311 58.2567 62.0361 52.7116C65.7412 47.1666 67.7188 40.6475 67.7188 33.9785C67.7016 25.041 64.1436 16.4745 57.8238 10.1547C51.5041 3.83491 42.9375 0.276904 34 0.259766ZM45.8016 36.1508L30.2391 46.5258C29.8098 46.7914 29.3172 46.9369 28.8125 46.9473C28.3848 46.9469 27.9629 46.847 27.5805 46.6555C27.1658 46.4317 26.82 46.0991 26.58 45.6935C26.3401 45.288 26.2152 44.8247 26.2188 44.3535V23.6035C26.2152 23.1323 26.3401 22.6691 26.58 22.2635C26.82 21.8579 27.1658 21.5254 27.5805 21.3016C27.9968 21.0908 28.4608 20.9919 28.9269 21.0147C29.393 21.0374 29.8452 21.181 30.2391 21.4313L45.8016 31.8063C46.1628 32.042 46.4596 32.364 46.665 32.7433C46.8704 33.1226 46.978 33.5472 46.978 33.9785C46.978 34.4099 46.8704 34.8344 46.665 35.2137C46.4596 35.593 46.1628 35.9151 45.8016 36.1508Z" fill="#F4F4FD"></path></svg>
                        </div>
                    </button>
                `;
                target.innerHTML = videoTemplate;
                target.classList.remove('iframe');
                target.querySelector('.upload-video__button').remove();
            }
        } else {
            if (videoTag === 'IFRAME') {
                videoTag.src = videoLink;
            } else {
                target.innerHTML = '';
                target.classList.add('iframe');
                const iframe = document.createElement('iframe');
                iframe.title = 'Malanka video player';
                iframe.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.allowFullscreen = true;
                iframe.src = videoLink;
                target.append(iframe);
            }
        }
    }

    return (
        <MediaUploaderStyled ref={uploaderRef}>
            <MediaUploaderNavStyled>
                {type === 'image' && <MediaUploaderNavItemStyled
                    active={mediaType === 'image' ? true : false}
                    onClick={() => setMediaType('image')}>
                    Изображения
                </MediaUploaderNavItemStyled>}
                {type === 'video' && <MediaUploaderNavItemStyled
                    active={mediaType === 'video' ? true : false}
                    onClick={() => setMediaType('video')}>
                    Видео
                </MediaUploaderNavItemStyled>}
            </MediaUploaderNavStyled>
            {mediaType === 'image' && uploadImageContent()}
            {mediaType === 'video' && uploadVideoContent()}
        </MediaUploaderStyled>
    )
}