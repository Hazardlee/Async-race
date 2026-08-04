import { createAsyncThunk } from "@reduxjs/toolkit";

import API_URL from "../../constants/api";
import { HUNDRED_CARS } from "../../constants/cars";
import { GARAGE_PAGE_SIZE } from "../../constants/pagination";
import getRandomCar from "../../helpers/generateRandomCars";

import type { RootState } from "../../app/store";
import type { Car } from "../../types/car";

type NewCar = Omit<Car, "id">;

interface FetchCars {
  data: Car[];
  totalCount: number;
}

export const fetchCars = createAsyncThunk<FetchCars, number>(
  "/garage/fetch",
  async (page) => {
    const response = await fetch(
      `${API_URL}/garage?_page=${page}&_limit=${GARAGE_PAGE_SIZE}`,
    );
    const totalCount = Number(response.headers.get("X-Total-Count") ?? 0);
    const data = (await response.json()) as Car[];
    return { data, totalCount };
  },
);

export const createCar = createAsyncThunk<Car, NewCar>(
  "/garage/post",
  async (car) => {
    const response = await fetch(`${API_URL}/garage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });
    const data = (await response.json()) as Car;
    return data;
  },
);

export const deleteCar = createAsyncThunk<number, number>(
  "garage/delete",
  async (id) => {
    await fetch(`${API_URL}/garage/${id}`, { method: "DELETE" });
    await fetch(`${API_URL}/winners/${id}`, { method: "DELETE" });
    return id;
  },
);

export const updateCar = createAsyncThunk<Car, Car>(
  "garage/update",
  async (car) => {
    const response = await fetch(`${API_URL}/garage/${car.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: car.name, color: car.color }),
    });

    const data = (await response.json()) as Car;
    return data;
  },
);

export const generateCars = createAsyncThunk(
  "generate100cars",
  async (_, { dispatch, getState }) => {
    const requests = Array.from({ length: HUNDRED_CARS }, async () =>
      dispatch(createCar(getRandomCar())).unwrap(),
    );
    await Promise.allSettled(requests);

    const { currentPage } = (getState() as RootState).cars;

    dispatch(fetchCars(currentPage));
  },
);
