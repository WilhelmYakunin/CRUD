import { v4 } from 'uuid';

interface user {
  id: typeof v4;
  username: string;
  age: number;
  hobbies: string[] | [];
}
