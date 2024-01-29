import React from 'react';

import ServicesCard from '../components/ServicesCard';
function Services() {
  const services = [
    {
      image_url: '/assemblyService.png',
      title: 'Assembly service',
      link: '/',
    },
    {
      image_url: '/deliveryServices.png',
      title: 'Delivery services',
      link: '/',
    },
    {
      image_url: '/kitchenServices.png',
      title: 'Desgins services',
      link: '/',
    },
    {
      image_url: '/installationService.png',
      title: 'Customization Service',
      link: '/',
    },
    {
      image_url: '/measuringService.png',
      title: 'Measuring Service',
      link: '/',
    },
    {
      image_url: '/pickingService.png',
      title: 'Packing Service',
      link: '/',
    },
  ];
  return (
    <section className="container">
      <div className="mb-5">
        <h2 className="text-3xl font-bold mt-5 mb-3">Our services</h2>
        <p className="text-gray-600 md:w-2/4">
          You can do everything yourself, but you don’t have to. We offer a
          range of services to make your life easier.
        </p>
      </div>
      {/* Services Cards */}
      <div className="w-full h-full  flex flex-col sm:flex-row md:justify-between flex-wrap ">
        <ServicesCard services={services} />
      </div>
    </section>
  );
}

export default Services;
