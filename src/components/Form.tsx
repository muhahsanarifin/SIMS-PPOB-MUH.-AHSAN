import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { membershipAction } from "../redux/reducers/membership";

import * as Button from "./Button";
import Logo from "../assets/icons/Logo.png";
import { Icon } from "@iconify/react";
import * as icon from "../utils/icon";
import * as Loader from "./Loader";

export const Login: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const login = useSelector((state: RootState) => state.membership.login);

  const navigate = useNavigate();

  // Handle visible password
  const [visiblePwd, setVisiblePwd] = useState(false);

  // Handle Input
  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  const handleInput = (el: any) => {
    const { name, value } = el.target;

    setBody({ ...body, [name]: value });
  };

  // Handle Submit
  const handleSubmit = () => {
    dispatch(membershipAction.loginThunk({ body }));
  };

  // Handle error modal
  const handleErrorModal = () => {
    dispatch(membershipAction.close());
  };

  return (
    <>
      <div className="relative w-1/2 flex flex-col h-full lg:w-full">
        <div className="my-auto">
          <div className="p-4 sm:p-6 lg:p-8  flex flex-col gap-y-4">
            <div className=" flex items-center gap-x-2 justify-center">
              <img src={Logo} alt="logo" className="w-[32px] h-[32px]" />
              <h3 className="font-semibold text-[24px]">SIMS PPOB</h3>
            </div>
            <h1 className="text-center text-[24px] font-semibold w-[40%] mx-auto lg:my-2 lg:w-full sm:w-[70%] sm:text-[18px]">
              Masuk atau buat akun untuk memulai
            </h1>
            {/* Email input */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <span className="absolute inset-y-0 grid place-content-center px-4">
                  <Icon
                    icon={icon.email.icon}
                    color={
                      login?.isRejected
                        ? icon.email.color.error
                        : body.email
                        ? icon.email.color.active
                        : icon.email.color.disable
                    }
                  />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm focus:outline-none focus:border-gray-500 ${
                    login?.isRejected ? "border-[#f3271c]" : "border-gray-200"
                  }`}
                  placeholder="masukan email anda"
                  onChange={handleInput}
                />
              </div>
            </div>
            {/* Password input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <span className="absolute inset-y-0 grid place-content-center px-4">
                  <Icon
                    icon={icon.password.icon}
                    color={
                      login?.isRejected
                        ? icon.password.color.error
                        : body.password
                        ? icon.password.color.active
                        : icon.password.color.disable
                    }
                  />
                </span>
                <input
                  id="password"
                  name="password"
                  type={visiblePwd ? "text" : "password"}
                  className={`w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm focus:outline-none focus:border-gray-500 ${
                    login?.isRejected ? "border-[#f3271c]" : "border-gray-200"
                  }`}
                  placeholder="masukan password anda"
                  onChange={handleInput}
                />
                <button
                  className="absolute inset-y-0 end-0 grid place-content-center px-4"
                  onClick={() => setVisiblePwd(!visiblePwd)}
                >
                  <Icon
                    icon={
                      visiblePwd
                        ? icon.password.visibility.on
                        : icon.password.visibility.off
                    }
                    color={
                      visiblePwd
                        ? icon.password.color.active
                        : icon.password.color.disable
                    }
                  />
                </button>
              </div>
            </div>
            <Button.Auth
              onTitle={login?.isLoading ? <Loader.Spinner /> : "Masuk"}
              setClick={handleSubmit}
              onDisable={Object.values(body).includes("") || login?.isLoading}
            />
          </div>
          <p className="text-center text-sm text-gray-500">
            belum punya akun? registrasi{" "}
            <button className="underline" onClick={() => navigate("/register")}>
              <span className="text-red-500">di sini</span>
            </button>
          </p>
        </div>
        {/* Error modal */}
        {login?.isRejected && (
          <div className="absolute bg-[#fee2e2] bottom-6 inset-x-2 py-1 px-2 text-[#f3271c] flex items-center">
            <p className="text-xs">{login?.err}</p>
            <button onClick={handleErrorModal} className="ml-auto">
              <Icon icon="material-symbols:close" color="#f3271c" width="16" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export const Register: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const registration = useSelector(
    (state: RootState) => state.membership.registration
  );
  const login = useSelector((state: RootState) => state.membership.login);
  const navigate = useNavigate();

  const error = false;

  // Handle visible password
  const [visiblePwd, setVisiblePwd] = useState(false);
  const [visibleKPwd, setVisibleKPwd] = useState(false);

  // Handle input
  const [body, setBody] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  });

  const handleInput = (el: any) => {
    const { name, value } = el.target;

    setBody({ ...body, [name]: value });
  };

  // Handle register
  const { email, first_name, last_name, password } = body;

  const handleRegister = () => {
    const body = {
      email,
      first_name,
      last_name,
      password,
    };

    const cbFulfilled = () => {
      const body = {
        email,
        password,
      };
      dispatch(membershipAction.loginThunk({ body }));
      if (login?.isFulfilled) {
        navigate("/home");
      }
    };

    dispatch(membershipAction.registrationThunk({ body, cbFulfilled }));
  };

  return (
    <>
      <div className=" w-1/2 lg:w-full flex flex-col my-auto">
        <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-y-4">
          <div className=" flex items-center gap-x-2 justify-center">
            <img src={Logo} alt="logo" className="w-[32px] h-[32px]" />
            <h3 className="font-semibold text-[24px]">SIMS PPOB</h3>
          </div>
          <h1 className="text-center text-[24px] font-semibold w-[40%] mx-auto lg:my-2 lg:w-full sm:w-[70%] sm:text-[18px]">
            Lengkapi data untuk membuat akun
          </h1>
          {/* Email input */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 grid place-content-center px-4">
                <Icon
                  icon={icon.email.icon}
                  color={
                    body.email
                      ? icon.email.color.active
                      : icon.email.color.disable
                  }
                />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm focus:outline-none border-gray-200 focus:border-gray-500"
                placeholder="masukan email anda"
                onChange={handleInput}
              />
            </div>
          </div>
          {/* Firstname input */}
          <div>
            <label htmlFor="first_name" className="sr-only">
              First Name
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 grid place-content-center px-4">
                <Icon
                  icon={icon.name.icon}
                  color={
                    error
                      ? icon.name.color.error
                      : body.first_name
                      ? icon.name.color.active
                      : icon.name.color.disable
                  }
                />
              </span>
              <input
                id="first_name"
                name="first_name"
                type="text"
                className="w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm focus:outline-none border-gray-200 focus:border-gray-500"
                placeholder="nama depan"
                onChange={handleInput}
              />
            </div>
          </div>
          {/* Lastname input */}
          <div>
            <label htmlFor="last_name" className="sr-only">
              Last Name
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 grid place-content-center px-4">
                <Icon
                  icon={icon.name.icon}
                  color={
                    error
                      ? icon.name.color.error
                      : body.last_name
                      ? icon.name.color.active
                      : icon.name.color.disable
                  }
                />
              </span>
              <input
                id="last_name"
                name="last_name"
                type="text"
                className="w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm focus:outline-none border-gray-200 focus:border-gray-500"
                placeholder="nama belakang"
                onChange={handleInput}
              />
            </div>
          </div>
          {/* Create password input */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 grid place-content-center px-4">
                <Icon
                  icon={icon.password.icon}
                  color={
                    error
                      ? icon.password.color.error
                      : body.password
                      ? icon.password.color.active
                      : icon.password.color.disable
                  }
                />
              </span>
              <input
                id="password"
                name="password"
                type={visiblePwd ? "text" : "password"}
                className="w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm focus:outline-none border-gray-200 focus:border-gray-500"
                placeholder="buat password"
                onChange={handleInput}
              />
              <button
                className="absolute inset-y-0 end-0 grid place-content-center px-4"
                onClick={() => setVisiblePwd(!visiblePwd)}
              >
                <Icon
                  icon={
                    visiblePwd
                      ? icon.password.visibility.on
                      : icon.password.visibility.off
                  }
                  color={
                    visiblePwd
                      ? icon.password.color.active
                      : icon.password.color.disable
                  }
                />
              </button>
            </div>
          </div>
          {/* Confirm password input */}
          <div>
            <label htmlFor="confirm_password" className="sr-only">
              Confirm Password
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 grid place-content-center px-4">
                <Icon
                  icon={icon.password.icon}
                  color={
                    error
                      ? icon.password.color.error
                      : body.confirm_password
                      ? icon.password.color.active
                      : icon.password.color.disable
                  }
                />
              </span>
              <input
                id="confirm_password"
                name="confirm_password"
                type={visibleKPwd ? "text" : "password"}
                className={`w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm ${
                  body.password !== body.confirm_password &&
                  body.confirm_password !== ""
                    ? "focus:outline-none focus:border-[#f3271c]"
                    : "border-gray-200 focus:outline-none focus:border-gray-500"
                }`}
                placeholder="konfirmasi password"
                onChange={handleInput}
              />
              <button
                className="absolute inset-y-0 end-0 grid place-content-center px-4"
                onClick={() => setVisibleKPwd(!visibleKPwd)}
              >
                <Icon
                  icon={
                    visibleKPwd
                      ? icon.password.visibility.on
                      : icon.password.visibility.off
                  }
                  color={
                    visibleKPwd
                      ? icon.password.color.active
                      : icon.password.color.disable
                  }
                />
              </button>
            </div>
            {body.password !== body.confirm_password &&
            body.confirm_password !== "" ? (
              <div className="py-2 flex">
                <p className="text-xs text-[#f3271c] ml-auto">
                  password tidak sama
                </p>
              </div>
            ) : null}
          </div>
          <Button.Auth
            onTitle={registration?.isLoading ? <Loader.Spinner /> : "Masuk"}
            setClick={handleRegister}
            onDisable={
              Object.values(body).includes("") ||
              (body.password !== body.confirm_password &&
                body.confirm_password !== "") ||
              registration?.isLoading
            }
          />
        </div>
        <p className="text-center text-sm text-gray-500">
          sudah punya akun? login{" "}
          <button className="underline" onClick={() => navigate("/login")}>
            <span className="text-red-500">di sini</span>
          </button>
        </p>
      </div>
    </>
  );
};
