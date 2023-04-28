import { Link } from "react-router-dom";
import { Breadcrumbs } from "./breadcrumbs/breadcrumbs"
import { Instructions } from "./instructions/instructions"

const instructionsList = [
    {
        text: 'Open the Malanka New app',
        path: '/images/charging/charging-1.png'
    },
    {
        text: 'Scan QR-code',
        path: '/images/charging/charging-2.png'
    },
    {
        text: 'Start charging',
        path: '/images/charging/charging-3.png'
    }
];

export const Mission = () => {
    return (
        <main className='mission' data-id='66' count='1'>
            <div className='pt-16'>
                <Breadcrumbs padding link={{ name: 'Mission', path: 'our-mission' }} />
                <div className='block'>
                    <div className='mission__title mb-32'>
                        <h2>Malanka – we make electric cars convenient for you.</h2>
                    </div>
                    <div className='mission__banner-video mb-24'>
                        <div className='mission__banner-text'>
                            <h1 className="mb-16">Ultra-fast charging</h1>
                            <h3>10 min. + 300 km</h3>
                        </div>
                        <video width='100%' height='100%' src='https://joy1.videvo.net/videvo_files/video/free/2019-09/large_watermarked/190828_27_SuperTrees_HD_17_preview.mp4' loop autoPlay />
                    </div>
                    <h5>
                        Malanka is the future we create today. Technology dynamics makes time one of the most valuable things. 3 taps on your smartphone screen –and your electric car’s range is up to 300 km in 10 minutes. And this is just the beginning…
                    </h5>
                    <Instructions title='Electric car charging in 3 steps!' list={instructionsList} subtitle='Now to charge your electric car you need only three clicks on your smartphone' />
                </div>
            </div>
            <div className='price-page__footer'>
                <div className='wrapper'>
                    <div>
                        <h3 className='mb-16'>Need more information?</h3>
                        <p className='regular-text'>We are happy to share the latest Malanka news with you. Be among the first to learn about the advantages of Belarussian largest electric car charging network!</p>
                    </div>
                    <Link to='/news' className='btn-green-outline'>Learn more</Link>
                </div>
            </div>
        </main>
    )
}