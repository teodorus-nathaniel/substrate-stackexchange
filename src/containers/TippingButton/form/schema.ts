import { OptionType } from '#/components/inputs/Select/Select'
import { number, object } from 'yup'

export interface TippingFormType {
  amount: number
  network: OptionType | null
}
const tippingFormInitialValues: TippingFormType = {
  amount: 0,
  network: null,
}
export const tippingForm = {
  initialValues: tippingFormInitialValues,
  validationSchema: object().shape({
    amount: number().moreThan(0),
    network: object().required(),
  }),
}
