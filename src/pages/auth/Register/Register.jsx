import React from 'react'
import { Button, Radio, Label, TextInput } from "flowbite-react";
export default function Register() {
  return (
    <section className='py-12'>
      <div className='container'>
        <div className='max-w-lg mx-auto p-8 shadow-lg dark:bg-gray-800 rounded'>
          <h1 className='text-center'>Register</h1>
          <form className="flex max-w-md flex-col gap-4">
            {/* email */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Your email</Label>
              </div>
              <TextInput id="email" type="email" placeholder="rehab@gmail.com" required />
            </div>
            {/* Name */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Your name</Label>
              </div>
              <TextInput id="name" type="text" placeholder="Rehab Ahmed" required />
            </div>
            {/* Password */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Your Password</Label>
              </div>
              <TextInput id="Password" type="Password" placeholder="*******" required />
            </div>
            {/* Repassword */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repassword">Confrim Password</Label>
              </div>
              <TextInput id="repassword" type="Password" placeholder="*******" required />
            </div>
            {/* Date of Birth */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
              </div>
              <TextInput id="dateOfBirth" type="date" required />
            </div>
            {/* Gander */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dateOfBirth">Gander</Label>
              </div>
              <div className="flex max-w-md flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Radio id="female" name="gander" value="female"/>
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="male" name="gander" value="male"/>
                  <Label htmlFor="male">Male</Label>
                </div>
              </div>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
