import type { ReactNode } from "react";

import heroImage from "../../assets/hero.png";
import { appConfig } from "../../config/app";

interface Props {
  children: ReactNode;
}

export function AuthLayout({ children }: Props) {
  return (
    <div className="auth-page">
      <section
        className="auth-hero"
        style={{ backgroundImage: `linear-gradient(110deg, rgb(9 9 11 / 0.9), rgb(9 9 11 / 0.72) 42%, rgb(9 9 11 / 0.24)), url(${heroImage})` }}
      >
        <div className="auth-hero-brand">
          <div className="auth-hero-logo">
            <img src="/logo-jota.png" alt={appConfig.name} />
          </div>
          <div>
            <h1>{appConfig.name}</h1>
            <p>{appConfig.description}</p>
          </div>
        </div>

        <div className="auth-hero-copy">
          <p className="auth-kicker">
            Gestao de loja
          </p>
          <h2>
            Operacao organizada para vender com mais controle.
          </h2>
          <p>
            Acompanhe produtos, estoque, vendas e pagamentos em uma rotina mais clara.
          </p>
        </div>
      </section>

      <main className="auth-panel">
        <div className="auth-panel-line" />
        <div className="auth-panel-inner">{children}</div>
      </main>
    </div>
  );
}
