import { useQuery } from "@tanstack/react-query";
import { getCarbins } from "../../services/apiCarbins";

export function useCabins() {
  // React Query操作GET，使用useQuery。如果是CREATE/DELETE/UPDATE，使用useMutation。
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    // queryKey用来识别缓存数据，React Query会根据queryKey来进行识别。也就是从Cache中读取名为cabin的值。
    queryKey: ["cabin"],
    // queryFn定义每个query的对应API读写逻辑。API返回的数据会以cabin的名称储存到cache里。
    queryFn: getCarbins,
  });

  return { isLoading, error, cabins };
}

