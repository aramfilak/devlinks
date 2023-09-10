import { MenuGroup, MenuItem } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import { PlatForm } from '../data/types'; // Make sure to import LinkIcon type

interface Props<T> {
  title: string;
  index: number;
  items: PlatForm[];
  form: FormikProps<T>;
}

function ChakraMenuGroup<T>({ title, items, index, form }: Props<T>) {
  return (
    <MenuGroup title={title} color={'#633cff'}>
      {items.map(({ name, icon }) => (
        <MenuItem
          key={`${name}+${index}`}
          icon={icon}
          onClick={() => {
            const fieldName = `links.${index}.platform`;
            form.setFieldValue(fieldName, name);
          }}
        >
          {name}
        </MenuItem>
      ))}
    </MenuGroup>
  );
}

export default ChakraMenuGroup;
