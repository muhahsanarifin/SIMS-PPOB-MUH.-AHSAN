import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { membershipAction } from "../redux/reducers/membership";
import { transactionAction } from "../redux/reducers/transaction";
import { Icon } from "@iconify/react";
import * as icon from "../utils/icon";

export const Image: React.FC<{ onSize: string }> = ({ onSize }) => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const login = useSelector((state: RootState) => state.membership.login);
  const profile = useSelector(
    (state: RootState) => state.membership?.getProfile
  );
  const updateProfileImage = useSelector(
    (state: RootState) => state.membership.updateProfileImage
  );

  const handleImage = (e: any) => {
    if (e.target.files[0]) {
      const body = new FormData();

      body.append("file", e.target.files[0]);

      const accessToken = login.data?.data?.token;

      const cbFinally = () => {
        dispatch(membershipAction.getProfileThunk({ accessToken }));
      };

      dispatch(
        membershipAction.updateProfileImageThunk({
          body,
          accessToken,
          cbFinally,
        })
      );
    }
  };

  return (
    <>
      {profile.data?.data?.profile_image.slice(-4) === "null" ||
      profile?.isLoading ||
      updateProfileImage?.isLoading ? (
        <div
          className={`animate-pulse rounded-full bg-[#e5e5e5] ${onSize}`}
        ></div>
      ) : (
        <img
          src={profile.data?.data?.profile_image}
          alt={`${profile.data?.data?.first_name} ${profile.data?.data?.last_name}`}
          className={`${onSize} rounded-full`}
        />
      )}
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
          onChange={handleImage}
        />
      </span>
    </>
  );
};

export const Profile: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const login = useSelector((state: RootState) => state.membership.login);
  const profile = useSelector(
    (state: RootState) => state.membership.getProfile
  );

  // Get profile
  useEffect(() => {
    const accessToken = login.data?.data?.token;
    dispatch(membershipAction.getProfileThunk({ accessToken }));
  }, [dispatch, login.data?.data.token]);

  return (
    <>
      <div className="w-1/2">
        {profile.data?.data?.profile_image.slice(-4) === "null" ? (
          <div className="relative w-fit p-3">
            <Image onSize="w-16 h-16" />
          </div>
        ) : profile?.isLoading ? (
          <div className=" w-fit p-3">
            <div className="animate-pulse rounded-full bg-[#e5e5e5] w-16 h-16"></div>
          </div>
        ) : (
          <div className=" w-fit p-3">
            <img
              src={profile.data?.data?.profile_image}
              alt={`${profile.data?.data?.first_name} ${profile.data?.data?.last_name}`}
              className="w-16 h-16 rounded-full"
            />
          </div>
        )}
        <p className="text-sm mt-2">Selamat datang,</p>
        <h1 className="text-xl font-semibold">
          {profile?.isFulfilled &&
            `${profile.data?.data?.first_name} ${profile?.data?.data?.last_name}`}
        </h1>
      </div>
    </>
  );
};

export const Account: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const login = useSelector((state: RootState) => state.membership.login);
  const [activeEdit, setActiveEdit] = useState(false);
  const profile = useSelector(
    (state: RootState) => state.membership.getProfile
  );

  // Handle input
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");

  useEffect(() => {
    setFirstName(profile.data?.data?.first_name);
    setLastName(profile.data?.data?.last_name);
  }, [profile.data?.data?.first_name, profile.data?.data?.last_name]);

  const handleSave = () => {
    const accessToken = login.data?.data.token;
    const body = { first_name, last_name };

    const cbFulfilled = () => {
      // Update getProfile state
      dispatch(membershipAction.getProfileThunk({ accessToken }));

      // Disable edit button
      setActiveEdit(false);
    };

    dispatch(
      membershipAction.updateProfieThunk({ accessToken, body, cbFulfilled })
    );
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(membershipAction.logout());
    dispatch(transactionAction.clearPurchase());
  };

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="relative mx-auto flex flex-col items-center p-1">
          <Image onSize="w-32 h-32" />
        </div>
        <h1 className="text-xl font-semibold mx-auto">
          {profile?.isFulfilled &&
            `${profile.data?.data?.first_name} ${profile?.data?.data?.last_name}`}
        </h1>
      </div>
      <div className="flex flex-col gap-y-4 my-4 items-center">
        <div className="w-1/2 md:w-[85%]">
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
              className="w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm focus:outline-none focus:border-gray-500 cursor-not-allowed text-[#9ca3af]"
              placeholder="masukan email anda"
              disabled
              value={profile.data?.data?.email}
            />
          </div>
        </div>
        <div className="w-1/2 md:w-[85%]">
          <h1 className="text-sm mb-2">Nama Depan</h1>
          <label htmlFor="first_name" className="sr-only">
            Nama Depan
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 grid place-content-center px-4">
              <Icon
                icon={icon.name.icon}
                color={
                  activeEdit
                    ? icon.email.color.active
                    : icon.email.color.disable
                }
              />
            </span>
            <input
              name="first_name"
              type="text"
              className={`w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm focus:outline-none focus:border-gray-500 ${
                !activeEdit && "cursor-not-allowed"
              }`}
              placeholder="nama depan"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!activeEdit}
            />
          </div>
        </div>
        <div className="w-1/2 md:w-[85%]">
          <h1 className="text-sm mb-2">Nama Belakang</h1>
          <label htmlFor="last_name" className="sr-only">
            Nama Belakang
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 grid place-content-center px-4">
              <Icon
                icon={icon.name.icon}
                color={
                  activeEdit
                    ? icon.email.color.active
                    : icon.email.color.disable
                }
              />
            </span>
            <input
              name="last_name"
              type="last_name"
              className={`w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm focus:outline-none focus:border-gray-500 ${
                !activeEdit && "cursor-not-allowed"
              }`}
              placeholder="nama belakang"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!activeEdit}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-4">
        {activeEdit ? (
          <button
            className="w-1/2 md:w-[85%] p-4 text-sm rounded-lg bg-[#f42619] text-white outline-none font-semibold"
            onClick={handleSave}
          >
            Simpan
          </button>
        ) : (
          <>
            <button
              className="w-1/2 md:w-[85%] p-4 text-sm rounded-lg bg-[#f42619] text-white outline-none font-semibold"
              onClick={() => setActiveEdit(!activeEdit)}
            >
              Edit Profile
            </button>
            <button
              className="w-1/2 md:w-[85%] p-4 text-sm rounded-lg border-2 border-solid border-[#f42619] text-[#f42619] outline-none font-semibold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
};
