/**
 * Arquivo: js/dados-ideias.js
 * Módulo: DADOS_IDEIAS
 * Dono: Unidade 2 (Catálogo de Ideias)
 * 
 * Contrato:
 * - Array estático e imutável com 20 ideias de atividades para casais.
 * - Atributos por item: id, titulo, descricao, categoria, tempoMin, custo, dificuldade, pontos, icone.
 * - Categorias permitidas: "Em casa", "Ao ar livre", "Românticas", "Divertidas", "Rápidas", "Baixo custo".
 * - Custos permitidos: "Grátis", "Baixo", "Médio".
 * - NÃO é salvo no localStorage (fonte imutável em memória).
 */

const DADOS_IDEIAS = Object.freeze([
  // As 20 ideias completas e categorizadas serão inseridas na implementação da Unidade 2
  {
    id: 'ideia-01',
    titulo: 'Piquenique no Parque ou Sala',
    descricao: 'Preparem lanches fáceis juntos e estendam uma toalha para conversar sem celulares.',
    categoria: 'Ao ar livre',
    tempoMin: 60,
    custo: 'Baixo',
    dificuldade: 'Fácil',
    pontos: 50,
    icone: 'bi-cup-hot'
  }
]);

window.DADOS_IDEIAS = DADOS_IDEIAS;
