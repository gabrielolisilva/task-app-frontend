import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IProject, IUser } from "../interfaces/interfaces";
import Header from "../pageComponents/Header";
import { projectSwal } from "../infra/utils/helpers";

const Team = () => {
  const [teamsUsers, setTeamsUsers] = useState<IUser[]>([]);
  const [teamsProjects, setTeamsProjects] = useState<IProject[]>([]);

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const { id } = useParams();

  useEffect(() => {
    const getTeamUsers = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/teams/users/${id}`
      );

      const { data } = result;
      setTeamsUsers(data);
    };

    const getTeamProjects = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/projects/team/${id}`
      );

      const { data } = result;
      setTeamsProjects(data);
    };

    getTeamUsers();
    getTeamProjects();
  }, []);

  const handleAddProject = () => {
    projectSwal
      .fire({
        title: "Adicionar projeto",
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
            team_id: id,
          };

          const result = await axios.post(
            `${import.meta.env.VITE_BACKENDURL}/projects`,
            dataToStore
          );

          if (result.status === 201) {
            projectSwal
              .fire({
                icon: "success",
                title: "Sucesso",
                text: "Projeto criado com sucesso",
                timer: 2000,
                showConfirmButton: false,
              })
              .then(() => location.reload());
          } else {
            projectSwal.fire({
              icon: "error",
              title: "Erro",
              text: "Erro ao criar projeto",
            });
          }
        }
      });
  };

  return (
    <div className="mx-8 xl:mx-auto max-w-[1100px]">
      <Header />
      <div className="mt-5 flex flex-col items-start gap-5 md:flex-row">
        <div className="w-full md:w-1/3">
          <h2 className="text-lg font-semibold">Integrantes</h2>
          <div className="mt-5">
            {teamsUsers.map((user) => (
              <p key={user.id}>
                {user.name} - {user.email}
              </p>
            ))}
          </div>
        </div>
        <div className="w-full md:w-4/5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Projetos</h2>
            <button
              className="px-4 py-2 bg-green-600 rounded-md text-xs text-white"
              onClick={handleAddProject}
            >
              Projeto +
            </button>
          </div>
          {teamsProjects.length > 0 && (
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
              {teamsProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white p-4 rounded-md shadow-md"
                >
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="mt-3">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
