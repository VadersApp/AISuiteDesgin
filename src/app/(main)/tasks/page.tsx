import { suggestTasks } from "@/ai/flows/ai-suggested-tasks";
import { PageHeader } from "@/components/page-header";
import { TaskList } from "@/components/tasks/task-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function TasksPage() {
  // Hardcode input for demonstration purposes
  const { suggestedTasks } = await suggestTasks({
    userRole: "Project Manager",
    currentProjects: "Q3 Product Launch, Website Redesign",
  });

  return (
    <>
      <PageHeader
        title="AI Task Management"
        description="AI-suggested tasks to keep you on track."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </PageHeader>
      <div className="space-y-6">
        <TaskList title="Suggested For You" tasks={suggestedTasks} />
        <TaskList title="Today" tasks={["Finalize Q3 marketing brief", "Review new landing page mockups", "Onboarding call with new designer"]} />
        <TaskList title="Upcoming" tasks={["Prepare for weekly sync", "Draft Q4 roadmap"]} />
      </div>
    </>
  );
}
