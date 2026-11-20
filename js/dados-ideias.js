// js/dados-ideias.js
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
 * - Dificuldades permitidas: "Fácil", "Médio", "Difícil".
 * - NÃO é salvo no localStorage (fonte estática imutável em memória).
 */

const DADOS_IDEIAS = Object.freeze([
  {
    id: 'ideia-01',
    titulo: 'Cozinhar Juntos uma Receita Nova',
    descricao: 'Escolham uma receita diferente que nenhum dos dois domina, coloquem uma música agradável e preparem o prato em equipe dividindo as tarefas.',
    categoria: 'Em casa',
    tempoMin: 60,
    custo: 'Baixo',
    dificuldade: 'Médio',
    pontos: 60,
    icone: 'bi-egg-fried'
  },
  {
    id: 'ideia-02',
    titulo: 'Piquenique ao Pôr do Sol',
    descricao: 'Preparem lanches leves, frutas e uma toalha charmosa para assistir ao entardecer em um parque ou praça acolhedora da cidade.',
    categoria: 'Ao ar livre',
    tempoMin: 90,
    custo: 'Baixo',
    dificuldade: 'Fácil',
    pontos: 80,
    icone: 'bi-sunset-fill'
  },
  {
    id: 'ideia-03',
    titulo: 'Noite de Cinema com Cabana de Cobertores',
    descricao: 'Construam uma cabaninha aconchegante na sala com lençóis, almofadas e luzes suaves, e assistam ao filme romântico favorito do casal com pipoca.',
    categoria: 'Românticas',
    tempoMin: 120,
    custo: 'Grátis',
    dificuldade: 'Fácil',
    pontos: 70,
    icone: 'bi-film'
  },
  {
    id: 'ideia-04',
    titulo: 'Competição de Jogos de Tabuleiro ou Videogame',
    descricao: 'Façam uma melhor de 3 no jogo preferido de vocês. Quem perder tem que fazer um agrado especial ou preparar o lanche!',
    categoria: 'Divertidas',
    tempoMin: 45,
    custo: 'Grátis',
    dificuldade: 'Fácil',
    pontos: 50,
    icone: 'bi-controller'
  },
  {
    id: 'ideia-05',
    titulo: 'Café da Manhã Especial na Cama',
    descricao: 'Surpreenda ou preparem em conjunto um café com frutas, torradas e a bebida quente favorita para saborear preguiçosamente debaixo das cobertas.',
    categoria: 'Rápidas',
    tempoMin: 20,
    custo: 'Baixo',
    dificuldade: 'Fácil',
    pontos: 40,
    icone: 'bi-cup-hot-fill'
  },
  {
    id: 'ideia-06',
    titulo: 'Passeio Fotográfico pelo Bairro ou Praça',
    descricao: 'Saiam para caminhar e registrem fotos espontâneas um do outro e de detalhes bonitos do caminho. O objetivo é criar memórias simples e verdadeiras.',
    categoria: 'Baixo custo',
    tempoMin: 45,
    custo: 'Grátis',
    dificuldade: 'Fácil',
    pontos: 50,
    icone: 'bi-camera-fill'
  },
  {
    id: 'ideia-07',
    titulo: 'Sessão de Massagem Relaxante a Dois',
    descricao: 'Criem um ambiente calmo com meia-luz e óleos aromáticos. Reservem alguns minutos para massagear costas e ombros para aliviar a tensão do dia.',
    categoria: 'Em casa',
    tempoMin: 35,
    custo: 'Grátis',
    dificuldade: 'Fácil',
    pontos: 55,
    icone: 'bi-heart-pulse-fill'
  },
  {
    id: 'ideia-08',
    titulo: 'Caminhada ou Pedalada no Parque',
    descricao: 'Coloquem roupas confortáveis e façam uma volta relaxante a pé ou de bicicleta em um espaço verde, respirando ar puro e conversando sobre a semana.',
    categoria: 'Ao ar livre',
    tempoMin: 60,
    custo: 'Grátis',
    dificuldade: 'Médio',
    pontos: 60,
    icone: 'bi-bicycle'
  },
  {
    id: 'ideia-09',
    titulo: 'Jantar à Luz de Velas Feito em Casa',
    descricao: 'Apaguem as lâmpadas principais, acendam velas ou usem pisca-piscas, coloquem uma toalha bonita na mesa e celebrem a companhia um do outro.',
    categoria: 'Românticas',
    tempoMin: 75,
    custo: 'Baixo',
    dificuldade: 'Médio',
    pontos: 90,
    icone: 'bi-heart-fill'
  },
  {
    id: 'ideia-10',
    titulo: 'Batalha Divertida de Karaokê na Sala',
    descricao: 'Usem microfones imaginários (ou escovas de cabelo) e cantem juntos as músicas mais nostálgicas e engraçadas que marcaram a adolescência de vocês.',
    categoria: 'Divertidas',
    tempoMin: 40,
    custo: 'Grátis',
    dificuldade: 'Fácil',
    pontos: 50,
    icone: 'bi-mic-fill'
  },
  {
    id: 'ideia-11',
    titulo: 'Troca de Cartinhas de Gratidão e Elogios',
    descricao: 'Cada um escreve em um pedaço de papel 3 coisas pelas quais é muito grato no parceiro e 1 momento inesquecível recente. Leiam em voz alta.',
    categoria: 'Rápidas',
    tempoMin: 15,
    custo: 'Grátis',
    dificuldade: 'Fácil',
    pontos: 40,
    icone: 'bi-envelope-heart-fill'
  },
  {
    id: 'ideia-12',
    titulo: 'Visita a uma Feira Cultural ou Artesanato',
    descricao: 'Caminhem sem pressa por uma feirinha local, conheçam produtores artesanais, experimentem comidinhas típicas e escolham uma lembrancinha simbólica.',
    categoria: 'Baixo custo',
    tempoMin: 90,
    custo: 'Baixo',
    dificuldade: 'Fácil',
    pontos: 65,
    icone: 'bi-shop'
  },
  {
    id: 'ideia-13',
    titulo: 'Noite de Spa Caseiro com Máscara Facial',
    descricao: 'Apliquem máscaras de argila ou hidratantes no rosto, fatias de pepino nos olhos e descansem ouvindo sons da natureza por meia hora.',
    categoria: 'Em casa',
    tempoMin: 40,
    custo: 'Baixo',
    dificuldade: 'Fácil',
    pontos: 50,
    icone: 'bi-droplet-half'
  },
  {
    id: 'ideia-14',
    titulo: 'Noite sob o Céu Estrelado',
    descricao: 'Encontrem um lugar seguro com pouca iluminação direta, deitem-se sobre uma manta e fiquem admirando o céu enquanto compartilham sonhos futuros.',
    categoria: 'Ao ar livre',
    tempoMin: 50,
    custo: 'Grátis',
    dificuldade: 'Fácil',
    pontos: 65,
    icone: 'bi-stars'
  },
  {
    id: 'ideia-15',
    titulo: 'Pote dos Bilhetes de Carinho para a Semana',
    descricao: 'Escrevam pequenos lembretes motivacionais e elogios em papéis coloridos e guardem em um pote. O parceiro deve sortear um a cada manhã.',
    categoria: 'Românticas',
    tempoMin: 30,
    custo: 'Grátis',
    dificuldade: 'Fácil',
    pontos: 50,
    icone: 'bi-chat-heart-fill'
  },
  {
    id: 'ideia-16',
    titulo: 'Desafio do Retrato Cego',
    descricao: 'Peguem papel e caneta. Cada um deve desenhar o rosto do parceiro em 3 minutos sem tirar a caneta do papel e sem olhar para baixo. Risadas garantidas!',
    categoria: 'Divertidas',
    tempoMin: 25,
    custo: 'Grátis',
    dificuldade: 'Fácil',
    pontos: 45,
    icone: 'bi-palette-fill'
  },
  {
    id: 'ideia-17',
    titulo: 'Dançar a Dois na Sala de Estar',
    descricao: 'Coloquem uma playlist com três músicas românticas lentas, abracem-se no centro da sala e dancem no ritmo suave para recarregar as energias.',
    categoria: 'Rápidas',
    tempoMin: 15,
    custo: 'Grátis',
    dificuldade: 'Fácil',
    pontos: 35,
    icone: 'bi-music-note-beamed'
  },
  {
    id: 'ideia-18',
    titulo: 'Montar um Mural de Fotos e Lembranças',
    descricao: 'Reúnam ingressos antigos, fotos impressas ou recortes de momentos especiais e montem um varal ou painel decorativo para o quarto.',
    categoria: 'Baixo custo',
    tempoMin: 60,
    custo: 'Baixo',
    dificuldade: 'Médio',
    pontos: 70,
    icone: 'bi-images'
  },
  {
    id: 'ideia-19',
    titulo: 'Degustação Cega de Sobremesas ou Doces',
    descricao: 'Com os olhos vendados, cada parceiro deve provar pedacinhos de diferentes doces ou frutas e tentar adivinhar os ingredientes exatos.',
    categoria: 'Divertidas',
    tempoMin: 30,
    custo: 'Baixo',
    dificuldade: 'Fácil',
    pontos: 50,
    icone: 'bi-gift-fill'
  },
  {
    id: 'ideia-20',
    titulo: 'Planejar o Roteiro da Viagem dos Sonhos',
    descricao: 'Abram o mapa, pesquisem fotos de um destino que ambos queiram muito conhecer e montem um itinerário imaginário completo com passeios e restaurantes.',
    categoria: 'Em casa',
    tempoMin: 50,
    custo: 'Grátis',
    dificuldade: 'Fácil',
    pontos: 60,
    icone: 'bi-geo-alt-fill'
  }
]);

// Exporta para o escopo global do navegador
window.DADOS_IDEIAS = DADOS_IDEIAS;
