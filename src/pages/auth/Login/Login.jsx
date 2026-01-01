import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { Alert, Label, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from '@hookform/resolvers/zod';
import ValidationError from '../../../components/shared/ValidationError/ValidationError';
import AppButton from '../../../components/shared/AppButton/AppButton';
import { AuthContext } from '../../../Context/AuthContext';
import { loginSchema } from '../../../schema/login.schema';
import { saveCredentials, getCredentials, clearCredentials } from '../../../utils/credentials';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultValues = {
  email: "",
  password: "",
  remember: false
}

export default function Login() {
  const navigate = useNavigate()
  const [ setApiError] = useState(null)
  const { setToken } = useContext(AuthContext)

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting, isValid } } = useForm({
    defaultValues,
    resolver: zodResolver(loginSchema)
  });

  useEffect(() => {
    document.title = "Kudo | Login";

    const creds = getCredentials();
    if (creds) {
      setValue("email", creds.email);
      setValue("password", creds.password);
      setValue("remember", true);
    }
  }, []);

  async function onSubmit(data) {
    try {
      const { data: response } = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signin`, {
        email: data.email,
        password: data.password
      });

      if (response.message === "success") {
        setApiError(null);
        localStorage.setItem("token", response.token);
        setToken(response.token);

        if (data.remember) {
          saveCredentials(data.email, data.password);
        } else {
          clearCredentials();
        }

        toast.success("Logged in successfully!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark"
        });

        navigate("/");

      } else if (response.error) {
        throw new Error(response.error);
      }

    } catch (error) {
      console.log(error);
      const message = error.response?.data?.error || "Something went wrong";

      setApiError(message);

      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark"
      });
    }
  }

  return (
    <section className='py-12'>
      <div className='container'>
        <div className='max-w-lg mx-auto p-8 shadow-lg dark:bg-gray-800 rounded'>
          <h1 className='text-center text-xl font-semibold mb-4'>Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4">

            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-1 block">Your email</Label>
              <TextInput id="email" type="email" placeholder="yourname@gmail.com" {...register("email")} />
              <ValidationError error={errors.email?.message} />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="mb-1 block">Your Password</Label>
              <TextInput id="password" type="password" placeholder="*******" {...register("password")} />
              <ValidationError error={errors.password?.message} />
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                {...register("remember")}
                className="w-4 h-4"
              />
              <label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <AppButton isloading={isSubmitting} disabled={!isValid}>
              Login
            </AppButton>

            {/* Link to Register */}
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
