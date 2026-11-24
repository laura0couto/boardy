/* Boardy – dados e comportamento do site */
const raiz = document.body.dataset.root || '';
const pagina = document.body.dataset.pag;
const $ = (s) => document.querySelector(s);

/* ---------- DADOS (troque pelos dados das entrevistas) ---------- */
const V = '[R$ VALOR]';
const PAISES = [
  {id:'canada', nome:'Canadá', cont:'América', idioma:'Inglês e francês', moeda:'Dólar canadense', visto:'Study Permit', prova:'IELTS / TOEFL'},
  {id:'eua', nome:'Estados Unidos', cont:'América', idioma:'Inglês', moeda:'Dólar americano', visto:'F-1 (estudante)', prova:'TOEFL / IELTS'},
  {id:'portugal', nome:'Portugal', cont:'Europa', idioma:'Português', moeda:'Euro', visto:'Visto de estudante (D4)', prova:'Não se aplica'},
  {id:'irlanda', nome:'Irlanda', cont:'Europa', idioma:'Inglês', moeda:'Euro', visto:'Visto de estudante', prova:'IELTS / TOEFL'},
  {id:'alemanha', nome:'Alemanha', cont:'Europa', idioma:'Alemão', moeda:'Euro', visto:'Visto de estudante', prova:'TestDaF / DSH'},
  {id:'australia', nome:'Austrália', cont:'Oceania', idioma:'Inglês', moeda:'Dólar australiano', visto:'Student visa (500)', prova:'IELTS / TOEFL / PTE'}
];
const BOLSAS = [
  {nome:'EducationUSA', nivel:'Orientação', desc:'Orientação gratuita para quem quer estudar nos EUA: escolha de curso, provas e bolsas.', info:'Destino: Estados Unidos · Inscrições até: [DATA]', link:'https://educationusa.state.gov'},
  {nome:'[Nome da bolsa de ensino médio]', nivel:'Ensino médio', desc:'[O que a bolsa cobre e quem pode se inscrever.]', info:'Destino: [País] · Inscrições até: [DATA]', link:'#'},
  {nome:'[Nome da bolsa de graduação]', nivel:'Graduação', desc:'[O que a bolsa cobre e quem pode se inscrever.]', info:'Destino: [País] · Inscrições até: [DATA]', link:'#'},
  {nome:'[Nome do curso de idiomas]', nivel:'Idiomas', desc:'[Duração, custo e se há desconto ou bolsa parcial.]', info:'Destino: [País] · Inscrições até: [DATA]', link:'#'}
];
const ETAPAS = [
  ['Escolher destino e curso','Use a página de destinos para comparar idioma e custos.'],
  ['Fazer a prova de idioma','Confira qual prova o país ou a escola aceita.'],
  ['Tirar o passaporte','Agende na Polícia Federal com antecedência.'],
  ['Se inscrever em bolsas e escolas','Veja prazos e documentos na página de bolsas.'],
  ['Receber a carta de aceite','Ela é necessária para pedir o visto.'],
  ['Pedir o visto de estudante','Separe comprovantes financeiros e documentos traduzidos.'],
  ['Organizar moradia e seguro saúde','Defina onde vai morar antes de comprar a passagem.']
];

/* ---------- TOPO E RODAPÉ (iguais em todas as páginas) ---------- */
const MENU = [['destinos','Destinos'],['bolsas','Bolsas'],['passo','Passo a passo'],['historias','Histórias']];
const arquivo = {destinos:'destinos', bolsas:'bolsas', passo:'passo-a-passo', historias:'historias'};
$('#topo').outerHTML = `<header class="topo">
  <a class="marca" href="${raiz}index.html">Boardy</a>
  <nav aria-label="Principal">${MENU.map(([k,t]) =>
    `<a href="${raiz}html/${arquivo[k]}.html" ${pagina===k||(k==='destinos'&&pagina==='pais')?'aria-current="page"':''}>${t}</a>`).join('')}</nav></header>`;
$('#rodape').outerHTML = `<footer>Boardy · Projeto Integrador · Davi, Heloisa, Julia, Laura e Manuela · Turma 1</footer>`;

/* ---------- INÍCIO (botão de dica) ---------- */
const DICAS = [
  'Comece pelo passaporte: a fila da Polícia Federal costuma ser a parte mais demorada.',
  'Confira sempre o prazo da bolsa no site oficial, porque as datas mudam todo ano.',
  'Antes de escolher o país, some moradia, comida e transporte, não só a mensalidade da escola.',
  'A prova de idioma tem validade. Faça perto da data em que você vai se inscrever.'
];
function iniciarInicio(){
  let i = 0;
  $('#dica').onclick = () => { $('#msg-dica').textContent = DICAS[i % DICAS.length]; i++; };
}

/* ---------- DESTINOS ---------- */
function iniciarDestinos(){
  let cont = 'Todos', busca = '';
  const grade = $('#grade');
  const desenhar = () => {
    const lista = PAISES.filter(p => (cont==='Todos'||p.cont===cont) && p.nome.toLowerCase().includes(busca));
    grade.innerHTML = lista.length ? lista.map(p => `
      <a class="pais" href="pais.html?p=${p.id}">
        <div class="capa">${p.nome}</div>
        <div class="info">${p.cont}<br>Idioma: ${p.idioma}<br>Custo médio mensal: ${V}<br><b>Ver detalhes</b></div></a>`).join('')
      : '<p class="vazio">Nenhum país encontrado. Tente outro nome ou continente.</p>';
  };
  document.querySelectorAll('.chip').forEach(b => b.onclick = () => {
    cont = b.dataset.c;
    document.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x === b));
    desenhar();
  });
  $('#busca').oninput = (e) => { busca = e.target.value.trim().toLowerCase(); desenhar(); };
  desenhar();
}

/* ---------- PÁGINA DO PAÍS ---------- */
function iniciarPais(){
  const id = new URLSearchParams(location.search).get('p');
  const p = PAISES.find(x => x.id === id);
  if(!p){ $('#conteudo').innerHTML = '<h1>País não encontrado</h1><p class="lead">Volte para a lista e escolha um destino.</p><p><a class="btn" href="destinos.html">Ver destinos</a></p>'; return; }
  document.title = `${p.nome} · Boardy`;
  $('#conteudo').innerHTML = `
    <a href="destinos.html">Voltar para destinos</a>
    <h1 style="margin-top:12px">${p.nome}</h1>
    <p class="lead">[Resumo curto: por que estudantes brasileiros escolhem ${p.nome}, com base nas entrevistas do grupo.]</p>
    <div class="fatos">
      <div><small>Idioma</small><strong>${p.idioma}</strong></div>
      <div><small>Moeda</small><strong>${p.moeda}</strong></div>
      <div><small>Visto de estudante</small><strong>${p.visto}</strong></div>
      <div><small>Prova de idioma aceita</small><strong>${p.prova}</strong></div>
    </div>
    <div class="dois">
      <section><h2>Quanto custa por mês</h2>
        <table><tr><td>Moradia</td><td>${V}</td></tr><tr><td>Alimentação</td><td>${V}</td></tr>
        <tr><td>Transporte</td><td>${V}</td></tr><tr><td><strong>Total aproximado</strong></td><td><strong>${V}</strong></td></tr></table>
        <p class="nota">Fonte: [SITE OFICIAL / PESQUISA DO GRUPO], atualizado em [DATA].</p></section>
      <aside class="lateral">
        <a class="btn" href="bolsas.html">Bolsas para este destino</a>
        <a class="btn claro" href="passo-a-passo.html">Como se preparar</a>
        <a class="btn claro" href="historias.html">Quem já foi</a></aside>
    </div>`;
}

/* ---------- BOLSAS ---------- */
function iniciarBolsas(){
  const lista = $('#lista');
  const desenhar = (nivel) => {
    lista.innerHTML = BOLSAS.filter(b => nivel==='Todos'||b.nivel===nivel).map(b => `
      <article class="item"><div><h3>${b.nome}<span class="tag">${b.nivel}</span></h3>
        <p>${b.desc}</p><p>${b.info}</p></div>
        <a class="btn" href="${b.link}" target="_blank" rel="noopener">Site oficial</a></article>`).join('')
      || '<p class="vazio">Ainda não há oportunidades neste nível.</p>';
  };
  document.querySelectorAll('.chip').forEach(b => b.onclick = () => {
    document.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x === b));
    desenhar(b.dataset.n);
  });
  desenhar('Todos');
}

/* ---------- PASSO A PASSO (progresso salvo no navegador) ---------- */
function iniciarPasso(){
  const CHAVE = 'boardy-etapas';
  let feitas = [];
  try { feitas = JSON.parse(localStorage.getItem(CHAVE)) || []; } catch(e){}
  $('#etapas').innerHTML = ETAPAS.map(([t,d],i) => `
    <label class="etapa"><input type="checkbox" data-i="${i}" ${feitas.includes(i)?'checked':''}>
      <span><strong>${i+1}. ${t}</strong><small>${d}</small></span></label>`).join('');
  const atualizar = () => {
    const n = document.querySelectorAll('#etapas input:checked').length;
    $('#contagem').textContent = `${n} de ${ETAPAS.length} etapas`;
    $('#barra').style.width = (n/ETAPAS.length*100) + '%';
    try { localStorage.setItem(CHAVE, JSON.stringify([...document.querySelectorAll('#etapas input:checked')].map(x => +x.dataset.i))); } catch(e){}
  };
  $('#etapas').onchange = atualizar;
  atualizar();
}

/* ---------- HISTÓRIAS ---------- */
function iniciarHistorias(){
  const esc = (s) => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  $('#envio').onsubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    $('#relatos').insertAdjacentHTML('afterbegin', `<article class="relato"><h3>${esc(f.get('nome'))}</h3>
      <small>${esc(f.get('pais'))}</small><p style="margin-top:8px">${esc(f.get('relato'))}</p></article>`);
    e.target.reset();
    $('#ok').textContent = 'História enviada. Obrigado por compartilhar!';
  };
}

({inicio:iniciarInicio, destinos:iniciarDestinos, pais:iniciarPais, bolsas:iniciarBolsas, passo:iniciarPasso, historias:iniciarHistorias})[pagina]?.();
