// ----------------------------------------------------------------
// *** TYPESCRIPT ***

export interface UserType {
    _id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    __v: number;
    tokens: any;
    avatar: Buffer | undefined;
    tasks?: TaskType[];
    save?: () => Promise<UserType>;
    remove?: () => Promise<void>;
    populate?: (
        arg0:
            | {
                  path: string;
                  select?: string;
                  match?: {
                      [key: string]: any;
                  };
                  options?: {
                      [key: string]: any;
                  };
              }
            | string
    ) => Promise<UserType> & {
        execPopulate: () => Promise<UserType>;
    };
}
//   populate?: ({
//         path: string,
//         select?: string,
//         match?: any,
//         options?: any}
//     ) => Promise<UserType> & {
//         execPopulate: () => Promise<UserType>;
//     };
export interface TaskType {
    _id: string;
    description: string;
    completed: boolean;
    __v: number;
}

// type custom = keyof UserType;

export interface ReqUserType {
    user: UserType;
    token: string | undefined;
}
