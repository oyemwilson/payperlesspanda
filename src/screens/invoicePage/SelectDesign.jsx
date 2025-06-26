import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SelectDesign = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const images = [
      '/assets/images/INV1.jpg',
      '/assets/images/INV2.jpg',
      '/assets/images/INV3.jpg',
      '/assets/images/INV4.jpg',
    ];
    let loadedImages = 0;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImages += 1;
        if (loadedImages === images.length) setLoading(false);
      };
    });
  }, []);

  return (
    <div className="bg-green-950 min-h-screen">
      <div>
        <Link
          to="/"
          className="inline-flex items-center p-2 text-white hover:text-green-900 border-2 border-white hover:border-green-900 rounded-full mt-10 ml-5"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      <h1 className="text-center text-white text-4xl py-20">Customise Your Invoice</h1>
      <h1 className="text-center text-white text-5xl mt-10 mb-5">Select Design</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {loading
          ? [...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-full h-full lg:h-[50vh] bg-gray-700 animate-pulse rounded-2xl"
              ></div>
            ))
          : [
              { src: '/assets/images/INV1.jpg', to: '/invoice-template1' },
              { src: '/assets/images/INV2.jpg', to: '/invoice-template2' },
              { src: '/assets/images/INV3.jpg', to: '/invoice-template3' },
              { src: '/assets/images/INV4.jpg', to: '/invoice-template4' },
            ].map((img, index) => (
              <Link key={index} to={img.to}>
                <img
                  src={img.src}
                  alt={`Invoice Template ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full lg:h-[50vh] object-cover border-4 border-transparent hover:border-green-500 rounded-2xl"
                />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default React.memo(SelectDesign);