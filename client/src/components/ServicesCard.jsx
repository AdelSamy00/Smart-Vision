import React from 'react';
import { Link, NavLink } from 'react-router-dom';
function ServicesCard({ services }) {
  return services.map((service, idx) => (
    <div key={idx} className="w-[100%] md:w-[45%] lg:w-[30%] h-full  mb-5">
      <Link to={service.link} className="text-2xl hover:underline">
        <div className="bg-gray-200  h-full p-5 flex justify-center mb-3 hover:bg-gray-100">
          <img
            src={service.image_url}
            alt={service.title}
            width={120}
            height={120}
          />
        </div>
        <div className="container flex items-center ml-5 mb-3">
          {service.title}
          <svg
            className="w-8 h-6 mt-2 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </div>
      </Link>
    </div>
  ));
}

export default ServicesCard;
