import { VideoBlockStyled } from "./VideoBlock.style"

export const VideoBlock = ({ title, subtitle, video }) => {
    return (
        <div className='video-block'>
            <h3 className={subtitle ? 'mb-8' : 'mb-16'}>{title}</h3>
            {subtitle && <p className='mb-16'>{subtitle}</p>}
            <div className='video__container'>
                <iframe width='100%' height='100%' src={video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
        </div>
    )
}