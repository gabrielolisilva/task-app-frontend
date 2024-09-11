const Login = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl px-4 py-8 flex flex-col justify-around absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-h-72 w-2/3 max-w-[400px]">
      <h2 className="text-center text-xl font-semibold">Login</h2>
      <form className="flex flex-col gap-5">
        <div>
          <div className="flex justify-start items-center gap-5">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input-text w-full"
              required
            />
          </div>
          <div className="flex justify-start items-center gap-5 mt-2">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input-text w-full"
              required
            />
          </div>
        </div>
        <button type="submit" className="button-primary w-full">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
