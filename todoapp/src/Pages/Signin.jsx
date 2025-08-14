import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'


const Signin = () => {
        const navigate = useNavigate()
    const [error, setError] = useState('')
    const API_BASE_URL = 'https://full-todo-app-q23c.onrender.com';

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid Email').required('Email is required'),
            password: yup.string().required('Password is required')
        }),
        onSubmit: async values => {
            setError('');
            try {
                const res = await axios.post(`${API_BASE_URL}/signin`, values);
                if (res.status === 200) {
                    navigate('/TodoApp');
                }
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('Signin failed. Please try again.');
                }
            }
        }
    })
  return (
    <>
    <form onSubmit={formik.handleSubmit}>
            <div className='mx-auto shadow mt-5 col-lg-5 col-md-7 col-10 mt-lg-5 mt-3 shadow rounded-3 p-lg-5 p-3'>
            <h1 className='text-center'>SIGN IN</h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control my-3"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && <span className="text-danger">{formik.errors.email}</span>}

                <input
                    type="password"
                    placeholder="Password"
                    className="form-control my-3"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && <span className="text-danger">{formik.errors.password}</span>}

                {error && <div className="text-danger mb-2">{error}</div>}

                <button className="btn btn-outline-primary w-100 my-4" type="submit">
                    Sign In
                </button>
                <Link to="/" className="text-decoration-none text-dark">
                    Don't have an account? Sign up
                </Link>
            </div>
        </form>
    </>
  )
}

export default Signin