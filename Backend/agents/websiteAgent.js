import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

// Example website task tools
const tools = [
  {
    name: "navigate",
    description: "Navigate user to a section of the website",
    func: async (section) => `Navigating to ${section}...`,
  },
  {
    name: "book_tickets",
    description: "Book tickets for user",
    func: async () => "✅ Tickets booked successfully.",
  },
  {
    name: "payment_gateway",
    description: "Redirect to payment gateway",
    func: async () => "💳 Redirected to payment gateway.",
  },
];

// Gemini model with direct API key
const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: "AIzaSyC0i8Faagb21BUADwZ16ZXJlQxPQ7xIDsU",
});

export async function langchainAgent(task) {
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "chat-zero-shot-react-description",
    verbose: true,
  });

  const result = await executor.call({ input: task });
  return result.output;
}
