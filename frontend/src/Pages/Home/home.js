import './home.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import SliderImageOne from '../../Assets/background-image-leafs';
import SliderImageTwo from '../../Assets/background-image-login'

function home() {
    return (
        <div>
            <Splide>
                <SplideSlide>
                    <img src={SliderImageOne} />
                </SplideSlide>
                
                <SplideSlide>
                    <img src={SliderImageTwo} />
                </SplideSlide>
            </Splide>
        </div>
    );
}

export default home;