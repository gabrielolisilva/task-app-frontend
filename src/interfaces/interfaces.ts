export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  teamId: string;
}

export interface ITeam {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  team_id: string;
  createdAt: string;
  updatedAt: string;
}
