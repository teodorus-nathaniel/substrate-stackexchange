import { mixed, object, string } from 'yup'

export interface CreateSpaceFormType {
  name: string
  desc?: string
  avatar?: File
}
const createSpaceInitialValues: CreateSpaceFormType = {
  name: '',
  desc: '',
  avatar: undefined,
}
export const createSpaceForm = {
  initialValues: createSpaceInitialValues,
  validationSchema: object().shape({
    name: string().required('Your space needs a name!'),
    desc: string(),
    avatar: object()
      .shape({
        attachment: mixed().test(
          'fileSize',
          'The file is too large',
          (value) => {
            if (!value?.length) return true
            return value[0].size <= 2 * 1024 * 1024
          }
        ),
      })
      .nullable(),
  }),
}
