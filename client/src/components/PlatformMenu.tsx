// PlatformMenu.js
import {
  FormControl,
  FormErrorMessage,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  Button,
} from '@chakra-ui/react';
import { FieldMetaProps, FormikProps } from 'formik';
import { IArrowDown } from '../assets/Icons';
import { all, business, cloud, dev, gaming, socialMedia } from '../data/platforms';
import ChakraMenuGroup from './ChakraMenuGroup';

interface PlatformMenuProps<T> {
  meta: FieldMetaProps<string>; // Replace with your actual FieldMetaProps type
  form: FormikProps<T>; // Replace with your actual FormikProps type
  index: number;
}

function PlatformMenu<T>({ meta, form, index }: PlatformMenuProps<T>) {
  return (
    <FormControl isInvalid={Boolean(meta.error)}>
      <div className="platform-label">
        platform
        <FormErrorMessage color={'devlinks.--err-cl'}>{meta.error}</FormErrorMessage>
      </div>

      <Menu matchWidth>
        <MenuButton
          style={
            meta.error
              ? {
                  minWidth: '100%',
                  textAlign: 'start',
                  color: '#d00000',
                  backgroundColor: '#fff',
                  border: '1px solid #d00000',
                }
              : {
                  minWidth: '100%',
                  textAlign: 'start',
                  backgroundColor: '#fff',
                  border: '1px solid #D9D9D9',
                }
          }
          as={Button}
          rightIcon={<IArrowDown />}
        >
          {meta.value ? (
            <p className="link-platform-option">
              {all.get(String(meta.value))?.icon}
              {String(meta.value)}
            </p>
          ) : (
            <p style={{ color: 'inherit' }}>Choose a platform</p>
          )}
        </MenuButton>
        <MenuList
          id={`links.${index}.platform`}
          style={{
            minWidth: '100%',
            maxHeight: '20rem',
            overflowY: 'auto',
          }}
        >
          <ChakraMenuGroup title="Developer" items={dev} form={form} index={index} />
          <MenuDivider />
          <ChakraMenuGroup title="Social Media" items={socialMedia} form={form} index={index} />
          <MenuDivider />
          <ChakraMenuGroup title="Business" items={business} form={form} index={index} />
          <MenuDivider />
          <ChakraMenuGroup title="Cloud" items={cloud} form={form} index={index} />
          <MenuDivider />
          <ChakraMenuGroup title="Gaming" items={gaming} form={form} index={index} />
        </MenuList>
      </Menu>
    </FormControl>
  );
}

export default PlatformMenu;
