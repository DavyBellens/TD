import ProfileService from "@/services/ProfileService";
import { StatusMessage } from "@/types";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

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

      if (res.status === 401) {
        const { errorMessage } = await res.json();
        setStatusMessages([{ message: errorMessage, type: "error" }]);
        return;
      }

      if (res.status === 400) {
        setPasswordError("Incorrect password");
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

      const user = await res.json();
      console.log(user);

      sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          id: user.profile.id,
          username: user.profile.username,
          email: user.profile.email,
          role: user.profile.role,
        })
      );
      sessionStorage.setItem("token", JSON.stringify({ value: user.token.value }));

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
        <label htmlFor="emailInput" className="mb-1 text-xl">
          <strong>Email</strong>
        </label>
        <input
          id="emailInput"
          type="email"
          value={email}
          className="mb-1 bg-white bg-opacity-75 text-black p-1 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div>{emailError}</div>}

        <label htmlFor="passwordInput" className="mb-1 text-xl">
          <strong>Password</strong>
        </label>
        <input
          id="passwordInput"
          type="password"
          className="mb-1 bg-white bg-opacity-75 text-black p-1 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
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
