"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaCopy, FaCheck } from "react-icons/fa";

interface PageConfig {
  title: string;
  description: string;
  fields: FormField[];
  template: string;
}

interface FormField {
  name: string;
  type: "dropdown" | "textbox" | "slider" | "checkbox" | "textarea";
  label: string;
  options?: string[];
  min?: number;
  max?: number;
}

const pageConfigs: Record<string, PageConfig> = {
  "content-creation": {
    title: "📝 Content Creation",
    description:
      "Generate various content like blogs and social media posts with customizable tone and style.",
    fields: [
      {
        name: "tone",
        type: "dropdown",
        label: "Tone Palette",
        options: [
          "authoritative",
          "conversational",
          "inspirational",
          "analytical",
          "empathetic",
          "provocative",
          "storytelling",
        ],
      },
      {
        name: "topic",
        type: "textbox",
        label: "Core Concept",
      },
      {
        name: "audience",
        type: "dropdown",
        label: "Audience Persona",
        options: [
          "absolute beginners",
          "curious learners",
          "industry professionals",
          "decision-makers",
          "technical experts",
          "skeptical readers",
          "global perspectives",
        ],
      },
      {
        name: "format",
        type: "dropdown",
        label: "Content Structure",
        options: [
          "listicle",
          "narrative",
          "problem-solution",
          "case study",
          "expert breakdown",
          "future-focused",
        ],
      },
    ],
    template: `Craft a captivating [format] piece with a [tone] approach on the topic "[topic]" designed to resonate with [audience], beginning with an engaging hook to immediately draw attention. Weave in 3-5 thought-provoking insights that challenge common assumptions, paired with practical, actionable takeaways that the audience can apply right away. Address any potential skepticism head-on and guide the reader towards understanding with clarity and authority, avoiding overwhelming technical jargon. Conclude with a compelling call-to-action or reflection that leaves the audience thinking deeply about the subject, blending data-driven insights with relatable, human storytelling for maximum impact.`,
  },
  "code-generation": {
    title: "🚀 Code Generation",
    description:
      "Create code snippets or complete programs in multiple languages for different tasks.",
    fields: [
      {
        name: "language",
        type: "dropdown",
        label: "Programming Language",
        options: [
          "Python",
          "JavaScript",
          "TypeScript",
          "Java",
          "Go",
          "Rust",
          "Swift",
          "C++",
          "Ruby",
          "PHP",
          "Kotlin",
          "Scala",
          "Dart",
        ],
      },
      {
        name: "task",
        type: "textarea",
        label: "Problem Domain",
      },
      {
        name: "complexity",
        type: "dropdown",
        label: "Solution Sophistication",
        options: [
          "rapid prototype",
          "production-ready",
          "enterprise-grade",
          "algorithmic breakthrough",
        ],
      },
      {
        name: "paradigm",
        type: "dropdown",
        label: "Design Philosophy",
        options: ["functional", "object-oriented", "reactive", "declarative"],
      },
    ],
    template: `Generate a [complexity] solution in [language] addressing [task], applying the [paradigm] programming paradigm. Structure the solution with a modular, testable architecture, integrating defensive programming techniques to ensure robustness. Optimize for performance, readability, and future extensibility, ensuring that the code is clean, self-documenting, and includes thorough error handling with graceful degradation. Add inline comments to clarify non-obvious implementation decisions, and identify potential performance bottlenecks along with optimization strategies. As a bonus challenge, design the solution to not only solve the current task but also consider potential future requirements and scalability, preparing the codebase for growth.`,
  },
  learning: {
    title: "📚 Learning & Summarization",
    description:
      "Get summaries and explanations on any topic for better understanding and faster learning.",
    fields: [
      {
        name: "topic",
        type: "textbox",
        label: "Intellectual Frontier",
      },
      {
        name: "depth",
        type: "dropdown",
        label: "Intellectual Approach",
        options: [
          "strategic overview",
          "academic deep-dive",
          "interdisciplinary connections",
          "future implications",
        ],
      },
      {
        name: "audience",
        type: "dropdown",
        label: "Cognitive Landscape",
        options: [
          "curious newcomers",
          "domain practitioners",
          "cross-disciplinary thinkers",
          "strategic leaders",
        ],
      },
    ],
    template: `Synthesize a profound [depth] exploration of "[topic]" calibrated for [audience], breaking down complex concepts into interconnected, easily digestible insights. Unveil counterintuitive perspectives and uncover hidden relationships, connecting theoretical frameworks with practical, real-world applications. Offer a meta-level understanding that transcends superficial information, incorporating historical context and future trajectories. Highlight pivotal moments, paradigm shifts, and breakthrough concepts, weaving a narrative that makes abstract ideas not only accessible but profoundly compelling and relevant to the audience.`,
  },
  brainstorming: {
    title: "💡 Brainstorming & Ideation",
    description:
      "Generate creative ideas and solutions for various projects, products, and problems.",
    fields: [
      {
        name: "problem",
        type: "textbox",
        label: "Challenge Landscape",
      },
      {
        name: "approach",
        type: "dropdown",
        label: "Innovation Spectrum",
        options: [
          "exponential thinking",
          "first-principles",
          "cross-industry fusion",
          "user-centric design",
          "systemic disruption",
          "emergent technology",
        ],
      },
      {
        name: "constraints",
        type: "dropdown",
        label: "Resource Context",
        options: [
          "minimal resources",
          "maximum scalability",
          "rapid iteration",
          "long-term transformation",
        ],
      },
    ],
    template: `Architect transformative solutions for "[problem]" using the [approach] methodology within the [constraints] framework, generating five solution archetypes that radically reframe the problem. Provide a spectrum of approaches, from incremental improvements to revolutionary shifts. Deconstruct conventional thinking patterns and map out potential cascading impacts and systemic implications of each solution. Include a speculative "future state" scenario that demonstrates the long-term potential of the solutions, evaluating each approach against feasibility, potential disruption, resource efficiency, and scalability. Through a breakthrough lens, go beyond traditional solutions to identify paradigm-shifting perspectives that fundamentally transform the approach to the challenge.`,
  },
  writing: {
    title: "✍️ Writing Assistance",
    description:
      "Get help with writing emails, resumes, articles, and creative pieces.",
    fields: [
      {
        name: "type",
        type: "dropdown",
        label: "Communication Modality",
        options: [
          "strategic proposal",
          "narrative report",
          "persuasive pitch",
          "thought leadership",
          "emotional storytelling",
          "technical white paper",
        ],
      },
      {
        name: "tone",
        type: "dropdown",
        label: "Psychological Approach",
        options: [
          "authoritative",
          "empathetic",
          "provocative",
          "collaborative",
          "visionary",
          "data-driven",
        ],
      },
      {
        name: "goal",
        type: "dropdown",
        label: "Cognitive Outcome",
        options: [
          "paradigm shift",
          "emotional resonance",
          "strategic alignment",
          "urgent action",
          "deep understanding",
        ],
      },
      {
        name: "audience",
        type: "dropdown",
        label: "Psychological Persona",
        options: [
          "analytical decision-makers",
          "emotional influencers",
          "skeptical experts",
          "visionary leaders",
        ],
      },
    ],
    template: `Transform communication into a [type] masterpiece with [tone] precision, targeting [audience] to achieve [goal] by constructing a multi-layered communication strategy that integrates both rational and emotional persuasion techniques. Create a seamless narrative flow that anticipates and overcomes audience resistance, starting with a pattern-interrupting hook to immediately capture attention. Build credibility through strategic storytelling, using cognitive triggers to bypass typical defense mechanisms, and embedding subtle yet powerful psychological nudges throughout. Conclude with a transformative call-to-action that compels the audience to act. Craft each sentence to inform, engage, and subtly influence the specific psychological profile of the target audience, ensuring that the message resonates deeply and drives meaningful action.`,
  },
  debugging: {
    title: "🐛 Debugging & Optimization",
    description:
      "Analyze and optimize code, finding and fixing bugs to improve performance.",
    fields: [
      {
        name: "language",
        type: "dropdown",
        label: "Programming Language",
        options: [
          "Python",
          "JavaScript",
          "TypeScript",
          "Java",
          "Go",
          "Rust",
          "Swift",
          "C++",
          "Ruby",
          "PHP",
          "Kotlin",
          "Scala",
          "Dart",
        ],
      },
      {
        name: "focus",
        type: "dropdown",
        label: "Optimization Dimension",
        options: [
          "algorithmic efficiency",
          "system resilience",
          "architectural refactoring",
          "cognitive readability",
          "performance scaling",
        ],
      },
      {
        name: "complexity",
        type: "dropdown",
        label: "Intervention Level",
        options: [
          "surgical precision",
          "systemic redesign",
          "incremental improvement",
        ],
      },
    ],
    template: `Perform a comprehensive [complexity] optimization for code, focusing on [focus] within the [language] ecosystem by conducting a multi-dimensional code health assessment that goes beyond surface-level issues to uncover underlying architectural limitations. Propose solutions that not only address immediate concerns but also lay the foundation for long-term improvement. Deconstruct the current implementation’s architectural patterns, highlighting potential failure modes and performance bottlenecks, and provide a staged refactoring roadmap. Offer alternative implementation strategies, including performance benchmarks and comparative analysis to demonstrate improvements. Transform the code from a mere functional solution into an elegantly efficient, future-ready system, anticipating scaling challenges and optimizing for future extensibility.`,
  },
};

export default function DynamicPromptPage() {
  const params = useParams();
  const category = params.category as string;
  const pageConfig = pageConfigs[category];

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  if (!pageConfig) {
    return (
      <div className="flex items-center justify-center text-center">
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-2xl font-bold mb-4">Page not found</h1>
          <Link href="/" className="btn btn-primary rounded-2xl text-base">
            <span className="mr-2">←</span> Return Home
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(generatedPrompt)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const generatePrompt = () => {
    let prompt = pageConfig.template;
    Object.entries(formData).forEach(([key, value]) => {
      prompt = prompt.replace(`[${key}]`, value as string);
    });
    setGeneratedPrompt(prompt);
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "dropdown":
        return (
          <select
            className="select select-bordered w-full"
            defaultValue=""
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          >
            <option value="" disabled>
              Select {field.label}
            </option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "textbox":
        return (
          <input
            type="text"
            placeholder={`Enter ${field.label}`}
            className="input input-bordered w-full"
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );
      case "textarea":
        return (
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder={`Enter ${field.label}`}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <Link href="/" className="btn btn-ghost mb-4 rounded-2xl text-base">
        ← Back
      </Link>

      <div className="card bg-zinc-800 shadow-2xl rounded-3xl">
        <div className="card-body">
          <h2 className="card-title text-4xl">{pageConfig.title}</h2>
          <p className="text-lg text-base-content/70 mb-4">
            {pageConfig.description}
          </p>

          <form>
            {pageConfig.fields.map((field) => (
              <div key={field.name} className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text text-base">{field.label}</span>
                </label>
                {renderField(field)}
              </div>
            ))}

            <div className="card-actions justify-end mt-8">
              <button
                type="button"
                className="btn btn-primary text-base rounded-2xl"
                onClick={generatePrompt}
              >
                Generate Prompt
              </button>
            </div>
          </form>

          {generatedPrompt && (
            <div className="mt-6 p-4 bg-base-200 rounded-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl mb-2">Generated Prompt</h3>
                <button
                  onClick={handleCopy}
                  className={
                    "rounded-xl text-sm font-bold bg-neutral px-4 py-2"
                  }
                >
                  {copied ? (
                    <FaCheck className="text-success" /> // Tick icon when copied
                  ) : (
                    <FaCopy className="text-secondary" /> // Copy icon before copied
                  )}
                </button>
              </div>
              <pre className="text-base whitespace-pre-wrap transition duration-300 ease-in-out text-base-content/80 mt-2">
                {generatedPrompt}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
