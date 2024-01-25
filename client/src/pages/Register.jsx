import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StyleSheets/Register.css';
import { useForm } from 'react-hook-form';
import Loading from '../components/Loading';
import axios from 'axios';
function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const handleSubmitForm = async (data) => {
    try {
      await axios
        .post('/auth/register', { ...data })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          navigate('/login');
        })
        .catch((error) => {
          throw error.response.data;
        });
      //throw new Error();
      //console.log(data);
    } catch (error) {
      setError('root', {
        message: `${error.message}`,
      });
    }
  };
  return (
    <div className="h-screen flex items-center justify-center mt-auto">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto form_container">
        <form
          className="max-w-md mx-auto"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="mt-5 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                type="text"
                id="username"
                name="username"
                {...register('username', {
                  required: 'Username is required',
                })}
              />
              {errors.username && (
                <div className="text-red-500 mb-3">
                  {errors.username.message}
                </div>
              )}
            </div>
            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                type="email"
                id="email"
                name="email"
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
                <div className="text-red-500 mb-3">{errors.email.message}</div>
              )}
            </div>
            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 text-sm w-full "
                type="password"
                id="password"
                name="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 7,
                    message:
                      'Password length should be greater than 6 character',
                  },
                })}
              />
              {errors.password && (
                <div className="text-red-500 mb-3">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 text-sm w-full "
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                {...register('confirmPassword', {
                  validate: (value) => {
                    const { password } = getValues();
                    if (password !== value) {
                      return "Passwords don't match";
                    }
                  },
                })}
              />
              {errors.confirmPassword && (
                <div className="text-red-500 mb-3">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1  text-sm w-full"
                type="number"
                id="phone"
                name="phone"
                {...register('phone', {
                  required: 'Please enter your phone',
                })}
              />
              {errors.phone && (
                <div className="text-red-500 mb-3">{errors.phone.message}</div>
              )}
            </div>
            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                id="gender"
                name="gender"
                {...register('gender', {
                  required: 'please select you gender',
                })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <div className="text-red-500 mb-3">{errors.gender.message}</div>
              )}
            </div>
          </div>
          <div className="">
            {isSubmitting ? (
              <Loading />
            ) : (
              <button
                disabled={isSubmitting}
                title="Sign up"
                type="submit"
                className="py-2 px-4 bg-blue-700 hover:bg-blue-900 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                <span>Sign up</span>
              </button>
            )}
            {errors.root && (
              <div className="text-red-500">{errors.root.message}</div>
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            <Link
              to={'/login'}
              className="text-xs text-black uppercase hover:underline"
            >
              have an account? Log in
            </Link>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
          <p className="note flex justify-center my-3">
            Terms of use &amp; Conditions
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
