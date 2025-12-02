import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
export default function Login() {





  return (
    <section className='py-12'>
      <div className='container'>
        <div className='max-w-lg mx-auto p-8 shadow-lg dark:bg-gray-800 rounded'>
          <h1 className='text-center'>Login</h1>
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1">Your email</Label>
              </div>
              <TextInput id="email1" type="email" placeholder="Rehab@gmail.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1">Your password</Label>
              </div>
              <TextInput id="password1" type="password"placeholder="**********" required />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </section >
  )
}
