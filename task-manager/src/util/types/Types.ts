// ----------------------------------------------------------------
// *** TYPESCRIPT ***

export interface UserType {
    _id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    __v: number;
}

export interface TaskType {
    _id: string;
    description: string;
    completed: boolean;
    __v: number;
}
