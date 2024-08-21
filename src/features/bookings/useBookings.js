import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // BookingTable的Filter和Sort是在Server Side进行的
  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // : { field: "totalPrice", value: 5000, method: "gte" }; // 把filter method也作为参数传入，使得API更加灵活

  // SORT
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {}, // 避免undefined，先给一个空对象
    error,
  } = useQuery({
    // 当 queryKey 改变时，react-query 会将其视为一个新的查询，这样它会重新请求数据并更新缓存
    queryKey: ["bookings", filter, sortBy, page], // 把filter对象也加入到queryKey，这样filter发生改变，useQuery就会重新请求数据
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING - 提前加载page+1的内容，这样用户点击下一页的时候就不会显示spinner
  // 这样用户体验会感觉像直接在前端进行pagination一样，不需要等待数据从后端获取
  // 注意：React Query也支持无限轮动加载，这部分可以参考文档，实现原理差不多
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  // 如果用户不是从第一页开始加载页面，那么把前后2个页面的数据都预先加载出来
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, error, bookings, count };
}

export default useBookings;

