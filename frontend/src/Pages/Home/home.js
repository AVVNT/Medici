import './home.css';
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import Header from "../../components/Header/header";
import axios from 'axios';
import { useEffect, useState } from 'react';
import nestleLogo from '../../Assets/Nestle_logo_PNG4.png';
import dettolLogo from '../../Assets/Dettol-Logo_160x160.png';
import abbotLogo from '../../Assets/ABBOTT-LOGO_160x192.jpg';
import enfaLogo from '../../Assets/Enfa-Logo-400x400_160x160.jpg';
import gskLogo from '../../Assets/1200px-GSK_logo_2014.svg_1d89b829-8933-43bf-a082-02e408d24c29_160x160.png'
import wilshireLogo from '../../Assets/logo-1_142x168.png';

export default function Home() {
    const [categoryOne, setCategoryOne] = useState([]);
    const [filteredCategoryOne, setfilteredCategoryOne] = useState(null);
    const [categoryTwo, setCategoryTwo] = useState([]);
    const [filteredCategoryTwo, setfilteredCategoryTwo] = useState(null)
    // const [categoryThree, setCategoryThree] = useState([]);
    // const [filteredCategoryThree, setfilteredCategoryThree] = useState(null)


    let headers = {}
    useEffect(() => {
        async function fetchProduct() {
            await getProductfromCategoryOne();
            await getProductfromCategoryTwo();
            // await getProductfromCategoryThree();
        }

        headers = {
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem('x-token')
        }

        fetchProduct();
    }, []);

    async function getProductfromCategoryOne() {
        let responseCategoryOne = await axios.get('http://localhost:3000/api/listing/immunity%20boosters/1');
        setCategoryOne(responseCategoryOne.data.body.data);
        setfilteredCategoryOne(responseCategoryOne.data.body.data);
    }

    async function getProductfromCategoryTwo() {
        let responseCategoryTwo = await axios.get('http://localhost:3000/api/listing/medicine/1')
        setCategoryTwo(responseCategoryTwo.data.body.data);
        setfilteredCategoryTwo(responseCategoryTwo.data.body.data);
    }

    // async function getProductfromCategoryThree() {
    //     let responseCategorThree = await axios.get('http://localhost:3000/api/listing/baby%20milk/1');
    //     setCategoryThree(responseCategorThree.data.body.data);
    //     setfilteredCategoryThree(responseCategorThree.data.body.data);
    // }

    return (
        <div>
            <Splide options={{
                type: 'loop',
                pagination: false,
                height: '65vh',
                speed: '1000',
                autoplay: true,
                interval: '5000',
            }}>
                <SplideSlide className='splide__slide1'>
                    <div className='splide__slide1_cntr'>
                        <h1 className='splide__slide1_cntr-heading primary-font'>
                            MEDICI ONLINE PHARMACY
                        </h1>
                        <p className='splide__slide1_cntr-para secondary-font'>
                            Your Online Pharmacy
                        </p>
                        <button className='splide__slide1_cntr-button secondary-dont'>
                            Buy Today!
                        </button>
                    </div>
                </SplideSlide>

                <SplideSlide className='splide__slide2'>
                    <div className='splide__slide1_cntr'>
                        <h1 className='splide__slide1_cntr-heading primary-font'>
                            MEDICI ONLINE PHARMACY
                        </h1>
                        <p className='splide__slide1_cntr-para secondary-font'>
                            Your Online Pharmacy
                        </p>
                        <button className='splide__slide1_cntr-button secondary-dont'>
                            Buy Today!
                        </button>
                    </div>
                </SplideSlide>

                <SplideSlide className='splide__slide3'>
                    <div className='splide__slide1_cntr'>
                        <h1 className='splide__slide1_cntr-heading primary-font'>
                            MEDICI ONLINE PHARMACY
                        </h1>
                        <p className='splide__slide1_cntr-para secondary-font'>
                            Your Online Pharmacy
                        </p>
                        <button className='splide__slide1_cntr-button secondary-dont'>
                            Buy Today!
                        </button>
                    </div>
                </SplideSlide>
            </Splide>

            <div className='howyoufeelingcntr'>
                <h3 className='primary-font howyoudoinhead'>
                    How are you feeling today?
                </h3>
                <div className='howyoufeelingcntr__firstrow'>
                    <div className='howyoufeelingcntr__firstrow-col sick1'>
                        <h2 className='secondary-font sicktext'>
                            I have a stomach ache
                        </h2>
                    </div>
                    <div className='howyoufeelingcntr__firstrow-col sick2'>
                        <h2 className='secondary-font sicktext'>
                            I have a fever
                        </h2>
                    </div>
                    <div className='howyoufeelingcntr__firstrow-col sick3'>
                        <h2 className='secondary-font sicktext'>
                            I am pregnant
                        </h2>
                    </div>
                    <div className='howyoufeelingcntr__firstrow-col sick4'>
                        <h2 className='secondary-font sicktext'>
                            I have join pain
                        </h2>
                    </div>
                </div>
                <div className='howyoufeelingcntr__secondrow'>
                    <div className='howyoudeelingcntr__secondrow-col sick5'>
                        <h2 className='secondary-font sicktext'>
                            I have a headache
                        </h2>
                    </div>
                    <div className='howyoudeelingcntr__secondrow-col sick6'>
                        <h2 className='secondary-font sicktext'>
                            I have diabetes
                        </h2>
                    </div>
                    <div className='howyoudeelingcntr__secondrow-col sick7'>
                        <h2 className='secondary-font sicktext'>
                            I have a newborn baby
                        </h2>
                    </div>
                    <div className='howyoudeelingcntr__secondrow-col sick8'>
                        <h2 className='secondary-font sicktext'>
                            I am overweight
                        </h2>
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
                        {filteredCategoryOne == null ?
                            <p>Waiting to load</p>
                            :
                            <div className='information-container'>
                                <img className='product_image_thumbnail' src={categoryOne[0].product_image} />
                                <h3 className='product_image_heading primary-font'>
                                    {categoryOne[0].name}
                                </h3>
                                <h4 className='product_image_subheading secondary-font'>
                                    ({categoryOne[0].manufacturer})
                                </h4>
                                <p className='product_image_price secondary-heading'>
                                    Rs {categoryOne[0].price}/-
                                </p>
                                <div className='product_image_calltoaction-container'>
                                    <button className='addtocarthomebutton'>
                                        Add to Cart
                                    </button>
                                    <button className='checkoutnowhomebutton'>
                                        Checkout Now
                                    </button>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='immunityboastercntr__productcntr-col'>
                        {filteredCategoryOne == null ?
                            <p>Waiting to load</p>
                            :
                            <div className='information-container'>
                                <img className='product_image_thumbnail' src={categoryOne[1].product_image} />
                                <h3 className='product_image_heading primary-font'>
                                    {categoryOne[1].name}
                                </h3>
                                <h4 className='product_image_subheading secondary-font'>
                                    ({categoryOne[1].manufacturer})
                                </h4>
                                <p className='product_image_price secondary-heading'>
                                    Rs {categoryOne[1].price}/-
                                </p>
                                <div className='product_image_calltoaction-container'>
                                    <button className='addtocarthomebutton'>
                                        Add to Cart
                                    </button>
                                    <button className='checkoutnowhomebutton'>
                                        Checkout Now
                                    </button>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='immunityboastercntr__productcntr-col'>
                        {filteredCategoryOne == null ?
                            <p>Waiting to load</p>
                            :
                            <div className='information-container'>
                                <img className='product_image_thumbnail' src={categoryOne[2].product_image} />
                                <h3 className='product_image_heading primary-font'>
                                    {categoryOne[2].name}
                                </h3>
                                <h4 className='product_image_subheading secondary-font'>
                                    ({categoryOne[2].manufacturer})
                                </h4>
                                <p className='product_image_price secondary-heading'>
                                    Rs {categoryOne[2].price}/-
                                </p>
                                <div className='product_image_calltoaction-container'>
                                    <button className='addtocarthomebutton'>
                                        Add to Cart
                                    </button>
                                    <button className='checkoutnowhomebutton'>
                                        Checkout Now
                                    </button>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='immunityboastercntr__productcntr-col'>

                    </div>

                    <div className='immunityboastercntr__productcntr-col immunityboastercntr__productcntr-col-lastcol'>
                        <h4 className='secondary-font viewalltext'>
                            VIEW ALL
                        </h4>
                        <h3 className='secondary-font titletext'>
                            Immunity Boaster
                        </h3>
                    </div>
                </div>
            </div>

            <div className='immunityboastercntr'>
                <div className='immunityboastercntr__headingcntr'>
                    <h3 className='immunityboastercntr__headingcntr-heading'>
                        Medicines
                    </h3>
                </div>
                <div className='immunityboastercntr__productcntr'>
                    <div className='immunityboastercntr__productcntr-col'>
                        {filteredCategoryTwo == null ?
                            <p>Waiting to load</p>
                            :
                            <div className='information-container'>
                                <img className='product_image_thumbnail' src={categoryTwo[0].product_image} />
                                <h3 className='product_image_heading primary-font'>
                                    {categoryTwo[0].name}
                                </h3>
                                <h4 className='product_image_subheading secondary-font'>
                                    ({categoryTwo[0].manufacturer})
                                </h4>
                                <p className='product_image_price secondary-heading'>
                                    Rs {categoryTwo[0].price}/-
                                </p>
                                <div className='product_image_calltoaction-container'>
                                    <button className='addtocarthomebutton'>
                                        Add to Cart
                                    </button>
                                    <button className='checkoutnowhomebutton'>
                                        Checkout Now
                                    </button>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='immunityboastercntr__productcntr-col'>
                        {filteredCategoryTwo == null ?
                            <p>Waiting to load</p>
                            :
                            <div className='information-container'>
                                <img className='product_image_thumbnail' src={categoryTwo[1].product_image} />
                                <h3 className='product_image_heading primary-font'>
                                    {categoryTwo[1].name}
                                </h3>
                                <h4 className='product_image_subheading secondary-font'>
                                    ({categoryTwo[1].manufacturer})
                                </h4>
                                <p className='product_image_price secondary-heading'>
                                    Rs {categoryTwo[1].price}/-
                                </p>
                                <div className='product_image_calltoaction-container'>
                                    <button className='addtocarthomebutton'>
                                        Add to Cart
                                    </button>
                                    <button className='checkoutnowhomebutton'>
                                        Checkout Now
                                    </button>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='immunityboastercntr__productcntr-col'>

                    </div>

                    <div className='immunityboastercntr__productcntr-col'>

                    </div>

                    <div className='immunityboastercntr__productcntr-col immunityboastercntr__productcntr-col-lastcol'>
                        <h4 className='secondary-font viewalltext'>
                            VIEW ALL
                        </h4>
                        <h3 className='secondary-font titletext'>
                            Medicines
                        </h3>
                    </div>
                </div>
            </div>

            {/* <div className='immunityboastercntr'>
                <div className='immunityboastercntr__headingcntr'>
                    <h3 className='immunityboastercntr__headingcntr-heading'>
                        Baby Care
                    </h3>
                </div>
                <div className='immunityboastercntr__productcntr'>
                    <div className='immunityboastercntr__productcntr-col'>
                        {filteredCategoryThree == null ?
                            <p>Waiting to load</p>
                            :
                            <div className='information-container'>
                                <img className='product_image_thumbnail' src={categoryThree[0].product_image} />
                                <h3 className='product_image_heading primary-font'>
                                    {categoryThree[0].name}
                                </h3>
                                <h4 className='product_image_subheading secondary-font'>
                                    ({categoryThree[0].manufacturer})
                                </h4>
                                <p className='product_image_price secondary-heading'>
                                    Rs {categoryThree[0].price}/-
                                </p>
                                <div className='product_image_calltoaction-container'>
                                    <button className='addtocarthomebutton'>
                                        Add to Cart
                                    </button>
                                    <button className='checkoutnowhomebutton'>
                                        Checkout Now
                                    </button>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='immunityboastercntr__productcntr-col'>

                    </div>

                    <div className='immunityboastercntr__productcntr-col'>

                    </div>

                    <div className='immunityboastercntr__productcntr-col'>

                    </div>

                    <div className='immunityboastercntr__productcntr-col immunityboastercntr__productcntr-col-lastcol'>

                    </div>
                </div>
            </div> */}

            <div className='splideContainerlogo'>
                <Splide options={{
                    type: 'loop',
                    perPage: 3,
                    perMove: 1,
                    pagination: false,
                }}>

                    <SplideSlide className='slidelogo'>
                        <img src={nestleLogo} alt='Logo Of Nestle' width="130px" height="130px" />
                    </SplideSlide>

                    <SplideSlide className='slidelogo'>
                        <img src={dettolLogo} alt='Logo Of Nestle' width="130px" height="130px" />
                    </SplideSlide>

                    <SplideSlide className='slidelogo'>
                        <img src={abbotLogo} alt='Logo Of Nestle' width="130px" height="130px" />
                    </SplideSlide>

                    <SplideSlide className='slidelogo'>
                        <img src={enfaLogo} alt='Logo Of Nestle' width="130px" height="130px" />
                    </SplideSlide>

                    <SplideSlide className='slidelogo'>
                        <img src={gskLogo} alt='Logo Of Nestle' width="130px" height="130px" />
                    </SplideSlide>

                    <SplideSlide className='slidelogo'>
                        <img src={wilshireLogo} alt='Logo Of Nestle' width="130px" height="130px" />
                    </SplideSlide>

                    <SplideSlide className='slidelogo'>
                        <img src={nestleLogo} alt='Logo Of Nestle' width="130px" height="130px" />
                    </SplideSlide>

                    <SplideSlide className='slidelogo'>
                        <img src={gskLogo} alt='Logo Of Nestle' width="130px" height="130px" />
                    </SplideSlide>

                    <SplideSlide className='slidelogo'>
                        <img src={abbotLogo} alt='Logo Of Nestle' width="130px" height="130px" />
                    </SplideSlide>

                </Splide>
            </div>

            <div className='scheduleyourmedscntr'>
                <div className='scheduleyourmedcntr__subcntr'>
                    <div className='scheduleyourmedcntr__subcntr-conentcntr'>
                        <div className='schedulecntr'>
                            <h3 className='schedulecntr-text primary-font'>
                                Schedule your Subscription
                            </h3>
                            <button className='schedulecntr-button secondary-font'>
                                Click to Schedule
                            </button>
                        </div>
                    </div>
                    <div className='scheduleyourmedcntr__subcntr-imagecontr'>

                    </div>
                </div>
                <div className='copyright'>
                    <p className='copyright-text secondary-font'>
                        Medici 2021, All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
