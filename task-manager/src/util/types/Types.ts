// ----------------------------------------------------------------
// *** TYPESCRIPT ***

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    __v: number;
}

export interface Task {
    _id: string;
    description: string;
    completed: boolean;
    __v: number;
}
