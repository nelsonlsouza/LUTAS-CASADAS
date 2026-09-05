# Tatame Fight Manager

MVP administrativo para organizar lutas casadas de Jiu-Jitsu. Os atletas, lutas, resultados e a autenticação são persistidos pelo Supabase.

## Configuração

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um projeto no Supabase.
3. No painel do Supabase, abra **SQL Editor**.
4. Copie e execute todo o conteúdo de `supabase/schema.sql`.
5. Em **Authentication**, mantenha habilitado o login por email e senha.
6. Em **Authentication > Users**, crie manualmente o usuário administrador. A aplicação não possui cadastro público.
7. Em **Project Settings > API**, copie a **Project URL** e a chave pública apropriada para navegador (`anon`/publishable). Nunca utilize a `service_role` no frontend.
8. Copie `.env.example` para um arquivo chamado `.env`.
9. Preencha sem aspas:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-publica
   ```
10. Inicie a aplicação:
    ```bash
    npm run dev
    ```
11. Entre com o administrador criado no Supabase.
12. Cadastre um atleta.
13. Confirme no **Table Editor > athletes** que o registro foi criado.
14. Crie uma luta pelo menu **Criar luta**.
15. Confirme no **Table Editor > fights** que a luta foi criada.

O Dashboard mostra discretamente o estado da conexão durante o desenvolvimento. O arquivo SQL inclui oito atletas fictícios em um bloco comentado opcional.

## Build de produção

```bash
npm run build
```

Os arquivos gerados ficam em `dist/`. A URL e a chave pública precisam ser configuradas também no ambiente de hospedagem.
