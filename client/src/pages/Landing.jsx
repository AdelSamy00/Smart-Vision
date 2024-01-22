import React from 'react';
import './StyleSheets/Landing.css';
import { Link, NavLink } from 'react-router-dom';
function Landing() {
  return (
    <div className="landding flex text-center text-white bg-dark">
      <div className=" w-full flex w-100 h-100 p-3 mx-auto flex-col">
        <header className="mb-auto">
          <div className="">
            <h3 className="md:float-left mb-0">Smart Vision</h3>
            <nav className="nav nav-masthead justify-center md:float-right">
              <NavLink
                to={'/'}
                className="nav-link active"
                aria-current="pages"
              >
                Home
              </NavLink>
              <NavLink to={'/login'} className="nav-link">
                Login
              </NavLink>
              <NavLink to={'/register'} className="nav-link">
                Register
              </NavLink>
            </nav>
          </div>
        </header>
        <main className="px-3">
          <h1>Smart Vision</h1>
          <p className="lead">
            Welcome to Smart Vision! <br /> Jump right in and explore our many
            products. <br />
            Feel free to share some of your own and comment on others!
          </p>
          <a
            href="/"
            className="btn btn-lg btn-secondary font-bold  text-black"
          >
            View Product
          </a>
        </main>

        <footer className="mt-auto text-white-50">
          <p>&copy; 2024 </p>
        </footer>
      </div>

      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
        integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
        crossOrigin="anonymous"
      />
    </div>
  );
}

export default Landing;
