import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { registerUser } from '../api/auth';

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      registerUser(values).then((data) => {
        if (data.success) {
          console.log('Registration successful');
        } else {
          alert('Registration failed');
        }
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

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

      <button type="submit">Register</button>
    </form>
  );
};

// If you decide to pass props to RegisterForm, add prop types
RegisterForm.propTypes = {
  // Define any props if needed
};

export default RegisterForm;
