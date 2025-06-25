
import React, { useEffect } from 'react';
import AOS from 'aos';

const Features = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Animation only happens once
        });
    }, []);
    return (
        <>
            <div className="bg-black min flex items-center justify-center lg:pt-[6rem] pt-[10rem] lg:pb-[5rem]">
                <div className="feature relative z-0 text-white px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
                        {/* Text Content */}
                        <div className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1" data-aos="fade-right"  data-aos-duration="1000"
                                        data-aos-delay="200" >
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl  font-extrabold tracking-tight">
                                Online Receipt Maker
                            </h1>
                            <p className="mt-4 text-base sm:text-lg lg:text-xl w-full sm:w-4/5 lg:w-3/4 mx-auto lg:mx-0 text-gray-300">
                                Generate Receipts Instantly with Ease, Wherever and Whenever You Need Them
                            </p>
                            <ul className="mt-6 space-y-3 text-sm sm:text-base lg:text-lg ">
                                <li className="flex items-center justify-center lg:justify-start">
                                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                   Quickly enter payment and client details
                                </li>
                                {/* <li className="flex items-center justify-center lg:justify-start">
                                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Downloadable templates for offline use
                                </li> */}
                                <li className="flex items-center justify-center lg:justify-start">
                                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                 Get a professionally formatted receipt in seconds
                                </li>
                                <li className="flex items-center justify-center lg:justify-start">
                                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  Download or print directly — no signup required
                                </li>
                            </ul>
                        </div>
                        {/* Image */}
                        <div className="lg:w-1/2 flex justify-center border-3xl order-1 lg:order-2 relative mb-[6rem] lg:mb-0" data-aos="fade-left"  data-aos-duration="1000"
                                        data-aos-delay="200">
                            <div className="bg-white opacity-100 absolute  py-2 rounded-3xl w-[50%]  max-w-xs lg:max-w-sm top-[-40%] lg:top-[-30%] left-[0%] lg:right-4" data-aos="fade-right"  data-aos-duration="1000"
                                        data-aos-delay="500">
                                <div className="relative">
                                    <div className="flex justify-between bg-green-900 px-3 text-white py-2 -mx-0 -mt-2 rounded-t-3xl">
                                        <h1>Invoice</h1>
                                        <h1>002</h1>
                                    </div>
                                    <div className="flex text-black justify-between px-3">
                                        <h1>Date</h1>
                                        <h1>21/03/2025</h1>
                                    </div>

                                    <div className="flex text-black justify-between items-center px-3">
                                        <h1>Detailed transaction</h1>
                                        <div className="w-10 h-0.5 bg-gray-400 mx-ato my-6"></div>
                                    </div>
                                    <hr />
                                    <div className="flex text-black justify-between w-full items-center px-3">
                                        <div className="w-10 h-0.5 bg-gray-400 mx-ato my-6"></div>
                                        <h1 className="ml-10">Mobile Responsiveness</h1>
                                    </div>
                                    <hr />
                                    <div className="flex text-black justify-between px-3">
                                        <h1>Total</h1>
                                        <h1>$2000</h1>
                                    </div>
                                </div>
                            </div>
                            <img
                                src="/assets/images/card1.jpg"
                                alt="Professional invoice template example"
                                className="w-full max-w-md lg:max-w-lg object-cover rounded-lg shadow-lg"
                            />
                            <div className="absolute right-[-2vw] bottom-10 bg-green-100 p-3 border border-black rounded-xl" data-aos="fade-left"  data-aos-duration="1000"
                                        data-aos-delay="800">
                                <div className="relative text-black flex">
                                    <h1>
                                        <i className="fa-solid fa-file-invoice bg-green-900 rounded-3xl p-2 text-white"></i> Smart invoicing, seamless business.
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div className=" bg-[radial-gradient(circle_at_left,theme(colors.green.900)_0%,theme(colors.green.950)_0%,theme(colors.black)_55%,theme(colors.black)_100%)] m min-heen pt-[5rem] pb-[5rem] flex items-center justify-center ">
                <div className="feature relative z-50 text-white px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
                        {/* Image */}
                        <div className="lg:w-1/2 flex justify-cnter relative order-1 lg:order-0" data-aos="fade-right"  data-aos-duration="1000"
                                        data-aos-delay="200">
                            <img
                                src="/assets/images/card2.jpg"
                                alt="Professional invoice template example"
                                className="w-full max-w-md lg:max-w-lg object-cover rounded-lg shadow-lg"
                            />
                            <div className=' absolute left-[-3vw] bg-green-100 bottom-[30%] border border-black p-3 rounded-xl' data-aos="fade-right"  data-aos-duration="1000"
                                        data-aos-delay="1000">
                                <div className='relative text-black  flex '>
                                    <h1><i className="fa-solid fa-file-invoice bg-green-900 rounded-3xl p-2 text-white"> </i> Invoices that work as hard as you do.</h1>
                                </div>
                            </div>
                        </div>
                        {/* Text Content */}
                        <div className="lg:w-1/2 text-center lg:text-left order-2 lg:order-0"  data-aos="fade-left"  data-aos-duration="1000"
                                        data-aos-delay="200">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                                 Fast & Easy
                            </h1>
                            <p className="mt-4 text-base sm:text-lg lg:text-xl w-full sm:w-4/5 lg:w-3/4 mx-auto lg:mx-0 text-gray-300">
                                Simplify Your Workflow with a Seamless, Hassle-Free Receipt Creation Experience
                            </p>
                            <ul className="mt-6 space-y-3 text-sm sm:text-base lg:text-lg">
                                <li className="flex items-center justify-center lg:justify-start">
                                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Reuse transaction details to generate receipts fast
                                </li>
                                <li className="flex items-center justify-center lg:justify-start">
                                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Save time with a clear, simple process
                                </li>
                                <li className="flex items-center justify-center lg:justify-start">
                                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    No need for special software or accounts
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>




            <div className="bg-black min flex lg:pt-[6rem] pt-[0rem] md:pb-[10rem] pb-[5rem] items-center justify-center">
                <div className="feature relative z-50 text-white px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
                        {/* Text Content */}
                        <div className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1" data-aos="fade-right"  data-aos-duration="1000"
                                        data-aos-delay="200">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                                 Professional Templates
                            </h1>
                            <p className="mt-4 text-base sm:text-lg lg:text-xl w-full sm:w-4/5 lg:w-3/4 mx-auto lg:mx-0 text-gray-300">
                                Clean, Customizable Designs That Help You Present Every Transaction Professionally
                            </p>
                            <ul className="mt-6 space-y-3 text-sm sm:text-base lg:text-lg">
                                <li className="flex items-center justify-center lg:justify-start">
                                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Modern layouts that suit any business
                                </li>
                                <li className="flex items-center justify-center lg:justify-start">
                                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Personalize with your company name and logo
                                </li>
                                <li className="flex items-center justify-center lg:justify-start">
                                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Ready to download as a PDF or print
                                </li>
                            </ul>
                        </div>
                        {/* Image */}
                        <div className="lg:w-1/2 flex justify-cnter order-1 lg:order-2 relative mb-[10rem] lg:mb-0"  data-aos="fade-left"  data-aos-duration="1000"
                                        data-aos-delay="200">
                            <img
                                src="/assets/images/card3.jpg"
                                alt="Professional invoice template example"
                                className="w-full max-w-md lg:max-w-lg object-cover rounded-lg shadow-lg"
                            />
                            <div className=' absolute right-[-2vw] bg-white top-[0%] border border-black  py-1 px-2 rounded-xl' data-aos="fade-left"  data-aos-duration="1000"
                                        data-aos-delay="700">
                                <div className='relative text-black  flex '>
                                    <h1 className='flex items-center'><img src="/assets/images/headshot2.jpg" alt="" srcset="" className="fa-solid fa-user bg-green-900 rounded-3xl p-1 text-white mr-5 w-10" /> <div className='w-24 h-1 bg-gray-400/50 mx-ato mr-5'> </div>₦9500 <span className='py-1 px-5 bg-green-900 rounded-3xl ml-2 text-white'>Paid</span></h1>
                                </div>
                            </div>
                            <div className=' absolute right-[-2vw] bg-white top-[30%] border border-black hidden md:block   py-1 px-2 rounded-xl' data-aos="fade-left"  data-aos-duration="1000"
                                        data-aos-delay="900">
                                <div className='relative text-black  flex '>
                                    <h1 className='flex items-center'><img src="/assets/images/headshot1.jpg" alt="" srcset="" className="fa- bg-green-900 rounded-3xl p-1 text-white mr-5 w-10" /> <div className='w-24 h-1 bg-gray-400/50 mx-ato mr-5'> </div>₦3500 <span className='py-1 px-5 bg-gray-400 rounded-3xl ml-2 text-white'>Overdue</span></h1>
                                </div>
                            </div>
                            <div className=' absolute lg:left-[-10%] left-[0] bg-green-100 sm:bottom-[-25%] bottom-[-35%] border border-black   py-3 px-5 rounded-xl' data-aos="fade-right"  data-aos-duration="1000"
                                        data-aos-delay="1000">
                                <div className='relative text-black  flex flex-col space-y-5 '>
                                    <h1 className='flex items-center'><div className=" bg-green-900 rounded-3xl p-1 text-white mr-5 "> RA</div> <div className='mr-5'> David Johnson </div>₦3500 </h1>
                                    <hr className='border-black' />
                                    <div className='flex justify-between'>
                                        <div>
                                            <h1>₦3500</h1>
                                            <h1>branding</h1>
                                        </div>
                                        <div>
                                            <h1>₦3500</h1>
                                            <h1>Landing Page</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Features