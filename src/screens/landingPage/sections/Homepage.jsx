
import styles from '../landingpage.css'
import Topnav from '../../../components/Topnav'
import React, { useEffect } from 'react';
import AOS from 'aos';


const Homepage = () => {
    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in milliseconds
          once: true, // Animation only happens once
        });
      }, []);
    return (
        <>
            <div className="relative w-full min-h-[95vh]">

                <div className='contin '>
                    {/* First div as background */}
                    <div className="bg-overlay">
                        <div className="absolute top-0 left-0 w-full min-h-screen opacity-25 z-10">
                            <div className="flex mx-auto justify-between lg:max-w-[70vw] md:max-w-[90vw] mt-[15rem] px-4 md:px-8">
                                <div className="flex flex-col items-start space-y-20 md:space-y-[7rem] w-full md:w-1/2"data-aos="zoom-in-left"
                                        data-aos-duration="1000"
                                        data-aos-delay="200" >
                                    <div className="ml-20 md:ml-[5rem] bg-gray-600 border-gray-300 border rounded-xl p-2" >
                                        <img src="/assets/images/logo1.webp" alt="Company Logo 1" className="md:w-10 w-7" />
                                    </div>
                                    <div className="ml-0 md:ml-0 bg-gray-600 border-gray-300 border p-3 rounded-2xl" 
                                    >
                                        <img src="/assets/images/logo2.webp" alt="Company Logo 2" className="md:w-16 w-12" />
                                    </div>
                                    <div className="ml-24 md:ml-[10rem] bg-gray-600 border-gray-300 border p-5 rounded-3xl" >
                                        <img src="/assets/images/logo3.webp" alt="Company Logo 3" className="md:w-9 w-5" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-end space-y-20 md:space-y-[7rem] w-full" data-aos="zoom-in-right"
                                        data-aos-duration="1000"
                                        data-aos-delay="200" >
                                    <div className="mr-20 md:mr-[5rem] bg-gray-600 border-gray-300 border p-2 rounded-xl" >
                                        <img src="/assets/images/logo4.webp" alt="Company Logo 4" className="md:w-10 w-7" />
                                    </div>
                                    <div className="mr-0 md:mr-0 bg-gray-600 border-gray-300 border p-3 rounded-2xl">
                                        <img src="/assets/images/logo5.webp" alt="Company Logo 5" className="md:w-16 w-12" />
                                    </div>
                                    <div className="mr-24 md:mr-[10rem] bg-gray-600 border-gray-300 border p-5 rounded-3xl" >
                                        <img src="/assets/images/logo6.webp" alt="Company Logo 6" className="md:w-9 w-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Second div on top */}
                    <div className="home-text relative z-20 flex items-center justify-center pt-24 top-20">
                        <div className="text-center text-white">
                            <div>
                                <img src="/assets/images/Pandalogo2.png" alt="Logo" className="w-[5rem] mx-auto bg-gray-600/20 border-gray-300/20 border p-2 rounded-xl"data-aos="fade-up" data-aos-duration="1000"
                                        data-aos-delay="200"/>
                                <p className='mt-5 text-green-400' data-aos="fade-up" data-aos-duration="1000"
                                        data-aos-delay="200">jump start your portfolio</p>
                                <h1 className='text-4xl md:text-4xl lg:text-6xl font-black mt-5 md:w-[50%]  w-[75%] mx-auto' data-aos="fade-up" data-aos-duration="1000"
                                        data-aos-delay="300">The unified platform for Creating Estimates and Invoices Instantly</h1>
                                <p className='mt-5 md:w-[30%] w-[80%] mx-auto' data-aos="zoom-in-up" data-aos-duration="1000"
                                        data-aos-delay="400">At Payperless Panda, we understand the importance of staying ahead in the fast-paced world of Business.</p>
                                <a href="" >
                                    <button className='border border-green-400 rounded-xl bg-black text-white px-6 py-2 md:mt-10 mt-5 text-xl' data-aos="zoom-in-up" data-aos-duration="1000"
                                        data-aos-delay="500">Get Stated</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Homepage