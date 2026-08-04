import { createAsyncThunk } from "@reduxjs/toolkit";

import API_URL from "../../constants/api";

interface EngineResponse {
  velocity: number;
  distance: number;
}

export const startCar = createAsyncThunk<EngineResponse, number>(
  "engine/start",
  async (id) => {
    const response = await fetch(`${API_URL}/engine?id=${id}&status=started`, {
      method: "PATCH",
    });
    const data = (await response.json()) as EngineResponse;
    return data;
  },
);

export const stopCar = createAsyncThunk<undefined, number>(
  "engine/stop",
  async (id) => {
    await fetch(`${API_URL}/engine?id=${id}&status=stopped`, {
      method: "PATCH",
    });
  },
);

export const driveCar = createAsyncThunk<undefined, number>(
  "engine/drive",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/engine?id=${id}&status=drive`, {
      method: "PATCH",
    });

    if (response.status === 500) return rejectWithValue(id);
  },
);
