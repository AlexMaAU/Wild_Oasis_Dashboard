import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCarbin } from "../../services/apiCarbins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCarbin,
    onSuccess: () => {
      toast.success("Created a new cabin");

      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });

      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // React Hook Form 是一个用于处理 React 表单的库。它旨在简化表单的创建和管理。
  const {
    register, // 用于注册表单控件（如输入框、选择框等），并将其绑定到 React Hook Form 的状态管理系统。通过 register，你可以将控件的值和验证规则传递给 React Hook Form。
    handleSubmit, // 用于处理表单提交事件。它接收一个回调函数 onSubmit 作为参数，这个回调函数会在表单数据有效时被调用。handleSubmit 会自动处理表单的验证，如果有验证错误，它会阻止提交并显示错误信息。
    reset, // 用于重置表单
    getValues, // 用于获取表单值
    formState: { errors }, // 是一个对象，包含了表单的各种状态信息，例如是否有验证错误、表单是否已提交等。它提供了一些重要的状态信息，可以用来控制表单的显示或行为。
  } = useForm();

  // 提交表单的回调函数
  const onSubmit = (data) => {
    console.log(data);
    mutate({ ...data, image: data.image[0] });
  };

  return (
    // 使用handleSubmit来绑定提交表单的回调函数
    <Form onSubmit={handleSubmit(onSubmit)}>
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
            required: "This field is required",
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
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

