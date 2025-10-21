import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Redireccionar si ya está autenticado
    useEffect(() => {
        const isAuth = localStorage.getItem("isAuthenticated");
        if (isAuth) {
            navigate("/home");
        }
        }, [navigate]);

    // Maneja el registro del usuario
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Usuario creado:", data);

                // Guardar los datos mínimos en localStorage
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("userId", data.user_id);

                alert("¡Usuario registrado correctamente!");
                navigate("/home");
            } else {
                const errorData = await response.json();
                console.error("Error en el registro:", errorData);
                alert("No se pudo registrar el usuario");
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Error de conexión con el servidor");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        Registro
                    </CardTitle>
                    <CardDescription>
                        Crea tu cuenta para comenzar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirmar contraseña
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Registrarse
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={() => navigate("/")}
                        >
                            Volver
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
