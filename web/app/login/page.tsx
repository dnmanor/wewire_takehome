'use client';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '../components/Input';
import Button from '../components/Button';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {message: "Password must be at least 6 characters"}),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
  const { register, control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-[400px] mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold">Login into WeWire</h1>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <Input label="Email" name="email" type="email" register={field} errorMessage={error?.message} />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <Input label="Password" name="password" type="password" register={field} errorMessage={error?.message} />
          )}
        />
        <Button type="submit" variant="primary">Login</Button>
      </form>
    </div>
  );
}
