'use client'
import { useEffect, useState } from "react";
import { initClient } from "@ts-rest/core";
import { contract, Task } from "./contract";

export const client = initClient(contract, {
  baseUrl: 'http://localhost:3000/api',
  baseHeaders: {
    'x-app-source': 'ts-rest',
  }
});

export default function Home() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const createTask = async () => {
    const { body, status } = await client.createTask({
      body: {
        title: taskTitle,
        description: taskDescription
      }
    });

    if (status === 201 && body !== null) {
      tasks !== null
        ? setTasks([...tasks, body])
        : setTasks([body])

      setTaskTitle("");
      setTaskDescription("");
    }
  }

  useEffect(() => {
    const getTasks = async () => {
      const { body, status } = await client.getTasks();
      if (status === 200 && body !== null) {
        setTasks(body)
      }
    }
    getTasks();
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 gap-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-600"> ts-rest </h1>
      <form className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
        <h1 className="text-2xl font-bold mb-8 text-gray-600 text-center"> Add task </h1>
          <label className="block text-gray-700 text-sm font-bold mb-2"> Task Title
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2"> Description
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              aria-multiline={true}
              placeholder="Enter task description"
            />
          </label>
        </div>
        <div>
          <button
            type="button"
            onClick={async () => await createTask()}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Create Task
          </button>
        </div>
      </form>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Tasks</h1>
        <div className="space-y-4">
          {
            tasks ? (
              tasks.map((task) => (
                <div key={task.id} className="flex justify-between items-center p-4 gap-auto bg-gray-100 rounded-lg shadow-sm">
                  <p className="font-bold text-gray-800">{task.title}</p>
                  <p className="text-gray-600">{task.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Add a task to begin</p>
            )
          }
        </div>
      </div>
    </div>
  );
}
