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
      title: 'Kitchen services',
      link: '/',
    },
    {
      image_url: '/installationService.png',
      title: 'Installation Service',
      link: '/',
    },
    {
      image_url: '/measuringService.png',
      title: 'Measuring Service',
      link: '/',
    },
    {
      image_url: '/pickingService.png',
      title: 'Picking Service',
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

{
  /* <div class="px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          <div class="xl:w-1/4 md:w-1/2 p-4">
            <div class="bg-gray-100 p-6 rounded-lg">
              <img
                class="h-40 rounded w-full object-cover object-center mb-6"
                src="https://dummyimage.com/720x400"
                alt="content"
              />
              <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">
                SUBTITLE
              </h3>
              <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
                Chichen Itza
              </h2>
              <p class="leading-relaxed text-base">
                Fingerstache flexitarian street art 8-bit waistcoat. Distillery
                hexagon disrupt edison bulbche.
              </p>
            </div>
          </div>
        </div>
      </div> */
}
