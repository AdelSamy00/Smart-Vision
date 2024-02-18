import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import ServicesCard from '../components/ServicesCard';
function Services() {
  const navigate = useNavigate();
  const services = [
    {
      image_url: '/assemblyService.png',
      title: 'Assembly service',
      link: '/',
      description:"Our products are specifically designed to be simple to assemble, so that our customers can easily do it themselves. However, if you need an extra hand, we can provide a service for the assembly of your smart vision furniture in your home."
    },
    {
      image_url: '/deliveryServices.png',
      title: 'Delivery services',
      link: '/',
      description:"Most of our products are flat packed and designed in such a way that they can easily fit in your car. However, if you prefer to have your purchase delivered, you can choose among our range of delivery options."

    },
    {
      image_url: '/kitchenServices.png',
      title: 'Desgins services',
      link: '/',
      description:"Our kitchen planning specialists will help you plan your dream kitchen. They can do this in the store or by visiting your home to measure and plan, then pick, deliver and install your new kitchen."
    },
    {
      image_url: '/installationService.png',
      title: 'Customization Service',
      link: '/',
      description:"Terms and conditions Includes installation within Egypt only Goods can be delivered for an added fee No alterations can be made to smart vision lighting fixtures smart vision blinds  rods Patching and painting are not included in the service. "
    },
    {
      image_url: '/measuringService.png',
      title: 'Measuring Service',
      link: '/',
      description:"We’ll arrange for an experienced professional to visit your home and measure your space and windows. Then you’ll be sure to get the precise measurements that are so crucial to your new kitchen, curtains, PAX wardrobe, or BESTÅ storage"
    },
    {
      image_url: '/pickingService.png',
      title: 'Packing Service',
      link: '/',
      description:"Our co-workers will find and pick the items you wish to purchase from their location in the store. So all you need to do is make a list of the items you wish to buy and place the order with a co-worker who will arrange to have your furniture picked up."
    },
  ];

  const handleServiceClick = (service) => {
    // Navigate to the ServicesDetails page when a service is clicked
    navigate(`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}` , { state: { service } });
  };
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
        <ServicesCard services={services} onServiceClick={handleServiceClick} />
      </div>
    </section>
  );
}

export default Services;