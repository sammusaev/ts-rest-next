import { Task } from "@/pages/contract";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const tasksService = {
  createTask: async (data: { title: string, description: string }): Promise<Task> => {
    const newTask = await prisma.task.create({ data });
    return newTask as unknown as Task;
  },
  getTasks: async (): Promise<Task[]> => {
    const tasks = await prisma.task.findMany();
    return tasks as unknown as Task[];
  }
}
