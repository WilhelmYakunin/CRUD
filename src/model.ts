interface user {
  id: string;
  username: string;
  age: number;
  hobbies?: string[] | [];
}

interface state {
  users: user[] | any[];
  usersIDs: { count: number; ids: any };
  paths: string[];
}

const defaultState: state = {
  users: [],
  usersIDs: { count: 0, ids: [] },
  paths: [],
};

export default defaultState;
