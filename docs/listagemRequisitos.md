\# 📋 Listagem de Requisitos - SysEvents API



\*\*Sistema de Gestão de Eventos Culturais\*\* (congressos, workshops, shows)



\*\*Versão:\*\* 1.0  

\*\*Data:\*\* Abril/2026  

\*\*Autor:\*\* Cleiton Barbosa Valente



\---



\## 🔐 Autenticação e Usuários



| # | Requisito | Descrição |

|---|-----------|-----------|

| RF001 | Cadastro de usuários | Cadastro de novos usuários com nome, email, senha e papel (organizador/participante) |

| RF002 | Login | Login com email e senha, retornando token JWT para autenticação |

| RF003 | Recuperação de senha | Recuperação de senha por email com token temporário |

| RF004 | Upload de avatar | Upload de avatar/foto do usuário |

| RF005 | Perfil do usuário | Visualização e edição do perfil do usuário (bio, telefone, endereço) |



\---



\## 📅 Eventos



| # | Requisito | Descrição |

|---|-----------|-----------|

| RF006 | Criar evento | Criar novo evento com título, descrição, datas, local e status |

| RF007 | Listar eventos | Listar todos eventos com filtros (por data, status, local, categoria) |

| RF008 | Detalhes do evento | Visualizar detalhes completos de um evento específico |

| RF009 | Editar evento | Editar informações de um evento existente (apenas organizador) |

| RF010 | Excluir evento | Excluir/remover um evento (soft delete ou definitivo) |

| RF011 | Publicar evento | Publicar/ativar evento para torná-lo visível ao público |



\---



\## 📝 Programação



| # | Requisito | Descrição |

|---|-----------|-----------|

| RF012 | Adicionar atividade | Adicionar atividades à programação do evento (título, horário, sala, palestrante) |

| RF013 | Editar atividade | Editar atividades da programação |

| RF014 | Remover atividade | Remover atividades da programação |

| RF015 | Exportar PDF | Exportar programação do evento em formato PDF |



\---



\## 🎤 Palestrantes



| # | Requisito | Descrição |

|---|-----------|-----------|

| RF016 | Cadastrar palestrante | Cadastrar palestrantes com nome, bio, email, foto e redes sociais |

| RF017 | Vincular palestrante | Vincular palestrantes a eventos específicos (relacionamento N:N) |

| RF018 | Listar por evento | Listar palestrantes por evento |

| RF019 | Desvincular palestrante | Desvincular palestrante de um evento |



\---



\## 🎟️ Ingressos e Vendas



| # | Requisito | Descrição |

|---|-----------|-----------|

| RF020 | Definir ingressos | Definir tipos de ingresso (VIP, Estudante, Geral) com preços e quantidades |

| RF021 | Controle de estoque | Controle de estoque de ingressos (quantidade total - vendidos) |

| RF022 | Compra de ingresso | Compra de ingressos com validação de disponibilidade |

| RF023 | Cancelamento | Cancelamento de compra com reembolso/atualização do estoque |

| RF024 | Disponibilidade | Listar ingressos disponíveis para um evento |



\---



\## ✅ Checklist Organizacional



| # | Requisito | Descrição |

|---|-----------|-----------|

| RF025 | Criar tarefa | Criar checklist de tarefas para cada evento |

| RF026 | Concluir tarefa | Marcar/desmarcar tarefas como concluídas |

| RF027 | Data limite | Definir data limite para cada tarefa do checklist |



\---



\## 🖼️ Mídia e Arquivos



| # | Requisito | Descrição |

|---|-----------|-----------|

| RF028 | Pôster | Upload de pôster promocional do evento |

| RF029 | Galeria de fotos | Upload de galeria de fotos do evento |

| RF030 | Vídeos | Upload de vídeos promocionais do evento |



\---



\## 📊 Resumo dos Requisitos



| Categoria | Quantidade |

|-----------|------------|

| Autenticação e Usuários | 5 |

| Eventos | 6 |

| Programação | 4 |

| Palestrantes | 4 |

| Ingressos e Vendas | 5 |

| Checklist Organizacional | 3 |

| Mídia e Arquivos | 3 |

| \*\*TOTAL\*\* | \*\*30\*\* |



\---



\## 🏷️ Legenda



| Sigla | Significado |

|-------|-------------|

| RF | Requisito Funcional |



\---



\## 📝 Observações



\- Esta listagem representa o \*\*brainstorming inicial\*\* de funcionalidades

\- Nem todos os requisitos serão implementados na primeira versão

\- Novos requisitos podem ser adicionados durante o desenvolvimento

\- Os requisitos serão priorizados em sprints futuras



\---



\*\*Documento gerado em:\*\* Abril/2026  

\*\*Projeto:\*\* SysEvents API  

\*\*Disciplina:\*\* Desenvolvimento Web  

\*\*Instituição:\*\* IFCE - Campus Aracati
