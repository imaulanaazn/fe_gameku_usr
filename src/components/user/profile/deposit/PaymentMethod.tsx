import React from "react";
import { FeeType, PaymentsCategory } from "@/enum";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Tabs,
  Tab,
  Typography,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { currencyConverter } from "@/lib/currencyConverter";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
  [key: string]: any;
}

const accordionTitle = (category: string) => {
  let title;
  switch (category) {
    case PaymentsCategory.EWALLET:
    case PaymentsCategory.QRIS:
    case "1_2":
      title = "Ewallet dan QRIS";
      break;
    case PaymentsCategory.RETAIL:
      title = "Retail";
      break;
    case PaymentsCategory.INTERNAL:
      title = "Internal";
      break;
    case PaymentsCategory.PULSA:
      title = "Pulsa";
      break;
    case PaymentsCategory.VIRTUAL_ACCOUNT:
      title = "Virtual Account";
      break;
    default:
      title = "Saldo Gasskeun";
      break;
  }

  return title;
};

const PaymentMethod = ({ value, data, onChange }: any) => {
  return (
    <Card
      sx={{
        marginTop: 6,
        borderRadius: "0.75rem",
        background: `#161721 url(/images/topup-form-step-2.svg) no-repeat right top`,
        backgroundSize: "150px",
      }}
    >
      <CardHeader
        title="Metode Pembayaran"
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
            color: "#ffffff",
            fontWeight: "800",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {data.map((method: any) => (
            <Box
              key={method.id}
              onClick={() => {
                let feeAmount;

                if (
                  method.providerCd === "TOKOPAY" &&
                  method.category === "6"
                ) {
                  feeAmount =
                    method.feeType === FeeType.PERCENTAGE
                      ? (value.amount * method.fee) / 100
                      : method.fee;
                  feeAmount =
                    Math.ceil((value.amount + feeAmount) / 1000) * 1000 -
                    value.amount;
                } else {
                  feeAmount =
                    method.feeType === FeeType.PERCENTAGE
                      ? (value.amount * method.fee) / 100
                      : method.fee;
                }

                if (
                  value.amount &&
                  value.amount > method.minAmount &&
                  value.amount < method.maxAmount
                ) {
                  onChange("paymentMethodId", method.id);
                  onChange("feeAmount", feeAmount);
                  onChange("paymentMethodCd", method.cd);
                  onChange("paymentMethod", method);
                  onChange("promoCode", "");
                  onChange("promo", "");
                }
              }}
              sx={{
                height: "auto",
                width: {
                  xs: "100%",
                  sm:
                    !value.totalAmountBeforeFee ||
                    value.totalAmountBeforeFee > method.maxAmount ||
                    value.totalAmountBeforeFee < method.minAmount
                      ? "48%"
                      : "48%",
                  lg:
                    !value.totalAmountBeforeFee ||
                    value.totalAmountBeforeFee > method.maxAmount ||
                    value.totalAmountBeforeFee < method.minAmount
                      ? "31%"
                      : "31%",
                },
                padding: 4,
                backgroundColor: "#ffffff0a",
                borderRadius: "0.4rem",
                // border: "1px solid #fb923ce6",
                ...(method.id === value.paymentMethodId && {
                  outline: "2px solid #fb923ce6",
                  backgroundColor: "#ffffff1a",
                }),
                ...(value.amount &&
                value.amount > method.minAmount &&
                value.amount < method.maxAmount
                  ? { cursor: "pointer" }
                  : { filter: "grayscale(100%)", cursor: "not-allowed" }),
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Box position={"relative"} width={50} height={20}>
                  <Image
                    src={method.logo}
                    alt="Logo payment method"
                    fill={true}
                    quality={55}
                    loading="lazy"
                    objectFit="contain"
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#fb923ce6",
                    ...(method.id === value.paymentMethodId && {
                      fontWeight: "700",
                    }),
                    textAlign: "right",
                    maxWidth: "55%",
                    ...(value.amount &&
                    value.amount > method.minAmount &&
                    value.amount < method.maxAmount
                      ? {
                          fontWeight: "500",
                        }
                      : {
                          fontWeight: "600",
                        }),
                  }}
                >
                  {!value.amount ||
                  value.amount > method.maxAmount ||
                  value.amount < method.minAmount
                    ? ` (${
                        value.amount < method.minAmount
                          ? "Minimal " + currencyConverter(method.minAmount)
                          : "Maximal " + currencyConverter(method.maxAmount)
                      })`
                    : currencyConverter(
                        method.providerCd === "TOKOPAY" &&
                          method.category === "6"
                          ? Math.ceil(
                              (value.amount +
                                (method.feeType === FeeType.PERCENTAGE
                                  ? (value.amount * method.fee) / 100
                                  : method.fee)) /
                                1000
                            ) * 1000
                          : value.amount +
                              (method.feeType === FeeType.PERCENTAGE
                                ? (value.amount * method.fee) / 100
                                : method.fee)
                      )}
                </Typography>
              </Box>

              <Typography variant="body1" color="#ffffff" marginTop={4}>
                {method.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
