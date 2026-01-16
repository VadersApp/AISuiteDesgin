import { PageHeader } from "@/components/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by going to the settings page and clicking on 'Change Password'. Follow the on-screen instructions from there.",
  },
  {
    question: "What is the AI Assistant?",
    answer: "The AI Assistant is a powerful tool that can help you with a variety of tasks, from answering questions to automating workflows. You can interact with it through the chat interface.",
  },
  {
    question: "How is my data used?",
    answer: "We take data privacy very seriously. Your data is used to improve our services and provide you with a personalized experience. We do not sell your data to third parties. Please refer to our privacy policy for more details.",
  },
  {
    question: "Can I integrate my own tools?",
    answer: "Yes, we offer an API and webhooks for integrating custom tools and services. You can find the documentation in the developer section of your account.",
  },
  {
    question: "How do I contact support?",
    answer: "If you need assistance, you can contact our support team via the 'Support' link in your account dropdown menu or by emailing support@aisuite.com. We're available 24/7 to help.",
  },
];

export default function KnowledgeBasePage() {
  return (
    <>
      <PageHeader
        title="Knowledge Base"
        description="Find quick answers to common questions."
      />
      <div className="mx-auto max-w-3xl">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search articles..." className="pl-10" />
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left text-base">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
