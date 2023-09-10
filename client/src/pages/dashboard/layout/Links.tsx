import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  FormLabel,
} from '@chakra-ui/react';
import { Formik, FieldArray, Field, Form, FieldProps, FormikHelpers } from 'formik';
import { IDragAndDrop, IEmpty, ILink } from '../../../assets/Icons';
import { all } from '../../../data/platforms';
import './Links.scss';
import { DevLink, PlatForm } from '../../../data/types';
import * as Yup from 'yup';
import PlatformMenu from '../../../components/PlatformMenu';
import { useAuth } from '../../../store';
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  links: Yup.array().of(
    Yup.object().shape({
      platform: Yup.string().required('Platform is required'),
      url: Yup.string()
        .url('Invalid URL')
        .required('URL is required')
        .test('url-platform-match', function (value) {
          const platform: string = this.parent.platform;

          if (!platform) {
            // If no platform is selected, let the required validation handle it
            return true;
          }

          // check if provided URL contains platform-URL
          const { url }: PlatForm = all.get(platform)!;

          if (!value.toLowerCase().includes(url)) {
            return this.createError({
              message: `Invalid ${platform} URL`,
              path: this.path,
            });
          }
          return true;
        }),
    }),
  ),
});

interface Values {
  links: Array<DevLink>;
}
function Links() {
  const { user, updateUser } = useAuth();
  const handleSubmit = async ({ links }: Values, { setSubmitting }: FormikHelpers<Values>) => {
    console.log(links);
    const { success, message } = await updateUser({ links: links });

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
        <h2>Customize your links</h2>
        <p>Add/edit/remove links below and then share all your profiles with the world!</p>
      </header>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={{ links: user?.links || [] }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <FieldArray name="links">
              {({ remove, push }: { remove: (index: number) => void; push: (val: DevLink) => void }) => (
                <div>
                  {values.links.map((link: DevLink, index: number) => (
                    <div className="link-input" key={index}>
                      <h3>
                        <IDragAndDrop />
                        <span>Link #{index + 1}</span>
                      </h3>
                      {/* ************************************* */}
                      {/* ************ Platform Menu ********** */}
                      {/* ************************************* */}
                      <Field name={`links.${index}.platform`}>
                        {({ form, meta }: FieldProps) => <PlatformMenu form={form} index={index} meta={meta} />}
                      </Field>

                      {/* ************************************* */}
                      {/* ***************** URL ************** */}
                      {/* ************************************* */}

                      <Field name={`links.${index}.url`}>
                        {({ field, meta }: FieldProps) => (
                          <FormControl isInvalid={Boolean(meta.error)}>
                            <FormLabel htmlFor={`link.${index}.url`}>
                              Link
                              <FormErrorMessage color={'devlinks.--err-cl'}>{meta.error}</FormErrorMessage>
                            </FormLabel>
                            <InputGroup>
                              <Input
                                style={{
                                  backgroundColor: '#fff',
                                  border: '1px solid #D9D9D9',
                                }}
                                {...field}
                                name={`links.${index}.url`}
                                id={`link.${index}.url`}
                                placeholder="e.g. https://www.github.com/johnappleseede"
                                type="text"
                              />
                              <InputLeftElement>
                                <ILink />
                              </InputLeftElement>
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                      {/* ************************************* */}
                      {/* ************* Remove Item *********** */}
                      {/* ************************************* */}
                      <Button
                        className="remove-link-btn"
                        variant="unstyled"
                        type="button"
                        color="devlinks.--font-normal"
                        _hover={{ color: '#d00000' }}
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  {/* ************************************* */}
                  {/* *********** Add New Link ************ */}
                  {/* ************************************* */}

                  <Button
                    className={`add-link-btn`}
                    width={'100%'}
                    colorScheme={values.links.length >= 20 ? 'red' : 'purple'}
                    color="devlinks.--ac-cl-1"
                    variant="outline"
                    type="button"
                    onClick={() => {
                      if (values.links.length >= 20) {
                        return;
                      } else {
                        push({ platform: '', url: '' });
                      }
                    }}
                  >
                    {values.links.length >= 20 ? 'You Hit The Limit' : '  Add Link'}
                  </Button>
                </div>
              )}
            </FieldArray>
            {values.links.length < 1 && (
              <div className="no-links">
                <IEmpty />
                <h2>Let’s get you started</h2>
                <p>
                  Use the “Add new link” button to get started. Once you have more than one link, you can reorder and
                  edit them. We’re here to help you share your profiles with everyone!
                </p>
              </div>
            )}
            {/* ************************************* */}
            {/* ************ Form Submit ************ */}
            {/* ************************************* */}

            <div className="submit-btn-wrapper">
              <Button
                width={'100%'}
                colorScheme="purple"
                backgroundColor="devlinks.--ac-cl-1"
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

export default Links;
