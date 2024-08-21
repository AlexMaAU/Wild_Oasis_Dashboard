import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCarbins } from "../../services/apiCarbins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

// 这部分的Styled Component是重复的，而且hard coding - CabinRow.jsx和CabinTable.jsx
// 也可以使用Compound Component进行复用
const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
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

  if (isLoading) return <Spinner />;

  if (error) {
    console.log(error);
  }

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}

export default CabinTable;

