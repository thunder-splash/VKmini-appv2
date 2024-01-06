import React, {useState} from "react";
import {Button, Checkbox, Input, Layout, List, Modal, Row, Space} from "antd";
import styles from "./styles.module.scss";
import {useAtom} from "@reatom/npm-react";
import { Task } from "../../shared/api"

const TasksListPage = () => {

    const [taskListName, setTaskListName] = useState("Tasks List");
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [selectedTask, setSelectedTask] = useAtom<Task | null>(null);

    const handleChange = (task: Task) => {
        const updatedTasks = tasks.map((t) =>
            t.id === task.id ? {...t, completed: !t.completed} : t
        );
        setTasks(updatedTasks);
    };

    const handleAddTask = () => {
        const newTask: Task = {
            id: tasks.length + 1,
            name: newTaskName,
            title: newTaskTitle,
            completed: false,
            taskListId: 1,
        };
        setTasks([...tasks, newTask]);
        setNewTaskName("");
        setNewTaskTitle("");
        setOpen(false);
    };

    const handleDeleteTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
    };

    const handleTaskListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskListName(e.target.value);
    };

    return (
        <Layout className={styles.root}>
            <Layout className={styles.toolbar}>
                <Row justify="center">
                    <Space.Compact>
                        <Input value={taskListName} onChange={handleTaskListNameChange}></Input>
                        <Button
                            type="primary"
                            style={{height: "calc(100%)"}}
                            onClick={() => setOpen(true)}
                        >
                            Add Task
                        </Button>
                    </Space.Compact>
                </Row>
                <Row justify="center">
                    <List
                        itemLayout="horizontal"
                        dataSource={tasks}
                        renderItem={(task) => (
                            <List.Item>
                                <Space size={100}>
                                    <Checkbox
                                        checked={task.completed}
                                        onChange={() => handleChange(task)}
                                    >
                                    </Checkbox>
                                    <Space.Compact block>
                                        <Button onClick={() => handleTaskClick(task)}>{task.name}</Button>
                                        <Button type="primary" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
                                    </Space.Compact>
                                </Space>
                            </List.Item>
                        )}
                    />
                </Row>
            </Layout>
            <Modal
                title="Add new task"
                centered
                open={open}
                onOk={handleAddTask}
                onCancel={() => setOpen(false)}
                width={500}
            >
                <Space.Compact block direction="vertical" size="small">
                    <Input
                        placeholder="Task name"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                    ></Input>
                    <Input
                        placeholder="Task title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    ></Input>
                </Space.Compact>
            </Modal>
            <Modal
                title={selectedTask?.name || "No task selected"}
                centered
                open={!!selectedTask}
                onOk={() => setSelectedTask(null)}
                width={500}
                footer={[
                    <Button key="submit" type="primary" onClick={() => setSelectedTask(null)}>
                        OK
                    </Button>,
                ]}
            >
                <p>{selectedTask?.title}</p>
            </Modal>
        </Layout>
    );
};

export default TasksListPage;
