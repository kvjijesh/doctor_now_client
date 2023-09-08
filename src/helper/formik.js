import * as Yup from "yup";

export const validateSchema = Yup.object({

  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const validateDetails=Yup.object({
  registrationNumber: Yup.string().required('Please enter your register number').trim('Canot be empty spaces'),
    registrationCouncil:Yup.string().required("Please enter your registration council").trim(),
    registrationYear: Yup.string().required("Please enter registration year").trim(),
    offlineFee: Yup.string().required("Please enter consultation fee").trim(),
    videoChatFee: Yup.string().required("Please enter video chat fee").trim('Canot be empty spaces'),
    textChatFee: Yup.string().required("Please enter chat fee").trim('Canot be empty spaces'),
    specialisation: Yup.string().required("Please enter specialisation").trim('Canot be empty spaces'),
    qualification: Yup.string().required("Please enter qualification").trim('Canot be empty spaces'),
    mobile: Yup.string().min(10).required("Please enter mobile number").trim('Canot be empty spaces'),
    street: Yup.string().required("Please enter street name").trim('Canot be empty spaces'),
    city: Yup.string().required("Please enter city").trim('Canot be empty spaces'),
    state: Yup.string().required("Please enter state").trim('Canot be empty spaces'),
    country: Yup.string().required("Please enter country").trim('Canot be empty spaces'),
    pin: Yup.string().required("Please enter pin").trim('Canot be empty spaces'),
    // document:Yup.string().required("Please select document")
})

export const validatePrescription=Yup.object({
  findings:Yup.string().required("Please enter findings"),
  // medicine:Yup.string().required("Please enter medicine"),
  // frequency:Yup.string().required("Please enter frequency"),
  advice:Yup.string().required("Please enter advice")

})