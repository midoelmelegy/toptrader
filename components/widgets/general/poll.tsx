"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Poll({ id }) {
  const [isEditing, setIsEditing] = useState(true)
  const [question, setQuestion] = useState("")
  const [answerType, setAnswerType] = useState("multiple-choice")
  const [options, setOptions] = useState([""]) // Default one option
  const [openEndedAnswer, setOpenEndedAnswer] = useState("")

  // Load poll data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem(`poll-${id}`)
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setQuestion(parsedData.question || "")
      setAnswerType(parsedData.answerType || "multiple-choice")
      setOptions(parsedData.options || [""])
      setOpenEndedAnswer(parsedData.openEndedAnswer || "")
    }
  }, [id])

  // Save poll data to localStorage
  const savePollData = () => {
    const pollData = { question, answerType, options, openEndedAnswer }
    localStorage.setItem(`poll-${id}`, JSON.stringify(pollData))
    setIsEditing(false)
  }

  // Add a new option for the poll
  const addOption = () => {
    setOptions([...options, ""]) // Adds a new empty option input field
  }

  // Remove an option from the poll
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index)
    setOptions(newOptions)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Poll" : "View Poll"}</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-6">
            <div>
              <Label htmlFor="question">Poll Question</Label>
              <Input
                id="question"
                placeholder="Enter Poll Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <div className="relative z-10">
                <Label htmlFor="answer-type">Answer Type</Label>
                <Select value={answerType} onValueChange={(value) => setAnswerType(value)}>
                  <SelectTrigger id="answer-type">
                    <SelectValue placeholder="Select answer type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-lg">
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="open-ended">Open-Ended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {answerType === "multiple-choice" && (
                <div className="space-y-4">
                  <Label>Options</Label>
                  <div className="space-y-2">
                    {options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...options]
                            newOptions[index] = e.target.value
                            setOptions(newOptions)
                          }}
                        />
                        {options.length > 1 && (
                          <Button variant="outline" size="icon" onClick={() => removeOption(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" onClick={addOption}>Add Option</Button>
                </div>
              )}

              {answerType === "open-ended" && (
                <div>
                  <Label htmlFor="open-ended-answer">Open-Ended Answer</Label>
                  <Textarea
                    id="open-ended-answer"
                    placeholder="Type your answer here..."
                    value={openEndedAnswer}
                    onChange={(e) => setOpenEndedAnswer(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button onClick={savePollData}>Save Poll</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{question}</h2>

            {answerType === "multiple-choice" && (
              <ul className="list-disc list-inside space-y-2">
                {options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            )}

            {answerType === "open-ended" && (
              <p className="italic text-gray-600">
                {openEndedAnswer || "Open-ended response will go here..."}
              </p>
            )}

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Poll</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
