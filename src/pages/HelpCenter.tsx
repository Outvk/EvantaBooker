
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HelpCenter() {
  const faqs = [
    {
      question: "How do I book an event?",
      answer: "Browse our events, select the one you want, choose your tickets, and complete the payment process. You'll receive a confirmation email with your booking details."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify your booking up to 24 hours before the event. Go to your dashboard to manage your bookings."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted."
    },
    {
      question: "How do I get my tickets?",
      answer: "After booking, you'll receive digital tickets via email. You can also access them from your dashboard. Show the QR code at the event entrance."
    },
    {
      question: "What if an event is cancelled?",
      answer: "If an event is cancelled, you'll be notified immediately and receive a full refund within 5-7 business days."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us at support@eventbooker.com or call us at +1 (555) 123-4567. We're available 24/7 to help you."
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Help Center</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions and get the help you need to make the most of EventBooker.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-lg border border-border p-8 mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-card-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium text-card-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="bg-card rounded-lg border border-border p-8">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Contact Support</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-card-foreground">Email</p>
                <p className="text-muted-foreground">support@eventbooker.com</p>
              </div>
              <div>
                <p className="font-medium text-card-foreground">Phone</p>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="font-medium text-card-foreground">Hours</p>
                <p className="text-muted-foreground">24/7 Support Available</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-8">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Getting Started</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-card-foreground">1. Browse Events</p>
                <p className="text-muted-foreground text-sm">Explore our wide selection of events</p>
              </div>
              <div>
                <p className="font-medium text-card-foreground">2. Create Account</p>
                <p className="text-muted-foreground text-sm">Sign up for faster booking</p>
              </div>
              <div>
                <p className="font-medium text-card-foreground">3. Book & Enjoy</p>
                <p className="text-muted-foreground text-sm">Complete your booking and attend</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
