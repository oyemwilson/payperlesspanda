import React, { useEffect } from 'react';
import AOS from 'aos';

const WhyUs = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Animation only happens once
        });
    }, []);


    return (
        <div className='bg-black pb-20' >
            <div className="contain  text-center w-[100%]">
                <div className="text-white mx-auto" >
                    <p className='text-green-400 mb-5'>Why Payperless Panda?</p>
                    <h1 className='w-[80%] md:w-[50%] text-4xl mx-auto md:text-6xl font-black'>Create professional estimates and invoices on the go</h1>
                    <p className='md:w-[60%] w-[90%] mx-auto mt-5'>our business thrives on estimates and invoices—they win jobs and bring in payments. Payperless Panda lets you craft elegant estimates and invoices in seconds. It's truly as easy as tap, type, and go.</p>
                    <p className='md:w-[60%] w-[90%] mx-auto'>No matter where business takes you, Payperless Panda is your simplest solution for all your small business estimating and invoicing needs.</p>
                </div>
            </div>
            <div className="mt-20 w-full flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-20 text-center mx-auto justify-center mt-20" >
                    <div className="flex relative w-64 h-80 bg-wite items-center justify-center" data-aos="flip-right"  data-aos-duration="1000"
                                        data-aos-delay="200">
                        <div className="absolute -top-6 bg-green-400 text-white font-bold text-xl rounded-xl w-16 h-12 flex items-center justify-center">
                            <h1>1</h1>
                        </div>
                        {/* Main box with solid borders on top and left */}
                        <div className="absolute inset-0 border-l-2 border-t-2 border-solid border-green-400 rounded-3xl"></div>

                        {/* Top half of right border - solid */}
                        <div className="absolute top-0 right-0 h-1/2 border-r-3 border-solid border-green-400 "></div>

                        {/* Bottom half of right border - dotted */}
                        <div className="absolute bottom-0 right-0 h-1/2 border-r-2 border-dotted border-green-400"></div>

                        {/* Left half of bottom border - solid */}
                        <div className="absolute bottom-0 left-0 w-1/2 border-b- border-solid border-green-400"></div>

                        {/* Right half of bottom border - dotted */}
                        <div className="absolute bottom-0 right-0 w-1/2 border-b-2 border-dotted border-green-400"></div>

                        {/* Content inside the box */}
                        <div className="text-gray-600 text-center">
                            <i className="fa-regular fa-circle-user fa-2x mb-5 text-green-400"></i>
                            <p className="text-xl text-white font-extrabold mb-5">
                                Get Started Fast
                            </p>
                            <p>1. Create free account</p>
                            <p>2. Confirm your email</p>
                            <p>3. Lgin and customize</p>
                        </div>
                    </div>
                    <div className="flex relative w-64 h-80 bg-wite items-center justify-center" data-aos="flip-right"  data-aos-duration="1000"
                                        data-aos-delay="300">
                        <div className="absolute -top-6 bg-green-400 text-white font-bold text-xl rounded-xl w-16 h-12 flex items-center justify-center">
                            <h1>2</h1>
                        </div>
                        {/* Main box with solid borders on top and left */}
                        <div className="absolute inset-0 border-l-2 border-t-2 border-solid border-green-400 rounded-3xl"></div>

                        {/* Top half of right border - solid */}
                        <div className="absolute top-0 right-0 h-1/2 border-r-3 border-solid border-green-400 "></div>

                        {/* Bottom half of right border - dotted */}
                        <div className="absolute bottom-0 right-0 h-1/2 border-r-2 border-dotted border-green-400"></div>

                        {/* Left half of bottom border - solid */}
                        <div className="absolute bottom-0 left-0 w-1/2 border-b- border-solid border-green-400"></div>

                        {/* Right half of bottom border - dotted */}
                        <div className="absolute bottom-0 right-0 w-1/2 border-b-2 border-dotted border-green-400"></div>

                        {/* Content inside the box */}
                        <div className="text-gray-600 text-center">
                            <i className="fa-regular fa-circle-user fa-2x mb-5 text-green-400"></i>
                            <p className="text-xl text-white font-extrabold mb-5">
                                Make it Yours
                            </p>
                            <p>1. Upload your logo</p>
                            <p>2. Enter company info</p>
                            <p>3. Explore template designs</p>
                        </div>
                    </div>
                    <div className="flex relative w-64 h-80 bg-wite items-center justify-center" data-aos="flip-left"  data-aos-duration="1000"
                                        data-aos-delay="400">
                        <div className="absolute -top-6 bg-green-400 text-white font-bold text-xl rounded-xl w-16 h-12 flex items-center justify-center">
                            <h1>3</h1>
                        </div>
                        {/* Main box with solid borders on top and left */}
                        <div className="absolute inset-0 border-r-2 border-t-2 border-solid border-green-400 rounded-3xl"></div>

                        {/* Top half of right border - solid */}
                        <div className="absolute top-0 right-0 h-1/2 border-r-3 border-solid border-green-400 "></div>

                        {/* Bottom half of right border - dotted */}
                        <div className="absolute bottom-0 left-0 h-1/2 border-r-2 border-dotted border-green-400"></div>

                        {/* Left half of bottom border - solid */}
                        <div className="absolute bottom-0 left-0 w-1/2 border-b- border-solid border-green-400"></div>

                        {/* Right half of bottom border - dotted */}
                        <div className="absolute bottom-0 left-0 w-1/2 border-b-2 border-dotted border-green-400"></div>

                        {/* Content inside the box */}
                        <div className="text-gray-600 text-center">
                            <i className="fa-regular fa-circle-user fa-2x mb-5 text-green-400"></i>
                            <p className="text-xl text-white font-extrabold mb-5">
                                Master Your Finances
                            </p>
                            <p>1. Categorize expenses</p>
                            <p>2. generate reports</p>
                            <p>3. track your cash flow</p>
                        </div>
                    </div>
                    <div className="flex relative w-64 h-80 bg-wite items-center justify-center" data-aos="flip-left"  data-aos-duration="1000"
                                        data-aos-delay="500">
                        <div className="absolute -top-6 bg-green-400 text-white font-bold text-xl rounded-xl w-16 h-12 flex items-center justify-center">
                            <h1>4</h1>
                        </div>
                        {/* Main box with solid borders on top and left */}
                        <div className="absolute inset-0 border-r-2 border-t-2 border-solid border-green-400 rounded-3xl"></div>

                        {/* Top half of left border - solid */}
                        <div className="absolute top-0 right-0 h-1/2 border-r-3 border-solid border-green-400 "></div>

                        {/* Bottom half of right border - dotted */}
                        <div className="absolute bottom-0 left-0 h-1/2 border-r-2 border-dotted border-green-400"></div>

                        {/* Left half of bottom border - solid */}
                        <div className="absolute bottom-0 left-0 w-1/2 border-b- border-solid border-green-400"></div>

                        {/* Right half of bottom border - dotted */}
                        <div className="absolute bottom-0 left-0 w-1/2 border-b-2 border-dotted border-green-400"></div>

                        {/* Content inside the box */}
                        <div className="text-gray-600 text-center">
                            <i className="fa-regular fa-circle-user fa-2x mb-5 text-green-400"></i>
                            <p className="text-xl text-white font-extrabold mb-5">
                                Create & Send Receipts
                            </p>
                            <p>1. Generate professional receiptst</p>
                            <p>2. organized record-keeping</p>
                            <p>3. keep tabs on all your expenses</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="bg-gay-100">

            </div>

        </div>
    )
}

export default WhyUs