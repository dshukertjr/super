import Vote from "./vote";

export interface Question {
  id: number;
  question: string;
  choices: string[];
  createdAt: Date;
  votes: Vote[],
  user_id: string,
  user: {
    id: string;
    name: string;
  }
}
