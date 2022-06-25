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
    title: string().required('You need to provide the title of your question!'),
    body: string().test({
      name: 'question-body-validator',
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
