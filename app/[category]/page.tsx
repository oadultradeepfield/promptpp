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
      "Create blogs, social posts, and more with custom tone and style.",
    fields: [
      {
        name: "tone",
        type: "dropdown",
        label: "Tone",
        options: [
          "authoritative",
          "conversational",
          "inspirational",
          "analytical",
          "empathetic",
          "storytelling",
        ],
      },
      {
        name: "topic",
        type: "textbox",
        label: "Topic",
      },
      {
        name: "audience",
        type: "dropdown",
        label: "Audience",
        options: [
          "beginners",
          "curious learners",
          "professionals",
          "decision-makers",
          "experts",
          "skeptical readers",
        ],
      },
      {
        name: "format",
        type: "dropdown",
        label: "Format",
        options: [
          "listicle",
          "narrative",
          "problem-solution",
          "case study",
          "expert breakdown",
        ],
      },
    ],
    template: `Create a [format] piece with a [tone] tone about "[topic]" for [audience]. Begin with a strong hook, provide clear insights or tips, and end with a takeaway or call-to-action.\n\n[PASTE YOUR TEXT HERE]`,
  },
  "code-generation": {
    title: "🚀 Code Generation",
    description: "Generate code in any language for various tasks.",
    fields: [
      {
        name: "language",
        type: "dropdown",
        label: "Language",
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
        label: "Task",
      },
      {
        name: "complexity",
        type: "dropdown",
        label: "Complexity",
        options: ["prototype", "production-ready", "enterprise-grade"],
      },
      {
        name: "paradigm",
        type: "dropdown",
        label: "Paradigm",
        options: ["functional", "object-oriented", "reactive"],
      },
    ],
    template: `Write a [complexity] [language] solution for [task] using the [paradigm] paradigm. Ensure the code is clean, modular, and handles errors properly.\n\n[PASTE YOUR TEXT HERE]`,
  },
  writing: {
    title: "✍️ Writing Assistance",
    description: "Get help with emails, resumes, and creative writing.",
    fields: [
      {
        name: "type",
        type: "dropdown",
        label: "Type",
        options: ["email", "resume", "article", "story"],
      },
      {
        name: "tone",
        type: "dropdown",
        label: "Tone",
        options: ["formal", "friendly", "persuasive"],
      },
      {
        name: "goal",
        type: "dropdown",
        label: "Goal",
        options: ["inform", "persuade", "inspire"],
      },
    ],
    template: `Write a [type] with a [tone] tone to [goal]. Keep the message clear, concise, and engaging.\n\n[PASTE YOUR TEXT HERE]`,
  },
  learning: {
    title: "📚 Learning & Summarization",
    description: "Summarize or explain topics for quick understanding.",
    fields: [
      {
        name: "topic",
        type: "textbox",
        label: "Topic",
      },
      {
        name: "depth",
        type: "dropdown",
        label: "Depth",
        options: ["overview", "detailed explanation", "practical examples"],
      },
      {
        name: "audience",
        type: "dropdown",
        label: "Audience",
        options: ["beginners", "students", "professionals", "leaders"],
      },
    ],
    template: `Summarize "[topic]" with a [depth] approach for [audience]. Make it easy to understand and include key points.\n\n[PASTE YOUR TEXT HERE]`,
  },
  brainstorming: {
    title: "💡 Brainstorming & Ideation",
    description: "Come up with ideas or solutions for your challenges.",
    fields: [
      {
        name: "problem",
        type: "textbox",
        label: "Problem",
      },
      {
        name: "approach",
        type: "dropdown",
        label: "Approach",
        options: ["creative", "logical", "user-focused", "innovative"],
      },
      {
        name: "constraints",
        type: "dropdown",
        label: "Constraints",
        options: ["low budget", "fast delivery", "scalable solutions"],
      },
    ],
    template: `Suggest 3-5 ideas for solving "[problem]" using a [approach] approach under [constraints]. Each idea should be practical and unique.\n\n[PASTE YOUR TEXT HERE]`,
  },
  debugging: {
    title: "🐛 Debugging & Optimization",
    description: "Fix bugs and optimize your code for better performance.",
    fields: [
      {
        name: "language",
        type: "dropdown",
        label: "Language",
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
        label: "Focus",
        options: ["bug fixing", "performance", "code structure"],
      },
      {
        name: "complexity",
        type: "dropdown",
        label: "Complexity",
        options: ["simple issues", "moderate changes", "major overhaul"],
      },
    ],
    template: `Analyze the code in [language] to focus on [focus] with a [complexity] approach. Provide clear fixes or optimizations.\n\n[PASTE YOUR CODE HERE]`,
  },
};

export default function DynamicPromptPage() {
  const params = useParams();
  const category = params.category as string;
  const pageConfig = pageConfigs[category];

  const [formData, setFormData] = useState<
    Record<string, string | number | undefined>
  >({});
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

  const handleInputChange = (fieldName: string, value: string | number) => {
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
      if (typeof value === "string") {
        prompt = prompt.replace(`[${key}]`, value);
      }
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
