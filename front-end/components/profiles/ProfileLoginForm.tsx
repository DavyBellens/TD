import ProfileService from "@/services/ProfileService";
import { StatusMessage } from "@/types";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import InputField from "./personalInformation/InputField";

const ProfileLoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setStatusMessages([]);
  };

  const validate = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const loginUser = async () => {
    try {
      const res = await ProfileService.loginUser(email, password);
      const response = await res.json();

      if (res.status === 401) {
        const { errorMessage } = response.message;
        setStatusMessages([{ message: errorMessage, type: "error" }]);
        return;
      }

      if (res.status === 400) {
        if (response.message === 'Profile with email "' + email + '" does not exist') {
          setEmailError("Profile with this email does not exist");
        } else if (response.message === "Invalid password") {
          setPasswordError("Incorrect password");
        }
        return;
      }

      if (res.status !== 200) {
        setStatusMessages([
          {
            message: "An error has occurred. Please try again later.",
            type: "error",
          },
        ]);
        return;
      }

      sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          id: response.profile.id,
          name: response.profile.name,
          email: response.profile.email,
          role: response.profile.role,
        })
      );

      sessionStorage.setItem("token", JSON.stringify({ value: response.token.value }));

      setStatusMessages([{ message: "Login successful! Redirecting...", type: "success" }]);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      clearErrors();
      if (!validate()) return;
      await loginUser();
    } catch (error) {
      console.log(error);
    }
  };
  const input = "mb-1 bg-white bg-opacity-75 text-black p-1 rounded-lg";
  const label = "mb-1 text-xl";
  return (
    <>
      {statusMessages && (
        <ul>
          {statusMessages.map(({ message, type }, i) => (
            <li key={i} className={type}>
              {message}
            </li>
          ))}
        </ul>
      )}
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <InputField
          field="Email"
          id="emailInput"
          type="email"
          value={email}
          callBack={setEmail}
          inputStyle={input}
          labelStyle={label}
        />
        {emailError && <div>{emailError}</div>}

        <InputField
          field="Password"
          id="passwordInput"
          type="password"
          value={password}
          callBack={setPassword}
          inputStyle={input}
          labelStyle={label}
        />
        {passwordError && <div>{passwordError}</div>}

        <button type="submit" className="bg-white bg-opacity-50 text-xl rounded-lg mt-1">
          <strong>Enter</strong>
        </button>
      </form>
    </>
  );
};

export default ProfileLoginForm;
