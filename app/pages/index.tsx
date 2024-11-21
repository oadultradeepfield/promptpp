"use client";

import Link from "next/link";
import Image from "next/image";

const promptCategories = [
  {
    id: "content-creation",
    title: "Content Creation",
    description:
      "Generate various content like blogs and social media posts with customizable tone and style.",
    icon: "📝",
  },
  {
    id: "code-generation",
    title: "Code Generation",
    description:
      "Create code snippets or complete programs in multiple languages for different tasks.",
    icon: "👨‍💻",
  },
  {
    id: "learning",
    title: "Learning & Summarization",
    description:
      "Get summaries and explanations on any topic for better understanding and faster learning.",
    icon: "📚",
  },
  {
    id: "brainstorming",
    title: "Brainstorming & Ideation",
    description:
      "Generate creative ideas and solutions for various projects, products, and problems.",
    icon: "💡",
  },
  {
    id: "writing",
    title: "Writing Assistance",
    description:
      "Get help with writing emails, resumes, articles, and creative pieces.",
    icon: "✍️",
  },
  {
    id: "debugging",
    title: "Debugging & Optimization",
    description:
      "Analyze and optimize code, finding and fixing bugs to improve performance.",
    icon: "🐛",
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto mt-6 px-6">
      <h1 className="text-4xl font-bold text-center mb-4 flex items-center justify-center">
        <Image
          alt="Prompt++ Logo"
          src="/logo.webp"
          width={54}
          height={54}
          className="mr-1"
        />
        Prompt++
      </h1>
      <div className="text-xl mx-auto text-center mb-8">
        🚀 <span className="font-bold">Craft Smarter Prompts, Faster.</span>
        <br />
        ⬇️ <span className="italic">Choose a task to begin.</span> ⬇️
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {promptCategories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.id}`}
            passHref
            className="card bg-zinc-800 hover:bg-zinc-700 hover:scale-105 hover:rotate-1 hover:shadow-md hover:shadow-zinc-600 transition-all duration-300 ease-in-out transform cursor-pointer rounded-2xl"
          >
            <div className="card-body p-6">
              <h2 className="card-title flex items-center gap-2 text-lg font-semibold">
                <span className="text-3xl">{category.icon}</span>
                {category.title}
              </h2>
              <p className="text-gray-300">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
