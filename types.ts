export type Questions = { text: string; answers: { text: string; correct: boolean; }[] }[]
export type Answers = { questionIndex: number; letterIndex: number; }[]
export type TestFormat = {
  questions: Questions;
  text: string;
}
export type Completion = {
  id: string; 
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    logpropbs: null | number;
    finish_reason: string;
  }[],
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  }
}
