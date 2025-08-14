import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
        const navigate = useNavigate();
    const [error, setError] = useState("");
    const API_BASE_URL = 'https://full-todo-app-q23c.onrender.com';

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            setError("");
            try {
                const res = await axios.post(`${API_BASE_URL}/signup`, values);
                if (res.status === 201) {
                    navigate("/signin");
                }
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError("Signup failed. Please try again.");
                }
            }
        },
        validationSchema: yup.object({
            firstName: yup.string().required("First name is required"),
            lastName: yup.string().required("Last name is required"),
            email: yup.string().email("Invalid Email").required("Email is required"),
            password: yup
                .string()
                .min(8, "password must be at least 8 characters or more")
                .required("input password"),
        }),
    });
    return (
    <>
<form action="" onSubmit={formik.handleSubmit} className="drop-in-form">
                {error && <div className="text-danger mb-2 text-center">{error}</div>}
                <div className="mx-auto shadow mt-5 col-lg-5 col-md-7 col-10 mt-lg-5 mt-3 shadow rounded-3 p-lg-5 p-3 drop-in">
                    <h1 className="text-center drop-in delay-1">SIGN UP</h1>
                    <input
                        type="text"
                        autoFocus
                        placeholder="First Name"
                        className="form-control my-3 drop-in delay-2"
                        name="firstName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName ? (
                        <span className="text-danger drop-in delay-3">
                            {formik.errors.firstName}
                        </span>
                    ) : null}
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="form-control my-3 drop-in delay-4"
                        name="lastName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName ? (
                        <span className="text-danger drop-in delay-5">
                            {formik.errors.lastName}
                        </span>
                    ) : null}
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control my-3 drop-in delay-6"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email ? (
                        <span className="text-danger drop-in delay-7">
                            {formik.errors.email}
                        </span>
                    ) : null}
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control my-3 drop-in delay-8"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password ? (
                        <span className="text-danger drop-in delay-9">
                            {formik.errors.password}
                        </span>
                    ) : null}
                    <button
                        className="btn btn-outline-primary w-100 my-4 drop-in delay-10"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <Link
                        to="/signin"
                        className="text-decoration-none text-dark drop-in delay-11"
                    >
                        Already have an account? Sign in
                    </Link>
                </div>
            </form>
            <style>
                {`
                .drop-in-form {
                    overflow: hidden;
                }
                .drop-in {
                    opacity: 0;
                    transform: translateY(-60px);
                    animation: dropIn 0.7s cubic-bezier(.23,1.01,.32,1) forwards;
                }
                .drop-in.delay-1 { animation-delay: 0.1s; }
                .drop-in.delay-2 { animation-delay: 0.2s; }
                .drop-in.delay-3 { animation-delay: 0.3s; }
                .drop-in.delay-4 { animation-delay: 0.4s; }
                .drop-in.delay-5 { animation-delay: 0.5s; }
                .drop-in.delay-6 { animation-delay: 0.6s; }
                .drop-in.delay-7 { animation-delay: 0.7s; }
                .drop-in.delay-8 { animation-delay: 0.8s; }
                .drop-in.delay-9 { animation-delay: 0.9s; }
                .drop-in.delay-10 { animation-delay: 1s; }
                .drop-in.delay-11 { animation-delay: 1.1s; }

                @keyframes dropIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>
    </>
    )
}

export default Signup