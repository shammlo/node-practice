// ----------------------------------------------------------------
// *** TYPESCRIPT ***

export interface Users {
    _id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    __v: number;
}

export interface Tasks {
    _id: string;
    description: string;
    completed: boolean;
    __v: number;
}
