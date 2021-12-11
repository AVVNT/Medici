import './home.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';


function home() {
    return (
        <div>
            <Splide options={{
                type: 'loop',
                pagination: 'false',
                height: '50vh',
                speed: '1000',
                autoplay: 'true',
                interval: '5000',
            }}>
                <SplideSlide className='splide__slide1'>
                    <div className='splide__slide1_cntr'>
                        <h1 className='splide__slide1_cntr-heading'>
                            GET FREE MEDICINE TODAY NIGGAH!
                        </h1>
                        <p>
                            THIS IS LEGIT BROTHER, SO SO LEGIT WE GONNA BE RICCCH AF
                        </p>
                        <button>
                            OMG THE BEST DEALS
                        </button>
                    </div>
                </SplideSlide>

                <SplideSlide className='splide__slide2'>
                    <div className='splide__slide1_cntr'>
                        <h1 className='splide__slide1_cntr-heading'>
                            GET FREE MEDICINE TODAY NIGGAH!
                        </h1>
                        <p>
                            THIS IS LEGIT BROTHER, SO SO LEGIT WE GONNA BE RICCCH AF
                        </p>
                        <button>
                            OMG THE BEST DEALS
                        </button>
                    </div>
                </SplideSlide>

                <SplideSlide className='splide__slide3'>
                    <div className='splide__slide1_cntr'>
                        <h1 className='splide__slide1_cntr-heading'>
                            GET FREE MEDICINE TODAY NIGGAH!
                        </h1>
                        <p>
                            THIS IS LEGIT BROTHER, SO SO LEGIT WE GONNA BE RICCCH AF
                        </p>
                        <button>
                            OMG THE BEST DEALS
                        </button>
                    </div>
                </SplideSlide>

                <SplideSlide className='splide__slide4'>
                    <div className='splide__slide1_cntr'>
                        <h1 className='splide__slide1_cntr-heading'>
                            GET FREE MEDICINE TODAY NIGGAH!
                        </h1>
                        <p>
                            THIS IS LEGIT BROTHER, SO SO LEGIT WE GONNA BE RICCCH AF
                        </p>
                        <button>
                            OMG THE BEST DEALS
                        </button>
                    </div>
                </SplideSlide>

                <SplideSlide className='splide__slide5'>
                    <div className='splide__slide1_cntr'>
                        <h1 className='splide__slide1_cntr-heading'>
                            GET FREE MEDICINE TODAY NIGGAH!
                        </h1>
                        <p>
                            THIS IS LEGIT BROTHER, SO SO LEGIT WE GONNA BE RICCCH AF
                        </p>
                        <button>
                            OMG THE BEST DEALS
                        </button>
                    </div>
                </SplideSlide>
            </Splide>

            <div className='howyoufeelingcntr'>
                <div className='howyoufeelingcntr__firstrow'>
                    <div className='howyoufeelingcntr__firstrow-col'>

                    </div>
                    <div className='howyoufeelingcntr__firstrow-col'>

                    </div>
                    <div className='howyoufeelingcntr__firstrow-col'>

                    </div>
                    <div className='howyoufeelingcntr__firstrow-col'>

                    </div>
                </div>
                <div className='howyoufeelingcntr__secondrow'>
                    <div className='howyoudeelingcntr__secondrow-col'>

                    </div>
                    <div className='howyoudeelingcntr__secondrow-col'>

                    </div>
                    <div className='howyoudeelingcntr__secondrow-col'>

                    </div>
                    <div className='howyoudeelingcntr__secondrow-col'>

                    </div>
                </div>
            </div>

            <div className='immunityboastercntr'>
                <div className='immunityboastercntr__headingcntr'>
                    <h3 className='immunityboastercntr__headingcntr-heading'>
                        Immunity Boaster
                    </h3>
                </div>
                <div className='immunityboastercntr__productcntr'>
                    <div className='immunityboastercntr__productcntr-col'>

                    </div>

                    <div className='immunityboastercntr__productcntr-col'>

                    </div>

                    <div className='immunityboastercntr__productcntr-col'>

                    </div>

                    <div className='immunityboastercntr__productcntr-col'>

                    </div>

                    <div className='immunityboastercntr__productcntr-col'>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default home;