type Props = {
  callBack: Function;
};
const Logout: React.FC<Props> = ({ callBack }: Props) => {
  return (
    <section className="m-10 mt-0 text-center">
      <form
        className="flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          sessionStorage.removeItem("loggedInUser");
          sessionStorage.removeItem("token");
          callBack(null);
        }}
      >
        <button
          type="submit"
          className="text-center bg-white bg-opacity-50 rounded-xl p-1 m-14 text-xl flex items-center"
        >
          <span className="text-3xl">🚪</span>Leave
        </button>
      </form>
    </section>
  );
};

export default Logout;
