import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
// import Button from "../ui/Button";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";
// import { useState } from "react";

// Page组件里尽量不要放状态和逻辑，应该尽量保证Page组件的干净
function Cabins() {
  // const [showAddForm, setShowAddForm] = useState(false);

  // function toggleShowAddForm() {
  //   showAddForm ? setShowAddForm(false) : setShowAddForm(true);
  // }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        {/* <Button onClick={toggleShowAddForm}>Add new cabin</Button>
        {showAddForm && <CreateCabinForm />} */}
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;

