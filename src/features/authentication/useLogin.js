import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      // 登录成功后，把user数据放进react query的cache里，这样后面要使用user数据的时候可以直接从Cache里获取，增加性能
      // setQueryData 是 React Query 提供的一个方法，用于直接更新特定查询的缓存数据。它用于对单个查询的缓存进行修改，不会影响其他查询。
      // setQueriesData 是一个批量操作的方法，用于更新多个查询的缓存数据。
      // 这里只需要设置user数据，所以是setQueryData
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true }); // replace: true表示navigate以后清楚之前的路由记录，这样用户就不能通过点击浏览器返回去之前的页面
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}

export default useLogin;

