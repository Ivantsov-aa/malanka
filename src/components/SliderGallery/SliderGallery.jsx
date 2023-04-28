export const SliderGallery = ({ title, photos }) => {
    return (
        <section className='slider-gallery'>
            <div className='flex space-between center mb-16'>
                <h3>{title}</h3>
                <div className='slider-gallery__control flex space-between ceneer'>
                    <p><span className='current'>1</span> / <span className='pages'>1</span></p>
                    <div className='slider-btns flex center' align='center'>
                        <button
                            className='slider-prev-btn'
                        >
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.8" d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z" fill="#7A7A95" />
                            </svg>
                        </button>
                        <button
                            className='slider-next-btn'
                        >
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.8" d="M17.55 20.9733L10.277 13L17.55 5.02664L15.3365 2.59998L5.84999 13L15.3365 23.4L17.55 20.9733Z" fill="#7A7A95" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='swiper'>
                <div className='swiper-wrapper'>
                    {photos.map((item, i) => (
                        <div className='swiper-slide' key={i}>
                            <img src={item} loading='lazy' alt='slide-cover' />
                        </div>
                    ))}
                </div>
                <div className='swiper-pagination'></div>
            </div>
        </section>
    )
}