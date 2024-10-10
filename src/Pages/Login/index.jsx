//@/collapse

import React, { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../Redux/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading";
import { StoreLogin } from "../../Global/Methods";
import Notification from "../../UI/Notification";

// Initial state for the form
const initialState = {
  username: "",
  password: "",
  errors: {},
};

// Reducer function to handle form state
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD_VALUE":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: "" }, // set ex: usename error ""
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {},
      };
    default:
      return state;
  }
};

// Validation function
const validate = (state) => {
  const errors = {};
  if (!state.username) errors.username = "Username is require";
  if (!state.password) errors.password = "Password is require";
  return errors;
};

const Signup = () => {
  const UserDispatch = useDispatch();
  const navigate = useNavigate();

  const { User, isSignup, loading, error } = useSelector((state) => state.User);

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD_VALUE", field: name, value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true); // Show loading state

  const userLogin = {
    userName: state?.username,
    password: state?.password,
  };

  const errors = validate(state);

  if (Object.keys(errors).length > 0) {
    for (const field in errors) {
      dispatch({ type: "SET_ERROR", field, error: errors[field] });
    }
    setIsSubmitting(false); // Hide loading state if there are errors
  } else {
    if (!error) {
      try {
        const resultAction = await UserDispatch(loginUser(userLogin));
        
        StoreLogin(resultAction.payload);
        
        if (loginUser.fulfilled.match(resultAction)) {
          navigate('/Home'); // Navigate after successful login
        }
      } catch (err) {
        console.error("Login failed", err);
      }
      setIsSubmitting(false); // Hide loading state after async operation
    }
  }
};

if(isSubmitting){
  return <Loading/>
}

  return (
    <>
      {error && <Notification error={error} />}
      <form
        onSubmit={handleSubmit}
        className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-md sm:shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
          Login
        </h2>
        <div className="py-2">
          {/*  Name */}
          <div className="relative">
            <input
              min={8}
              max={30}
              type="text"
              id="name"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              name="username"
              value={state.username}
              onChange={handleChange}
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              User Name
            </label>
          </div>
          {!!state.errors.username && (
            <p
              id="filled_error_help"
              className="mt-2 text-xs text-red-600 dark:text-red-400"
            >
              <span className="font-medium"> </span> {state.errors.username}
            </p>
          )}
        </div>
        {/* Password */}
        <div className="py-2">
          <div className="relative">
            <input
              min={5}
              max={12}
              type="password"
              id="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Password
            </label>
          </div>
          {!!state.errors.password && (
            <p
              id="filled_error_help"
              className="mt-2 text-xs text-red-600 dark:text-red-400"
            >
              <span className="font-medium"> </span> {state.errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          disabled={loading}
        >
          {loading ? <Loading /> : "Login"}
        </button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/Signup"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign_up in here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Signup;
