import * as Yup from "yup";

export const validateSchema = Yup.object({

  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const validateDetails=Yup.object({
  registrationNumber: Yup.string().required('Please enter your register number'),
    registrationCouncil:Yup.string().required("Please enter your registration council"),
    registrationYear: Yup.string().required("Please enter registration year"),
    offlineFee: Yup.string().required("Please enter consultation fee"),
    videoFee: Yup.string().required("Please enter video chat fee"),
    chatFee: Yup.string().required("Please enter chat fee"),
    specialisation: Yup.string().required("Please enter specialisation"),
    qualification: Yup.string().required("Please enter qualification"),
    mobileNumber: Yup.string().min(10).required("Please enter mobile number"),
    street: Yup.string().required("Please enter street name"),
    city: Yup.string().required("Please enter city"),
    state: Yup.string().required("Please enter state"),
    country: Yup.string().required("Please enter country"),
    pin: Yup.string().required("Please enter pin"),
})