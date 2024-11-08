export interface Form {
  id: number;
  habit: string;
  time: string;
  duration: string;
  periodicity: string;
  status: boolean;
  [key: string]: any;
}

export interface TemplatesProfession {
  Artist: string;
  Musician: string;
  Runner: string;
  Fitnes: string;
  Medical: string;
}
