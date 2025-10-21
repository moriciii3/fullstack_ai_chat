import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import ChatBot from "@/components/ChatBot";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si está autenticado
        const isAuth = localStorage.getItem("isAuthenticated");
        if (!isAuth) {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userId");
        navigate("/");
    };

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="border-b bg-card px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">
                            Sesión iniciada
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Bienvenido a tu asistente IA
                        </p>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar sesión
                    </Button>
                </div>
            </header>

            <main className="flex-1 p-6">
                <ChatBot />
            </main>
        </div>
    );
};

export default Home;
