const AuthError: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="p-5 m-auto text-center">Please login or create an account before continuing</p>
      <a href="/login" className="bg-white bg-opacity-50 p-2 rounded-xl font-bold text-center">
        Sign in/up
      </a>
    </div>
  );
};
export default AuthError;
