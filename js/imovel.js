

window.onload = function () {
var params = new URLSearchParams(window.location.search);
var codigo = params.get("codigo");

if (codigo) {
//wal("Código capturado: " + codigo);

sessionStorage.setItem('Coll_ID', codigo);
sessionStorage.setItem('Lista_IMV_Menu','GeralColl')
inicialIMV()
} else {
console.log("Nenhum código encontrado na URL.");
//wal("Código capturado: " + codigo);
}
};

// Tela Cheia
function toggleFullScreen() {
if ((document.fullScreenElement && document.fullScreenElement !== null) ||
(!document.mozFullScreen && !document.webkitIsFullScreen)) {
if (document.documentElement.requestFullScreen) {
document.documentElement.requestFullScreen();
} else if (document.documentElement.mozRequestFullScreen) {
document.documentElement.mozRequestFullScreen();
} else if (document.documentElement.webkitRequestFullScreen) {
document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
}
} else {
if (document.cancelFullScreen) {
document.cancelFullScreen();
} else if (document.mozCancelFullScreen) {
document.mozCancelFullScreen();
} else if (document.webkitCancelFullScreen) {
document.webkitCancelFullScreen();
}
}
}
//Data e Hora
setInterval(function() {
const newDate = new Date()
var dia = String(newDate.getDate()).padStart(2, '0');
var mes = String(newDate.getMonth() + 1).padStart(2, '0');
var ano = String(newDate.getFullYear()).padStart(2, '0')
var data = `${dia}/${mes}/${ano}`
const now = new Date();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
const seconds = now.getSeconds().toString().padStart(2, '0');
const timeString = `${hours}:${minutes}:${seconds}`;
//const lbl_data = document.getElementById('lbl-data');
//lbl_data.innerHTML = `${data}`
//localStorage.setItem('data', data)
sessionStorage.setItem('hora', timeString)
sessionStorage.setItem('data', data)
}, 1000)

//retornar
function casa(){
window.open('../index.html','_self')
}

// Iniciar Firebase
var firebaseConfig = {
apiKey: "AIzaSyDZXtGGNJwRYxy8EKAj85JFGLHfLD3DMbk",
authDomain: "rutimoveis-bc114.firebaseapp.com",
projectId: "rutimoveis-bc114",
storageBucket: "rutimoveis-bc114.firebasestorage.app",
messagingSenderId: "457038463744",
appId: "1:457038463744:web:e357570db0a9a6ce3529e5",
measurementId: "G-K330CH24NV"
};
firebase.initializeApp(firebaseConfig);
//////////////////////////////////////////////////////////

//Dados Admin Password
var dbp= firebase.firestore();
dbp.collection('Password').doc('passwords').get().then((doc)=>{
if(doc){
var dados=doc.data()
var dados=doc.data()
sessionStorage.setItem('Pasword', dados.Senha);
sessionStorage.setItem('Pasword2', dados.Master1);
sessionStorage.setItem('Pasword3', dados.Master2);
sessionStorage.setItem('TelefoneAdmin', dados.Telefone);
sessionStorage.setItem('EmailAdmin', dados.Email)
}
})


document.getElementById('divVenda').style.display='none';
document.getElementById('divlocaçao').style.display='none';
document.getElementById('divIptu').style.display='none';
document.getElementById('divCond').style.display='none';

function abrirCarrosselSwal(imagens) {
Swal.fire({
title: '',
html: `
<div id="swal_carrossel" style="position:relative;overflow:hidden;width:100%;max-width:1200px;">
<div id="swal_faixa" style="display:flex;transition:transform 0.5s ease;">
${imagens.map(src => `<img src="${src}" style="width:100%;flex-shrink:0;">`).join('')}
</div>
<button id="swal_prev" style="position:absolute;top:50%;left:10px;">◀</button>
<button id="swal_next" style="position:absolute;top:50%;right:10px;">▶</button>
</div>
`,
showCloseButton: true,  
showConfirmButton: false,
width: '100%',
background: '#000',
customClass: {
popup: 'my-custom_carrocel' // Aplica a classe CSS personalizada
},
didOpen: () => {
let index = 0;
const faixa = document.getElementById('swal_faixa');
const total = faixa.children.length;
document.getElementById('swal_next').onclick = () => {
if (index < total - 1) index++;
faixa.style.transform = `translateX(-${index * 100}%)`;
};
document.getElementById('swal_prev').onclick = () => {
if (index > 0) index--;
faixa.style.transform = `translateX(-${index * 100}%)`;
};
}
});
document.getElementById('swal_faixa').addEventListener('dblclick',function(){
Swal.close()
}) 
}

async function inicialIMV() {
var resp = sessionStorage.getItem('Coll_ID');
var resp2 = sessionStorage.getItem('Lista_IMV_Menu');
var db = firebase.firestore();

const doc = await db.collection(resp2).doc(resp).get();
if (!doc.exists) return;

var dados = doc.data();
sessionStorage.setItem('Coll_ID', dados.Código);
sessionStorage.setItem('Lista_IMV_Menu', dados.Coll_Lista)
sessionStorage.setItem('Lista_IMV_Titulo', dados.Titulo)
// --- MAPA ---
var map = L.map('map', {
zoomControl: false // remove o controle padrão
}).setView([-23.5505, -46.6333], 12);
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png (mais limpo)', {
attribution: '© OpenStreetMap contributors, Tiles style HOT'
}).addTo(map);

L.control.zoom({
position: 'bottomright' // opções: 'topleft', 'topright', 'bottomleft', 'bottomright'
}).addTo(map);
// 1. Buscar endereço pelo CEP no ViaCEP
async function buscarEnderecoPorCEP(cep) {
const url = `https://viacep.com.br/ws/${cep}/json/`;
const response = await fetch(url);
const data = await response.json();
if (data.erro) return null;
return data; // logradouro, bairro, localidade, uf
}

// 2. Buscar coordenadas no Nominatim usando endereço completo
async function enderecoToCoords(endereco, bairro, cidade, uf, cep) {
const url = `https://nominatim.openstreetmap.org/search?street=${encodeURIComponent(endereco)}&neighbourhood=${encodeURIComponent(bairro)}&city=${encodeURIComponent(cidade)}&state=${encodeURIComponent(uf)}&postalcode=${cep}&country=Brazil&format=json`;
const response = await fetch(url);
const data = await response.json();
if (data.length > 0) {
return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}
return null;
}
// 3. Fluxo: CEP -> Endereço -> Coordenadas -> Mapa
if (dados.CEP) {
const endereco = await buscarEnderecoPorCEP(dados.CEP);
if (endereco) {
const coords = await enderecoToCoords(endereco.logradouro, endereco.bairro, endereco.localidade, endereco.uf, dados.CEP);
if (coords) {
L.marker([coords.lat, coords.lng])
.addTo(map)
.bindPopup(`Imóvel - CEP: ${dados.CEP}`)
.openPopup();
map.setView([coords.lat, coords.lng], 16);
} else {
console.error("Não foi possível localizar coordenadas para o CEP:", dados.CEP);
}
} else {
console.error("CEP inválido ou não encontrado:", dados.CEP);
}
}
// --- CAMPOS DE TEXTO ---
document.getElementById('h1_titulo').innerHTML = dados.Titulo;
document.getElementById('titulo').innerHTML = dados.Titulo;
document.getElementById('h3_subtitulo').innerHTML = dados.SubTitulo;
document.getElementById('h2Apresent').innerHTML = dados.Titulo;
document.getElementById('h3codigo').innerHTML = dados.Código;
document.getElementById('div1_p2').innerHTML = dados.Tranzação;
document.getElementById('div3_p2').innerHTML = `${dados.Cidade} - ${dados.UF}`;
document.getElementById('div4_p2').innerHTML = dados.Bairro;
document.getElementById('div5_p2').innerHTML = dados.Rua;
document.getElementById('divOBS').innerHTML = dados.OBS || '';
document.getElementById('div9_p2').innerHTML = dados.Piscinas ? `${dados.Piscinas} m²` : '';
document.getElementById('div10_p2').innerHTML = dados.CEP || '';
document.getElementById('div11_p2').innerHTML = dados.Suites || '';
if( !dados.CEP|| dados.CEP===''){
document.getElementById('map').style.display='none'
}
if (dados.Area_Const) {
document.getElementById('inf_metragem').innerHTML = `${dados.Area_Const} m²`;
document.getElementById('div2_p2').innerHTML = `${dados.Area_Const} m²`;
}
if (dados.Quartos && dados.Quartos !== '0') {
document.getElementById('inf_quartos').innerHTML = `${dados.Quartos} quartos`;
document.getElementById('div6_p2').innerHTML = dados.Quartos;
}
if (dados.Suites && dados.Suites !== '0') {

document.getElementById('div11_p2').innerHTML = dados.Suites;
}
if (dados.Banheiros && dados.Banheiros !== '0') {
document.getElementById('inf_banheiros').innerHTML = `${dados.Banheiros} banh.`;
document.getElementById('div7_p2').innerHTML = dados.Banheiros;
}
if (dados.Vagas_G && dados.Vagas_G !== '0') {
document.getElementById('inf_vagas').innerHTML = `${dados.Vagas_G} vagas`;
document.getElementById('div8_p2').innerHTML = dados.Vagas_G;
}

if (dados.Valor_Venda && dados.Valor_Venda.trim() !== "R$ 0,00") {
document.getElementById('h3Venda').innerHTML = dados.Valor_Venda;
document.getElementById('divVenda').style.display = 'block';
}
if (dados.Valor_Locação && dados.Valor_Locação.trim() !== "R$ 0,00") {
document.getElementById('h3Locação').innerHTML = dados.Valor_Locação;
document.getElementById('divlocaçao').style.display = 'block';
}
if (dados.Valor_IPTU && dados.Valor_IPTU.trim() !== "R$ 0,00") {
document.getElementById('h3IPTU').innerHTML = dados.Valor_IPTU;
document.getElementById('divIptu').style.display = 'block';
}
if (dados.Valor_Condominio && dados.Valor_Condominio.trim() !== "R$ 0,00") {
document.getElementById('h3Cond').innerHTML = dados.Valor_Condominio;
document.getElementById('divCond').style.display = 'block';
}
// --- IMAGENS ---
var container = document.getElementById('faixa_imagens');
let imagens = [];
for (let i = 1; i <= 10; i++) {
let campo = "Imagem" + i;
if (dados[campo]) {
let img = document.createElement('img');
imagens.push(dados[campo]);
img.src = dados[campo];
img.alt = "Imagem " + i;
container.appendChild(img);
img.addEventListener('click', () => abrirCarrosselSwal(imagens));
}
}
// Navegação do carrossel
let index = 0;
const total = container.children.length;
document.getElementById('btn_next').onclick = () => {
if (index < total - 1) index++;
container.style.transform = `translateX(-${index * 100}%)`;
document.getElementById('img_count').innerText = index === 9 ? "Ultima" : index + 1;
};
document.getElementById('btn_prev').onclick = () => {
if (index > 0) index--;
container.style.transform = `translateX(-${index * 100}%)`;
document.getElementById('img_count').innerText = index + 1;
};
}
setTimeout(function(){
inicialIMV();
},300)

var resp=sessionStorage.getItem('Coll_ID');
var resp2=sessionStorage.getItem('Lista_IMV_Menu');
var resp3= sessionStorage.getItem('Transação_IMV_Menu');
//alert(`Titulo: ${resp} - SubT: ${resp2}`)
var input = document.getElementById('input_pesquisa');
input.addEventListener('mouseover', () => {
input.focus();
});

//ir para o topo
document.getElementById('Topo_Página').addEventListener('click',function(){
document.getElementById('a_topo').click()
})


sessionStorage.setItem('itens','')
function Pesquisar() {
sessionStorage.setItem('itens','')
var termo = document.getElementById("input_pesquisa").value.toLowerCase().trim();

if (!termo) {
Swal.fire('', 'Preencha o campo de pesquisa!', '')
return;
} else{

//  sessionStorage.setItem('Coll_ID', data.Código);
//sessionStorage.setItem('Lista_IMV_Menu', data.Coll_Lista);
// sessionStorage.setItem('Transação_IMV_Menu', ''  );
sessionStorage.setItem('Termo', termo)
window.open('../html/pesquisa.html','_self')
}
}


// WhatsApp
function WhatsApp(){
var telefone =sessionStorage.getItem('TelefoneAdmin');
var numero = `+55${telefone}`; // Substitua pelo número de destino, incluindo o código do país
var url = "https://wa.me/"+`${numero}?text= Pedido de contato com corretora Rute - (Rutimóveis)`;
window.open(url, "_blank");
Swal.fire(``,`WhatsApp`,'success')     
}

//Email
function Email(){
  var destinatario = sessionStorage.getItem('EmailAdmin');
  var assunto = "Rutimóveis contato";
  var corpo = "Olá, gostaria de mais informações.";
  var isMobile = /Android|iPhone/i.test(navigator.userAgent);
  if(isMobile){
    window.location.href = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  } else {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`,"_blank");
  }
}

function comp(){
var cod=sessionStorage.getItem('Coll_ID');
var lista= sessionStorage.getItem('Lista_IMV_Menu')
var titulo=sessionStorage.getItem('Lista_IMV_Titulo')
var pag = `https://rutimoveis.netlify.app/html/imovel.html/?codigo=${cod}`
var url = "https://rutimoveis.netlify.app/";
var Titulo = `${titulo}: ${pag}`;
var whatsappMessage =`\n\n🏡 ${Titulo} \n\n Código: ${cod}`;
var whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
window.open(whatsappLink, "_blank");

}



