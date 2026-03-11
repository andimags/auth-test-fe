"use client";

import { useRouter } from 'next/navigation';
import { MouseEvent, useRef } from "react";

interface registerForm {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterPage() {
    const router = useRouter()

    const payload = useRef<registerForm>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
        console.log(payload.current);
        e.preventDefault();
        const { confirmPassword: _confirmPassword, ...registerData } = payload.current;

        const url = "/backend/auth/register";
        try {
            const response = await fetch(url, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(registerData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);

            router.push('/')
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred");
            }
        }
    };

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                        Register new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-gray-100"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    onChange={(e) => {
                                        payload.current.email = e.target.value;
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm/6 font-medium text-gray-100"
                            >
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    onChange={(e) => {
                                        payload.current.name = e.target.value;
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm/6 font-medium text-gray-100"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    onChange={(e) => {
                                        payload.current.password =
                                            e.target.value;
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="retypePassword"
                                    className="block text-sm/6 font-medium text-gray-100"
                                >
                                    Re-type password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    onChange={(e) => {
                                        payload.current.confirmPassword =
                                            e.target.value;
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                onClick={handleRegister}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Not a member?{" "}
                        <a
                            href="#"
                            className="font-semibold text-indigo-400 hover:text-indigo-300"
                        >
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
