import React from 'react';
import { Icon } from '@iconify/react';
import './StyleSheets/ContactUs.css';
function ContactUs() {
  return (
    <section className="text-gray-600 body-font relative">
      <div id="google_translate_element" className="flex justify-end"></div>
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Contact Us
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base ">
            If you have any problem or anythink you can contact with us easily
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap flex-col -m-2 sm:flex-row">
            <div className="p-2 sm:w-1/2 ">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 sm:w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button className="flex mx-auto text-white bg-indigo-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-900 rounded text-lg">
                Send
              </button>
            </div>
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              <a className="text-indigo-500 flex justify-center items-center gap-2">
                <Icon icon="icon-park:email-block" width="30" height="30" />
                <span className="hover:underline cursor-pointer">
                  smart.vision77@hotmail.com
                </span>
              </a>
              <p className="leading-normal my-5 flex justify-center items-center gap-2">
                <Icon
                  icon="mdi:location-radius-outline"
                  className="text-red-600"
                  width="30"
                  height="30"
                />
                <span>٢٨ش مصطفى النحاس أمام صادكو - مدينة نصر – القاهرة</span>
              </p>
              <p className="leading-normal my-5 flex justify-center items-center gap-2 ">
                <Icon icon="twemoji:flag-egypt" />
                <span>20+ 01111226783</span>
              </p>

              <span className="inline-flex">
                <a
                  href="https://www.facebook.com/smartvision77"
                  target="_blank"
                  className="text-gray-500"
                >
                  <Icon icon="logos:facebook" width="30" height="30" />
                </a>
                <a className="ml-4 text-gray-500">
                  <Icon icon="logos:twitter" width="30" height="30" />
                </a>
                <a className="ml-4 text-gray-500">
                  <Icon icon="skill-icons:instagram" width="30" height="30" />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
