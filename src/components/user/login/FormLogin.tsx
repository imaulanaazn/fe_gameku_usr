"use client";

import { userState } from "@/atom/userState";
import Alert from "@/components/global/alert/Alert";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue, useRecoilState } from "recoil";

const FormLogin = () => {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (allowed) {
      const toastId = toast.loading("Memproses login...");
      const responseLogin = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/v1/customer/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await responseLogin.json();
      if (!responseLogin.ok) {
        toast.update(toastId, {
          render: res.message,
          type: "error",
          isLoading: false,
          position: "top-right",
          autoClose: 3000,
        });
        setData((prev) => ({ ...prev, password: "" }));
      } else {
        router.push("/");
        localStorage.setItem("auth", JSON.stringify({ login: true }));
        localStorage.setItem("user", JSON.stringify(res));
        toast.update(toastId, {
          render: "Berhasil Login",
          type: "success",
          isLoading: false,
          position: "top-right",
          autoClose: 3000,
        });
      }
      setLoading(false);
    }
  };

  const getMe = async () => {
    const responseCustomer = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/v1/me",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    const res = await responseCustomer.json();
    if (responseCustomer.ok) {
      localStorage.setItem("auth", JSON.stringify({ login: true }));
      localStorage.setItem("user", JSON.stringify(res));

      return true;
    } else {
      localStorage.setItem("auth", JSON.stringify({ login: false }));
      return false;
    }
  };

  useEffect(() => {
    if (!data.username || !data.password) {
      setAllowed(false);
    } else {
      setAllowed(true);
    }
  }, [data.username, data.password]);

  useEffect(() => {
    getMe();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg text-xs text-black text-left"
    >
      {errorMessage && (
        <Alert
          type="error"
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
      <div className="mb-4">
        <label
          htmlFor="username"
          className="font-medium text-base text-white inline-block mb-1.5"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="w-full py-3 px-4 text-white bg-transparent rounded-md text-sm placeholder:text-sm overflow-hidden border border-solid border-white/70 focus:ring-0 focus:border-primary-900"
          value={data.username}
          onChange={(e) =>
            setData((prev) => ({ ...prev, username: e.target.value }))
          }
          required
          placeholder="Whatsapp / Email"
        />
      </div>
      <div className="mb-8">
        <label
          htmlFor="password"
          className="font-medium text-base text-white inline-block mb-1.5"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full py-3 px-4 text-white bg-transparent rounded-md text-sm placeholder:text-sm overflow-hidden border border-solid border-white/70 focus:ring-0 focus:border-primary-900"
          value={data.password}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
          required
          placeholder="Password"
        />
      </div>
      {loading ? (
        <div className="w-full py-3 bg-gray-400 text-white cursor-wait text-center rounded-md">
          <FontAwesomeIcon icon={faSpinner} size="2x" spinPulse />
        </div>
      ) : (
        <button
          type="submit"
          className="text-center bg-primary-900 text-white w-full py-3 px-4 rounded-md text-base font-semibold hover:bg-black hover:text-white transition-all"
        >
          Masuk
        </button>
      )}
    </form>
  );
};

export default FormLogin;
