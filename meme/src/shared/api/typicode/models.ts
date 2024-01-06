export type Task = {
    id: number;
    name: string;
    title: string
    completed: boolean;
    taskListId: number;
};

export type User = {
    id: number;
    name: string;
    vkId: number;
}

export type TaskList = {
    id: number;
    name: string;
    title: string;
    userId: number;
};