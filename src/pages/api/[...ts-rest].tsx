
import { createNextRoute, createNextRouter } from "@ts-rest/next";
import { contract, Task } from "../contract";
import { tasksService } from "@/server/tasks";

const tasksRouter = createNextRoute(contract, {
  createTask: async (params) => {
    const task: Task = await tasksService.createTask(params.body);
    return {
      status: 201,
      body: task
    };
  },
  getTasks: async () => {
    const tasks: Task[] = await tasksService.getTasks();
    return {
      status: 200,
      body: tasks
    };
  }
})

export default createNextRouter(contract, tasksRouter);
