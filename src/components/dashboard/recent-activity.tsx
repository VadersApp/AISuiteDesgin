import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const activities = [
  {
    user: { name: "Olivia Martin", email: "olivia.martin@email.com", avatarId: "avatar-1" },
    action: "generated a new report",
    details: "Sales Q2 2024",
    time: "15 minutes ago",
  },
  {
    user: { name: "Jackson Lee", email: "jackson.lee@email.com", avatarId: "avatar-2" },
    action: "completed a task",
    details: "Draft marketing copy",
    time: "30 minutes ago",
  },
  {
    user: { name: "Admin", email: "admin@aisuite.com", avatarId: "" },
    action: "updated a department",
    details: "Engineering",
    time: "1 hour ago",
  },
  {
    user: { name: "Sofia Davis", email: "sofia.davis@email.com", avatarId: "avatar-3" },
    action: "chatted with AI Assistant",
    details: "Summarize weekly metrics",
    time: "2 hours ago",
  },
    {
    user: { name: "Admin", email: "admin@aisuite.com", avatarId: "" },
    action: "pushed a system update",
    details: "Version 2.1.3",
    time: "3 hours ago",
  },
];

export function RecentActivity() {
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            {activity.user.avatarId && (
              <AvatarImage src={getImage(activity.user.avatarId)?.imageUrl} alt="Avatar" data-ai-hint="person portrait" />
            )}
            <AvatarFallback>
              {activity.user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
              <span className="font-medium text-primary">{activity.details}</span>.
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
