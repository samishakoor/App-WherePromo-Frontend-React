

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Track whether it's login or signup form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login or signup logic here based on isLogin state
    if (isLogin) {
      console.log("Login submitted with email:", email, "and password:", password);
    } else {
      console.log("Signup submitted with email:", email, "and password:", password);
    }
    // Clear form fields after submission
    setEmail('');
    setPassword('');
    // Close login form
    setShowLogin(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and signup form
  };

  return (
    <nav className="bg-white shadow-md px-4 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-xl text-sky-500 font-bold mr-4">WherePromo</span>
      </div>

    <div className="flex space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
        <Link to="/pricing" className="text-gray-700 hover:text-blue-500">Pricing</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-500">About</Link>
        <Link to="/articles" className="text-gray-700 hover:text-blue-500">Articles</Link>
        <Link to="/maps" className="text-gray-700 hover:text-blue-500">Maps</Link>
        </div>

      <div>
        <button className="bg-blue-500 text-white font-bold rounded-2xl px-4 py-2" onClick={toggleLogin}>
          Login to Account
        </button>
      </div>

      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center px-20 py-16 max-w-lg text-base bg-white rounded-3xl max-md:px-5">
              <div className="mt-5 text-4xl font-bold tracking-tighter text-sky-500 leading-[49px]">
                {isLogin ? 'Login' : 'Sign Up'}
              </div>
              <div className="flex gap-5 justify-between px-4 py-3.5 mt-16 max-w-full whitespace-nowrap bg-white rounded-3xl border border-violet-300 border-solid text-stone-900 w-[313px] max-md:mt-10">
                <div className="self-start mt-3">Username</div>
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  className="border-none focus:outline-none px-3 py-2 w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex gap-5 justify-between px-4 py-4 mt-8 max-w-full whitespace-nowrap bg-white rounded-3xl border border-violet-300 border-solid text-stone-900 w-[313px]">
                <div className="my-auto">Password</div>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="border-none focus:outline-none px-3 py-2 w-full"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mt-4 text-sm text-cyan-900">{isLogin ? 'Forgot password?' : ''}</div>
              <button type="submit" className="bg-blue-500 text-white font-bold rounded-lg px-4 py-2 mt-8">{isLogin ? 'Login' : 'Sign Up'}  

              </button>
              <div className="mt-4 text-base">
                {isLogin ? "New here? " : "Already have an account? "}
                <button type="button" className="text-sky-600 underline" onClick={toggleForm}>{isLogin ? "Register Now!" : "Login Here"}</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
