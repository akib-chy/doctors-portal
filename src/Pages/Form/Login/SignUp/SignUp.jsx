import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import GoogleLogin from "../../GoogleLogin";
import toast from "react-hot-toast";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";

const SignUp = () => {
  const [
    createUserWithEmailAndPassword,
    user,
    userCreatLoading,
    userCreateError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const {
    register,
    resetField,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (data.password !== data.ConfirmPassword) {
      return toast.error("Opps Password Not Match");
    }
    await createUserWithEmailAndPassword(data?.email, data?.password);
    await updateProfile({ displayName: data.name });
    resetField("name");
    resetField("email");
    resetField("password");
    resetField("ConfirmPassword");
  };
  if (user) {
    toast.success("Create Account SuccessFully");
  }
  if (userCreateError) {
    const error = userCreateError?.message.split(":")[1];
    toast.error(error);
  }
  console.log(user);
  return (
    <div className="flex items-center justify-center w-screen my-10">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="text-center font-bold text-xl">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-control w-full max-w-xs ">
              <label class="label">
                <span class="label-name">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                class="input input-bordered w-full max-w-xs"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name Is Required",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>
            <div class="form-control w-full max-w-xs ">
              <label class="label">
                <span class="label-email">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                class="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email Is Required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@.[a-z]{3}/,
                    message: "Your Email Have Must Be A Special characters",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div class="form-control w-full max-w-xs ">
              <label class="label">
                <span class="label-password">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                class="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password Is Required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password Must Be 6 characters",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            <div class="form-control w-full max-w-xs ">
              <label class="label">
                <span class="label-password">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                class="input input-bordered w-full max-w-xs"
                {...register("ConfirmPassword", {
                  required: {
                    value: true,
                    message: "Please Type A Confirm Password",
                  },
                })}
              />
              <label className="label">
                {errors.ConfirmPassword?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.ConfirmPassword.message}
                  </span>
                )}
              </label>
            </div>
            <input className="btn w-full" type="submit" value="Register" />
          </form>
          <p className="text-center my-2">
            Already have an account ?{" "}
            <Link className="font-bold text-secondary" to="/login">
              Login
            </Link>
          </p>
          <div class="divider">OR</div>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default SignUp;