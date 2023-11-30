import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import userService from '../services/userService';
import { signInSchema } from '../schemas/signIn';
import Swal from 'sweetalert2';
import "../styles/Signin.css"


const SignIn = () => {

    const navigate = useNavigate();

    const initialState = {
        email: "",
        password: ""
    }

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
        initialValues: initialState,
        validationSchema: signInSchema,
        onSubmit: (values, action) => {
            console.log(values);
            eventLogin();
            action.resetForm();
        }
    });

    const eventLogin = async () => {
        try {
            const response = await userService.loginUserWithEmailAndPassword(values);
            console.log(response);
            var token = response.data.accessToken;
            var user_email = response.data.email;
            console.log(response.data, token, user_email);

            let timerInterval;
            Swal.fire({
                title: "Successfully LoggedIn !",
                html: "Redirecting in <b></b> milliseconds.",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const b = Swal.getHtmlContainer().querySelector("b");
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft();
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
            setTimeout(() => {
                // dispatch(addUser(user_email));
                // dispatch(addColor(color));
                // dispatch(addToken(token));
                navigate("/dashboard");
            }, 3000);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Bad Credentials !",
            });
        }

        return (
            <div className='signin'>
                <div className="signin-card">
                    <div className="signin-cardtext">
                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email" />
                            {errors.email && touched.email ? (
                                <p style={{ color: "red" }}>{errors.email}</p>
                            ) : null}
                            <br />
                            <br />
                            <input
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password" />
                            {errors.password && touched.password ? (
                                <p style={{ color: "red" }}>{errors.password}</p>
                            ) : null}
                            <br />
                            <br />
                            <div className='signin-buttons'>
                                <button type="submit" className='button-5'>SIGN IN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn