# Event Connect 📋

O **Event Connect** (anteriormente StaffCheck) é uma aplicação web para gerenciamento e escalação de equipes para eventos. O sistema permite visualizar profissionais disponíveis, escalar funcionários para o evento e calcular automaticamente o custo total das diárias em tempo real.

Este projeto foca na manipulação avançada de Arrays e gerenciamento de estado local com JavaScript Puro (Vanilla JS).

## 🚀 Tecnologias e Conceitos

- **Vite:** Ambiente de desenvolvimento ágil.
- **JavaScript (ES6+):**
  - **Módulos (Import/Export):** Organização do código em arquivos separados.
  - **Array Methods:** Uso intensivo de `.filter()`, `.map()`, `.find()` e `.reduce()`.
  - **Intl.NumberFormat:** Formatação profissional de moeda (BRL).
- **JSON Local:** Simulação de banco de dados estático.
- **Arquitetura em Camadas:** Separação entre dados (`data`), interface (`ui`) e lógica (`main`).

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura limpa, onde cada arquivo tem uma responsabilidade única:

## ✨ Funcionalidades

- **Listagem de Talentos:** Carrega profissionais a partir de um arquivo `team.json`.
- **Escalação Dinâmica:** Permite mover profissionais entre "Disponíveis" e "Escalados".
- **Reatividade:** A interface se redesenha automaticamente a cada mudança de status.
- **Orçamento em Tempo Real:** Calcula a soma das diárias da equipe escalada usando o método `.reduce()`.

## ⚙️ Como rodar o projeto

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/PriscillaBarbosa/event-connect.git](https://github.com/PriscillaBarbosa/event-connect.git)
   cd event-connect

2. **Instale as dependências**
    npm istall

3. **Inicie o servidor**
    npm run dev
    

## 🧠 Aprendizados

Este projeto consolidou o entendimento sobre imutabilidade e métodos de array. Ao invés de alterar o HTML diretamente de forma imperativa, o sistema altera o estado dos dados (o array de objetos) e a interface reage a essa mudança ("State Driven UI"), um conceito fundamental para aprender frameworks como React no futuro.