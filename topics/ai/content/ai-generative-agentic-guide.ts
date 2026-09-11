import type { ArticleSection } from "@/lib/articles";

export const aiGenerativeAgenticSections: ArticleSection[] = [
  {
    id: "compare-the-levels",
    heading: "Four levels, one important difference",
    paragraphs: [
      "Each level adds a capability around the language model—but more capability is not always the better choice.",
    ],
    blocks: [
      {
        type: "table",
        caption: "The four AI system levels at a glance",
        columns: ["Level", "What it can do", "Best for", "What it still lacks"],
        rows: [
          ["Generative AI", "Generate", "Drafting and brainstorming", "Private context, persistent memory, actions"],
          ["RAG-based AI", "Generate + retrieve", "Answers grounded in trusted knowledge", "Initiative, persistent memory, actions"],
          ["Tool-augmented AI", "Generate + retrieve + act", "Completing user-requested tasks", "Independent goals and adaptation by default"],
          ["Agentic AI", "Plan + act + observe + adapt", "Open-ended, multi-step outcomes", "Simple operation and predictable risk"],
        ],
      },
      {
        type: "callout",
        title: "The shortest mental model",
        text: "A model writes. RAG looks things up. Tools let it do things. An agent decides what to do next.",
      },
    ],
  },
  {
    id: "generative-ai",
    heading: "01 · Simple generative AI",
    paragraphs: [
      "A person sends a prompt to a language model and receives generated content.",
    ],
    blocks: [
      {
        type: "bullets",
        items: [
          { label: "Concept", text: "A base language model generates text from the prompt it receives." },
          { label: "Best for", text: "Job descriptions, emails, summaries, rewrites, outlines, and brainstorming." },
          { label: "Business context", text: "It does not automatically know your current policies, customers, or internal terminology." },
          { label: "Behavior", text: "Reactive—it waits for a person to prompt it." },
          { label: "Memory", text: "Stateless by default. A chat app must send earlier messages back to the model." },
          { label: "Actions", text: "It can suggest an action, but it cannot carry one out." },
        ],
      },
      { type: "callout", title: "The flow", text: "Prompt → model → generated answer" },
    ],
  },
  {
    id: "rag-ai",
    heading: "02 · RAG-based AI",
    paragraphs: [
      "RAG adds relevant information from an approved knowledge base before the model answers.",
    ],
    blocks: [
      {
        type: "bullets",
        items: [
          { label: "Concept", text: "The system retrieves useful documents and gives them to the model as context." },
          { label: "Best for", text: "Company policies, internal help desks, product support, and changing documentation." },
          { label: "Business context", text: "Answers can use trusted company knowledge instead of only general training." },
          { label: "Behavior", text: "Still reactive—it retrieves information only after receiving a question." },
          { label: "Memory", text: "RAG is not memory. It searches again for each request." },
          { label: "Actions", text: "It normally answers questions but does not change anything in another system." },
          { label: "Watch out", text: "Weak documents or poor retrieval can still produce weak answers." },
        ],
      },
      { type: "callout", title: "The flow", text: "Question → retrieve relevant sources → model answers with context" },
    ],
  },
  {
    id: "tool-ai",
    heading: "03 · Tool-augmented AI",
    paragraphs: [
      "Tools let the model perform a requested action through an approved function or API.",
    ],
    blocks: [
      {
        type: "bullets",
        items: [
          { label: "Concept", text: "The model can select an allowed tool, supply inputs, and inspect the result." },
          { label: "Best for", text: "Checking calendars, creating tickets, updating records, or preparing emails." },
          { label: "Key capability", text: "It can do something, not only explain what a person should do." },
          { label: "Behavior", text: "Usually reactive—the user requests an action and the system performs it." },
          { label: "Memory", text: "Long-term memory is optional and must be added separately." },
          { label: "Improvement", text: "It does not automatically learn from previous runs." },
          { label: "Safety", text: "Permissions, validation, confirmations, and clear failures become essential." },
        ],
      },
      { type: "callout", title: "The flow", text: "Request → model selects an allowed tool → tool returns a result → model responds" },
    ],
  },
  {
    id: "agentic-ai",
    heading: "04 · Agentic AI",
    paragraphs: [
      "An agent works toward a goal by choosing actions, checking results, and adapting its next step.",
    ],
    blocks: [
      {
        type: "bullets",
        items: [
          { label: "Concept", text: "The model, knowledge, and tools operate inside a repeatable feedback loop." },
          { label: "Best for", text: "Open-ended research, investigation, and work whose path changes along the way." },
          { label: "Behavior", text: "Proactive within its goal—it decides what to do next with less prompting." },
          { label: "Adaptation", text: "It can revise its plan after a failed action or unexpected result." },
          { label: "Learning", text: "Adapting during one task is not permanent learning across future tasks." },
          { label: "Complexity", text: "More possible paths create more costs and failure modes." },
          { label: "Safety", text: "It needs limited permissions, stopping rules, monitoring, recovery, and human approval for important actions." },
        ],
      },
      { type: "callout", title: "The loop", text: "Goal → plan → act → observe → adapt → repeat or stop" },
    ],
  },
  {
    id: "choose-the-level",
    heading: "Choose the minimum capability that completes the job",
    paragraphs: [
      "Start with the outcome, then add only the capabilities the work actually needs.",
    ],
    blocks: [
      {
        type: "table",
        caption: "A practical way to choose",
        columns: ["If the job needs…", "Start with…"],
        rows: [
          ["A draft from general knowledge", "Generative AI"],
          ["An answer based on trusted documents", "RAG-based AI"],
          ["A specific action after a user request", "Tool-augmented AI"],
          ["Judgment about changing next steps", "Agentic AI"],
        ],
      },
      {
        type: "quiz",
        question: "A company has a fixed five-step onboarding process. Every case follows the same rules. Does it need an AI agent?",
        answers: [
          { text: "Yes—multiple steps always require an agent.", correct: false, explanation: "Multiple steps are not enough. If the path is fixed, a normal workflow is more predictable and easier to test." },
          { text: "No—a normal workflow is the better starting point.", correct: true, explanation: "Use an agent when the system must choose or revise the path. Known steps are usually better handled by ordinary automation." },
          { text: "Yes—but only if the agent also has RAG.", correct: false, explanation: "RAG adds relevant knowledge; it does not make a fixed process benefit from autonomous planning." },
        ],
      },
    ],
  },
  {
    id: "recap",
    heading: "The whole idea, in four lines",
    paragraphs: [
      "The difference is what the system can know, do, and decide after the first response.",
    ],
    blocks: [
      {
        type: "bullets",
        items: [
          { label: "Generate", text: "Generative AI creates content from a prompt." },
          { label: "Retrieve", text: "RAG grounds that content in trusted knowledge." },
          { label: "Act", text: "Tools let the system take actions in other software." },
          { label: "Adapt", text: "Agentic AI repeatedly chooses and adjusts actions toward a goal." },
        ],
      },
    ],
  },
];
