import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export interface Task {
  id: string,
  title: string,
  description: string
}

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string()
});

export const contract = c.router({
  createTask: {
    method: 'POST',
    path: '/tasks',
    responses: {
      201: TaskSchema
    },
    body: z.object({
      title: z.string(),
      description: z.string()
    }),
  },
  getTasks: {
    method: 'GET',
    path: '/tasks',
    responses: {
      200: TaskSchema.array().nullable()
    },
    summary: 'Get all tasks',

  }
})
