import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/api";
import type { IWinnersWithCars, Winner } from "../../types/winners";
import type { Car } from "../../types/car";
import { WINNERS_PAGE_SIZE } from "../../constants/pagination";

interface FetchWinners {
  winnersWithCars: IWinnersWithCars[],
  totalCount: number
}

export const fetchWinners = createAsyncThunk<FetchWinners, number>(
  "/winners/fetch",
  async (page) => {
    const response = await fetch(
      `${API_URL}/winners?_page=${page}&_limit=${WINNERS_PAGE_SIZE}`,
    );
    const totalCount = Number(response.headers.get('X-Total-Count'))
    const winners = (await response.json()) as Winner[];
    console.log(winners, "winners");
    const carsData = await Promise.all(
      winners.map((w: Winner) =>
        fetch(`${API_URL}/garage/${w.id}`).then(
          (r) => r.json() as Promise<Car>,
        ),
      ),
    );

    const carsMap = new Map(carsData.map((car) => [car.id, car]));

    const winnersWithCars = winners.map((w: Winner) => {
      let car = carsMap.get(w.id);
      return {
        ...w,
        name: car?.name ?? "Unknown",
        color: car?.color ?? "#000000",
      };
    });
    console.log(winnersWithCars, "winnersWithCars");

    return {winnersWithCars, totalCount};
  },
);
