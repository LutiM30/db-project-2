import { Input } from "@nextui-org/react";
import CommonButton from "../common/button";
import { useState } from "react";
import { EyeFilledIcon } from "../common/eyeOpen";
import { EyeSlashFilledIcon } from "../common/eyeClosed";
import { supabase } from "../../supabaseConfig";
import { areAllValuesExist } from "../../common/functions";

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const toggleVisibility = (c = false) =>
    c ? setIsVisibleConfirm(!isVisibleConfirm) : setIsVisible(!isVisible);
  const onFormChange = (event, key) => {
    const newData = { ...signUpForm };

    newData[key] = event.target.value;

    setSignUpForm({ ...newData });
  };

  const onSubmit = async () => {
    if (
      areAllValuesExist(signUpForm) &&
      signUpForm.password === signUpForm.cpassword
    ) {
      const signupData = { ...signUpForm };
      delete signupData.cpassword;
      const { data, error } = await supabase.auth.signUp(signupData);
      if (error?.message) {
        alert(error?.message);
      } else {
        console.log({ data });
        const userData = { id: data.user.id, email: data.user.email };
        const { error } = await supabase.from("users").insert(userData);
        error.message && alert(error.message);
      }
    }
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input
        isRequired
        type="email"
        label="Email"
        id="email"
        onChange={(event) => onFormChange(event, "email")}
      />
      <Input
        isRequired
        label="Password"
        variant="bordered"
        placeholder="Enter your password"
        onChange={(event) => onFormChange(event, "password")}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => toggleVisibility()}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="max-w-xs"
      />
      <Input
        id="cpassword"
        label="Confirm Password"
        variant="bordered"
        placeholder="Enter your password again"
        onChange={(event) => onFormChange(event, "cpassword")}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => toggleVisibility(true)}
          >
            {isVisibleConfirm ? (
              <EyeSlashFilledIcon className="text-xl text-default-300 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-xl text-default-300 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="max-w-xs"
      />
      <CommonButton buttonTitle="SignUp" onClick={onSubmit} />
    </div>
  );
}
