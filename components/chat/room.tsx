"use client";

import { useEffect, useState, useTransition } from "react";
import Pusher from "pusher-js";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Message } from "./message";

const messageSchema = z.object({
  message: z.string().nonempty("Message cannot be empty"),
});

type Message = {
  userId: string;
  username: string;
  message: string;
};

export default function Room({
  room,
}: {
  room?: { id?: string; name?: string };
}) {
  const roomId = room?.id ?? "chat";

  const [isPending, startTransition] = useTransition();

  const [messages, setMessages] = useState<Message[]>([]);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof messageSchema>) {
    startTransition(() => {
      const message = values.message;
      sendMessage(roomId, message).then((res) => {
        console.log("sendMessage-res", res);
      });
    });
  }

  useEffect(() => {
    // connect to Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    Pusher.logToConsole = true;
    const channel = pusher.subscribe(roomId);
    channel.bind("message", function (data: Message) {
      console.log("data", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      pusher.unsubscribe(roomId);
      pusher.disconnect();
    };
  }, [roomId]);

  const sendMessage = async (roomId: string, message: string) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        roomId: roomId,
        message: message,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      form.setValue("message", "");
    } else {
      alert("Something went wrong...");
    }
  };

  useEffect(() => {
    console.log({ messages });
  }, [messages]);
  if (!room || !room?.id) return <div>No selected room.</div>;
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">{`room: ${room.name}`}</h1>

      <div className="border p-2 h-64 overflow-y-scroll mb-4 bg-gray-50 my-dark-style">
        {messages.map((msg, idx) => (
          <Message
            key={`msg-${idx}`}
            message={msg.message}
            username={msg.username}
            userId={msg.userId}
          />
        ))}
      </div>

      <div className="flex space-x-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <div className="flex w-full items-end space-x-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel></FormLabel>
                    <FormControl>
                      <div className="grid w-full gap-2">
                        <Textarea
                          className="resize-none"
                          placeholder="Type your message here."
                          id="message-text-area"
                          {...field}
                        />
                        <Button type="submit" disabled={isPending}>
                          Send
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
