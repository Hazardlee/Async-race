import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createCar, fetchCars, updateCar } from "../features/Cars/thunk";

interface UseCarFormSubmitReturn {
  handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
  isEditing: boolean;
}

const useCarFormSubmit = (): UseCarFormSubmitReturn => {
  const dispatch = useAppDispatch();
  const { currentPage, form } = useAppSelector((state) => state.cars);
  const isEditing = form.id !== null;

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (isEditing) {
      await dispatch(
        updateCar({
          id: form.id as number,
          name: form.name,
          color: form.color,
        }),
      );
    } else {
      await dispatch(createCar({ name: form.name, color: form.color }));
    }
    dispatch(fetchCars(currentPage));
  };

  return { handleSubmit, isEditing };
};

export default useCarFormSubmit;
