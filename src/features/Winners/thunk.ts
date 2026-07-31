import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/api";
import type { IWinnersWithCars, Winner } from "../../types/winners";
import type { Car } from "../../types/car";

export const fetchWinners = createAsyncThunk<IWinnersWithCars[]>(
  "/winners/fetch",
  async () => {
    const response = await fetch(`${API_URL}/winners`);
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
    return winnersWithCars;
  },
);
