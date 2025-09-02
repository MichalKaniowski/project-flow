import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signup } from "../actions/signup";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Signed up succesfully");
    },
  });
};
