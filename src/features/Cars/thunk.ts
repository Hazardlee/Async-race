import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchCars = createAsyncThunk(
  '/garage/fetch',
  async (_, thunkAPI) => {
    const response = await fetch('http://127.0.0.1:3000/garage')
    const data = await response.json()
    console.log(data);
    return data
  }
)

export default fetchCars

