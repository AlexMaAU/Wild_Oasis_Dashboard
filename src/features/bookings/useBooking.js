import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBooking() {
  const { bookingId } = useParams();

  // React Query操作GET，使用useQuery。如果是CREATE/DELETE/UPDATE，使用useMutation。
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    // queryKey用来识别缓存数据，React Query会根据queryKey来进行识别。
    queryKey: ["booking", bookingId],
    // queryFn定义每个query的对应API读写逻辑。API返回的数据会储存到cache里，名称为：booking。
    queryFn: () => getBooking(bookingId),
    retry: false, // 如果请求失败，react query不要自动重新请求
  });

  return { isLoading, error, booking };
}

export default useBooking;

