"use client";
import { getLogin } from "@/actions/authAction/authActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Button from "../Button";
import { z } from "zod";
import toast from "react-hot-toast";

const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be at most 32 characters long" }),
});

function LoginForm() {
  const router = useRouter();

  const loginAction = async (formData: FormData) => {

    const result = LoginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    
    if (!result.success) {
      let errorMessage ="";
       result.error.issues.forEach((issue) => {
        errorMessage += `${issue.path[0]} : ${issue.message}`;
       })

      toast.error(errorMessage);
      return;
    }

     const response = await getLogin(result.data);
    if (response?.status === 200) {
      router.push("/");
    } else if( response?.error?.statusCode  === 401) {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <form className="space-y-4 md:space-y-6" action={loginAction}>
        {/* <Image src={`data:image;base64,${image}`} className="rounded-full w-28 h-28" alt={image} width={100} height={100} /> */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="text-gray-500 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Forgot password?
          </a>
        </div>
        <Button>Sign in</Button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Do not have an account yet?
          <Link
            href="/signup"
            className="ml-2 font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
