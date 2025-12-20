import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import ValidationError from '../../../components/shared/ValidationError/ValidationError';
import AppButton from '../../../components/shared/AppButton/AppButton';
import { HiInformationCircle } from 'react-icons/hi';
import { AuthContext } from '../../../Context/AuthContext';
const defaultValues = {
  email: "",
  password: "",
}
const schema = z.object({
  email: z.email({ message: "Invalid email format" }),
  password: z.string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/,
      { message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character" }),
})
export default function Login() {
  useEffect(() => {
    document.title = "Kudo | Login"
  }, [])

  const navigate = useNavigate()
  const [apiError, setApiError] = useState(null)
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const { setToken } = useContext(AuthContext)
  async function onSubmit(data) {
    console.log(data)

    try {
      const { data: response } = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signin`, data)
      if (response.message === "success") {
        setApiError(null)
        localStorage.setItem("token", response.token)
        setToken(response.token);
        navigate("/");
      }
      else if (response.error) {
        throw new Error(response.error)
      }
    } catch (error) {
      console.log(error);
      setApiError(error.response.data.error)
    }
  }

  return (
    <section className='py-12'>
      <div className='container'>
        <div className='max-w-lg mx-auto p-8 shadow-lg dark:bg-gray-800 rounded'>
          <h1 className='text-center'>Login</h1>
          {/* API Error */}
          {apiError && (
            <Alert className='my-4' color="failure" icon={HiInformationCircle}>
              {apiError}
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4">

            {/* email */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Your email</Label>
              </div>
              <TextInput id="email" type="email" placeholder="rehab@gmail.com" {...register("email")} />
              <ValidationError error={errors.email?.message} />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Your Password</Label>
              </div>
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

            <AppButton
              isloading={isSubmitting}
              disabled={!isValid}
            >
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