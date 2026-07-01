import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, LogIn, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthLayout } from "../../components/AuthLayout";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { appConfig } from "../../config/app";
import { useAuth } from "../../hooks/useAuth";
import { routePaths } from "../../routes/paths";
import { login } from "../../services/auth";
import { getApiErrorMessage } from "../../services/helpers";
import { loginSchema } from "./schema";
import type { LoginFormData } from "./schema";

interface LoginLocationState {
  from?: {
    pathname?: string;
  };
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  async function handleLogin(data: LoginFormData) {
    setError("");

    try {
      const response = await login(data);
      const state = location.state as LoginLocationState | null;
      const redirectTo = state?.from?.pathname ?? routePaths.dashboard;

      signIn(response);
      navigate(redirectTo, { replace: true });
    } catch (loginError) {
      setError(getApiErrorMessage(loginError));
    }
  }

  return (
    <AuthLayout>
      <Card className="login-card">
        <div className="login-card-header">
          <div className="login-brand-row">
            <div className="login-brand">
              <div className="login-brand-logo">
                <img
                  src="/logo-jota.png"
                  alt={appConfig.name}
                />
              </div>
              <div>
                <p className="login-brand-name">{appConfig.name}</p>
                <p className="login-brand-caption">
                  Painel seguro
                </p>
              </div>
            </div>

            <div className="login-security-icon">
              <ShieldCheck size={20} />
            </div>
          </div>

          <h1 className="login-title">
            Acesse sua conta
          </h1>

          <p className="login-subtitle">
            Entre com suas credenciais para continuar gerenciando a operacao da loja.
          </p>
        </div>

        <div className="login-card-body">
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5" noValidate>
            <Input
              icon={<Mail size={18} />}
              label="E-mail"
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              icon={<LockKeyhole size={18} />}
              label="Senha"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              error={errors.senha?.message}
              endAdornment={
                <button
                  type="button"
                  className="rounded-md p-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              {...register("senha")}
            />

            <Button type="submit" fullWidth disabled={isSubmitting} className="h-[50px] text-[15px]">
              <LogIn size={18} />
              {isSubmitting ? "Entrando..." : "Entrar no sistema"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-zinc-400">
            Sessao protegida por token JWT.
          </p>
        </div>
      </Card>
    </AuthLayout>
  );
}
