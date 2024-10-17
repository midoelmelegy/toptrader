"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PollProps {
  id: string;
}

export function Poll({ id }: PollProps) {
  const [isEditing, setIsEditing] = useState(true);
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState<"multiple-choice" | "open-ended">("multiple-choice");
  const [options, setOptions] = useState<string[]>([""]);
  const [openEndedAnswer, setOpenEndedAnswer] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem(`poll-${id}`);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setQuestion(parsedData.question || "");
      setAnswerType(parsedData.answerType || "multiple-choice");
      setOptions(parsedData.options || [""]);
      setOpenEndedAnswer(parsedData.openEndedAnswer || "");
    }
  }, [id]);

  const savePollData = () => {
    const pollData = { question, answerType, options, openEndedAnswer };
    localStorage.setItem(`poll-${id}`, JSON.stringify(pollData));
    setIsEditing(false);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-gray-900 dark:text-gray-100">{isEditing ? "Edit Poll" : "View Poll"}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isEditing ? (
          <div className="space-y-6">
            <div>
              <Label htmlFor="question" className="text-gray-700 dark:text-gray-300">Poll Question</Label>
              <Input
                id="question"
                placeholder="Enter Poll Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="no-drag mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="space-y-4">
              <div className="relative z-10">
                <Label htmlFor="answer-type" className="text-gray-700 dark:text-gray-300">Answer Type</Label>
                <div
                  className="no-drag"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Select
                    value={answerType}
                    onValueChange={(value: "multiple-choice" | "open-ended") => setAnswerType(value)}
                  >
                    <SelectTrigger id="answer-type" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                      <SelectValue placeholder="Select answer type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <SelectItem value="multiple-choice" className="text-gray-900 dark:text-gray-100">
                        Multiple Choice
                      </SelectItem>
                      <SelectItem value="open-ended" className="text-gray-900 dark:text-gray-100">
                        Open-Ended
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {answerType === "multiple-choice" && (
                <div className="space-y-4">
                  <Label className="text-gray-700 dark:text-gray-300">Options</Label>
                  <div className="space-y-2">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 no-drag"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                          }}
                          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                        />
                        {options.length > 1 && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeOption(index);
                            }}
                            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      addOption();
                    }}
                    className="no-drag border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Add Option
                  </Button>
                </div>
              )}

              {answerType === "open-ended" && (
                <div>
                  <Label htmlFor="open-ended-answer" className="text-gray-700 dark:text-gray-300">
                    Open-Ended Answer
                  </Label>
                  <Textarea
                    id="open-ended-answer"
                    placeholder="Type your answer here..."
                    value={openEndedAnswer}
                    onChange={(e) => setOpenEndedAnswer(e.target.value)}
                    className="no-drag mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  savePollData();
                }}
                className="no-drag bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Save Poll
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{question}</h2>

            {answerType === "multiple-choice" && (
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            )}

            {answerType === "open-ended" && (
              <p className="italic text-gray-600 dark:text-gray-400">
                {openEndedAnswer ||
                  "Open-ended response will go here..."}
              </p>
            )}

            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="no-drag border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit Poll
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
