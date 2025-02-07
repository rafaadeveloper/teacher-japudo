"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { ScrollArea } from "../components/ui/scroll-area";

export type MessageProp = {
  content: string;
  id: string;
  role: string;
};

export function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    setMessages(data.messages);
    setInput("");
  };
  return (
    <Card className="w-[440px]">
      <CardHeader>
        <CardTitle>Teacher Japudo</CardTitle>
        <CardDescription>
          Apenas uma IA que irá te ajudar em seus estudos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full">
          {messages.map((message: MessageProp, index) => (
            <div key={index} className="flex gap-3 text-slate-600 text-sm mb-4">
              {message.role === "user" && (
                <Avatar>
                  <AvatarFallback>DF</AvatarFallback>
                  <AvatarImage
                    draggable="false"
                    src="https://cdn.discordapp.com/attachments/1174091093898440715/1337201776230666360/Captura_de_tela_2025-01-09_023342.png?ex=67a695b3&is=67a54433&hm=51a6f9c578c9294866461bac8a5b6ce1373aac797082d0e903d492986b9e6899&"
                  />
                </Avatar>
              )}
              {message.role === "assistant" && (
                <Avatar>
                  <AvatarFallback>DF</AvatarFallback>
                  <AvatarImage
                    draggable="false"
                    src="https://cdn.discordapp.com/attachments/1174091093898440715/1337219441875746836/Imagem_do_WhatsApp_de_2025-01-19_as_20.50.46_268a1de5.jpg?ex=67a6a627&is=67a554a7&hm=606d49e78dd33fd8fe44b820e7147dec73b3fde76e69cfcffdef367455cef1d0&"
                  />
                </Avatar>
              )}
              <div className="leading-relaxed">
                <span className="block font-bold text-slate-800">
                  {message.role === "user" ? "Usuário" : "Professor Japudo"}:
                </span>
                <p>
                  {message.content === null
                    ? "Professor Japa está pensando"
                    : message.content}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder="How can I help you?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant="outline" type="submit">
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
