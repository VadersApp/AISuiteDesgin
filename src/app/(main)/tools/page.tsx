import { PageHeader } from "@/components/page-header";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ToolsPage() {
  const tools = PlaceHolderImages.filter(img => img.id.startsWith("tool-"));
  return (
    <>
      <PageHeader
        title="AI Tool Studios"
        description="AI-powered tools for content creation, image generation, and more."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map(tool => (
          <Card key={tool.id} className="group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-primary/20">
            <Link href="#">
              <div>
                <Image
                  src={tool.imageUrl}
                  alt={tool.description}
                  width={600}
                  height={400}
                  className="h-48 w-full object-cover"
                  data-ai-hint={tool.imageHint}
                />
                <div className="p-4">
                  <CardTitle className="text-lg">{tool.description}</CardTitle>
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Use Tool
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}
