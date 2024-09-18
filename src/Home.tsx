import { useEffect, useRef, useState } from "react";
import { useUser } from "./context/UserProvider";
import { projectSwal } from "./infra/utils/helpers";
import axios from "axios";
import { ITeam } from "./interfaces/interfaces";
import Header from "./pageComponents/Header";

const Home = () => {
  const [teamsData, setTeamsData] = useState<ITeam[]>([]);
  const userData = useUser();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const getTeams = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/teams`
      );

      const { data } = result;
      setTeamsData(data);
    };

    getTeams();
  }, []);

  const handleAddTeam = () => {
    projectSwal
      .fire({
        title: "Adicionar time",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Adicionar",
        reverseButtons: true,
        html: (
          <div>
            <div className="flex flex-col items-start">
              <label htmlFor="name" className="mb-1">
                Nome:
              </label>
              <input
                type="text"
                id="name"
                className="input-text w-full"
                ref={nameRef}
              />
            </div>
            <div className="mt-2 flex flex-col items-start">
              <label htmlFor="description" className="mb-1">
                Descrição:
              </label>
              <textarea
                id="description"
                className="input-text w-full"
                ref={descriptionRef}
              />
            </div>
          </div>
        ),
      })
      .then(async (res) => {
        if (res.isConfirmed) {
          const nameValue = nameRef.current?.value;
          const descriptionValue = descriptionRef.current?.value;

          if (!nameValue || !descriptionValue) {
            projectSwal.fire({
              icon: "error",
              title: "Erro",
              text: "Preencha todos os campos",
            });
            return;
          }

          const dataToStore = {
            name: nameValue,
            description: descriptionValue,
          };

          const result = await axios.post(
            `${import.meta.env.VITE_BACKENDURL}/teams`,
            dataToStore
          );

          if (result.status === 201) {
            projectSwal
              .fire({
                icon: "success",
                title: "Sucesso",
                text: "Time criado com sucesso",
                timer: 2000,
                showConfirmButton: false,
              })
              .then(() => location.reload());
          } else {
            projectSwal.fire({
              icon: "error",
              title: "Erro",
              text: "Erro ao criar time",
            });
          }
        }
      });
  };

  const handleEnterTeam = async (teamId: string) => {
    const dataToStore = {
      user_id: userData?.id,
      team_id: teamId,
    };

    const result = await axios.post(
      `${import.meta.env.VITE_BACKENDURL}/users/join/team`,
      dataToStore
    );

    if (result.status === 201) {
      projectSwal
        .fire({
          icon: "success",
          title: "Sucesso",
          text: "Entrou no time com sucesso",
          timer: 2000,
          showConfirmButton: false,
        })
        .then(() => location.reload());
    } else {
      projectSwal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao entrar no time",
      });
    }
  };

  return (
    <div className="mx-8 xl:mx-auto max-w-[1100px]">
      <Header />
      <div className="mt-5">
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-green-600 rounded-md text-sm text-white"
            onClick={handleAddTeam}
          >
            Criar time
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamsData.map((team) => (
          <a
            key={team.id}
            className="relative bg-white p-4 rounded-md shadow-md"
            href={`/team/${team.id}`}
          >
            <h3 className="text-lg font-semibold">{team.name}</h3>
            <p className="mt-3">{team.description}</p>
            {!userData?.teamId && (
              <button
                className="absolute bottom-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full"
                title="Ingressar no grupo"
                onClick={() => handleEnterTeam(team.id)}
              >
                +
              </button>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Home;
