import { Field as IField } from 'rc-field-form';
import { content } from '@/utils';

export type FieldProps = {
  children?: React.ReactNode;
}

export default function Field(props: FieldProps) {

  const {
    children,
  } = props;

  return (
    <IField>
      {content(children)}
    </IField>
  );
}

Field.useStatus = useStatus
