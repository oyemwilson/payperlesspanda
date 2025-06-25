import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SelectDesign = () => {
  const [loading, setLoading] = useState(true);

  // Simulate an async data/image load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2s demo delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-green-950 min-h-screen">
      <div>
        <Link to="/" className="inline-flex items-center p-2 text-white hover:text-green-900 border-2 border-white hover:border-green-900 rounded-full mt-10 ml-5">
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      <h1 className="text-center text-white text-4xl py-20">Customise Your Invoice</h1>
      <h1 className="text-center text-white text-5xl mt-10 mb-5">Select Design</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">

        {loading ? (
          // Render skeletons
          [...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-full h-full lg:h-[50vh] bg-gray-700 animate-pulse rounded-2xl"
            ></div>
          ))
        ) : (
          <>
            <Link to="/invoice-template1">
              <img
                src="/assets/images/INV1.jpg"
                alt="My Logo"
                className="w-full h-full lg:h-[50vh] object-cover border-4 border-transparent hover:border-green-500 rounded-2xl"
              />
            </Link>
            <Link to="/invoice-template2">
              <img
                src="/assets/images/INV2.jpg"
                alt="My Logo"
                className="w-full h-full lg:h-[50vh] object-cover border-4 border-transparent hover:border-green-500 rounded-2xl"
              />
            </Link>
            <Link to="/invoice-template3">
              <img
                src="/assets/images/INV3.jpg"
                alt="My Logo"
                className="w-full h-full lg:h-[50vh] object-cover border-4 border-transparent hover:border-green-500 rounded-2xl"
              />
            </Link>
            <Link to="/invoice-template4">
              <img
                src="/assets/images/INV4.jpg"
                alt="My Logo"
                className="w-full h-full lg:h-[50vh] object-cover border-4 border-transparent hover:border-green-500 rounded-2xl"
              />
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default SelectDesign;
