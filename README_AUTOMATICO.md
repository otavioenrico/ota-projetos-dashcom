# DashComm - Gestão Financeira para E-commerce

## 📋 Estrutura Real do Projeto

### Framework e Tecnologias
- **Framework**: React 18.3.1 com TypeScript
- **Build Tool**: Vite 5.4.19 
- **Styling**: Tailwind CSS + CSS Custom Properties
- **UI Components**: Shadcn/ui + Radix UI primitives
- **State Management**: TanStack React Query + Context API
- **Routing**: React Router DOM 6.30.1
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Icons**: Lucide React

### Estrutura de Pastas
```
src/
├── components/
│   ├── ui/                     # Shadcn/ui components
│   ├── auth/                   # Componentes de autenticação
│   ├── dashboard/              # Componentes do dashboard
│   ├── layout/                 # Layouts (DashboardLayout, AppSidebar)
│   └── settings/               # Dialogs de configuração
├── pages/                      # Páginas da aplicação
│   ├── Homepage.tsx            # Landing page (/)
│   ├── Login.tsx              # Página de login (/login)
│   ├── Registrar.tsx          # Página de registro (/registrar)
│   ├── Dashboard.tsx          # Dashboard principal (/dashboard)
│   ├── FluxoCaixa.tsx         # Fluxo de caixa (/dashboard/fluxo-caixa)
│   ├── Contas.tsx             # Contas a pagar/receber (/dashboard/contas)
│   ├── Clientes.tsx           # Gestão de clientes (/dashboard/clientes)
│   ├── Fornecedores.tsx       # Gestão de fornecedores (/dashboard/fornecedores)
│   ├── Relatorios.tsx         # Relatórios (/dashboard/relatorios)
│   ├── Agenda.tsx             # Agenda/calendário (/dashboard/agenda)
│   ├── Integracoes.tsx        # Integrações (/dashboard/integracoes)
│   ├── Produto.tsx            # Página do produto (/produto)
│   ├── Planos.tsx             # Planos e preços (/planos)
│   ├── CentralAjuda.tsx       # Central de ajuda (/central-ajuda)
│   ├── SobreNos.tsx           # Sobre nós (/sobre-nos)
│   ├── PoliticaPrivacidade.tsx # Política de privacidade (/politica-privacidade)
│   ├── TermosUso.tsx          # Termos de uso (/termos-uso)
│   └── NotFound.tsx           # Página 404
├── contexts/
│   └── AuthContext.tsx        # Context de autenticação
├── integrations/
│   └── supabase/              # Configuração Supabase
│       ├── client.ts          # Cliente Supabase
│       └── types.ts           # Tipos gerados
├── hooks/                     # Custom hooks
├── lib/
│   └── utils.ts              # Utilitários gerais
├── assets/                   # Imagens e recursos
└── main.tsx                  # Entry point

```

### Rotas Configuradas
**Públicas:**
- `/` - Homepage/Landing
- `/produto` - Página do produto
- `/planos` - Planos e preços
- `/login` - Login
- `/registrar` - Registro
- `/central-ajuda` - Central de ajuda
- `/sobre-nos` - Sobre nós
- `/politica-privacidade` - Política de privacidade
- `/termos-uso` - Termos de uso

**Protegidas (Dashboard):**
- `/dashboard` - Início/Overview
- `/dashboard/fluxo-caixa` - Fluxo de caixa
- `/dashboard/contas` - Contas a pagar/receber
- `/dashboard/clientes` - Gestão de clientes
- `/dashboard/fornecedores` - Gestão de fornecedores
- `/dashboard/relatorios` - Relatórios
- `/dashboard/agenda` - Agenda
- `/dashboard/integracoes` - Integrações

### Design System
**Identidade Visual:**
- **Fonte**: Inter (Google Fonts)
- **Paleta 60/30/10**: Branco (#FFFFFF - 60%), Preto (#000000 - 30%), Azul (#2F60DD - 10%)
- **Estados dos botões**: hover = azul 5% opacidade, active = 10% opacidade
- **Estilo**: Clean, inspirado no Adobe

**Cores HSL definidas em src/index.css:**
```css
--primary: 222 77% 53%;        /* #2F60DD */
--background: 0 0% 100%;       /* #FFFFFF */
--foreground: 0 0% 0%;         /* #000000 */
```

### Supabase Configuration
**Project ID**: zsprsncpswrlbtuoxrbn
**URL**: https://zsprsncpswrlbtuoxrbn.supabase.co
**Client**: src/integrations/supabase/client.ts

### Dependências Principais
```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "@supabase/supabase-js": "^2.55.0",
  "@tanstack/react-query": "^5.83.0",
  "tailwindcss": "^3.4.17",
  "lucide-react": "^0.462.0",
  "react-hook-form": "^7.61.1",
  "date-fns": "^3.6.0",
  "recharts": "^2.15.4"
}
```

## 🚀 Como Rodar no Lovable

### Scripts Disponíveis
```bash
npm run dev        # Desenvolvimento (porta 8080)
npm run build      # Build de produção
npm run build:dev  # Build de desenvolvimento
npm run preview    # Preview do build
npm run lint       # Linting
```

### Desenvolvimento
1. O projeto já está configurado no Lovable
2. Usar `npm run dev` para desenvolvimento local
3. Hot reload automático habilitado
4. Porta padrão: 8080

### Build
- Build de produção: `npm run build`
- Output: `dist/` directory
- Otimizado para deploy no Lovable

## 🔗 Integrações

### Supabase
- **Autenticação**: Email/senha + Google OAuth
- **Database**: PostgreSQL com RLS habilitado
- **Storage**: Para uploads de arquivos
- **Edge Functions**: Para integrações externas

### Marketplaces (Implementar)
- **Mercado Livre**: OAuth + API de vendas
- **Shopee**: API de integração
- **Shein**: API de vendas

### Gestão de Estoque (Implementar)
- **Tiny ERP**: API de integração
- **Bling**: API de gestão

## 📊 Banco de Dados

### Tabelas Esperadas (A Implementar)
```sql
organizations(id, name, cnpj, timezone, created_at)
memberships(org_id, user_id, role, created_at)
profiles(user_id, full_name, avatar_url, created_at)
accounts(id, org_id, name, type, current_balance, created_at)
contacts(id, org_id, type, name, cnpj, email, phone, address, city, state, external_id, created_at)
categories(id, org_id, name, kind, created_at)
transactions(id, org_id, date, kind, description, amount_gross, fees, amount_net, status, account_id, contact_id, platform, category_id, external_ref, created_by, created_at)
bills(id, org_id, board, description, contact_id, total_amount, due_date, installments, category_id, status, notes, file_url, external_ref, created_at)
calendar_events(id, org_id, title, datetime, type, link_transaction, notes, created_at)
activity_logs(id, org_id, message, kind, amount, created_at)
integrations(id, org_id, provider, status, last_sync_at, created_at)
```

## ✅ Critérios de Aceite (Checklist)

### Autenticação
- [ ] Login/Registro (email e Google) operacionais
- [ ] Primeiro login cria org/membership
- [ ] Redireciona para /app/inicio após login

### Layout
- [ ] Sidebar fixa troca de páginas sem reload
- [ ] Item ativo da sidebar destacado
- [ ] Menu burger com configurações funcionais

### Dashboard (/app/inicio)
- [ ] KPIs corretos (M0 e variação vs M-1)
- [ ] Gráfico Entradas x Saídas (7/30 dias)
- [ ] Lista "Vencimentos em 7 dias"
- [ ] "Atividades recentes" funcionais

### Páginas Funcionais
- [ ] /app/fluxo: CRUD completo de transações
- [ ] /app/contas: CRUD completo com upload PDF
- [ ] /app/clientes: CRUD + autocomplete CNPJ
- [ ] /app/fornecedores: CRUD + autocomplete CNPJ
- [ ] /app/relatorios: Gráficos respondem aos filtros
- [ ] /app/agenda: Toggle grade/lista funcionando

### Integrações
- [ ] Mercado Livre: Conectar ativa stub, gera dados simulados
- [ ] Integração funciona (backfill + incremental)
- [ ] Desconectar pausa jobs

### Design System
- [ ] Fonte Inter aplicada
- [ ] Paleta 60/30/10 implementada
- [ ] Estados hover/active funcionando

## 🔧 Modo ML Stub

### Ativação
Para ativar o modo stub do Mercado Livre:
1. Configurações → Integrações
2. Clicar "Conectar" no card Mercado Livre
3. Status muda para 'connected_stub'

### Desativação
1. Clicar "Desconectar" no card Mercado Livre
2. Status muda para 'disconnected'
3. Jobs incrementais pausam

### Dados Simulados
- Transações de vendas (últimos 90 dias)
- Bills de recebíveis pendentes
- Job incremental a cada 15min
- Platform = 'Mercado Livre'

## 📝 Notas de Implementação

### Estado Atual
- Estrutura básica criada
- Autenticação com localStorage implementada
- Layout do dashboard funcionando
- Páginas básicas criadas

### Próximos Passos
1. Configurar banco Supabase
2. Implementar autenticação real
3. Criar sistema de organizações
4. Implementar CRUD das entidades
5. Adicionar integrações de marketplace
6. Implementar relatórios e KPIs

### Variáveis de Ambiente
Não há variáveis de ambiente. Configuração Supabase está hardcoded no cliente.

---

**Última atualização**: Auto-gerado pelo sistema Lovable
**Versão**: 1.0.0