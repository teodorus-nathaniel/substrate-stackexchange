import { object, string } from 'yup'

export interface AskQuestionFormType {
  title: string
  body: string
}
const askQuestionInitialValues: AskQuestionFormType = {
  title: '',
  body: '',
}
export const askQuestionForm = {
  initialValues: askQuestionInitialValues,
  validationSchema: object().shape({
    name: string().required('Your space needs a name!'),
    desc: string().test({
      name: 'question-desc-validator',
      test: function (value) {
        return (value?.length ?? 0) < 30
          ? this.createError({
              message: `Body text must be at least 30. Currently you have typed: ${
                value?.length ?? 0
              }`,
              path: 'desc',
            })
          : true
      },
    }),
  }),
}
