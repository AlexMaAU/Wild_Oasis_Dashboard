import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created. Please verify the new account from the user's email address."
      );
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to create new account");
    },
  });

  return { signup, isSigningUp };
}

export default useSignup;

