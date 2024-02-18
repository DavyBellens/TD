import ProfileLoginForm from "../profiles/ProfileLoginForm";
import { useRouter } from "next/router";
const Login: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center">
      <section className="w-min">
        <h1 className="text-center text-3xl p-2 m-5 mt-10">
          <strong>Login</strong>
        </h1>
        <ProfileLoginForm />
      </section>
      <p className="m-auto text-xl p-3">
        <strong>Or</strong>
      </p>
      <section>
        <button
          className="w-full text-xl bg-white bg-opacity-50 rounded-lg"
          onClick={() => router.push("login/create")}
        >
          <strong>Create Profile</strong>
        </button>
      </section>
    </div>
  );
};

export default Login;
