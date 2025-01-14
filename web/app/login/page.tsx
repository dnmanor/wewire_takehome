"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "../api/api";

import Input from "../components/Input";
import Button from "../components/Button";
import { ApiErrorResponse } from "../types";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();
  const apiError = error as ApiErrorResponse;

  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login({ email: data.email, password: data.password }).unwrap();
      router.push("/dashboard/transactions");
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-[400px] mx-auto"
      >
        <h1 className="text-xl sm:text-2xl font-bold">Login into WeWire </h1>
        {apiError && <p className="text-red-500">{apiError?.data?.message}</p>}
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <Input
              label="Email"
              name="email"
              type="email"
              register={field}
              errorMessage={error?.message}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <Input
              label="Password"
              name="password"
              type="password"
              register={field}
              errorMessage={error?.message}
              onChange={field.onChange}
            />
          )}
        />
        <Button type="submit" variant="primary" disabled={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
}
