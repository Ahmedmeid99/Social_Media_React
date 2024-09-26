//@/collapse

import React, { useReducer, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signupUser } from "../../Redux/user/userActions";
import { GetCountries } from "../../API/Country";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../UI/Loading";
import Notification from "../../UI/Notification";
// Initial state for the form
const initialState = {
  username: "",
  password: "",
  gender: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  address: "",
  countryId: 0,
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
    default:
      return state;
  }
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  const re = /^[0-9]{11}$/;
  return re.test(phone);
};

// Validation function
const validate = (state) => {
  const errors = {};
  if (!state.username) errors.username = "Username is require";
  if (!state.password) errors.password = "Password is require";
  if (!state.gender) errors.gender = "gender is require";
  if (!state.dateOfBirth) errors.dateOfBirth = "Date of Birth is require";
  if (!state.phone) errors.phone = "Phone is require";
  if (!state.email) errors.email = "Email is require";
  if (!state.address) errors.address = "Address is require";
  if (!state.countryId) errors.countryId = "Country is require";
  if (!validateEmail(state.email))
    errors.email = "Invalid email address Must contain @gmail.com";
  if (!validatePhone(state.phone))
    errors.phone = "Phone number must be 11 digits";
  return errors;
};

const Signup = () => {
  const UserDispatch = useDispatch();
  const navigate = useNavigate();

  const { isSignup, loading, error } = useSelector((state) => state.User);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [countries, setCountries] = useState([]); //{ countryID: 1, countryName: "Egypt" },{ countryID: 2, countryName: "USA" }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await GetCountries();
        setCountries(result);
      } catch (error) {
        throw error;
      }
    };
    fetchCountries();

    return () => {
      false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD_VALUE", field: name, value });
  };

  const handleChangeGender = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD_VALUE", field: name, value: value[0] });
  };

  const handleCountryChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_FIELD_VALUE",
      field: "countryId",
      value: Number(value),
    });
  };

  const handlePhonekeyPress = (e) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const User = {
      userName: state?.username,
      password: state?.password,
      gender: state?.gender,
      dateOfBirth: state?.dateOfBirth,
      phone: state?.phone,
      email: state?.email,
      address: state?.address || null,
      countryId: state?.countryId,
    };

    const errors = validate(state);

    if (Object.keys(errors).length > 0) {
      for (const field in errors) {
        dispatch({ type: "SET_ERROR", field, error: errors[field] });
      }
      console.log("Error", User);
    } else {
      // Handle form submission
      // tell use that form submated succefuly (use Model)
      console.log("Form submitted successfully", User);
      UserDispatch(signupUser(User));

      // after Sucess Sigin up navegate to Login Page
      setTimeout(() => {
        navigate("/Login");
      }, 400);
    }
  };

  return (
    <>
      {error && <Notification error={error} />}
      <form
        onSubmit={handleSubmit}
        className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md mx-auto  p-6 bg-white dark:bg-gray-800 rounded-md sm:shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
          Sign Up
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
        {/* Grid for Phone and Gender */}
        <div className="grid grid-cols-2 gap-4 py-2">
          {/* Phone Number */}
          <div>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                max={11}
                name="phone"
                value={state.phone}
                onChange={handleChange}
                onKeyPress={handlePhonekeyPress}
              />
              <label
                htmlFor="phone"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Phone Number
              </label>
            </div>
            {!!state.errors.phone && (
              <p
                id="filled_error_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                <span className="font-medium"> </span> {state.errors.phone}
              </p>
            )}
          </div>
          {/* Gender */}
          <div>
            <div className="relative">
              <select
                id="gender"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                name="gender"
                value={state.gender}
                onChange={handleChangeGender}
              >
                <option value="">Select...</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              <label
                htmlFor="gender"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Gender
              </label>
            </div>
            {!!state.errors.gender && (
              <p
                id="filled_error_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                <span className="font-medium"> </span> {state.errors.gender}
              </p>
            )}
          </div>
        </div>
        {/* Email Address */}
        <div className="py-2">
          <div className="relative">
            <input
              type="email"
              id="email"
              className={` block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                !!state.errors.email && `text-red-600  dark:text-red-500 `
              }`}
              placeholder=" "
              name="email"
              value={state.email}
              onChange={handleChange}
            />
            <label
              htmlFor="email"
              className={` absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ${
                !!state.errors.email &&
                `text-red-600 dark:text-red-500 focus:text-red-600 dark:focus:text-red-500`
              }`}
            >
              Email Address
            </label>
          </div>
          {!!state.errors.email && (
            <p
              id="filled_error_help"
              className="mt-2 text-xs text-red-600 dark:text-red-400"
            >
              <span className="font-medium"> </span> {state.errors.email}
            </p>
          )}
        </div>

        <div className="py-2">
          <div className="relative">
            <input
              type="text"
              id="address"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              name="address"
              value={state.address}
              onChange={handleChange}
            />
            <label
              htmlFor="address"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Address
            </label>
          </div>
          {!!state.errors.address && (
            <p
              id="filled_error_help"
              className="mt-2 text-xs text-red-600 dark:text-red-400"
            >
              <span className="font-medium"> </span> {state.errors.address}
            </p>
          )}
        </div>

        {/* Grid for Date of Birth and Country */}
        <div className="grid grid-cols-2 gap-4 py-2">
          {/* Date of Birth */}
          <div>
            <div className="relative">
              <input
                type="date"
                id="date_of_birth"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                name="dateOfBirth"
                value={state.dateOfBirth}
                onChange={handleChange}
              />
              <label
                htmlFor="date_of_birth"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Date of Birth
              </label>
            </div>
            {!!state.errors.dateOfBirth && (
              <p
                id="filled_error_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                <span className="font-medium"> </span>{" "}
                {state.errors.dateOfBirth}
              </p>
            )}
          </div>
          {/* Country */}
          <div>
            <div className="relative">
              <select
                id="country"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                name="countryId"
                value={state.countryId || 55}
                onChange={handleCountryChange}
              >
                {Array.isArray(countries) &&
                  countries?.length > 0 &&
                  countries?.map((country) => (
                    <option key={country.CountryId} value={country.CountryId}>
                      {country.CountryName}
                    </option>
                  ))}
              </select>
              <label
                htmlFor="country"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Country
              </label>
            </div>
            {!!state.errors.countryId && (
              <p
                id="filled_error_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                <span className="font-medium"> </span> {state.errors.countryId}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-2 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          disabled={loading}
        >
          {loading ? <Loading /> : "Sign Up"}
        </button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Log in here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Signup;
