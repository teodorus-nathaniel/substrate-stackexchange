import Yup from 'yup'

export interface CreateSpaceFormType {
  name: string
  desc?: string
  avatar: File | null
}
const createSpaceInitialValues: CreateSpaceFormType = {
  name: '',
  desc: '',
  avatar: null,
}
export const createSpaceForm = {
  initialValues: createSpaceInitialValues,
  validationSchema: Yup.object().shape({
    name: Yup.string().defined(),
    desc: Yup.string(),
    avatar: Yup.object()
      .shape({
        attachment: Yup.mixed().test(
          'fileSize',
          'The file is too large',
          (value) => {
            if (!value.length) return true
            return value[0].size <= 2 * 1024 * 1024
          }
        ),
      })
      .nullable(),
  }),
}
