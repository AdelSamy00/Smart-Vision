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
      description:"Our products are specifically designed to be simple to assemble, so that our customers can easily do it themselves. However, if you need an extra hand, we can provide a service for the assembly of your IKEA furniture in your home. Our professionals will carefully follow the instructions and will make sure that all the safety aspects of the building process are rigorously respected. When we’re finished, we take all the packaging with us and we make sure that everything is recycled properly."
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
      description:"Our kitchen planning specialists will help you plan your dream kitchen. They can do this in the store or by visiting your home to measure and plan, then pick, deliver and install your new kitchen. We specialise in making the best use of space so you get a kitchen that suits the way you live or work. In a style that suits you. If you prefer doing your own planning, you can use our kitchen planning tools online at our website."
    },
    {
      image_url: '/installationService.png',
      title: 'Customization Service',
      link: '/',
      description:"Terms and conditions Includes installation within Egypt only Goods can be delivered for an added fee No alterations can be made to IKEA lighting fixtures IKEA blinds  rods Patching and painting are not included in the service.  Once installed the goods will not be accepted for exchange or refund All integrated lights will be fixed/attached to IKEA products only All extra cables extension wires required for integrated light fitting needs to be purchased by the customer and will not be provided by the installation team. Wiring supply cable will be visible due to the fixture design. An electrical outlet should be readily available before the installation takes place. Ceiling height should not exceed 3 meters. Trunking materials will be provided by smart vision the trunking will be visible. All arrangements should be made to ensure the clearance of the team into the premises. Service area limitation: smart vision reserves the right to refuse this service."
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