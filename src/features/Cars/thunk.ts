import { createAsyncThunk } from "@reduxjs/toolkit";

import type { Car } from "../../types/car";
import { API_URL } from "../../constants/api";

type NewCar = Omit<Car, "id">;

export const fetchCars = createAsyncThunk<Car[]>(
  "/garage/fetch",
  async (_, thunkAPI) => {
    const response = await fetch(`${API_URL}/garage`);
    const data = (await response.json()) as Car[];
    console.log(data);
    return data;
  },
);

export const createCar = createAsyncThunk<Car, NewCar>(
  "/garage/post",
  async (car, thunkAPI) => {
    const response = await fetch(`${API_URL}/garage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });
    const data = (await response.json()) as Car;
    console.log(data, " post ");
    return data;
  },
);

export const deleteCar = createAsyncThunk<number, number>("garage/delete", async (id) => {
  const response = await fetch(`${API_URL}/garage/${id}`, {
    method: "DELETE",
  });
  return id
});
