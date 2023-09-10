import './AuthStyle.scss';
import { Form, Field, Formik, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
import { IEmail, ILogoDark, IPassword } from '../../assets/Icons';
import { LOGIN, PROFILE_DETAILS } from '../../data/navlinks';
import { useAuth } from '../../store';
import toast from 'react-hot-toast';

const REQUIRED_MESSAGE = 'Required field *';

const validationSchema = Yup.object({
  email: Yup.string().trim().email('Invalid email address').required(REQUIRED_MESSAGE),
  password: Yup.string()
    .required(REQUIRED_MESSAGE)
    .trim()
    .min(8, 'Min length 8 Characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must contain at least one letter, one number and one special character',
    ),
  passwordConfirm: Yup.string()
    .trim()
    .oneOf([Yup.ref('password'), undefined], 'Password must match')
    .required(REQUIRED_MESSAGE),
});

interface Values {
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { singUp } = useAuth();

  const handleSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    const { success, message } = await singUp(values.email, values.password);

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
      <div className="auth-form__wrapper">
        <div className="auth__sign-up">
          <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{
              email: '',
              password: '',
              passwordConfirm: '',
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <header>
                  <h2>Create account</h2>
                  <p>Let’s get you started sharing your links!</p>
                </header>

                {/***************************************************/}
                {/*---------------------- Email --------------------*/}
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
                          id="password"
                          autoComplete="on"
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
                {/*---------------- Confirm Password ---------------*/}
                {/***************************************************/}

                <Field name="passwordConfirm">
                  {({ field, meta }: FieldProps) => (
                    <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
                      <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
                      <InputGroup>
                        <Input
                          id="passwordConfirm"
                          autoComplete="on"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm Password"
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
                {/*------------------ Submit Form ------------------*/}
                {/***************************************************/}

                <Button
                  background={'devlinks.--ac-cl-1'}
                  colorScheme="purple"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Create new account
                </Button>
                <p>
                  Already have an account? <NavLink to={LOGIN.path}>Login</NavLink>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
