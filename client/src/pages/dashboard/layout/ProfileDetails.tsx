import './ProfileDetails.scss';
import { Form, Field, Formik, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
} from '@chakra-ui/react';
import { useAuth } from '../../../store';
import toast from 'react-hot-toast';
import ImageUpload from '../../../components/ImageUpload';

const profileDetailsSchema = Yup.object({
  email: Yup.string().email('Invalid email format'),
  firstName: Yup.string().max(30),
  lastName: Yup.string().max(30),
  bio: Yup.string().max(255),
});

interface Values {
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
}

function ProfileDetails() {
  const { user, updateUser } = useAuth();

  const handleSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    const { success, message } = await updateUser({ ...values });

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    setSubmitting(false);
  };

  return (
    <>
      <header>
        <h2>Profile Details</h2>
        <p>Add your details to create a personal touch to your profile.</p>
      </header>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={profileDetailsSchema}
        enableReinitialize={true}
        initialValues={{
          email: user?.email || '',
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          bio: user?.bio || '',
        }}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ isSubmitting }) => (
          <Form>
            {/***************************************************/}
            {/*------------------ Profile Image ----------------*/}
            {/***************************************************/}
            <div className="inputs-group-wrapper">
              <ImageUpload />
              {/***************************************************/}
              {/*------------------- FirstName -------------------*/}
              {/***************************************************/}
              <Field name="firstName">
                {({ field, meta }: FieldProps) => (
                  <FormControl className="input-group" isInvalid={Boolean(meta.error && meta.touched)}>
                    <FormLabel htmlFor="firstName">
                      First name <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormLabel>
                    <InputGroup>
                      <Input size={'lg'} id="firstName" pr="4.5rem" type="text" placeholder="e.g. John" {...field} />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
              {/***************************************************/}
              {/*------------------- LastName -------------------*/}
              {/***************************************************/}
              <Field name="lastName">
                {({ field, meta }: FieldProps) => (
                  <FormControl className="input-group" isInvalid={Boolean(meta.error && meta.touched)}>
                    <FormLabel htmlFor="lastName">
                      Last name <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormLabel>
                    <InputGroup>
                      <Input id="lastName" type="text" placeholder="e.g. Doe" {...field} />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
              {/***************************************************/}
              {/*-------------------- Bio ----------------------*/}
              {/***************************************************/}
              <Field name="bio">
                {({ field, meta }: FieldProps) => (
                  <FormControl className="input-group" isInvalid={Boolean(meta.error && meta.touched)}>
                    <FormLabel htmlFor="bio">
                      Bio <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormLabel>
                    <InputGroup>
                      <Textarea id="bio" resize="vertical" placeholder="About me..." {...field} />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
              {/***************************************************/}
              {/*-------------------- Email ----------------------*/}
              {/***************************************************/}

              <Field name="email">
                {({ field, meta }: FieldProps) => (
                  <FormControl className="input-group" isInvalid={Boolean(meta.error && meta.touched)}>
                    <FormLabel htmlFor="email">
                      Email <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormLabel>
                    <InputGroup>
                      <Input id="email" size={'lg'} type="email" pr="4.5rem" {...field} />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
            </div>
            {/***************************************************/}
            {/*------------------- Form Submit -----------------*/}
            {/***************************************************/}
            <Divider />
            <div className="submit-btn-wrapper">
              <Button
                width={'100%'}
                colorScheme="purple"
                backgroundColor={'#633cff'}
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ProfileDetails;
