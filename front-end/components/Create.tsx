import ProfileCreateForm from "./profiles/ProfileCreateForm";

const Create: React.FC = () => {
  return (
    <div className="flex flex-col justify-center">
      <section className="w-min">
        <ProfileCreateForm />
      </section>
    </div>
  );
};

export default Create;
