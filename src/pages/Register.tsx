import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nameValue = formData.get("name");
    const lastNameValue = formData.get("lastName");
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");

    const isValidEmail = validateEmail(emailValue as string);

    if (!isValidEmail) {
      toast.error("Email inválido", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const dataToRegister = {
      name: nameValue,
      lastName: lastNameValue,
      email: emailValue,
      password: passwordValue,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/users`,
        dataToRegister
      );

      toast.success("Registrado com sucesso", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => (location.href = "/login"),
      });
    } catch (error) {
      toast.error("Erro ao registrar-se", {
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

  // Validate if is an valid email
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col gap-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-h-fit w-2/3 max-w-[400px]">
      <h2 className="text-center text-xl font-semibold">Registrar-se</h2>
      <form className="flex flex-col gap-5" onSubmit={handleRegister}>
        <div>
          <div className="mb-2 flex flex-col justify-start items-start sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="name" className="min-w-20">
              Nome:
            </label>
            <input
              type="name"
              id="name"
              name="name"
              className="input-text w-full"
              required
            />
          </div>
          <div className="mb-2 flex flex-col justify-start items-start sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="lastName" className="min-w-20">
              Sobrenome:
            </label>
            <input
              type="lastName"
              id="lastName"
              name="lastName"
              className="input-text w-full"
              required
            />
          </div>
          <div className="mb-2 flex flex-col justify-start items-start sm:flex-row sm:items-center sm:gap-5">
            <label htmlFor="email" className="min-w-20">
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
            <label htmlFor="password" className="min-w-20">
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
          Já possui uma conta?{" "}
          <a href="/login" className="text-black hover:underline">
            Entrar
          </a>
        </p>
        <button type="submit" className="button-primary w-full">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Register;
