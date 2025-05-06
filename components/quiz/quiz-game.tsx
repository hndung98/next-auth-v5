"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

type QuizData = {
  name: string;
  questions: Question[];
};

export default function QuizGame({ data }: { data: QuizData[] }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selected: string) => {
    if (questions.length === 0) return;
    const currentQuestion = questions[currentIndex];
    if (selected === currentQuestion.answer) {
      setScore(score + 1);
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="space-y-4 flex flex-col justify-center items-center">
        <Select
          onValueChange={(value) => {
            const selected = data.find((item) => item.name === value);
            if (selected) {
              setQuestions(selected.questions);
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select one" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {data?.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p>Loading...</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="p-8 text-center space-x-4">
        <h1 className="text-2xl font-bold mb-4">Completed!</h1>
        <p className="text-lg">
          Your score: {score}/{questions.length}
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setShowResult(false);
          }}
          className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
        >
          Play again
        </button>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setShowResult(false);
            setQuestions([]);
          }}
          className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
        >
          Go on
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz Game</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          No {currentIndex + 1}: {currentQuestion.question}
        </h2>
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <p className="text-gray-500">
        Question {currentIndex + 1}/{questions.length}
      </p>
    </div>
  );
}
