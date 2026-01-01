import React from "react";
import { Card, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import AppButton from "../../../components/shared/AppButton/AppButton";
import ValidationError from "../../../components/shared/ValidationError/ValidationError";
import { changePasswordSchema } from "../../../schema/changePassword.schema";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ChangePassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully", {
        position: "top-center",
        theme: "dark",
      });

      localStorage.removeItem("token");
      reset();

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong",
        {
          position: "top-center",
          theme: "dark",
        }
      );
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  async function changePassword(data) {
    return axios.patch(
      `${import.meta.env.VITE_BASE_URL}/users/change-password`,
      {
        password: data.password,
        newPassword: data.newPassword,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  return (
    <>
      <Helmet>
        <title>Kudo | Change Password</title>
      </Helmet>

      <section className="py-12">
        <div className="container">
          <Card className="max-w-lg mx-auto p-8 shadow-lg">
            <h1 className="text-center text-xl font-semibold mb-4">
              Change Password
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <Label htmlFor="password">Current Password</Label>
                <TextInput
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register("password")}
                />
                <ValidationError error={errors.password?.message} />
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <TextInput
                  id="newPassword"
                  type="password"
                  placeholder="********"
                  {...register("newPassword")}
                />
                <ValidationError error={errors.newPassword?.message} />
              </div>

              <AppButton isloading={isPending}>
                Change Password
              </AppButton>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
}
