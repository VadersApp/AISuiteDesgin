import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Plus } from "lucide-react";

const departments = [
  {
    name: "Marketing",
    manager: "Alice Johnson",
    agents: 5,
    status: "Active",
  },
  {
    name: "Sales",
    manager: "Bob Williams",
    agents: 8,
    status: "Active",
  },
  {
    name: "Engineering",
    manager: "Charlie Brown",
    agents: 12,
    status: "Active",
  },
  {
    name: "Customer Support",
    manager: "Diana Miller",
    agents: 10,
    status: "Warning",
  },
  {
    name: "Human Resources",
    manager: "Eve Davis",
    agents: 3,
    status: "Active",
  },
];

export default function DepartmentsPage() {
  return (
    <>
      <PageHeader
        title="Department Management"
        description="Manage departments and assign AI agents."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Department
        </Button>
      </PageHeader>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead className="text-center">Agents</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((dept) => (
              <TableRow key={dept.name}>
                <TableCell className="font-medium">{dept.name}</TableCell>
                <TableCell>{dept.manager}</TableCell>
                <TableCell className="text-center">{dept.agents}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={dept.status === "Active" ? "secondary" : "destructive"}
                    className={dept.status === "Active" ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"}
                  >
                    {dept.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
