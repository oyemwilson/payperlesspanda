import React from 'react'

const Bookkeeping = () => {
    return (
        <div className='bg-black py-20'>
            <div className='bg-green-950 min-h-[50vh] flex flex-col items-center text-gray-100 justify-center text-center ' style={{ clipPath: 'polygon(100% 0, 100% 100%, 0% 90%, 0% 15%)' }}>
                <h1 className='z-50  lg:text-6xl w-[75%]'data-aos="fade-up"
     data-aos-duration="2000">You didn't start your business to be a bookkeeper Ditch the Ledger, Chase Your Dreams </h1>
                <button className='mt-10 border border-green-200 text-green-900 bg-white py-3 px-9 rounded-xl ' data-aos="fade-up"
     data-aos-duration="2000" >Get Started</button>
            </div>
        </div>


    )
}

export default Bookkeeping