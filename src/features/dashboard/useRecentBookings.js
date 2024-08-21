import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";

// 获取不同时间段内的预定数据
function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // 默认显示最近7天，或者dashboard中的filter选择
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // 从当前日期中减去 numDays 天，得到一个新的 Date 对象
  const queryDate = subDays(new Date(), numDays).toISOString();

  // queryKey: ["bookings", last-${numDays}] 通过组合一个静态部分和一个动态部分来唯一标识这个查询
  // queryKey 的组合值唯一地标识了一个查询。如果两个查询的 queryKey 相同，React Query 会认为它们是相同的查询，因此会使用缓存的数据而不是重新请求
  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}

export default useRecentBookings;

