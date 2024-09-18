import { useUser } from "../context/UserProvider";

const Header = () => {
  const userData = useUser();

  return (
    <div className="flex justify-between items-center gap-5 bg-blue-200 rounded-b-2xl px-8 py-4 shadow-md">
      <h2>Logo</h2>
      <div className="flex items-center gap-5">
        <p>{userData?.name ?? "Erro nome"}</p>
        <button>Sair</button>
      </div>
    </div>
  );
};

export default Header;
