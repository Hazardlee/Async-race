import { useAppSelector } from "../app/hooks";
import MAX_FORM_NAME from "../constants/form";

interface UseCarFormValidationReturn {
  form: { id: number | null; name: string; color: string };
  isValid: boolean;
  errorMessage: string | null;
}

const useCarFormValidation = (): UseCarFormValidationReturn => {
  const form = useAppSelector((state) => state.cars.form);

  const isValid = form.name.length > 0 && form.name.length <= MAX_FORM_NAME;
  const errorMessage =
    form.name.length > MAX_FORM_NAME
      ? `Name must be fewer than ${MAX_FORM_NAME}`
      : null;

  return { form, isValid, errorMessage };
};

export default useCarFormValidation;
