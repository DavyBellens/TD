import { useTranslation } from "next-i18next";
import ProfileCreateForm from "./profiles/ProfileCreateForm";
import ProfileLoginForm from "./profiles/ProfileLoginForm";

const Login: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="m-10 mt-0">
        <h1 className="text-center text-xl">{t("login.message")}</h1>
        <ProfileLoginForm />
      </section>
      <section className="m-10 mt-0">
        <h1>{t("login.profile.message")}</h1>
        <ProfileCreateForm />
      </section>
    </>
  );
};

export default Login;
