// src/components/LoginForm.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Define the form schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type FormSchemaType = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const { login, isAuthenticated, user } = useContext(AuthContext);

  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm<FormSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  // const { formState, handleSubmit } = useForm<FormSchemaType>({
  //   schema: loginSchema,
  // });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      setIsLoading(true);
      setLoginError(null);

      const payload = {
        email: data.email,
        password: data.password,
      };

      await login(payload);

      // Replace this with your actual login logic (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/");

      reset();
      // Simulate a login success
      console.log("Logged in with data:", payload);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setLoginError("Invalid Credentials..");
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>
          <p className="font-bold underline">{user?.name}</p> You are already
          logged on!
        </p>
      ) : (
        <div className="max-w-xl mx-auto w-full ">
          <div className="flex justify-center my-12">
            <div className="w-full lg:w-10/12 p-5 rounded-lg shadow-xl  bg-gray-300">
              <h3 className="pt-4 text-2xl text-center font-bold">
                Login To Your Account
              </h3>
              <form
                className="px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                      placeholder="name@company.com"
                      required
                      {...register("email")}
                    />
                    {formState.errors.email && (
                      <p className="text-xs italic text-red-500 mt-2">
                        {formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white m-auto"
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
                        {formState.errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <br />
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={!formState.isDirty || !formState.isValid}
                  >
                    {isLoading ? "Processing....." : "Log In"}
                  </button>
                  <br />
                  <br />
                  <div className="text-center">
                    <Link to="/register">No Account? Register</Link>
                  </div>
                </div>

                {loginError && <div className="text-red-700">{loginError}</div>}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
