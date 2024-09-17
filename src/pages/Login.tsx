import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");

    const dataToLogin = {
      email: emailValue,
      password: passwordValue,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/auth/login`,
        dataToLogin,
        { withCredentials: true }
      );

      location.href = "/";
    } catch (error) {
      toast.error("Erro ao realizar login", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col gap-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-h-fit w-2/3 max-w-[400px]">
      <h2 className="text-center text-xl font-semibold">Login</h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div>
          <div className="flex flex-col justify-start items-start sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="email" className="min-w-12">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input-text w-full"
              required
            />
          </div>
          <div className="flex flex-col justify-start items-start mt-2 sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="password" className="min-w-12">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input-text w-full"
              required
            />
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 font-semibold sm:text-right">
          Ainda não possui uma conta?{" "}
          <a href="/register" className="text-black hover:underline">
            Registre-se
          </a>
        </p>
        <button type="submit" className="button-primary w-full">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
