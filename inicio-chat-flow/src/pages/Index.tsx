import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

const Index = () => {
    const navigate = useNavigate();

    // Redireccionar si ya está autenticado
    useEffect(() => {
        const isAuth = localStorage.getItem("isAuthenticated");
        if (isAuth) {
            navigate("/home");
        }
    }, [navigate]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                    <Bot className="h-10 w-10 text-primary-foreground" />
                </div>
                <h1 className="text-5xl font-bold text-foreground">Inicio</h1>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                    size="lg"
                    onClick={() => navigate("/login")}
                    className="min-w-[200px]"
                >
                    Iniciar sesión
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/register")}
                    className="min-w-[200px]"
                >
                    Registrarme
                </Button>
            </div>
        </div>
    );
};

export default Index;
