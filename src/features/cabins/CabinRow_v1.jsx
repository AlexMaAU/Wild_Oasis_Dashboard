import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
// import { deleteCarbin } from "../../services/apiCarbins";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

// 这部分的Styled Component是重复的，而且hard coding - CabinRow.jsx和CabinTable.jsx
// 也可以使用Compound Component进行复用
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Capacity = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, image, name, maxCapacity, regularPrice, discount } = cabin;

  // // 优化策略：useQueryClient和useMutation这些都可以进一步优化，提取成custom hook。这样功能性代码就不会出现在组件里。
  // // 获取React Query的query client
  // const queryClient = useQueryClient();

  // // useMutation 是React Query用于处理异步操作（创建、更新、删除数据）的钩子
  // // useMutation 返回一个对象，其中包括多个有用的属性和方法：
  // // isLoading（重命名为 isDeleting）是一个布尔值，指示当前删除操作是否正在进行中。
  // // mutate 是一个函数，用于触发 mutationFn 执行删除操作。mutate本质上就是返回deleteCarbin这个函数。
  // const { isLoading: isDeleting, mutate: deleteMutate } = useMutation({
  //   // 不是deleteCarbin(id)，因为要将函数本身（而不是函数的调用结果）传递给 useMutation，使得 useMutation 可以在需要的时候（比如点击按钮时）调用这个函数。
  //   // ()表示要执行这个函数，如果是mutationFn: deleteCarbin(id)，那么在函数传递的时候就会执行
  //   mutationFn: deleteCarbin, // mutationFn 是一个函数，表示实际执行删除操作的函数
  //   // 定义当mutate操作执行成功以后要执行的操作，否则删除成功以后cabins列表不会更新，需要手动刷新
  //   onSuccess: () => {
  //     toast.success("Delete successfully");

  //     // 把Query Client中的cabin状态设置为invalidate，这样React Query就会对queryKey名为cabin的数据重新请求API数据，这样能实现数据自动刷新
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabin"],
  //     });
  //   },
  //   // 定义开始mutate操作时要执行的逻辑
  //   onMutate: () => {
  //     console.log("Start to delete");
  //   },
  //   // 定义mutate出错时要执行的逻辑，当有error出现的时候，React Query会默认进行多次重新执行mutate操作
  //   onError: (err) => {
  //     toast.error(err.message);
  //   },
  // });

  const { isDeleting, deleteMutate } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  const isWorking = isCreating || isDeleting;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <Capacity>Fits up to {maxCapacity} guests</Capacity>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{discount}</Discount> : <span>&mdash;</span>}
        <div>
          <button onClick={handleDuplicate} disabled={isWorking}>
            <HiSquare2Stack />
          </button>

          <Modal>
            <Modal.Open opens="edit">
              <button disabled={isWorking}>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Open opens="delete">
              <button disabled={isWorking}>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isWorking}
                onConfirm={() => deleteMutate(id)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
      {/* {showForm && (
        <CreateCabinForm cabinToEdit={cabin} toggleEditForm={toggleEditForm} />
      )} */}
    </>
  );
}

export default CabinRow;

