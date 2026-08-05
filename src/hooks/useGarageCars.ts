import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GARAGE_PAGE_SIZE } from "../constants/pagination";
import { setCurrentPage } from "../features/Cars/carsSlice";
import { fetchCars } from "../features/Cars/thunk";

import type { Car } from "../types/car";

interface UseGarageCarsResult {
  cars: Car[];
  currentPage: number;
  totalCount: number;
  totalPages: number;
  emptyGarage: boolean;
  changePage: (newPage: number) => void;
}

const useGarageCars = (): UseGarageCarsResult => {
  const dispatch = useAppDispatch();
  const { cars, currentPage, totalCount } = useAppSelector(
    (state) => state.cars,
  );

  const totalPages = Math.ceil(totalCount / GARAGE_PAGE_SIZE);
  const emptyGarage = cars.length === 0;

  useEffect(() => {
    dispatch(fetchCars(currentPage));
  }, [dispatch, currentPage]);

  const changePage = (newPage: number) => dispatch(setCurrentPage(newPage));

  return {
    cars,
    currentPage,
    totalCount,
    totalPages,
    emptyGarage,
    changePage,
  };
};

export default useGarageCars;
