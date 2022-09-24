// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  api_url_local: 'http://127.0.0.1:8000',
  api_url_prod: 'http://127.0.0.1:8000',

  auth_login: '/auth',

  get_allUsers: '/usuarios',

  emprestimos_getAll: '/emprestimo',
  solicitarEmprestimo: '/solicitarEmprestimo',

  get_allLivros: '/livros',
  get_livroById: '/livros/',
  add_livro: '/addLivro',
  edit_livro: '/editLivro/',
  delete_livro: '/deleteLivro/',
  get_autores_byLivro: '/autoresByLivro/',
  add_trabalho: '/addTrabalho',
  remove_trabalho: '/removeTrabalho/',

  get_allEditoras: '/editoras',
  add_editora: '/addEditora',
  edit_editora: '/editEditora/',
  delete_editora: '/deleteEditora/',

  get_allAutores: '/autores',
  add_autor: '/addAutor',
  edit_autor: '/editAutor/',
  delete_autor: '/deleteAutor/',

  get_allGeneros: '/generos',
  add_genero: '/addGenero',
  edit_genero: '/editGenero/',
  delete_genero: '/deleteGenero/',

};
