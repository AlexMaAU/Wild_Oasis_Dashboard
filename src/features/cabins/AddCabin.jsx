// import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

// function AddCabin() {
//   const [isOpenMoal, setIsOpenModal] = useState(false);

//   function toggleOpenModal() {
//     setIsOpenModal(true);
//   }

//   return (
//     <>
//       <Button onClick={toggleOpenModal}>Add new cabin</Button>
//       {/* 这里应该优化成Compound Component，因为Modal开闭的状态应该是由Modal本身负责的，而不是放在AddCabin组件里 */}
//       {isOpenMoal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;

