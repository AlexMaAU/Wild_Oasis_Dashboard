import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(); // logout以后清楚react query中的所有缓存记录
      navigate("/login", { replace: true }); // replace: true表示navigate以后清楚之前的路由记录，这样用户就不能通过点击浏览器返回去之前的页面
    },
  });

  return { logout, isLoading };
}

export default useLogout;

