import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { loginUser } from '../api/auth';
import UserContext from '../context/UserContext'; // Use default import

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const [loading, setLoading] = useState(false); // State for loading status
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      setLoading(true); // Set loading to true
      setErrorMessage(''); // Reset error message
      loginUser(values)
        .then(data => {
          setLoading(false); // Reset loading to false
          if (data.success) {
            login(data.user);
          } else {
            setErrorMessage('Login failed. Please check your credentials.');
          }
        })
        .catch(error => {
          setLoading(false); // Reset loading to false
          setErrorMessage('An error occurred: ' + error.message); // Set error message
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} {/* Display error message */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
      <button type="submit" disabled={loading}> {/* Disable button when loading */}
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
