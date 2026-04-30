import { UsuarioRepository } from '../repositories/usuarioRepository';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';

const usuarioRepository = new UsuarioRepository();

export class UsuarioService {
  async registrar(dados: { nome: string; email: string; senha: string; papel: string }) {
    const existingUser = await usuarioRepository.findByEmail(dados.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const senhaHash = await hashPassword(dados.senha);
    const usuario = await usuarioRepository.create({
      nome: dados.nome,
      email: dados.email,
      senhaHash,
      papel: dados.papel || 'user',
    });

    const { senhaHash: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async login(email: string, senha: string) {
    const usuario = await usuarioRepository.findByEmail(email);
    if (!usuario) {
      throw new Error('Credenciais inválidas');
    }

    const senhaValida = await comparePassword(senha, usuario.senhaHash);
    if (!senhaValida) {
      throw new Error('Credenciais inválidas');
    }

    const token = generateToken({ id: usuario.id, email: usuario.email, papel: usuario.papel });
    const { senhaHash: _, ...usuarioSemSenha } = usuario;

    return { usuario: usuarioSemSenha, token };
  }

  async listarTodos() {
    const usuarios = await usuarioRepository.findAll();
    return usuarios.map(({ senhaHash, ...rest }) => rest);
  }

  async listarComPaginacao(page: number, limit: number, search?: string) {
    const result = await usuarioRepository.findWithPagination(page, limit, search);
    return {
      ...result,
      data: result.data.map(({ senhaHash, ...rest }) => rest)
    };
  }

  async buscarPorId(id: number) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    const { senhaHash, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async uploadAvatar(usuarioId: number, arquivo: any) {
    if (!arquivo) {
      throw new Error('Nenhum arquivo enviado');
    }
    
    const avatarUrl = `/uploads/avatars/${arquivo.filename}`;
    const usuario = await usuarioRepository.updateAvatar(usuarioId, avatarUrl);
    
    const { senhaHash, ...usuarioSemSenha } = usuario;
    return { ...usuarioSemSenha, avatarUrl };
  }

  // ========== ADMIN METHODS ==========
  
  async adminCriarUsuario(dados: { nome: string; email: string; senha: string; papel: string }) {
    const existingUser = await usuarioRepository.findByEmail(dados.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const senhaHash = await hashPassword(dados.senha);
    const usuario = await usuarioRepository.create({
      nome: dados.nome,
      email: dados.email,
      senhaHash,
      papel: dados.papel || 'user',
    });

    const { senhaHash: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async adminAtualizarUsuario(id: number, dados: { nome?: string; email?: string; papel?: string; senha?: string }) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const updateData: any = {};
    if (dados.nome) updateData.nome = dados.nome;
    if (dados.email) {
      const existingUser = await usuarioRepository.findByEmail(dados.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email já está em uso por outro usuário');
      }
      updateData.email = dados.email;
    }
    if (dados.papel) updateData.papel = dados.papel;
    if (dados.senha) updateData.senhaHash = await hashPassword(dados.senha);

    const updatedUser = await usuarioRepository.update(id, updateData);
    const { senhaHash, ...usuarioSemSenha } = updatedUser;
    return usuarioSemSenha;
  }

  async adminDeletarUsuario(id: number) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    
    if (usuario.papel === 'admin') {
      throw new Error('Não é possível deletar outro administrador');
    }
    
    await usuarioRepository.delete(id);
    return { message: 'Usuário deletado com sucesso' };
  }

  async adminBuscarUsuarios(page: number = 1, limit: number = 10, search?: string) {
    return await this.listarComPaginacao(page, limit, search);
  }
}
