import initialState from '../initialState';

const migration_1 = state => ({
  inputs: {
    ...initialState.inputs,
    nome: state.chat.nome,
    plataforma: state.chat.plataforma,
    contato: state.chat.contato,
    avatars: state.chat.avatars
  }
})

export default migration_1;