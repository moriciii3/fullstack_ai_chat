import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "¡Hola! Soy tu asistente IA. ¿En qué puedo ayudarte hoy?",
            timestamp: new Date(),
        },
    ]);

    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Auto scroll al último mensaje
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputMessage.trim() || isLoading) return;

        // Mensaje del usuario
        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputMessage,
            timestamp: new Date(),
        };

        // Guardamos el mensaje del usuario
        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsLoading(true);

        try {
            // Llamada a la API de YesNo
            const response = await fetch("http://localhost:8000/api/chatbot/");
            const data = await response.json();

            // Mensaje de la "IA"
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.answer, // "yes" o "no"
                timestamp: new Date(),
            };

            // Guardamos la respuesta
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error al obtener respuesta:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Card className="mx-auto flex h-[calc(100vh-12rem)] max-w-4xl flex-col">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-3 ${
                                message.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            {message.role === "assistant" && (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                                    <Bot className="h-5 w-5 text-primary-foreground" />
                                </div>
                            )}

                            <div
                                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                                    message.role === "user"
                                        ? "bg-[hsl(var(--chat-user))] text-white"
                                        : "bg-[hsl(var(--chat-assistant))] text-foreground"
                                }`}
                            >
                                <p className="text-sm leading-relaxed">
                                    {message.content}
                                </p>
                                <span className="mt-1 block text-xs opacity-70">
                                    {message.timestamp.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>

                            {message.role === "user" && (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                                    <User className="h-5 w-5 text-secondary-foreground" />
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                                <Bot className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div className="rounded-2xl bg-[hsl(var(--chat-assistant))] px-4 py-3">
                                <div className="flex gap-1">
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"></div>
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <form
                onSubmit={handleSendMessage}
                className="border-t bg-[hsl(var(--chat-input))] p-4"
            >
                <div className="flex gap-2">
                    <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        disabled={isLoading}
                        className="flex-1"
                    />
                    <Button
                        type="submit"
                        disabled={isLoading || !inputMessage.trim()}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default ChatBot;
