import './AuthStyle.scss';
import { Form, Field, Formik, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IEmail, ILogoDark, IPassword } from '../../assets/Icons';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { SIGN_UP, PROFILE_DETAILS } from '../../data/navlinks';
import toast from 'react-hot-toast';
import { useAuth } from '../../store';

const REQUIRED_MESSAGE = 'Required field *';
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required(REQUIRED_MESSAGE),
  password: Yup.string().required(REQUIRED_MESSAGE).min(8, 'Min length 8 Characters'),
});

interface Values {
  email: string;
  password: string;
}

function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }: Values, { setSubmitting }: FormikHelpers<Values>) => {
    const { success, message } = await login(email, password);

    if (success) {
      toast.success(message);

      navigate(PROFILE_DETAILS.path);
    } else {
      toast.error(message);
    }
    setSubmitting(false);
  };

  return (
    <div className="user-auth__page">
      <ILogoDark />
      <div className="auth-form__wrapper ">
        <div className="auth__login">
          <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{
              email: '',
              password: '',
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <header>
                  <h2>Login</h2>
                  <p>Add your details below to get back into the app</p>
                </header>

                {/***************************************************/}
                {/*------------------- Email --------------------*/}
                {/***************************************************/}

                <Field name="email">
                  {({ field, meta }: FieldProps) => (
                    <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
                      <FormLabel htmlFor="email">Email</FormLabel>

                      <InputGroup>
                        <Input autoComplete="on" {...field} id="email" placeholder="e.g. alex@email.com" />
                        <InputLeftElement>
                          <IEmail />
                        </InputLeftElement>
                      </InputGroup>
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/***************************************************/}
                {/*------------------- Password --------------------*/}
                {/***************************************************/}

                <Field name="password">
                  {({ field, meta }: FieldProps) => (
                    <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <InputGroup>
                        <Input
                          autoComplete="on"
                          id="password"
                          pr="4.5rem"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter password"
                          {...field}
                        />
                        <InputLeftElement>
                          <IPassword />
                        </InputLeftElement>
                        <InputRightElement width="4.5rem">
                          <Button size="xs" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/***************************************************/}
                {/*------------------- Form Submit -----------------*/}
                {/***************************************************/}
                <Button
                  background={'devlinks.--ac-cl-1'}
                  colorScheme="purple"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Login
                </Button>

                <p>
                  Don’t have an account? <NavLink to={SIGN_UP.path}>Create account</NavLink>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
