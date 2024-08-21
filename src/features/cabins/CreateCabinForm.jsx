import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createEditCarbin } from "../../services/apiCarbins";
// import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import useEditCabin from "./useEditCabin";
import useCreateCabin from "./useCreateCabin";

// 传入的参数cabinToEdit可能是undefined，因为只有修改表格的时候才会传入cabinToEdit
// 为什么防止undefined导致代码出错，给cabinToEdit props一个默认值为{}
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  // const queryClient = useQueryClient();

  // const { mutate: createCabin, isLoading: isCreating } = useMutation({
  //   mutationFn: createEditCarbin,
  //   onSuccess: () => {
  //     toast.success("Created a new cabin");

  //     queryClient.invalidateQueries({
  //       queryKey: ["cabin"],
  //     });

  //     reset();
  //   },
  //   onError: (err) => {
  //     toast.error(err.message);
  //   },
  // });
  const { createCabin, isCreating } = useCreateCabin();

  // const { mutate: editCabin, isLoading: isEditing } = useMutation({
  //   mutationFn: ({ newCabin, id }) => createEditCarbin(newCabin, id),
  //   onSuccess: () => {
  //     toast.success("Updated the selected cabin");

  //     queryClient.invalidateQueries({
  //       queryKey: ["cabin"],
  //     });
  //   },
  //   onError: (err) => {
  //     toast.error(err.message);
  //   },
  // });
  const { editCabin, isEditing } = useEditCabin();

  // React Hook Form 是一个用于处理 React 表单的库。它旨在简化表单的创建和管理。
  const {
    register, // 用于注册表单控件（如输入框、选择框等），并将其绑定到 React Hook Form 的状态管理系统。通过 register，你可以将控件的值和验证规则传递给 React Hook Form。
    handleSubmit, // 用于处理表单提交事件。它接收一个回调函数 onSubmit 作为参数，这个回调函数会在表单数据有效时被调用。handleSubmit 会自动处理表单的验证，如果有验证错误，它会阻止提交并显示错误信息。
    reset, // 用于重置表单
    getValues, // 用于获取表单值
    formState: { errors }, // 是一个对象，包含了表单的各种状态信息，例如是否有验证错误、表单是否已提交等。它提供了一些重要的状态信息，可以用来控制表单的显示或行为。
  } = useForm({
    defaultValues: isEditSession ? editValue : {}, // 设置表格的默认值，如果有默认值，useForm会自动把默认值填充到对应的field里
  });

  // 提交表单的回调函数
  const onSubmit = (data) => {
    console.log(data);
    if (isEditSession) {
      editCabin({ newCabin: data, id: editId });
      onCloseModal?.();
    } else {
      // onSuccess和onError等都是发生在mutationFn被调用之后，所以除了在useMutation里定义，也可以直接在调用mutationFn的时候定义
      // 这样就可以正常设置custom hook了
      createCabin(data, {
        onSuccess: () => {
          reset();
          onCloseModal?.(); // 可选链操作符, ?.: 可选链操作符检查 onCloseModal 是否存在（即是否不为 null 或 undefined）, 如果 onCloseModal 存在且是一个函数，它将被调用。如果 onCloseModal 为 null 或 undefined，则不会尝试调用它，而是安全地跳过这个操作
        },
      });
    }
  };

  return (
    // 使用handleSubmit来绑定提交表单的回调函数
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            // React Form可以设置表单的验证
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
            max: { value: 20, message: "capacity should be at most 20" },
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: false,
            min: {
              value: 0,
              message: "Discount price should be at least 0",
            },
            // React Form的自定义表单验证
            // value代表当前input field输入的值，getValues用来获取知道input field的值
            validate: (value) => {
              return (
                value < getValues("regularPrice") ||
                "Discount price should be less than regular price"
              );
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          // onCloseModal?.() 的作用是：检查 onCloseModal 是否存在（即不是 null 或 undefined）, 如果 onCloseModal 存在，调用 onCloseModal 函数; 如果 onCloseModal 不存在（即是 null 或 undefined），则什么也不做，不会抛出错误
          onClick={() => onCloseModal?.()} // ?. 是 JavaScript 的可选链操作符，用于安全地访问对象的属性或调用方法
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

