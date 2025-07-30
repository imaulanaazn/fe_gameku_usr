"use client";
import { Metadata } from "next";
import NotFound from "./not-found";
import sendRequest from "@/lib/baseApi";
import Maintenance from "@/components/global/maintenance/Maintenance";
import NewFormTopup from "@/components/user/pageProduct/NewFormTopup";
import Container from "@/components/global/Container/Container";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as crypto from "crypto";
import HmacMD5 from "crypto-js/hmac-md5";
import Hex from "crypto-js/enc-hex";
import Loading from "./loading";
interface IParams {
  params: {
    productKey: string;
  };
}

const Page = () => {
  const { productKey } = useParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"ok" | "not-found">("ok");
  const [gameDetail, setGameDetail] = useState<IGameDetail>({} as IGameDetail);
  const [paymentsMethod, setPaymentsMethod] = useState<IPaymentMethod[]>([]);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;

  useEffect(() => {
    if (!productKey) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const gameDetailRes = await fetchAPI(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/game-detail?slug=${productKey}`
        );
        const paymentsMethodRes = await fetchAPI(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/payments-method?query=9&type=payment`
        );

        const gameDetailData = await gameDetailRes.json();
        const paymentsData = await paymentsMethodRes.json();

        if (!gameDetailRes.ok) {
          setStatus("not-found");
          return;
        }

        setGameDetail(gameDetailRes.ok ? gameDetailData : ({} as IGameDetail));
        setPaymentsMethod(paymentsMethodRes.ok ? paymentsData : []);
      } catch (err) {
        setStatus("not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productKey]);

  async function fetchAPI(url: string) {
    const dataSign = `${apiKey}:${url}`;

    let sign = HmacMD5(dataSign, apiKey).toString();

    const response = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 60 },
      headers: {
        "x-gameku-sign": sign,
        "ngrok-skip-browser-warning": "true",
      },
    });

    return response;
  }

  if (loading) {
    return <Loading />;
  }

  if (!gameDetail?.id) {
    return <NotFound />;
  }

  return (
    <>
      <div className="bg-darkPrimary pb-10">
        <Container>
          <NewFormTopup products={gameDetail} paymentsMethod={paymentsMethod} />
        </Container>
      </div>
    </>
  );
};

export default Page;
