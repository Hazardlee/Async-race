import { createAsyncThunk } from "@reduxjs/toolkit";

import API_URL from "../../constants/api";
import { WINNERS_PAGE_SIZE } from "../../constants/pagination";

import type { SortField, SortOrder } from "./winnersSlice";
import type { Car } from "../../types/car";
import type { IWinnersWithCars, RaceWinner, Winner } from "../../types/winners";

interface FetchWinners {
  winnersWithCars: IWinnersWithCars[];
  totalCount: number;
}

export const fetchWinners = createAsyncThunk<
  FetchWinners,
  { page: number; sortField: SortField; sortOrder: SortOrder }
>("/winners/fetch", async ({ page, sortField, sortOrder }) => {
  const params = new URLSearchParams({
    _page: String(page),
    _limit: String(WINNERS_PAGE_SIZE),
  });
  if (sortField) {
    params.set("_sort", sortField);
    params.set("_order", sortOrder);
  }

  const response = await fetch(`${API_URL}/winners?${params}`);
  const totalCount = Number(response.headers.get("X-Total-Count"));
  const winners = (await response.json()) as Winner[];
  const carsData = await Promise.all(
    winners.map(async (w: Winner) =>
      fetch(`${API_URL}/garage/${w.id}`).then(
        async (r) => r.json() as Promise<Car>,
      ),
    ),
  );

  const carsMap = new Map(carsData.map((car) => [car.id, car]));

  const winnersWithCars = winners.map((w: Winner) => {
    const car = carsMap.get(w.id);
    return {
      ...w,
      name: car?.name ?? "Unknown",
      color: car?.color ?? "#000000",
    };
  });

  return { winnersWithCars, totalCount };
});

export const saveWinner = createAsyncThunk<undefined, RaceWinner>(
  "winners/save",
  async (payload) => {
    const existingResponse = await fetch(`${API_URL}/winners/${payload.id}`);

    if (existingResponse.status === 404) {
      await fetch(`${API_URL}/winners`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: payload.id,
          wins: 1,
          time: payload.time.toFixed(2),
        }),
      });
      return;
    }
    const data = (await existingResponse.json()) as Winner;
    await fetch(`${API_URL}/winners/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: payload.id,
        wins: data.wins + 1,
        time: Math.min(payload.time, data.time).toFixed(2),
      }),
    });
  },
);
