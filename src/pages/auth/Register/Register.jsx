import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Radio, Label, TextInput, Alert, Datepicker } from "flowbite-react";
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import ValidationError from '../../../components/shared/ValidationError/ValidationError';
import AppButton from '../../../components/shared/AppButton/AppButton';
import { HiInformationCircle } from "react-icons/hi";
import { registerSchema } from '../../../schema/register.schema';

const defaultValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  dateOfBirth: "",
  gender: "",
}

export default function Register() {
  useEffect(() => {
    document.title = "Kudo | Register"
  }, [])
  const navigate = useNavigate()
  const [apiError, setApiError] = useState(null)


  const { register, handleSubmit, formState: { errors, isSubmitting, isValid }, control } = useForm({
    defaultValues,
    resolver: zodResolver(registerSchema)
  });

  async function onSubmit(data) {
    console.log(data)

    try {
      const { data: response } = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`, data)
      if (response.message === "success") {
        navigate("/login");
        setApiError(null)
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
    <section className="py-12">
      <div className="container">
        <div className="max-w-lg mx-auto p-8 rounded-lg shadow-md bg-white dark:bg-gray-800">

          <h1 className="text-center text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Create Account
          </h1>

          {/* API Error */}
          {apiError && (
            <Alert className='my-4' color="failure" icon={HiInformationCircle}>
              {apiError}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-1 block">Email</Label>
              <TextInput id="email" type="text" placeholder="rehab@gmail.com" {...register("email")} />
              <ValidationError error={errors.email?.message} />
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name" className="mb-1 block">Your name</Label>
              <TextInput id="name" type="text" placeholder="Rehab Ahmed" {...register("name")} />
              <ValidationError error={errors.name?.message} />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="mb-1 block">Password</Label>
              <TextInput id="password" type="password" placeholder="********" {...register("password")} />
              <ValidationError error={errors.password?.message} />
            </div>

            {/* Repassword */}
            <div>
              <Label htmlFor="repassword" className="mb-1 block">Confirm Password</Label>
              <TextInput id="repassword" type="password" placeholder="********" {...register("rePassword")} />
              <ValidationError error={errors.rePassword?.message} />
            </div>

            {/* Date of Birth */}
            <div>
              <Label htmlFor="dateOfBirth" className="mb-1 block">Date of Birth</Label>
              <Controller
                render={({ field }) =>
                  <Datepicker {...field}
                    value={field.value ? new Date(field.value) : new Date()}
                    onChange={(date) => {
                      if (date) {
                        const formatetedDate = new Date(date).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric"
                        })
                        return field.onChange(formatetedDate)
                      }
                    }} />}
                name="dateOfBirth"
                control={control} />

              {/* <TextInput id="dateOfBirth" type="date" {...register("dateOfBirth")} /> */}
              <ValidationError error={errors.dateOfBirth?.message} />
            </div>

            {/* Gender */}
            <div>
              <Label className="mb-1 block">Gender</Label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <Radio id="female" value="female" {...register("gender")} />
                  <span>Female</span>
                </label>
                <label className="flex items-center gap-2">
                  <Radio id="male" value="male" {...register("gender")} />
                  <span>Male</span>
                </label>
              </div>
              <ValidationError error={errors.gender?.message} />
            </div>

            {/* Button */}
            <AppButton
              isloading={isSubmitting}
              disabled={!isValid}
              className="w-full py-2 text-center"
            >
              Register
            </AppButton>
            {/* Link to Login */}
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>

          </form>
        </div>
      </div>
    </section>

  )
}
