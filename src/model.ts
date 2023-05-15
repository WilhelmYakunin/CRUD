import { v4 } from 'uuid';

interface user {
  id: typeof v4;
  username: string;
  age: number;
  hobbies: string[] | [];
}

interface state {
  users: user[] | any[];
  usersIDs: { count: number; ids: string[] };
  paths: string[];
}

const defaultState: state = {
  users: [],
  usersIDs: { count: 0, ids: [] },
  paths: [],
};

export default defaultState;
