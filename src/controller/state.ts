export interface state {
  users: any[];
  usersIDs: { count: number; ids: string[] };
  paths: string[];
}

const defaultState: state = {
  users: [],
  usersIDs: { count: 0, ids: [] },
  paths: [],
};

export default defaultState;
