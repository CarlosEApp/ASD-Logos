
// supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = "https://byuckhoakmjtidcsmqzd.supabase.co"
const SUPABASE_KEY = "sb_publishable_kz_65I4tRCLRJumF86S8Rw_mqeNHunn"
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const inputFile = document.getElementById('fileInput')
const imgPreview = document.getElementById('imagemLogo')
////////////////////////////////////////////////////////////////////////////////////////////////////////

// Tela Cheia
document.getElementById('togle_').addEventListener('click', function(){ 
  document.getElementById('togle').click();
})
document.getElementById('togle').addEventListener('click', function(){ 
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
})
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

// Iniciar Firebase
var firebaseConfig = {
apiKey: "AIzaSyBPGPu0CdS91NzU_mTGb9FhtFffibwugjg",
authDomain: "asd-logos.firebaseapp.com",
projectId: "asd-logos",
storageBucket: "asd-logos.firebasestorage.app",
messagingSenderId: "136830435023",
appId: "1:136830435023:web:427f5861290a32fdb281ba",
measurementId: "G-DJ8FR4RN1J"
};
firebase.initializeApp(firebaseConfig);
//////////////////////////////////////////////////////////

// Ir para Tela de Cadastro


// select Material
document.getElementById('select_Material').addEventListener('change',function(){
  document.getElementById('select_Departamentos').value=''
  var color2=document.getElementById('select_Departamentos');
color2.style.backgroundColor='aliceblue'
color2.style.color='black';
var resp=document.getElementById('select_Material').value;
var color=document.getElementById('select_Material');

if(!resp||resp==''|| resp=='sair'){
color.style.backgroundColor='aliceblue'
color.style.color='black';
document.getElementById('select_Material').value= '';
document.getElementById('select_Departamentos').disabled=true;
//document.getElementById('divCadastro').style.display='none'


}else{
color.style.backgroundColor='red'
color.style.color='aliceblue'
document.getElementById('select_Departamentos').disabled=false;


//document.getElementById('a_cadastro').click()
//document.getElementById('divCadastro').style.display='block'
//document.getElementById('div_Cadastrados').style.display='none';

}
});


// select departamentos
document.getElementById('select_Departamentos').disabled=true;
document.getElementById('select_Departamentos').addEventListener('change',function(){
var resp2=document.getElementById('select_Departamentos').value;
var color2=document.getElementById('select_Departamentos');

if(!resp2||resp2==''|| resp2=='sair'){
color2.style.backgroundColor='aliceblue'
color2.style.color='black';
document.getElementById('select_Departamentos').value= '';
//document.getElementById('divCadastro').style.display='none'
}else{
color2.style.backgroundColor='red'
color2.style.color='aliceblue'
//document.getElementById('a_cadastro').click()
//document.getElementById('divCadastro').style.display='block'
//document.getElementById('div_Cadastrados').style.display='none';
var resp2=document.getElementById('select_Departamentos').value;
var resp1=document.getElementById('select_Material').value;
sessionStorage.setItem('ListadEPART', resp2)
document.getElementById(`${resp1}`).click()

}
});
function resetSelects() {
document.getElementById('select_Material').value= '';
document.getElementById('select_Departamentos').value='';
sessionStorage.setItem('ListadEPART', '')

document.getElementById('select_Departamentos').disabled=true;
var cor=document.getElementById('select_Departamentos');
cor.style.backgroundColor='aliceblue';
cor.style.color='black';
 var cor2=document.getElementById('select_Material');
cor2.style.backgroundColor='aliceblue';
 cor2.style.color='black';
}
resetSelects()

// video novo tempo
function videosDevos(){
var hora=sessionStorage.getItem('hora')
var data= sessionStorage.getItem('data')
//Devocional
var vdD= firebase.firestore()
var produtosRef = vdD.collection("Videos-ASD");
produtosRef.get().then((querySnapshot) => {
querySnapshot.forEach((doc) => {
var doc = doc.data();   // dados do documento       // ID do documento
var itens = querySnapshot.size;
var urlDev=doc.Video;
var result= urlDev.trim();
document.getElementById('UrlNVT').src="https://www.youtube.com/embed/"+ result;
//document.getElementById('h3_UrlNVT').innerHTML=`${doc.Nome}`
//document.getElementById('lblHoraDevo').innerHTML=`AT: ${doc.Data_Atualizada}`
document.getElementById('rec2').src=doc.Imagem01;
})
})
};

function imgDevos(){
var imgdb= firebase.firestore()
var produtosRef = imgdb.collection("Imagem-ASD");
produtosRef.get().then((querySnapshot) => {
querySnapshot.forEach((doc) => {
var doc = doc.data();   // dados do documento       // ID do documento
var itens = querySnapshot.size;
//document.getElementById('lblHoraDevo').innerHTML=`AT: ${doc.Data_Atualizada}`
document.getElementById('img_rec5').src=doc.Imagem01;
//document.getElementById('h3_UrlRec5').innerHTML=doc.Nome01;

document.getElementById('img_rec3').src=doc.Imagem02;
//document.getElementById('h3_UrlRec3').innerHTML=doc.Nome02;

document.getElementById('img_rec4').src=doc.Imagem03;
//document.getElementById('h3_UrlRec4').innerHTML=doc.Nome03;

document.getElementById('img_rec2').src=doc.Imagem04;
//document.getElementById('h3_UrlRec2').innerHTML=doc.Nome04;
})
})
}
imgDevos()
videosDevos()

//Botão frente e traz recomendados
var container = document.getElementById('div_rec_flex');

document.getElementById('scrollLeft').addEventListener('click', function(){
container.scrollBy({ left: -300, behavior: 'smooth' });
})

document.getElementById('scrollRight').addEventListener('click', function(){
container.scrollBy({ left: 300, behavior: 'smooth' });
})

// planet of chrit
document.getElementById('rec5').addEventListener('click',function(){
window.open('https://www.youtube.com/@PlanetofChrist','_self')
});

//Bazar dos Desbravadores
document.getElementById('rec3').addEventListener('click',function(){
window.open('https://www.bazardosdesbravadores.com.br/','_self')
});

// Instagram 8ªRegião
document.getElementById('rec4').addEventListener('click',function(){
window.open('https://www.instagram.com/8regiao.apse/','_self')
});

// DEsbrava 7 materias
document.getElementById('rec2').addEventListener('click',function(){
window.open('https://desbrava7.com/','_self')
});

// Ir para o Topo
document.getElementById('I_Casa').addEventListener('click', function(){
document.getElementById('topo').click()
});


//Menu Lateral
sessionStorage.setItem('MENULateral', '')
var BTN = document.getElementById('menu');
//BTN.className = 'fa-solid fa-bars'
document.getElementById('menu').addEventListener('click', function(){
 
var BTN = document.getElementById('menu');
var MENU_ = sessionStorage.getItem('MENULateral')
if (!MENU_ || MENU_ == '') {
BTN.className = 'fa-solid fa-delete-left'
sessionStorage.setItem('MENULateral', 'Aberto')
document.getElementById("menu_lateral").classList.add("menu-ativo");
} else {
BTN.className = 'fa-solid fa-bars'
sessionStorage.setItem('MENULateral', '')
document.getElementById("menu_lateral").classList.remove("menu-ativo");
}
})

//fechar Menu
// Seleciona todos os <a> dentro do menu
var links = document.querySelectorAll('#menu_lateral a');
links.forEach(link => {
link.addEventListener('click', function(event) {
event.preventDefault(); // evita navegação imediata
//alert(`Você clicou em:', ${this.textContent}`);
//alert('Href:', this.getAttribute('href'));
document.getElementById('menu').click()
});
});

//login google
function loginComGoogle() {
  var lblG=document.getElementById('labellogarLater');
var lognome= localStorage.getItem('GoogleNome')
var logEmail= localStorage.getItem('GoogleEmail')
var hora=sessionStorage.getItem('hora')
var data=sessionStorage.getItem('data')
if(!lognome||lognome==''||!logEmail||logEmail==''){

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
auth.signInWithPopup(provider)
.then((result) => {
const user = result.user;
//console.log("Nome:", user.displayName);
//console.log("Email:", user.email);
//console.log("Foto:", );
 localStorage.setItem('GoogleFoto',user.photoURL)
 localStorage.setItem('GoogleEmail',user.email);
 localStorage.setItem('GoogleNome',user.displayName);
var nome_= user.displayName
var resp=nome_.split(' ');
var nome1=resp[0]
var nome2= resp[1]
var Usuário=`${nome1}`;

document.getElementById('lblUser').innerHTML=`Olá, ${nome1}`;
document.getElementById('lblnomeUser').innerHTML=`Olá, ${nome1}`;
localStorage.setItem('GoogleNome_Abreviado', `${Usuário}`)
document.getElementById('imgMenuUser').src=`${user.photoURL}`;
document.getElementById('imgUser').src=`${user.photoURL}`;

var ddg= firebase.firestore()
ddg.collection('UsuáriosGoogle').doc(`${user.email}`).set({
Nome:user.displayName,
Email:user.email,
Foto:user.photoURL,
NomeAbrev:Usuário,
Logado:'Logao',
Data:data,
Hora:hora,
})
})
.catch((error) => {
console.error("Erro ao autenticar:", error);
})
}
}

//loginComGoogle() 
function iniciarUserFirebase(){
var foto= localStorage.getItem('GoogleFoto')
var emailUser= localStorage.getItem('GoogleEmail');
var nomeUser= localStorage.getItem('GoogleNome');
if(emailUser){
var dbif= firebase.firestore()
dbif.collection('UsuáriosGoogle').doc(emailUser).get().then((doc=>{
if(doc){
var doc =doc.data()

document.getElementById('lblUser').innerHTML=`Olá, ${doc.NomeAbrev}`;
document.getElementById('lblnomeUser').innerHTML=`Olá, ${doc.NomeAbrev}`;;
document.getElementById('imgMenuUser').src= doc.Foto;
document.getElementById('imgUser').src= doc.Foto;
}else{
alert(`Nome: ${doc.Usuário}`)
}
}))
}
}
iniciarUserFirebase()

document.getElementById('sobre').addEventListener('click', function() { 
document.getElementById('a_sobre').click()
})

//pasword
//Dados Admin Password
var dbp= firebase.firestore();
dbp.collection('Password').doc('passwords').get().then((doc)=>{
if(doc){
var dados=doc.data()
sessionStorage.setItem('Pasword', dados.Senha);
sessionStorage.setItem('Pasword2', dados.Master1);
sessionStorage.setItem('Pasword3', dados.Master2);
sessionStorage.setItem('TelefoneAdmin', dados.Telefone);
sessionStorage.setItem('EmailAdmin', dados.Email)

}
})
//Administração
document.getElementById('admin').addEventListener('click', function() { 
pasword()
})
document.getElementById('Admin').addEventListener('click', function() { 
pasword()
})

function pasword(){
Swal.fire({ 
title: ``,
text: ``, 
html:`
<div id="administrar">
<h2>Administradores</h2>
<label id="lblAd">digíte sua senha de administrador <br>
<input id="inputAD" type="password" placeholder="Password">  <i id='iPasWord' class="fa-solid fa-eye"></i>
</label> <br>
<button id="entrebtn" o">Click enter</button>
</div> 
`,
imageUrl: ``,
background: '#ffffff00',
color: '#a7a7a7', // cor do texto });
showCloseButton: true,   // habilita o "X"
allowOutsideClick: false,
showConfirmButton: false,
customClass: {
popup: 'my-admin' // Aplica a classe CSS personalizada
},
didOpen: () => {
document.body.style.paddingRight = '0px';   
}
})
document.getElementById('iPasWord').addEventListener('click',function(){
var ii= document.getElementById('iPasWord');
var iPW= document.getElementById('inputAD');
if(iPW.type=='password'){
iPW.type='text'
ii.className='fa-solid fa-eye-low-vision';
} else{
iPW.type='password';
ii.className='fa-solid fa-eye';
}
});
document.getElementById("entrebtn").addEventListener('click',function(){
var resp1= sessionStorage.getItem('Pasword')
var resp2= sessionStorage.getItem('Pasword2')
var resp3= sessionStorage.getItem('Pasword3')

var pass = document.getElementById('inputAD').value;
if(pass== resp1|| pass== resp2 || pass== resp2){
swal('Sucesso','Você seráredirecionado(a)!\n (Tela de cadastros!)','success');
setTimeout(function(){
window.open('HTML/Cadastro.html','_self')
Swal.close()
},2000)
}else{
swal('Senha incorreta!','','error');
}
})
};

function deslogar(){
localStorage.setItem('GoogleFoto','')
localStorage.setItem('GoogleEmail','');
localStorage.setItem('GoogleNome','');
}

// foto user + editar
document.getElementById('divUser').addEventListener('click', function(){
document.getElementById('imgMenuUser').click()
});
document.getElementById('imgMenuUser').addEventListener('click', function(){
var conf= localStorage.getItem('GoogleFoto')
var logEmail = localStorage.getItem('GoogleEmail');
if(!conf|| conf==''||!logEmail|| logEmail==''||conf==null||logEmail==null){
// Swal.fire('','Você Precisa se conectar com sua conta do Google!','')
loginComGoogle()
}else{

Swal.fire({
title: `Perfil`,
html: `
<img id='imimg' src="" alt="" width="280"> <br>
<label id='nomeUserCuston' >User</label><br>
<label id='EmailUserCuston' >Email</label><br>
<br><label id='deslogar' style="cursor:pointer">Desconectar conta</label>
`,
background: 'hsl(0, 0%, 100%)',
color: '#0e0e0e',
showCloseButton: true,
showConfirmButton: false,
customClass: { popup: 'my-custom_img' },
didOpen: () => { document.body.style.paddingRight = '0px'; }
});

document.getElementById('imimg').src=conf;
document.getElementById('EmailUserCuston').innerHTML=logEmail

var nome= localStorage.getItem('GoogleNome_Abreviado')
document.getElementById('nomeUserCuston').innerHTML= `Olá, ${nome}`;

// Quando clicar em "Trocar de foto"
document.getElementById('deslogar').addEventListener('click', function(){
deslogar()
window.location.reload()
});
}
});

//lista inicial (inicia com logos)

sessionStorage.setItem('MAis',12)
 var respItens=0
 var init=0
sessionStorage.setItem('ListaCadVL', '')

var escolha = document.querySelectorAll('#escolhaFlex p');
escolha.forEach(link => {

link.addEventListener('click', function(event) {
event.preventDefault(); // evita navegação imediata
//alert(`Você clicou em:', ${this.textContent}`);
//alert('Href:', this.getAttribute('href'));
document.getElementById('h2Material').innerHTML=`Material`;


sessionStorage.setItem('ListaCadVL', this.title)

var departamento= sessionStorage.getItem('ListadEPART')

if(init>=1){

  var largura = window.innerWidth;
  if (largura >=  1100) {
    // Exemplo: resolução de celular
    document.getElementById("a_escolha").click();
  } else {
    // Exemplo: resolução de desktop
    document.getElementById("a_divEscolha").click();
  }
}else{
init++
}


var itens= 0

var respItens= sessionStorage.getItem('MAis')
if(!respItens||respItens==''){
 var respItens=1
}else{
 var respItens=sessionStorage.getItem('MAis')
}

var list= document.getElementById('list');
list.innerHTML=''

var db=firebase.firestore();
var produtosRef = db.collection(`Cadastros-Gerais`);
produtosRef.get().then((querySnapshot) => {
querySnapshot.forEach(doc => {
var doc = doc.data();
var itemss= querySnapshot.size;

if(this.title==doc.Lista|| this.title=='Diversos'){
  if(departamento==doc.Departamento|| departamento==''){
itens++
 if(itens<=respItens){

var geraldiv= document.createElement('div'); geraldiv.className='geraldiv';
var logoDiv= document.createElement('div'); logoDiv.className='logoDiv';
var labelDiv= document.createElement('div'); labelDiv.className='labelDiv'
var botãoDiv= document.createElement('div'); botãoDiv.className='botãoDiv';

var h2List= document.createElement('h2'); h2List.className='h2List';
h2List.textContent=doc.Titulo;

var imgList= document.createElement('img'); imgList.className='imgList';
imgList.src=doc.Imagem;

var imgCanva=document.createElement('img'); imgCanva.className='imgCanva';
imgCanva.src='SRC/logoCanva.png'; 

var labelList= document.createElement('label'); labelList.className='labelList';
labelList.textContent= doc.Subtitulo;
var labelList2= document.createElement('label'); labelList2.className='labelList2';
labelList2.textContent= doc.Codigo_ID
var labelList3= document.createElement('label');  labelList3.className='labelList3';

var botãoCanva= document.createElement('button'); botãoCanva.id='botãoCanva'; botãoCanva.title='Editar no Canva';
var botãoCompart= document.createElement('button'); botãoCompart.id='botãoCompart'; botãoCompart.title='Campartilhar imagem';
var botãoBaixar= document.createElement('button'); botãoBaixar.id='botãoBaixar'; botãoBaixar.title='Download da imagem';

botãoBaixar.className='fa-solid fa-download';
botãoCompart.className='fa-solid fa-share-nodes'

geraldiv.appendChild(h2List);

logoDiv.appendChild(imgList);

botãoCanva.appendChild(imgCanva);
labelDiv.appendChild(labelList);
labelDiv.appendChild(labelList2);
labelDiv.appendChild(labelList3);

botãoDiv.appendChild(botãoCanva);
botãoDiv.appendChild(botãoCompart);
botãoDiv.appendChild(botãoBaixar);

geraldiv.appendChild(logoDiv);
geraldiv.appendChild(labelDiv);
geraldiv.appendChild(botãoDiv);

list.appendChild(geraldiv)

document.getElementById('h2Material').innerHTML=`${this.textContent} (${itens})`; ;
resetSelects()
if(itens< respItens){
document.getElementById('lblVerMais').style.display='none'
}else{
document.getElementById('lblVerMais').style.display='block'
}

// Botaõ Canva
botãoCanva.addEventListener('click', function(){
 Swal.fire('','Em breve nova função!')
});


//Botão Imagem
imgList.addEventListener('click',function(){

Swal.fire({
title: `Perfil`,
html: `
<img id='LogoIMG' src="" alt="" width="280"> <br>
<h2 id='TituloCustonn' >Titulo</h2>
<p id='SubTituloCustonn' >SubTitulo</p><br>
<p id='OBSCustonn' >SubTitulo</p><br><br>
`,
background: 'hsl(0, 0%, 100%)',
color: '#0e0e0e',
showCloseButton: true,
showConfirmButton: false,
customClass: { popup: 'my-custom_img' },
didOpen: () => { document.body.style.paddingRight = '0px'; }
});


if(doc.Lista=='logos'){
document.querySelector('.my-custom_img h2').innerHTML='Logo'
} else if(doc.Lista=='Animes'){
  document.querySelector('.my-custom_img h2').innerHTML='Animação'
} else if(doc.Lista=='GIF'){
  document.querySelector('.my-custom_img h2').innerHTML='GIF'
} else if(doc.Lista=='trunfos'){
  document.querySelector('.my-custom_img h2').innerHTML='Trunfo'
} else if(doc.Lista=='Emojis'){
  document.querySelector('.my-custom_img h2').innerHTML='Emoji'
} else if(doc.Lista=='desing'){
  document.querySelector('.my-custom_img h2').innerHTML='desing'
} 

document.getElementById('LogoIMG').src=doc.Imagem;
document.getElementById('TituloCustonn').innerHTML=doc.Titulo;
document.getElementById('SubTituloCustonn').innerHTML=doc.SubTitulo;
document.getElementById('OBSCustonn').innerHTML= `<b id='b_custon'> Observações </b>:\n${doc.OBS}`;

// Quando clicar em "Trocar de foto"
document.getElementById('deslogar').addEventListener('click', function(){
deslogar()
window.location.reload()
})
})

// BAIXAR
botãoBaixar.addEventListener('click', async function() {
try {
// pega a URL da imagem cadastrada
const url = doc.Imagem;  

// baixa via fetch para forçar download
const response = await fetch(url, { mode: 'cors' });
const blob = await response.blob();
const urlBlob = URL.createObjectURL(blob);

const a = document.createElement('a');
a.href = urlBlob;
a.download = `${doc.Titulo || 'arquivo'}.png`; // nome do arquivo
document.body.appendChild(a);
a.click();
document.body.removeChild(a);

URL.revokeObjectURL(urlBlob);

// 🔥 Salva no Firestore quem baixou
const userId = localStorage.getItem("userId") || crypto.randomUUID();
localStorage.setItem("userId", userId);

await firebase.firestore().collection("downloads").add({
userId: userId,
arquivo: doc.Titulo,
SubTitulo: doc.SubTitulo,
imagemUrl: doc.Imagem,
data: new Date().toISOString()
});

console.log("Download registrado no Firebase!");
} catch (error) {
console.error('Erro ao baixar imagem:', error);
alert('Falha ao baixar imagem.');
}
});

// COMPARTILHAR
botãoCompart.addEventListener('click', async function() {
try {
// monta a mensagem para WhatsApp
var pag = `https://Link/?codigo=${doc.Codigo_ID}`;
var url = "https://asd-logos.netlify.app/";
var titulo = `${doc.SubTitulo}: ${url}`;
var cod = `${doc.Codigo_ID}`;
var whatsappMessage = `${titulo}\n\nCódigo: ${cod}`;
var whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

// abre o WhatsApp com a mensagem
window.open(whatsappLink, "_blank");

// 🔥 registra no Firestore
const userId = localStorage.getItem("userId") || crypto.randomUUID();
localStorage.setItem("userId", userId);

await firebase.firestore().collection("compartilhamentos").add({
userId: userId,
arquivo: doc.Titulo,
SubTitulo: doc.SubTitulo,
imagemUrl: doc.Imagem,
codigo: doc.Codigo_ID,
data: new Date().toISOString()
});

console.log("Compartilhamento registrado no Firebase!");
} catch (error) {
console.error("Erro ao compartilhar:", error);
alert("Falha ao compartilhar.");
}
});
}
}
}
})
})
});
});

document.getElementById('Diversos').click()

document.getElementById('lblVerMais').addEventListener('click', function(){
  var numero= sessionStorage.getItem('MAis')
  var num= Number(numero)+Number(12);
sessionStorage.setItem('MAis',num)
//alert(`Itens: ${num}`)
  var resp= sessionStorage.getItem('ListaCadVL')
 // alert(resp)
document.getElementById(`${resp}`).click()
});









//Clicar em PDFs

document.getElementById('divPDF1').addEventListener('click', function(){
  window.open('https://drive.google.com/file/d/1rshhuB0oTPJI2n_5nLuftlJkGwQUrtL7/view','_blank')
});


document.getElementById('divPDF2').addEventListener('click', function(){
  window.open('https://drive.google.com/file/d/16CIMKv4zwNOzv0xlLIuJtPYDIvzKBuw9/view','_blank')
});


document.getElementById('divPDF3').addEventListener('click', function(){
  window.open('https://drive.google.com/file/d/1-m9dqEu3ZVm1nqpLjGxj3oda80OCEnOx/view','_blank')
});

document.getElementById('divPDF4').addEventListener('click', function(){
  window.open('https://drive.google.com/file/d/1d0fIwcwyaYI_sJe2BJw5mFn_ITD1sCve/view','_blank')
});

document.getElementById('divPDF5').addEventListener('click', function(){
  window.open('https://drive.google.com/file/d/14WMnv-pnhBDei6MM0O4P5BDf_QPDyQum/view','_blank')
});

/*document.getElementById('divPDF6').addEventListener('click', function(){
  window.open('','_blank')
});

document.getElementById('divPDF7').addEventListener('click', function(){
  window.open('','_blank')
});

document.getElementById('divPDF8').addEventListener('click', function(){
  window.open('','_blank')
});

document.getElementById('divPDF9').addEventListener('click', function(){
  window.open('','_blank')
});

document.getElementById('divPDF10').addEventListener('click', function(){
  window.open('','_blank')
});

document.getElementById('divPDF11').addEventListener('click', function(){
  window.open('','_blank')
});

document.getElementById('divPDF12').addEventListener('click', function(){
  window.open('','_blank')
});
*/




//sessionStorage.setItem('SeçãoAberta','')
//inicio progresso
function initPage(){
var resp=sessionStorage.getItem('SeçãoAberta')
if(!resp|| resp==''){
Swal.fire({ 
title: ``,
text: ``, 
html:`
<div id='btnTime_'>
<img src="SRC/LOGO.png" alt="" class="logo-swal" width="55%"></div>
<div id="divInit"> 
<button id='btnTime'></button> 
<div id="myProgresos" title="Progresos">
<div id="myBarr">10%</div>
</div>
</div>
`,
imageUrl: ``,
background: '#00203300',
color: '#fff', // cor do texto });
allowOutsideClick: false,
showConfirmButton: false,
customClass: {
popup: 'my-customTime' // Aplica a classe CSS personalizada
},
didOpen: () => {
document.body.style.paddingRight = '0px';   
}
})
document.getElementById('myProgresos').style.display = 'block'
var i = 0;
if (i == 0){
i = 1;
var elem = document.getElementById("myBarr");
var width = 1;
var id = setInterval(frame, 77);
function frame() {
if (width >= 100) {
i = 0;
sessionStorage.setItem('SeçãoAberta','Aberta')
document.getElementById('myProgresos').style.display = 'none'
document.getElementById('topo').click()
swalclose()
clearInterval(id)
//document.getElementById('imgcad').value = `${url_imagem}`
} else {
width++;
elem.style.width = width + "%";
elem.innerHTML = width + "%"; // Atualiza o texto do rótulo
}
}
}
} else{
  document.getElementById('topo').click()
}
}

function swalclose(){
Swal.close()
}
initPage()


//instagran

document.getElementById('a_insta').addEventListener('click', function(){
  window.open('https://www.instagram.com/asd.logos.design/','_blank')
});
document.getElementById('P_InstagreanFooter').addEventListener('click', function(){
  window.open('https://www.instagram.com/asd.logos.design/','_blank')
});

//Email
document.getElementById('emailMenu').addEventListener('click', function(){
  var destinatario = sessionStorage.getItem('EmailAdmin');
  var assunto = "ASD Logos contato";
  var corpo = "Olá, gostaria de falar sobre ASD Logos.";
  var isMobile = /Android|iPhone/i.test(navigator.userAgent);
  if(isMobile){
    window.location.href = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  } else {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`,"_blank");
  }
});
document.getElementById('P_EmailFooter').addEventListener('click', function(){
 var destinatario = sessionStorage.getItem('EmailAdmin');
  var assunto = "ASD Logos contato";
  var corpo = "Olá, gostaria de falar sobre ASD Logos.";
  var isMobile = /Android|iPhone/i.test(navigator.userAgent);
  if(isMobile){
    window.location.href = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  } else {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`,"_blank");
  }
});


 // WhatsApp
document.getElementById('P_WhatsappFooter').addEventListener('click', function(){
var telefone =sessionStorage.getItem('TelefoneAdmin');
var numero = `+55${telefone}`; // Substitua pelo número de destino, incluindo o código do país
var url = "https://wa.me/"+`${numero}?text= Olá, gostaria de falar sobre ASD logos`;
window.open(url, "_blank");
Swal.fire(``,`Direcionando ao whatsApp...`,'success')  

});
document.getElementById('ZAPMenu').addEventListener('click', function(){
var telefone =sessionStorage.getItem('TelefoneAdmin');
var numero = `+55${telefone}`; // Substitua pelo número de destino, incluindo o código do país
var url = "https://wa.me/"+`${numero}?text= Olá, gostaria de falar sobre ASD logos`;
window.open(url, "_blank");
Swal.fire(``,`Direcionando ao whatsApp...`,'success') 

});

//icon pesquisa
document.getElementById('pesq-1').addEventListener('click', function(){
Swal.fire('Busca','Para agilizar, Selecione um material e um departamento','info')
})