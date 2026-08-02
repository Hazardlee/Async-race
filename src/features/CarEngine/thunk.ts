import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/api";

interface EngineResponse {
  velocity: number;
  distance: number;
}

export const startCar = createAsyncThunk<EngineResponse, number>(
  "engine/start",
  async (id) => {
    const response = await fetch(
      `${API_URL}/engine?id=${id}&status=started`,
      {
        method: "PATCH",
      },
    );

    const data = await response.json();
    console.log(data, " start ");
    return data;
  },
);

export const stopCar = createAsyncThunk<void, number>(
  "engine/stop",
  async (id) => {
    const response = await fetch(
      `${API_URL}/engine?id=${id}&status=stopped`,
      {
        method: "PATCH",
      },
    );

    const data = await response.json();
    console.log(data, " stop ");
    return data;
  },
);

export const driveCar = createAsyncThunk<void, number>(
  "engine/drive",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/engine?id=${id}&status=drive`, {
      method: "PATCH",
    });
    const data = await response.json();
    console.log(data, " drive ");

    if (response.status === 500) return rejectWithValue(id);
    console.log(data, " drive1 ");
    return data;
  },
);
