export type TaskStatus = "active" | "done";

export type Task = {
  id: string;
  title: string;
  dueDate: string; // ISO string
  status: TaskStatus;
};

// In-memory mock repository (replace with real API later)
const tasksData: Task[] = [
  { id: "t1", title: "Prepare weekly report", dueDate: new Date().toISOString(), status: "active" },
  { id: "t2", title: "Design review", dueDate: new Date().toISOString(), status: "active" },
  { id: "t3", title: "Fix login bug", dueDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString(), status: "active" },
  { id: "t5", title: "Complete billing integration", dueDate: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), status: "active" },
  { id: "t4", title: "Refactor profile form", dueDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), status: "done" },
];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isBeforeToday(date: Date) {
  const today = new Date();
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return d.getTime() < t.getTime();
}

export function getAllTasks(): Task[] {
  return tasksData.slice();
}

export function getActiveTasks(tasks: Task[] = tasksData): Task[] {
  return tasks.filter((t) => t.status === "active");
}

export function getTasksDueToday(tasks: Task[] = tasksData): Task[] {
  const today = new Date();
  return tasks.filter((t) => isSameDay(new Date(t.dueDate), today));
}

export function getOverdueActiveTasks(tasks: Task[] = tasksData): Task[] {
  const today = new Date();
  return tasks.filter((t) => t.status === "active" && isBeforeToday(new Date(t.dueDate)) && !isSameDay(new Date(t.dueDate), today));
}

export function getCounts() {
  const all = getAllTasks();
  const active = getActiveTasks(all);
  const dueToday = getTasksDueToday(active);
  const overdue = getOverdueActiveTasks(active);
  return {
    totalActive: active.length,
    dueToday: dueToday.length,
    riskOverdue: overdue.length,
  };
}

export function getTasks(filters?: { status?: TaskStatus; due?: "today" | "any" | "overdue" }) {
  let list = getAllTasks();
  if (filters?.status) {
    list = list.filter((t) => t.status === filters.status);
  }
  if (filters?.due === "today") {
    list = list.filter((t) => isSameDay(new Date(t.dueDate), new Date()));
  }
  if (filters?.due === "overdue") {
    list = list.filter((t) => isBeforeToday(new Date(t.dueDate)) && t.status === "active" && !isSameDay(new Date(t.dueDate), new Date()));
  }
  return list;
}