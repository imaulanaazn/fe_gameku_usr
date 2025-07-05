"use client";

import React, { useEffect, useRef, useState } from "react";
import HistoryTopup from "./HistoryTopup";
import Image from "next/image";
import Link from "next/link";
import HistoryDeposit from "./HistoryDeposit";
import Loading from "@/components/global/loading/CompLoading";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const formatter = (data: number) => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(data);
};

const fetchData = async (url: string, options = {}) => {
  try {
    const response = await fetch(url, {
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const inputFile = useRef(null);
  const [logo, setLogo] = useState("");
  const [userFund, setUserFund] = useState({
    name: "Gasskeun Coin",
    balance: 0,
  });

  const getUserBalance = async () => {
    setLoading(true);
    const balanceData = await fetchData(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/balance`
    );

    if (balanceData) {
      setUserFund({ name: balanceData.name, balance: balanceData.value });
    }
    setLoading(false);
  };

  const getLogo = async () => {
    const logoData = await fetchData(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/config?type=logo`
    );

    if (logoData) {
      setLogo(logoData[0].value);
    }
  };

  useEffect(() => {
    getUserBalance();
    getLogo();
  }, []);

  return (
    <>
      {loading && <Loading />}

      {!loading && (
        <div className="mx-auto py-0 lg:pb-24 h-fit min-h-screen text-center w-full text-white flex flex-col items-center">
          <UserBalance name={userFund.name} balance={userFund.balance} />
          <HistoryTopup />
          <div className="mt-8"></div>
          <HistoryDeposit />
        </div>
      )}
    </>
  );
};

export default Dashboard;

function UserBalance({ name, balance }: { name: string; balance: number }) {
  return (
    <div className="w-full lg:hidden px-4 py-6 bg-orangePrimary rounded-lg shadow-md mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-white font-semibold">Saldo Tersedia</h2>
        <div className="bg-white rounded-md w-8 h-8 flex items-center justify-center cursor-pointer">
          <FontAwesomeIcon icon={faPlus} className="text-orange-400" />
        </div>
      </div>
      <p className="text-xl text-white text-left">Rp.{formatter(balance)}</p>
    </div>
  );
}
