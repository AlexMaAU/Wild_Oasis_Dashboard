import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCarbin } from "../../services/apiCarbins";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCarbin,
    onSuccess: () => {
      toast.success("Created a new cabin");

      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });

      // reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createCabin, isCreating };
}

export default useCreateCabin;

