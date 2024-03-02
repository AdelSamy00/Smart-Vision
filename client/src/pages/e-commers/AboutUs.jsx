import React from 'react';
import ImageSlider from '../../components/e-commers/ImageSlider';

function AboutUs() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto flex flex-col ">
        <div className="w-full mx-auto ">
          <div className="rounded-lg sm:h-60 md:h-full w-full overflow-hidden">
            <img
              alt="content"
              className="object-cover object-center h-full w-full flex lg:hidden"
              src="/background.jpg"
            />
            <div className="hidden lg:inline sm:w-1/2">
              <ImageSlider />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-32 h-32 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <img
                  src="/smartVisionLogo.png"
                  className="p-3"
                  alt="smartVisionLogo"
                />
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                  Smart Vision
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                {/* <p className="text-base">
                  Smart Vision seeks to provide the best services with high
                  quality to its customers while achieving the equation between
                  (commitment - price - quality)
                </p> */}
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <h2 className="text-2xl mb-2">Smart Vision Company</h2>
              <p className="leading-relaxed text-lg mb-4">
                A leading company in its field and has smart solutions in
                employing products through specialized engineers with high
                quality and commitment to specifications and deadlines in the
                manufacture, supply and installation of (office curtains - HDF
                parquet - kitchens - armored doors - bathroom and dressing units
                - stretch ceilings) two-year warranty and lifelong maintenance -
                sale At factory prices.
              </p>
            </div>
          </div>
          <div className="mt-10 w-full  flex flex-col md:flex-row bg-slate-200 justify-between overflow-hidden rounded-lg ">
            <div className="md:w-1/3 flex flex-col  bg-slate-300  p-10 hover:bg-slate-100 transition ease-in duration-800">
              <img
                src="/vision.png"
                alt="vision"
                width={60}
                height={60}
                className="self-center"
              />
              <h2 className="text-3xl text-blue-500 text-center ">
                Our Vision
              </h2>
              <p className="text-black">
                Smart Vision seeks to provide the best services with high
                quality to its customers while achieving the equation between
                (commitment - price - quality)
              </p>
            </div>
            <div className="md:w-1/3 flex flex-col p-10 hover:bg-slate-100 transition ease-in duration-800">
              <img
                src="/mission.png"
                alt="vision"
                width={60}
                height={60}
                className="self-center"
              />
              <h2 className="text-3xl text-blue-500 text-center">Mission</h2>
              <p className="text-black">
                We affirm our keenness to work continuously to obtain excellent
                results by forming a partnership between us and our customers in
                achieving the vision of Smart Vision.
              </p>
            </div>
            <div className="md:w-1/3 flex flex-col  bg-slate-300  p-10 hover:bg-slate-100 transition ease-in duration-800">
              <img
                src="/commitment.png"
                alt="vision"
                width={60}
                height={60}
                className="self-center"
              />
              <h2 className="text-3xl text-blue-500 text-center">Commitment</h2>
              <p className="text-black">
                We are committed to hard and continuous work and learning to
                provide our services to our customers without discrimination,
                and to work to develop our products to reach the highest levels
                of quality
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
