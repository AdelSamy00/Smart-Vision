import React from 'react';
import { useForm } from 'react-hook-form';
function ContactUsForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const handleSubmitForm = async (data) => {
    try {
      const { name, email, message } = data;
      const file = data.file[0];
      console.log(name, email, message, file);
    } catch (error) {
      setError('root', {
        message: `${error.message}`,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-wrap flex-col -m-2 sm:flex-row"
    >
      <div className="p-2 sm:w-1/2 ">
        <div className="relative">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">
            Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            {...register('name', {
              required: 'name is required',
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
      </div>
      <div className="p-2 sm:w-1/2">
        <div className="relative">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            {...register('email', {
              required: 'Email Address is required',
              validate: (value) => {
                if (!value.includes('@')) {
                  return 'Email must include @';
                }
                return true;
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative">
          <label htmlFor="message" className="leading-7 text-sm text-gray-600">
            Message*
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            {...register('message', {
              required: 'message is required',
            })}
          ></textarea>
          {errors.message && (
            <div className="text-red-500">{errors.message.message}</div>
          )}
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="relative flex justify-items-center gap-2">
          <label
            htmlFor="uploadFile"
            className="leading-7 text-sm text-gray-600 mt-1"
          >
            uploadFile
          </label>
          <input
            type="file"
            id="uploadFile"
            name="uploadFile"
            className="uploadBtn file:hidden text-gray-700 bg-gray-300 w-1/4"
            {...register('file')}
          />
        </div>
      </div>
      <div className="p-2 w-full">
        <button className="flex mx-auto text-white bg-indigo-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-900 rounded text-lg">
          Send
        </button>
      </div>
    </form>
  );
}

export default ContactUsForm;
