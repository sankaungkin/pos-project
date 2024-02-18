// src/components/LoginForm.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import AuthContext from "../context/AuthContext";

// Define the form schema using Zod

const validationSchema = z
  .object({
    username: z.string().min(1, { message: "UserName is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type FormSchemaType = z.infer<typeof validationSchema>;

const RegisterForm: React.FC = () => {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { reg } = useContext(AuthContext);

  const { register, handleSubmit, formState, reset } = useForm<FormSchemaType>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (
    data: FormSchemaType
  ) => {
    try {
      setIsLoading(true);
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      console.log(payload);
      const result = await reg(payload);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reset();
      // Simulate a login success
      console.log("Register data:", data);
      console.log("Result: ", result);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setRegisterError("Invalid Information");
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto w-full">
        <div className="flex justify-center my-12">
          <div className="w-full lg:w-10/12 bg-gray-300 p-5 rounded-lg shadow-xl ">
            <h3 className="pt-4 text-2xl text-center font-bold">
              Create New Account
            </h3>
            <form
              className="px-8 pt-6 pb-8 mb-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="name"
                  >
                    User Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="User Name"
                    {...register("username")}
                  />
                  {formState.errors.username && (
                    <p className="text-xs italic text-red-500 mt-2">
                      {formState.errors.username?.message}
                    </p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {formState.errors.email && (
                    <p className="text-xs italic text-red-500 mt-2">
                      {formState.errors.email?.message}{" "}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  {formState.errors.password && (
                    <p className="text-xs italic text-red-500 mt-2">
                      {formState.errors.password?.message}
                    </p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                  />
                  {formState.errors.confirmPassword && (
                    <p>{formState.errors.confirmPassword?.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={!formState.isDirty || !formState.isValid}
                >
                  {isLoading ? "Processing....." : "Submit"}
                </button>
                <br />
                <br />
                <div className="text-center">
                  <Link to="/login">Already have an account? Login!</Link>
                </div>
              </div>
              {registerError && (
                <div className="text-red-700"> {registerError}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
