import React from "react";
import { Icon } from "@iconify/react";
import * as icon from "../utils/icon";
import Logo from "../assets/icons/Logo.png";

export const Profile: React.FC = () => {
  return (
    <>
      <div className="w-1/2">
        <img src={Logo} alt="" className="w-12 rounded-full" />
        <p className="text-sm mt-2">Selamat datang,</p>
        <h1 className="text-xl font-semibold">Kristanto Wibowo</h1>
      </div>
    </>
  );
};

export const Account: React.FC = () => {
  const condition = true;

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="relative mx-auto flex flex-col items-center p-1">
          <img src={Logo} alt="" className="w-32 rounded-full" />
          <span className="absolute bottom-0 right-1 border border-solid rounded-full bg-white p-1">
            <label htmlFor="profile_image">
              <Icon
                icon="material-symbols:edit"
                width={18}
                className="cursor-pointer"
              />
            </label>
            <input
              type="file"
              name="profile_image"
              id="profile_image"
              className="hidden"
            />
          </span>
        </div>
        <h1 className="text-xl font-semibold mx-auto">Kristanto wibowo</h1>
      </div>
      <div className="flex flex-col gap-y-4 my-4 items-center">
        <div className="w-1/2">
          <h1 className="text-sm mb-2">Email</h1>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <span className="absolute inset-y-0 grid place-content-center px-4">
              <Icon icon={icon.email.icon} color={icon.email.color.disable} />
            </span>
            <input
              name="email"
              type="email"
              className="w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm focus:outline-none focus:border-gray-500"
              placeholder="masukan email anda"
              // onChange={handleInput}
            />
          </div>
        </div>
        <div className="w-1/2">
          <h1 className="text-sm mb-2">Nama Depan</h1>
          <label htmlFor="first_name" className="sr-only">
            Nama Depan
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 grid place-content-center px-4">
              <Icon
                icon={icon.name.icon}
                color={
                  condition ? icon.email.color.active : icon.email.color.disable
                }
              />
            </span>
            <input
              name="first_name"
              type="text"
              className="w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm focus:outline-none focus:border-gray-500"
              placeholder="nama depan"
              // onChange={handleInput}
            />
          </div>
        </div>
        <div className="w-1/2">
          <h1 className="text-sm mb-2">Nama Belakang</h1>
          <label htmlFor="last_name" className="sr-only">
            Nama Belakang
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 grid place-content-center px-4">
              <Icon
                icon={icon.name.icon}
                color={
                  condition ? icon.email.color.active : icon.email.color.disable
                }
              />
            </span>
            <input
              name="last_name"
              type="last_name"
              className="w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm focus:outline-none focus:border-gray-500"
              placeholder="nama belakang"
              // onChange={handleInput}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-4">
        {condition ? (
          <>
            <button className="w-1/2 p-4 text-sm rounded-lg bg-[#f42619] text-white outline-none font-semibold">
              Edit Profile
            </button>
            <button className="w-1/2 p-4 text-sm rounded-lg border-2 border-solid border-[#f42619] text-[#f42619] outline-none font-semibold">
              Logout
            </button>
          </>
        ) : (
          <button className="w-1/2 p-4 text-sm rounded-lg bg-[#f42619] text-white outline-none font-semibold">
            Simpan
          </button>
        )}
      </div>
    </>
  );
};
