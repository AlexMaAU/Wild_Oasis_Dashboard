import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

// https://temp-mail.org/en/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isSigningUp } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Full name"
        error={errors?.fullName?.message}
        disabled={isSigningUp}
      >
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Email address"
        error={errors?.email?.message}
        disabled={isSigningUp}
      >
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            // pattern用来定义React Form里字符段的Regex格式
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
        disabled={isSigningUp}
      >
        <Input
          type="password"
          id="password"
          // minLength和maxLength用来定义React Form里字符段的长度
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
        disabled={isSigningUp}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            // 自定义验证函数 - 在 react-hook-form 中，validate 函数的返回值决定了字段验证的结果
            // value表示当前input的值
            // getValues().password表示获取password输入框的值
            // 如果字段值有效且满足所有验证条件，则返回 true。这表示验证通过，没有错误。如果字段值无效或不满足验证条件，则返回一个错误消息字符串。这将成为字段的错误信息，并显示给用户。
            // react-hook-form 自动根据 validate 函数的返回值来判断字段的验证状态。返回 true：如果 validate 函数返回 true，react-hook-form 会认为验证通过，字段值是有效的，不会显示错误消息。如果 validate 函数返回一个字符串（错误消息），react-hook-form 会认为验证失败，并将这个字符串作为错误消息显示给用户。
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow disabled={isSigningUp}>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

