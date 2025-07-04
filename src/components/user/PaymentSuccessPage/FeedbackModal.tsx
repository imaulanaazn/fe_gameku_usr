"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Rating,
  Paper,
  TextField,
  Stack,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { toast } from "react-toastify";
import { Send, SendCircleOutline } from "mdi-material-ui";

const templateComments = [
  "Pilihan denomnya banyak",
  "Harganya Murah Banget",
  "Prosesnya Cepat Banget",
  "Pelayanannya terbaik",
];

export default function FeedbackModal({ orderId }: { orderId?: string }) {
  const [rating, setRating] = React.useState<number | null>(5);

  async function handleReviewSubmit() {
    const data = {
      orderId,
      message:
        templateComments[Math.floor(Math.random() * templateComments.length)],
      rating,
    };

    const req = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/v1/order-review",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(data),
      }
    );

    if (req.status === 200) {
      toast.success("Terimakasih sudah memberikan review");
    } else {
      const response = await req.json();
      toast.error(response.message);
    }
  }

  return (
    <Paper
      sx={{
        position: "relative",
        padding: 6,
        borderRadius: 2,
        backgroundColor: "#161721",
        marginTop: "2rem",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 4,
      }}
      elevation={0}
    >
      <Typography variant="body1" color="#ffffff" textAlign={"center"}>
        Yay top up mu berhasil 🎉. Rate pelayanan kami dong :)
      </Typography>
      {/* Rating */}
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Rating
          disabled={false}
          value={rating}
          precision={1}
          max={5}
          name="unique-rating"
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          size="medium"
        />

        <Button
          size="small"
          color="primary"
          style={{ padding: "0.6rem 0.6rem" }}
          disabled={false}
          onClick={handleReviewSubmit}
        >
          <Send />
        </Button>
      </Box>
    </Paper>
  );
}
