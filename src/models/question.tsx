import Vote from "./vote";

export interface Question {
  id: number;
  question: string;
  choices: string[];
  createdAt: Date;
  votes: Vote[],
  userId: string,
  user: {
    id: string;
    name: string;
  }
}
