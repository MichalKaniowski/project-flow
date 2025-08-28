import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { login } from "../actions/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      toast.success("Logged in succesfully");
    },
  });
};
