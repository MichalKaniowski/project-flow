import { useMutation } from "@tanstack/react-query";
import { signup } from "../actions/signup";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};
