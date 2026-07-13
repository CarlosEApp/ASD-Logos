

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
/////////////////////////////////////////////////////////////////


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

// Sair cad
function fech(){
document.getElementById('Cadastrar').style.display='none';
}
// voltar divs
function voltarcad(){
document.getElementById('a_Cadastro').click()
var blc= sessionStorage.getItem('BLC')
if(!blc||blc==''|| blc=='EndDiv'){
sessionStorage.setItem('BLC', 'EndDiv')
//document.getElementById('Cadastrar').style.display='none'
document.getElementById('btnsVoltar').style.display='none'
document.getElementById('EndDiv').style.display='block'
document.getElementById('fichaDiv').style.display='none'
document.getElementById('divImagens').style.display='none'
document.getElementById('valorDiv').style.display='none'
document.getElementById('selectOperação').value='';
document.getElementById('proximo"').style.display='block'

}else if(blc=='EndDiv'){
sessionStorage.setItem('BLC', 'EndDiv')
document.getElementById('btnsVoltar').style.display='none'
document.getElementById('EndDiv').style.display='block'
document.getElementById('fichaDiv').style.display='none'
document.getElementById('divImagens').style.display='none'
document.getElementById('valorDiv').style.display='none'
document.getElementById('proximo').style.display='block'
}else if(blc=='fichaDiv'){
sessionStorage.setItem('BLC', 'EndDiv')
document.getElementById('EndDiv').style.display='block'
document.getElementById('fichaDiv').style.display='none'
document.getElementById('divImagens').style.display='none'
document.getElementById('valorDiv').style.display='none'
document.getElementById('btnsVoltar').style.display='none'
}else if(blc=='divImagens'){
sessionStorage.setItem('BLC', 'fichaDiv')
document.getElementById('EndDiv').style.display='none'
document.getElementById('fichaDiv').style.display='block'
document.getElementById('divImagens').style.display='none'
document.getElementById('valorDiv').style.display='none'
document.getElementById('proximo').style.display='block'
document.getElementById('btnsVoltar').style.display='block'
}else if(blc=='valorDiv'){
sessionStorage.setItem('BLC', 'divImagens')
document.getElementById('EndDiv').style.display='none'
document.getElementById('fichaDiv').style.display='none'
document.getElementById('divImagens').style.display='block'
document.getElementById('valorDiv').style.display='none'
document.getElementById('proximo').style.display='block'
document.getElementById('btnsVoltar').style.display='block'
}
}
//select 
function Select(){
var resp=document.getElementById('selectOperação').value;
if(!resp||resp==''|| resp=='sair'){
var seleção=document.getElementById('selectOperação')
seleção.value=''
document.getElementById('Cadastrar').style.display='none'
document.getElementById('Cadastrados').style.display='none'

} else if(resp=='Cadastrar'){
limparCampos()
setTimeout(function(){
geradorCodigo()
Endclic()
},1200);

document.getElementById('Cadastrar').style.display='block';
document.getElementById('btnsVoltar').style.display='none'
document.getElementById('proximo').style.display='block'
document.getElementById('Cadastrados').style.display='none';

document.getElementById('valorDiv').style.display='none'
document.getElementById('EndDiv').style.display='block';
document.getElementById('divImagens').style.display='none'
document.getElementById('fichaDiv').style.display='none'
sessionStorage.setItem('BLC', 'EndDiv')
document.getElementById('fichaDiv').style.display='none';
document.getElementById('a_Cadastro').click()
}else if(resp=='Cadastrados'){
var list = document.getElementById('divlist');
list.innerHTML = '';
var sele= document.getElementById('ListadoImóvel');
sele.value =''
document.getElementById('divLista').style.display='none'
document.getElementById('Cadastrar').style.display='none';
document.getElementById('Cadastrados').style.display='block';
document.getElementById('divImagens').style.display='none'
document.getElementById('fichaDiv').style.display='none'
document.getElementById('a_Cadastro').click()
}else if(resp=='Pesquisar'){
document.getElementById('Cadastrar').style.display='none';
document.getElementById('Cadastrados').style.display='none';
toggleMenu()

}
}
// card cadastrar
document.getElementById('CadastrarIMV').addEventListener('click', function(){
var seleção=document.getElementById('selectOperação')
seleção.value='Cadastrar';
sessionStorage.setItem('BLC', 'EndDiv')
setTimeout(function(){
Select()
},300)
});
document.getElementById('IMvCadastrados').addEventListener('click', function(){
  sessionStorage.setItem('BLC', 'EndDiv')
document.getElementById('btnsVoltar').style.display='none'
document.getElementById('EndDiv').style.display='block'
document.getElementById('fichaDiv').style.display='none'
document.getElementById('divImagens').style.display='none'
document.getElementById('valorDiv').style.display='none'
document.getElementById('proximo').style.display='block'
var seleção=document.getElementById('selectOperação')
seleção.value='Cadastrados';
setTimeout(function(){
Select()
},300)
});
document.getElementById('IMvVendidos').addEventListener('click', function(){
  sessionStorage.setItem('BLC', 'EndDiv')
document.getElementById('btnsVoltar').style.display='none'
document.getElementById('EndDiv').style.display='block'
document.getElementById('fichaDiv').style.display='none'
document.getElementById('divImagens').style.display='none'
document.getElementById('valorDiv').style.display='none'
document.getElementById('proximo').style.display='block'
toggleMenu()
var seleção=document.getElementById('selectOperação')
seleção.value='Pesquisar';
setTimeout(function(){

},300)
})
// botão proxímo
sessionStorage.setItem('BLC', 'EndDiv')
function proximo(){
document.getElementById('a_Cadastro').click()
var blc= sessionStorage.getItem('BLC')
if(!blc || blc==''){     
sessionStorage.setItem('BLC', 'EndDiv')
} else if( blc== 'EndDiv'){
var rua= document.getElementById('RuaInput').value;
var bairro= document.getElementById('BairroInput').value;
var cidade= document.getElementById('CidadeInput').value;
var uf = document.getElementById('UFInput').value;

if(!rua|| rua==''||!bairro|| bairro==''||!cidade|| cidade==''||!uf|| uf==''){
/*Swal.fire({
title: `Preencha!`,
html: `
<div id='custonAtenção'>
<p><b id='BBold'> Rua, Bairro, Cidade e UF </b> <br> <b id='B_red'> Campos Obrigatórios</b> </p>
</div>
`,
background: 'hsl(220, 100%, 95%)', // Cor de fundo
color: '#272727', // Cor do texto// Cor do texto
showCloseButton: true,  
showCancelButton: false,
showConfirmButton: false,
customClass: {
popup: 'my-custom_Atenção' // Aplica a classe CSS personalizada
},
didOpen: () => {
document.body.style.paddingRight = '0px';
}
});*/
}
sessionStorage.setItem('BLC', 'fichaDiv')
document.getElementById('EndDiv').style.display='none'
document.getElementById('valorDiv').style.display='none'
document.getElementById('divImagens').style.display='none'
document.getElementById('fichaDiv').style.display='block'
document.getElementById('btnsVoltar').style.display='block'

} else if( blc== 'fichaDiv'){
var input_9= document.getElementById("ListaSeleção").value;
var input_11= document.getElementById("TituloInput").value;
var input_13= document.getElementById("QuartosInput").value;
var input_15= document.getElementById("BanheirosInput").value;
var input_38=document.getElementById("tranzação").value;
if(!input_9|| input_9==''||!input_11|| input_11==''||!input_13|| input_13==''||!input_15|| input_15==''||!input_38|| input_38==''){
Swal.fire({
title: `Preencha!`,
html: `
<div id='custonAtenção'>
<p><b id='BBold'> Lista do Imovel, Titulo, Quartos , Banheiros e Transação</b><br> <b id='B_red'> Campos Obrigatórios</b> </p>
</div>
`,
background: 'hsl(207, 100%, 98%)', // Cor de fundo
color: '#272727', // Cor do texto// Cor do texto
showCloseButton: true,  
showCancelButton: false,
showConfirmButton: false,
customClass: {
popup: 'my-custom_Atenção' // Aplica a classe CSS personalizada
},
didOpen: () => {
document.body.style.paddingRight = '0px';
}
});
}else{
sessionStorage.setItem('BLC', 'divImagens')
document.getElementById('EndDiv').style.display='none'
document.getElementById('fichaDiv').style.display='none'
document.getElementById('valorDiv').style.display='none'
document.getElementById('divImagens').style.display='block'
document.getElementById('proximo').style.display='block'
document.getElementById('btnsVoltar').style.display='block'
}
}else if( blc== 'divImagens'){
sessionStorage.setItem('BLC', 'valorDiv')
document.getElementById('EndDiv').style.display='none'
document.getElementById('fichaDiv').style.display='none'
document.getElementById('divImagens').style.display='none'
document.getElementById('valorDiv').style.display='block'
document.getElementById('proximo').style.display='none'
document.getElementById('btnsVoltar').style.display='block'
} else {
}
}
function Endclic(){
Swal.fire({ 
title: `Digite CEP do imóvel`,
text: ``, 
html:`
<div id="divPerfCEPuser">
<label for="">
<input id="Input_cep_" type="text" oninput="aplicarMascaraCEP(event)" maxlength="9" placeholder="00000-000"></label>
</div>
`,
imageUrl: ``,
background: '#ffffff',
color: '#a7a7a7', // cor do texto });
showCloseButton: true,   // habilita o "X"
allowOutsideClick: false,
showConfirmButton: false,
customClass: {
popup: 'my-CEPuser' // Aplica a classe CSS personalizada
},
didOpen: () => {
document.body.style.paddingRight = '0px';   
}
})
document.getElementById("Input_cep_").addEventListener('change',function(){
document.getElementById("Input_cep").value= document.getElementById("Input_cep_").value;
buscarCEP()
Swal.close()
})
};
// format cep
function formatarCEP(cep) {
cep = cep.replace(/\D/g, ""); // Remove caracteres não numéricos
cep = cep.replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona o hífen XXXXX-XXX
return cep;
}
function aplicarMascaraCEP(event) {
event.target.value = formatarCEP(event.target.value);
var cep8 = document.getElementById("Input_cep")
if (cep8.value.length === 9) {
buscarCEP()
return;
}
}
// Cep
function buscarCEP() {
var cep = document.getElementById("Input_cep").value.replace(/\D/g, ""); // só números
if (cep.length !== 8) {
Swal.fire("CEP inválido. Digite 8 números.");
return;
}
localStorage.setItem('CEP', cep)
var url = `https://viacep.com.br/ws/${cep}/json/`;
fetch(url)
.then(response => response.json())
.then(data => {
if (data.erro) {
Swal.fire("",'<b id="bbtb">CEP não encontrado</b>.<br>Mas não se preocupe, preencha os campos manualmente.','warning');
document.getElementById("Input_cep").value=""
return;
}
document.getElementById("RuaInput").value = data.logradouro;
document.getElementById("BairroInput").value = data.bairro;
document.getElementById("CidadeInput").value = data.localidade;
document.getElementById("UFInput").value = data.uf;
localStorage.setItem('Rua', `${data.logradouro}`)
localStorage.setItem('Bairro', `${data.bairro}`)
localStorage.setItem('Cidade', `${data.localidade}`)
localStorage.setItem('Estado', `${data.uf}`)
})
.catch(error => {
console.error("Erro ao buscar CEP:", error);
});
}
// Gerar código
function geradorCodigo(){
var cod=document.getElementById('CódigoInput').value;
if(!cod|| cod==''){
var hora= sessionStorage.getItem('hora')
var data= sessionStorage.getItem('data')
var time= hora.split(':')
var resp0=time[0]
var resp1=time[1]
var resp2=time[2]
var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let codigo = '';
for (let i = 0; i < 6; i++) {
codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
var codigo_= `${codigo}`+resp1+resp2
document.getElementById('CódigoInput').value= `${codigo_}`
}
} else{
}
}
//limpar campos
function limparCampos(){
document.getElementById("Input_cep").value="";
document.getElementById('CódigoInput').value='';
document.getElementById("RuaInput").value = '';
document.getElementById("BairroInput").value ='';
document.getElementById("CidadeInput").value = '';
document.getElementById("UFInput").value = '';
document.getElementById("NumeroInput").value=''
document.getElementById("RefInput").value='';
document.getElementById("ListaSeleção").value='';
document.getElementById("destaque").value='';
document.getElementById("TituloInput").value='';
document.getElementById("SubToInput").value='';
document.getElementById("QuartosInput").value='';
document.getElementById("SuitesgoInput").value='';
document.getElementById("BanheirosInput").value='';
document.getElementById("VagasInput").value='';
document.getElementById("PiscinaInput").value='';
document.getElementById("AreaCInput").value='';
document.getElementById("OBSInput").value='';
document.getElementById("tranzação").value='';
///////////////////////////////////////////////////////////////////////
document.getElementById("CPFpropInput").value='';
document.getElementById("NomepropInput").value='';
document.getElementById("TelpropInput").value='';
document.getElementById("estadoIMV").value='ativo';
///////////////////////////////////////////////////////////////////////
document.getElementById("IPTUInput").value='';
document.getElementById("CondominíoInput").value='';
document.getElementById("vendaVInput").value='';
document.getElementById("LocaçãoVInput").value='';
/////////////////////////////////////////////////////////////////

document.getElementById("mymg1").src='../src/MetategBanner.png';
document.getElementById("mymg2").src='../src/MetategBanner.png';
document.getElementById("mymg3").src='../src/MetategBanner.png';
document.getElementById("mymg4").src='../src/MetategBanner.png';
document.getElementById("mymg5").src='../src/MetategBanner.png';
document.getElementById("mymg6").src='../src/MetategBanner.png';
document.getElementById("mymg7").src='../src/MetategBanner.png';
document.getElementById("mymg8").src='../src/MetategBanner.png';
document.getElementById("mymg9").src='../src/MetategBanner.png';
document.getElementById("mymg10").src='../src/MetategBanner.png';

localStorage.setItem('Rua', ``);
localStorage.setItem('Bairro', ``);
localStorage.setItem('Cidade', ``);
localStorage.setItem('Estado', ``);
//////////////////////////////////////////////////
}
// Formatar telefone
document.getElementById('TelpropInput').addEventListener('input', function (e) {
let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
if (value.length > 11) value = value.slice(0, 11); // Limita ao tamanho correto
let formattedValue = value.replace(/^(\d{2})(\d)/, '($1) $2')
.replace(/(\d{4})(\d{4})$/, '$1-$2');
e.target.value = formattedValue;
});
//Formate CPF
function formatarCPF(cpf) {
cpf = cpf.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
return cpf;
}
function aplicarMascaraCPF(event) {
let input = event.target;
input.value = formatarCPF(input.value);
}
document.getElementById('I_IMG').addEventListener('click',function(){
sessionStorage.setItem('ImagemRT', 'mymg1');
 document.getElementById('mymg1').src= document.getElementById('mymg1_').value;
});
document.getElementById('I_IMG2').addEventListener('click',function(){
sessionStorage.setItem('ImagemRT', 'mymg2');
 document.getElementById('mymg2').src= document.getElementById('mymg2_').value;
});

document.getElementById('I_IMG3').addEventListener('click',function(){
sessionStorage.setItem('ImagemRT', 'mymg3');
 document.getElementById('mymg3').src= document.getElementById('mymg3_').value;
});

document.getElementById('I_IMG4').addEventListener('click',function(){
sessionStorage.setItem('ImagemRT', 'mymg4');
 document.getElementById('mymg4').src= document.getElementById('mymg4_').value;
});

document.getElementById('I_IMG5').addEventListener('click',function(){
sessionStorage.setItem('ImagemRT', 'mymg5');
 document.getElementById('mymg5').src= document.getElementById('mymg5_').value;
});

document.getElementById('I_IMG6').addEventListener('click',function(){
sessionStorage.setItem('ImagemRT', 'mymg6');
 document.getElementById('mymg6').src= document.getElementById('mymg6_').value;
});

document.getElementById('I_IMG7').addEventListener('click',function(){
sessionStorage.setItem('ImagemRT', 'mymg7');
 document.getElementById('mymg7').src= document.getElementById('mymg7_').value;
});

document.getElementById('I_IMG8').addEventListener('click',function(){
sessionStorage.setItem('ImagemRT', 'mymg8');
 document.getElementById('mymg8').src= document.getElementById('mymg8_').value;
});

document.getElementById('I_IMG9').addEventListener('click',function(){
sessionStorage.setItem('ImagemRT', 'mymg9');
 document.getElementById('mymg9').src= document.getElementById('mymg9_').value;
});

document.getElementById('I_IMG10').addEventListener('click',function(){
sessionStorage.setItem('ImagemRT', 'mymg10');
 document.getElementById('mymg10').src= document.getElementById('mymg10_').value;
});


//imagem para firebase
/*
document.getElementById('files').addEventListener('change', function(e) {
Swal.fire({
title: `Carregando!`,
html: `
<p>Aguarde...</p>
<div id="myProgresso_" title="Progresos">
<div id="myBarIMG1_">10%</div> 
</div>
`,
background: 'hsl(209, 100%, 96%)', // Cor de fundo
color: '#242424', // Cor do texto// Cor do texto
showCloseButton: false,  
showCancelButton: false,
showConfirmButton: false,
customClass: {
popup: 'my-custom' // Aplica a classe CSS personalizada
},
didOpen: () => {
document.body.style.paddingRight = '0px';
}
});
document.getElementById('myProgresso').style.display = 'block'
document.getElementById('myProgresso_').style.display = 'block'
var i = 0;
if (i == 0){
i = 1;
var elem = document.getElementById("myBarIMG1");
var width = 1;
var id = setInterval(frame, 100);
function frame() {
if (width >= 100) {
i = 0;
document.getElementById('myProgresso').style.display = 'none'
clearInterval(id)
//document.getElementById('imgcad').value = `${url_imagem}`
} else {
width++;
elem.style.width = width + "%";
elem.innerHTML = width + "%"; // Atualiza o texto do rótulo
}
}
}
var ii = 0;
if (ii == 0){
ii = 1;
var elem_ = document.getElementById("myBarIMG1_");
var width_ = 1;
var id_ = setInterval(frame_, 100);
function frame_() {
if (width_ >= 100) {
ii = 0;
document.getElementById('myProgresso_').style.display = 'none'

clearInterval(id_)
//document.getElementById('imgcad').value = `${url_imagem}`
} else {
width_++;
elem_.style.width= width_ + "%";
elem_.innerHTML = width_ + "%"; // Atualiza o texto do rótulo
}
}
}
document.getElementById('myProgresso_').style.display = 'block'
var idfoto =''
var idImg = sessionStorage.getItem('ImagemRT');   // imagem1, imagem2...
var Lista = document.getElementById('ListaSeleção').value;
var  Titulo= document.getElementById('TituloInput').value;
var Codigo = document.getElementById('CódigoInput').value;
var idfoto = `${Lista}/${Titulo}/${Codigo}/${idImg}`;
var file = e.target.files[0];
var storageRef = firebase.storage().ref(`${idfoto}.png`);
var task = storageRef.put(file);
task.on('state_changed', function progress(snapshot) {
}, function error(err) {
console.error(err);
}, function complete() {
storageRef.getDownloadURL().then(function(url_imagem) {
// Atualiza apenas o <img> correto
document.getElementById(`${idImg}`).src= url_imagem;
document.getElementById('myProgresso').style.display = 'none'     
document.getElementById('myProgresso_').style.display = 'none'  
Swal.fire({
title: ``,
html: `
<img id='imimg' src="${url_imagem}" alt="" width="280"> 
<br><label id='trocarFoto' style="cursor:pointer">PRONTO!!</label>
`,
background: 'hsla(0, 0%, 100%, 0.00)',
color: '#0e0e0e',
showCloseButton: true,
showConfirmButton: false,
customClass: { popup: 'my-custom_img' },
didOpen: () => { document.body.style.paddingRight = '0px'; }
});
// Quando clicar em "Trocar de foto"
document.getElementById('trocarFoto').style.display='block'
//swal('Pronto', 'imagem Carregada',url_imagem)    
});
storageRef.null
});
});
function swalclose(){
Swal.close()
}
*/


// ver imagem
document.getElementById('mymg1').addEventListener('click', function(){
var img1=document.getElementById('mymg1').src;
sessionStorage.setItem('imgV', img1)
verimg()
});
document.getElementById('mymg2').addEventListener('click', function(){
var img2=document.getElementById('mymg2').src;
sessionStorage.setItem('imgV', img2)
verimg()
});
document.getElementById('mymg3').addEventListener('click', function(){
var img3=document.getElementById('mymg3').src;
sessionStorage.setItem('imgV', img3)
verimg()
});
document.getElementById('mymg4').addEventListener('click', function(){
var img4=document.getElementById('mymg4').src;
sessionStorage.setItem('imgV', img4)
verimg()
});
document.getElementById('mymg5').addEventListener('click', function(){
var img5=document.getElementById('mymg5').src;
sessionStorage.setItem('imgV', img5)
verimg()
});
document.getElementById('mymg6').addEventListener('click', function(){
var img6=document.getElementById('mymg6').src;
sessionStorage.setItem('imgV', img6)
verimg()
});
document.getElementById('mymg7').addEventListener('click', function(){
var img7=document.getElementById('mymg7').src;
sessionStorage.setItem('imgV', img7)
verimg()
});
document.getElementById('mymg8').addEventListener('click', function(){
var img8=document.getElementById('mymg8').src;
sessionStorage.setItem('imgV', img8)
verimg()
});
document.getElementById('mymg9').addEventListener('click', function(){
var img9=document.getElementById('mymg9').src;
sessionStorage.setItem('imgV', img9)
verimg()
});
document.getElementById('mymg10').addEventListener('click', function(){
var img10=document.getElementById('mymg10').src;
sessionStorage.setItem('imgV', img10)
verimg()
});

function verimg(){
var img= sessionStorage.getItem('imgV')
Swal.fire({
title: ``,
html: `
<img id='imimg' src="${img}" alt="" width="280"> 
<br><label id='trocarFoto' style="cursor:pointer">PRONTO!!</label>
`,
background: 'hsla(0, 0%, 100%, 0.00)',
color: '#0e0e0e',
showCloseButton: true,
showConfirmButton: false,
customClass: { popup: 'my-custom_img' },
didOpen: () => { document.body.style.paddingRight = '0px'; }
});
// Quando clicar em "Trocar de foto"
document.getElementById('trocarFoto').style.display='none'
//swal('Pronto', 'imagem Carregada',url_imagem)    
}

setInterval(function() {
var input_9= document.getElementById("ListaSeleção").value
var resp= document.getElementById("ListaSeleção");
if(!input_9||input_9===''){
resp.style.backgroundColor=' rgb(78, 2, 59)'
resp.style.color='aliceblue'
}else{
resp.style.backgroundColor='rgb(220, 231, 255)'
resp.style.color='black'
}
var ruaEl = document.getElementById('RuaInput');
var bairroEl = document.getElementById('BairroInput');
var cidadeEl = document.getElementById('CidadeInput');
var ufEl = document.getElementById('UFInput');
var tit=document.getElementById("TituloInput");
var quart=document.getElementById("QuartosInput");
var banh=document.getElementById("BanheirosInput");

document.getElementById('lbl_banheiro').className =
banh.value.trim() === '' ? 'label-erro' : 'label-normal';
document.getElementById('lbl_quarto').className =
quart.value.trim() === '' ? 'label-erro' : 'label-normal';
document.getElementById('lbl_titulo').className =
tit.value.trim() === '' ? 'label-erro' : 'label-normal';
document.getElementById('lbl_rua').className =
ruaEl.value.trim() === '' ? 'label-erro' : 'label-normal';
document.getElementById('lbl_bairro').className =
bairroEl.value.trim() === '' ? 'label-erro' : 'label-normal';
document.getElementById('lbl_cidade').className =
cidadeEl.value.trim() === '' ? 'label-erro' : 'label-normal';
document.getElementById('lbl_uf').className =
ufEl.value.trim() === '' ? 'label-erro' : 'label-normal';
}, 100); // verifica a cada 200ms

setTimeout(function(){
document.getElementById('inicio_a').click()
},1000)

//Valor em real
var campoValorEl1 = document.getElementById("IPTUInput");
campoValorEl1.addEventListener("input", () => {
var valor1 = campoValorEl1.value.replace(/\D/g, "");
if (valor1) {
var numero = (parseInt(valor1, 10) / 100).toFixed(2);
campoValorEl1.value = new Intl.NumberFormat("pt-BR", {
style: "currency",
currency: "BRL"
}).format(numero);
}
});
var campoValorEl2 = document.getElementById("CondominíoInput");
campoValorEl2.addEventListener("input", () => {
var valor = campoValorEl2.value.replace(/\D/g, "");
if (valor) {
var numero = (parseInt(valor, 10) / 100).toFixed(2);
campoValorEl2.value = new Intl.NumberFormat("pt-BR", {
style: "currency",
currency: "BRL"
}).format(numero);
}
});
var campoValorEl3 = document.getElementById("vendaVInput");
campoValorEl3.addEventListener("input", () => {
var valor = campoValorEl3.value.replace(/\D/g, "");
if (valor) {
var numero = (parseInt(valor, 10) / 100).toFixed(2);
campoValorEl3.value = new Intl.NumberFormat("pt-BR", {
style: "currency",
currency: "BRL"
}).format(numero);
}
});
var campoValorEl = document.getElementById("LocaçãoVInput");
campoValorEl.addEventListener("input", () => {
var valor = campoValorEl.value.replace(/\D/g, "");
if (valor) {
var numero = (parseInt(valor, 10) / 100).toFixed(2);
campoValorEl.value = new Intl.NumberFormat("pt-BR", {
style: "currency",
currency: "BRL"
}).format(numero);
}
});
var hora = sessionStorage.getItem('hora');
var data= sessionStorage.getItem('data');
//document.getElementById('UltimaEdição').value=`EDT: ${data} - ${hora}`
//Salvar Cadastro

function salvar(){

var input_1= document.getElementById("CódigoInput").value;
var input_2= document.getElementById("Input_cep").value;
var input_3= document.getElementById("RuaInput").value;
var input_4= document.getElementById("BairroInput").value;
var input_5= document.getElementById("CidadeInput").value;
var input_6= document.getElementById("UFInput").value;
var input_7= document.getElementById("NumeroInput").value;
var input_8= document.getElementById("RefInput").value;
///////////////////////////////////////////////////////////////////////
var input_9= document.getElementById("ListaSeleção").value;
var input_10= document.getElementById("destaque").value;
var input_11= document.getElementById("TituloInput").value;
var input_12= document.getElementById("SubToInput").value;
var input_13= document.getElementById("QuartosInput").value;
var input_14= document.getElementById("SuitesgoInput").value;
var input_15= document.getElementById("BanheirosInput").value;
var input_16= document.getElementById("VagasInput").value;
var input_17= document.getElementById("PiscinaInput").value;
var input_18= document.getElementById("AreaCInput").value;
var input_19= document.getElementById("OBSInput").value;
///////////////////////////////////////////////////////////////////////
var input_20= document.getElementById("CPFpropInput").value;
var input_21= document.getElementById("NomepropInput").value;
var input_22= document.getElementById("TelpropInput").value;
var input_23= document.getElementById("estadoIMV").value;
///////////////////////////////////////////////////////////////////////
var input_24= document.getElementById("IPTUInput").value;
var input_25= document.getElementById("CondominíoInput").value;
var input_26= document.getElementById("vendaVInput").value;
var input_27= document.getElementById("LocaçãoVInput").value;
///////////////////////////////////////////////////////////////////////
var input_28= document.getElementById("mymg1").src;
var input_29= document.getElementById("mymg2").src;
var input_30= document.getElementById("mymg3").src;
var input_31= document.getElementById("mymg4").src;
var input_32= document.getElementById("mymg5").src;
var input_33= document.getElementById("mymg6").src;
var input_34= document.getElementById("mymg7").src;
var input_35= document.getElementById("mymg8").src;
var input_36= document.getElementById("mymg9").src;
var input_37= document.getElementById("mymg10").src;
var input_38=document.getElementById("tranzação").value;
//////////////////////////////////////////////////////
var hora_ = sessionStorage.getItem('hora');
var data_= sessionStorage.getItem('data');
var editado= `EDT: ${data_} - ${hora_}`
/////////////////////////////////////////////////////
var SessiData= sessionStorage.getItem('SessiData');
var SessiHora= sessionStorage.getItem('SessiHara');
if(!SessiData||SessiData==''||!SessiHora||SessiHora==''){
var hora = sessionStorage.getItem('hora');
var data= sessionStorage.getItem('data');
}else{
var hora = SessiHora;
var data= SessiData;
}

if(input_26=='' && input_27==''){
Swal.fire({
title: `Preencha!`,
html: `
<div id='custonAtenção'>
<p><b id='BBold'> Valor de venda, Locação ou Ambos.</b> <br> <b id='B_red'> Obrigatório para Salvar cadastro</b> </p>
</div>
`,
background: 'hsl(220, 100%, 95%)', // Cor de fundo
color: '#272727', // Cor do texto// Cor do texto
showCloseButton: true,  
showCancelButton: false,
showConfirmButton: false,
customClass: {
popup: 'my-custom_Atenção' // Aplica a classe CSS personalizada
},
didOpen: () => {
document.body.style.paddingRight = '0px';
}
});
}else{

var db = firebase.firestore();
db.collection(`${input_9}`).doc(input_1).set({

Código:input_1,
CEP:input_2,
Rua:input_3,
Bairro:input_4,
Cidade:input_5,
UF:input_6,
Numero:input_7,
REF:input_8,

Coll_Lista:input_9,
Destaque:input_10,
Titulo:input_11,
SubTitulo:input_12,
Quartos:input_13,
Suites:input_14,
Banheiros:input_15,
Vagas_G:input_16,
Piscinas:input_17,
Area_Const:input_18,
OBS:input_19,
CPF:input_20,
Nome_Prop:input_21,
Tel_Prop:input_22,
IMV_Disponivel:input_23,
Valor_IPTU: input_24,
Valor_Condominio: input_25,
Valor_Venda: input_26,
Valor_Locação: input_27,
Tranzação:input_38,

Imagem1:input_28,
Imagem2:input_29,
Imagem3:input_30,
Imagem4:input_31,
Imagem5:input_32,
Imagem6:input_33,
Imagem7:input_34,
Imagem8:input_35,
Imagem9:input_36,
Imagem10:input_37,
Data:data,
Hora:hora,
Editado:editado,
})
var dbC= firebase.firestore();
dbC.collection('GeralColl').doc(input_1).set({

Código:input_1,
CEP:input_2,
Rua:input_3,
Bairro:input_4,
Cidade:input_5,
UF:input_6,
Numero:input_7,
REF:input_8,

Coll_Lista:input_9,
Destaque:input_10,
Titulo:input_11,
SubTitulo:input_12,
Quartos:input_13,
Suites:input_14,
Banheiros:input_15,
Vagas_G:input_16,
Piscinas:input_17,
Area_Const:input_18,
OBS:input_19,
CPF:input_20,
Nome_Prop:input_21,
Tel_Prop:input_22,
IMV_Disponivel:input_23,
Valor_IPTU: input_24,
Valor_Condominio: input_25,
Valor_Venda: input_26,
Valor_Locação: input_27,
Tranzação:input_38,

Imagem1:input_28,
Imagem2:input_29,
Imagem3:input_30,
Imagem4:input_31,
Imagem5:input_32,
Imagem6:input_33,
Imagem7:input_34,
Imagem8:input_35,
Imagem9:input_36,
Imagem10:input_37,
Data:data,
Hora:hora,
Editado:editado,
})
Swal.fire('','Cadastro Salvo!','success')
var exxz = firebase.firestore();
exxz.collection('Coll_EXCLUIDOS').doc(input_1).delete()
setTimeout(function(){
window.location.reload()
},2800)
}
}
function sele() {
var sele = document.getElementById('ListaSeleção');
sele.value = '';
};
// sair cadastro
function fech2(){
var list = document.getElementById('divlist');
list.innerHTML = '';
var sele= document.getElementById('ListadoImóvel');
sele.value =''
document.getElementById('Cadastrados').style.display='none';
document.getElementById('divLista').style.display='none'
}

// chamar lista de imoveis 
document.getElementById('divLista').style.display='none'
function imovelList(){
  //document.getElementById("menu").style.display='none';
  var listy = document.getElementById('listpesqRes');
  listy.innerHTML = ''
var lista= document.getElementById('ListadoImóvel').value;
var itens = 0
if( lista=='suspenso'){
  var lista='GeralColl';
  var seleção='suspenso';
}else if(lista=='vendido'){
    var lista='GeralColl';
  var seleção='vendido';
}else {
 var seleção='ativo';
}
document.getElementById('B_encontrados').innerHTML=0
var list = document.getElementById('divlist');
list.innerHTML = '';
var db = firebase.firestore();
var produtosRef = db.collection(`${lista}`);

produtosRef.get().then((querySnapshot) => {
querySnapshot.forEach(docSnap => {
var doc = docSnap.data();
if(seleção== doc.IMV_Disponivel){
itens++
document.getElementById('divLista').style.display='block'
var conntainer= document.createElement('div');
var divFlex= document.createElement('div');
var div_label= document.createElement('div');
var div_botão= document.createElement('div');
var div_imagem= document.createElement('div');
var label_um= document.createElement('label');
var label_dois= document.createElement('label');
var label_tres= document.createElement('label');
var BTN_Excluir= document.createElement('button');
var BTN_Editar= document.createElement('button');
var BTN_Mais= document.createElement('button');
var IMG_Imovel= document.createElement('img');
var parag= document.createElement('p');

conntainer.id='ConntDiv';
div_label.id='divLabel';
div_imagem.id='divIMG';
div_botão.id='divBotao';
IMG_Imovel.id='ImagemIMV';
label_um.id='label_um';
label_dois.id='label_dois';
label_tres.id='label_tres';
divFlex.id='flexDiv';
BTN_Editar.id='editarBTN';
BTN_Mais.id='maisBTN';
BTN_Excluir.id="excluirBTN";

if (doc.IMV_Disponivel == 'ativo') {
  parag.id = 'parag';
  parag.title = 'Imóvel Ativo e Disponível';
} else if (doc.IMV_Disponivel == 'suspenso') {
  parag.id = 'parag_';
  parag.title = 'Imóvel Suspenso';
} else if (doc.IMV_Disponivel == 'vendido') {
  parag.id = 'parag_V';
  parag.title = 'Imóvel Vendido';
} else {
  parag.innerText = 'Status desconhecido';
}

if(lista=='Coll_EXCLUIDOS'){
parag.id='vermelho';
parag.title='Imóvel Excluido'
}

IMG_Imovel.src=doc.Imagem1
label_um.textContent=`${doc.Titulo}`;
label_dois.textContent=`${doc.SubTitulo}`;
label_tres.textContent=`${doc.Código}`;

BTN_Editar.textContent='Editar';
BTN_Excluir.className='fa-solid fa-trash';
BTN_Mais.className='fa-solid fa-eye';

BTN_Mais.title='Ver mais informações';
BTN_Excluir.title='Excluir este imóvel';
BTN_Editar.title='Editar informações do cadastro'
IMG_Imovel.title='Ver imagem do Imóvel'
parag.textContent='';

conntainer.appendChild(parag);
div_imagem.appendChild(IMG_Imovel);
div_label.appendChild(label_um);
div_label.appendChild(document.createElement('br'));
div_label.appendChild(label_dois);
div_label.appendChild(document.createElement('br'));
div_label.appendChild(label_tres);
div_botão.appendChild(BTN_Editar);
div_botão.appendChild(BTN_Mais);
div_botão.appendChild(BTN_Excluir);
divFlex.appendChild(div_imagem);
divFlex.appendChild(div_label);
conntainer.appendChild(divFlex)
conntainer.appendChild(div_botão);
list.appendChild(conntainer);

document.getElementById('B_encontrados').innerHTML=itens

IMG_Imovel.addEventListener('click', function(){
Swal.fire({
title: ``,
html: `
<img id='imimg' src="${doc.Imagem1}" alt="" width="280"> 
<br><label id='trocarFoto' style="cursor:pointer">PRONTO!!</label>
`,
background: 'hsla(0, 0%, 100%, 0.00)',
color: '#0e0e0e',
showCloseButton: true,
showConfirmButton: false,
customClass: { popup: 'my-custom_img' },
didOpen: () => { document.body.style.paddingRight = '0px'; }
});
// Quando clicar em "Trocar de foto"
document.getElementById('trocarFoto').style.display='none'
//swal('Pronto', 'imagem Carregada',url_imagem)    
});

BTN_Mais.addEventListener('click', function(){
Swal.fire(`🏡Ficha do Imóvel `,`<b>Código= </b> ${doc.Código}<br><b>Titulo=</b> ${doc.Titulo}<br><b>SubTitulo=</b>  ${doc.SubTitulo}<br><b>CEP=</b> ${doc.CEP}
  <br><b>Rua=</b>  ${doc.Rua}<br><b>N°=</b>  ${doc.Numero}<br><b>Bairro=</b>  ${doc.Bairro}<br>
<b>Cidade=</b> ${doc.Cidade}<br><b>UF=</b> ${doc.UF}<br><b>Referência=</b> ${doc.REF}<br><b>Lista=</b> ${doc.Coll_Lista}<br><b>Destaque=</b> ${doc.Destaque}
 <br><b>Quartos=</b> ${doc.Quartos}<br><b>Suíte=</b> ${doc.Suites}<br>
<b>Banheiro=</b>  ${doc.Banheiros}<br><b>Vagas garagem=</b> ${doc.Vagas_G}<br><b>Piscinas=</b> ${doc.Piscinas}<br><b>Area Construida=</b> ${doc.Area_Const}
<br><b>Obeservações=</b> ${doc.OBS}<br>
<b>CPF PROP=</b> ${doc.CPF}<br><b>Nome PROP=</b> ${doc.Nome_Prop}<br><b>Tel PROP=</b> ${doc.Tel_Prop}<br><b>DISP_ImóveL=</b> ${doc.IMV_Disponivel}
<br><b>Valor IPTU=</b> ${doc.Valor_IPTU}<br><b> Tranzação:</b> ${doc.Tranzação}<br>
<b>Valor Condomínio=</b> ${doc.Valor_Condominio}<br><b>Valor para Venda=</b> ${doc.Valor_Venda}<br><b>Valor locação=</b> ${doc.Valor_Locação}<br>-------------------------------------<br>
<b>Data de Cadastro=</b> ${doc.Data}<br><b>Hora=</b> ${doc.Hora}<br>--------------------------------------<br><b>${doc.Editado}</b><br><br>`,'')
});
BTN_Editar.addEventListener('click',function(){
document.getElementById('a_Cadastro').click()
document.getElementById("CódigoInput").value=doc.Código;
document.getElementById("Input_cep").value=doc.CEP;
document.getElementById("RuaInput").value=doc.Rua;
document.getElementById("BairroInput").value= doc.Bairro;
document.getElementById("CidadeInput").value=doc.Cidade;
document.getElementById("UFInput").value=doc.UF;
document.getElementById("NumeroInput").value=doc.Numero;
document.getElementById("RefInput").value=doc.REF;
///////////////////////////////////////////////////////////////////////
document.getElementById("ListaSeleção").value=doc.Coll_Lista;
document.getElementById("destaque").value=doc.Destaque;
document.getElementById("TituloInput").value=doc.Titulo;
document.getElementById("SubToInput").value=doc.SubTitulo;
document.getElementById("QuartosInput").value=doc.Quartos;
document.getElementById("SuitesgoInput").value=doc.Suites;
document.getElementById("BanheirosInput").value=doc.Banheiros;
document.getElementById("VagasInput").value=doc.Vagas_G;
document.getElementById("PiscinaInput").value=doc.Piscinas;
document.getElementById("OBSInput").value=doc.OBS;
document.getElementById("AreaCInput").value=doc.Area_Const;
///////////////////////////////////////////////////////////////////////
document.getElementById("CPFpropInput").value=doc.CEP;
document.getElementById("NomepropInput").value=doc.Nome_Prop;
document.getElementById("TelpropInput").value=doc.Tel_Prop;
document.getElementById("estadoIMV").value=doc.IMV_Disponivel;
///////////////////////////////////////////////////////////////////////
document.getElementById("IPTUInput").value=doc.Valor_IPTU;
document.getElementById("CondominíoInput").value=doc.Valor_Condominio;
document.getElementById("vendaVInput").value=doc.Valor_Venda;
document.getElementById("LocaçãoVInput").value=doc.Valor_Locação;
document.getElementById("tranzação").value= doc.Tranzação;
///////////////////////////////////////////////////////////////////////
document.getElementById("mymg1").src=doc.Imagem1;
document.getElementById("mymg2").src=doc.Imagem2;
document.getElementById("mymg3").src=doc.Imagem3;
document.getElementById("mymg4").src=doc.Imagem4;
document.getElementById("mymg5").src=doc.Imagem5;
document.getElementById("mymg6").src=doc.Imagem6;
document.getElementById("mymg7").src=doc.Imagem7
document.getElementById("mymg8").src=doc.Imagem8;
document.getElementById("mymg9").src=doc.Imagem9;
document.getElementById("mymg10").src=doc.Imagem10;
//////////////////////////////////////////////////////
document.getElementById('UltimaEdição').value=doc.Editado;
/////////////////////////////////////////////////////
sessionStorage.setItem('SessiData',doc.Data);
sessionStorage.setItem('SessiHara',doc.Hora);
////////////////////////////////////////////////////////

document.getElementById('Cadastrar').style.display='block';
document.getElementById('btnsVoltar').style.display='none'
document.getElementById('proximo').style.display='block'
document.getElementById('Cadastrados').style.display='none';
document.getElementById('Vendidos').style.display='none';
document.getElementById('valorDiv').style.display='none'
document.getElementById('EndDiv').style.display='block';
document.getElementById('divImagens').style.display='none'
document.getElementById('fichaDiv').style.display='none'
sessionStorage.setItem('BLC', 'EndDiv')
document.getElementById('fichaDiv').style.display='none';
document.getElementById('a_Cadastro').click()

});
BTN_Excluir.addEventListener('click',function(){
Swal.fire({
title: `Excluir Imóvel`,
html: `
<div id='div_custonEx'>
<p>Digite ou cole o Código do imovel</p>
<input id='inputEX'  type='text' placeholder='Código 0000000000'>
<br><button id='lblEx'>Excluir</button> <br><br>
</div>
`,
background: 'hsl(0, 0%, 100%)',
color: '#0e0e0e',
showCloseButton: true,
showConfirmButton: false,
customClass: { popup: 'my-custom_EX' },
didOpen: () => { document.body.style.paddingRight = '0px'; }
});
document.getElementById('inputEX').addEventListener('input', function() {
var horaex = sessionStorage.getItem('hora');
var dataex= sessionStorage.getItem('data');
var exData=`Excluido em: ${dataex} ás ${horaex}`
var resp = this.value;
if (resp.length === 10) {
if (resp === doc.Código) {
var dbEX= firebase.firestore();
dbEX.collection('Coll_EXCLUIDOS').doc(doc.Código).set({
Código:doc.Código,
CEP:doc.CEP,
Rua:doc.Rua,
Bairro:doc.Bairro,
Cidade:doc.Cidade,
UF:doc.UF,
Numero:doc.Numero,
REF:doc.REF,
Coll_Lista:doc.Coll_Lista,
Destaque:doc.Destaque,
Titulo:doc.Titulo,
SubTitulo:doc.SubTitulo,
Quartos:doc.Quartos,
Suites:doc.Suites,
Banheiros:doc.Banheiros,
Vagas_G:doc.Vagas_G,
Piscinas:doc.Piscinas,
Area_Const:doc.Area_Const,
OBS:doc.OBS,
CPF:doc.CPF,
Nome_Prop:doc.Nome_Prop,
Tel_Prop:doc.Tel_Prop,
IMV_Disponivel: 'ativo',
Valor_IPTU: doc.Valor_IPTU,
Valor_Condominio: doc.Valor_Condominio,
Valor_Venda: doc.Valor_Venda,
Valor_Locação: doc.Valor_Locação,
Tranzação:doc.Tranzação,
Imagem1:doc.Imagem1,
Imagem2:doc.Imagem2,
Imagem3:doc.Imagem3,
Imagem4:doc.Imagem4,
Imagem5:doc.Imagem5,
Imagem6:doc.Imagem6,
Imagem7:doc.Imagem7,
Imagem8:doc.Imagem8,
Imagem9:doc.Imagem9,
Imagem10:doc.Imagem10,
Data:doc.Data,
Hora:doc.Hora,
Editado:doc.Editado,
EXCLUIDO:exData,
})
var ex = firebase.firestore();
ex.collection(doc.Coll_Lista).doc(doc.Código).delete()
.then(() => {
console.log("Documento excluído com sucesso!");
// alert("Imóvel excluído!");
})
.catch((error) => {
console.error("Erro ao excluir: ", error);
// alert("Erro ao excluir o imóvel!");
});
var exx = firebase.firestore();
exx.collection('GeralColl').doc(doc.Código).delete()
.then(() => {
console.log("Documento excluído com sucesso!");
Swal.fire('','Imóvel excluído!','success');
setTimeout(function(){
imovelList()
},1000);
})
.catch((error) => {
console.error("Erro ao excluir: ", error);
//alert("Erro ao excluir o imóvel!");
});
} else {
Swal.fire('','O Código digitado não está correto!','warning')
}
}
});
document.getElementById('lblEx').addEventListener('click', function() {
  var horaex = sessionStorage.getItem('hora');
var dataex= sessionStorage.getItem('data');
var exData=`Excluido em: ${dataex} ás ${horaex}`
var resp = document.getElementById('inputEX').value;
if (resp.length === 10 && resp === doc.Código) {
var dbEX= firebase.firestore();
dbEX.collection('Coll_EXCLUIDOS').doc(doc.Código).set({
Código:doc.Código,
CEP:doc.CEP,
Rua:doc.Rua,
Bairro:doc.Bairro,
Cidade:doc.Cidade,
UF:doc.UF,
Numero:doc.Numero,
REF:doc.REF,
Coll_Lista:doc.Coll_Lista,
Destaque:doc.Destaque,
Titulo:doc.Titulo,
SubTitulo:doc.SubTitulo,
Quartos:doc.Quartos,
Suites:doc.Suites,
Banheiros:doc.Banheiros,
Vagas_G:doc.Vagas_G,
Piscinas:doc.Piscinas,
Area_Const:doc.Area_Const,
OBS:doc.OBS,
CPF:doc.CPF,
Nome_Prop:doc.Nome_Prop,
Tel_Prop:doc.Tel_Prop,
IMV_Disponivel: 'ativo',
Valor_IPTU: doc.Valor_IPTU,
Valor_Condominio: doc.Valor_Condominio,
Valor_Venda: doc.Valor_Venda,
Valor_Locação: doc.Valor_Locação,
Tranzação:doc.Tranzação,
Imagem1:doc.Imagem1,
Imagem2:doc.Imagem2,
Imagem3:doc.Imagem3,
Imagem4:doc.Imagem4,
Imagem5:doc.Imagem5,
Imagem6:doc.Imagem6,
Imagem7:doc.Imagem7,
Imagem8:doc.Imagem8,
Imagem9:doc.Imagem9,
Imagem10:doc.Imagem10,
Data:doc.Data,
Hora:doc.Hora,
Editado:doc.Editado,
EXCLUIDO:exData,
})
var ex = firebase.firestore();
ex.collection(doc.Coll_Lista).doc(doc.Código).delete()
.then(() => {
console.log("Documento excluído com sucesso!");
// alert("Imóvel excluído!");
})
.catch((error) => {
console.error("Erro ao excluir: ", error);
//alert("Erro ao excluir o imóvel!");
});
var exx = firebase.firestore();
exx.collection('GeralColl').doc(doc.Código).delete()
.then(() => {
console.log("Documento excluído com sucesso!");
Swal.fire('','Imóvel excluído!','success');
Swal.fire('','Imóvel excluído!','success');
setTimeout(function(){
imovelList()
},1000);
})
.catch((error) => {
console.error("Erro ao excluir: ", error);
//alert("Erro ao excluir o imóvel!");
})
} else {
Swal.fire('','O Código digitado não está correto!','warning')
}
});
});
}
})
})
}
function toggleMenu() {
var menu = document.getElementById("menu");
if (menu.style.display === "block") {
menu.style.display = "none";
} else {
menu.style.display = "block";
}
}
function pesquisar(){
toggleMenu()
}
//Pesquisa
function Listaitens(){
var itens= sessionStorage.getItem('itens')
if(!itens||itens===''||itens===0){
Swal.fire({ 
title: ``,
text: ``,
html:`
<div>
<b id="bbdesc"> Não encontramos nada relacionado as informações digitadas</b><br><b id="b"></b>
</div> 
`,
imageUrl: ``,
background: '#000000',
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
setTimeout(function(){
Swal.close()
},5000)
}
}
sessionStorage.setItem('itens','')
function pesquisarProduto() {
sessionStorage.setItem('itens','')
//document.getElementById('respPesquisasadiv').style.display='none'
var listy = document.getElementById('listpesqRes');
listy.innerHTML = ''
var termo = document.getElementById("pesquise").value.toLowerCase();
if(termo){
var itens = 0
setTimeout(function(){
Listaitens()
},2000)
var dbP= firebase.firestore()
dbP.collection("GeralColl").get().then(snapshot => {
snapshot.forEach(docSnap => {
var data = docSnap.data();
itens++
if (data.Rua && data.Rua.toLowerCase().includes(termo) || data.Bairro && data.Bairro.toLowerCase().includes(termo)  ||data.Código && data.Código.toLowerCase().includes(termo) ||data.Titulo && data.Titulo.toLowerCase().includes(termo) ||data.Cidade && data.Cidade.toLowerCase().includes(termo))  {
var rua = data.Rua ? data.Rua.toLowerCase() : ""; var bairro = data.Bairro? data.Bairro.toLowerCase() : ""; var cod = data.Código ? data.Código.toLowerCase() : ""; var titulo = data.Titulo ? data.Titulo.toLowerCase() : ""; var cidade = data.Cidade ? data.Cidade.toLowerCase() : "";

if (rua.includes(termo) || termo.includes(rua)||cod.includes(termo) || termo.includes(cod)||bairro.includes(termo) || termo.includes(bairro) || titulo.includes(termo) || termo.includes(titulo) || cidade.includes(termo) || termo.includes(cidade)) {
//alert(data.Titulo)
if(data.IMV_Disponivel=='ativo'){

var divbase=document.createElement('div');
var div=document.createElement('div');
var h3=document.createElement('h4');
var div2=document.createElement('div');
var imagem=document.createElement('img');
var label=document.createElement('label');
var label2=document.createElement('label');
var label3=document.createElement('label');
var BTN_Excluir= document.createElement('button');
var BTN_Editar= document.createElement('button');
var BTN_Mais= document.createElement('button');

divbase.id='divbase';
div.id='divum';
div2.id='divdois';
imagem.id='imagemps';
label.id='lbl1';
label2.id='lbl2';
label3.id='lbl3';
h3.id='h33'
BTN_Editar.id='editarBTN';
BTN_Mais.id='maisBTN';
BTN_Excluir.id="excluirBTN";

imagem.src=data.Imagem1;
label.textContent= data.Bairro;
label2.textContent= data.Código
h3.textContent=data.Titulo
BTN_Editar.textContent='Editar';
BTN_Excluir.className='fa-solid fa-trash';
BTN_Mais.className='fa-solid fa-eye';

BTN_Mais.title='Ver mais informações';
BTN_Excluir.title='Excluir este imóvel';
BTN_Editar.title='Editar informações do cadastro'

div.appendChild(imagem);
div2.appendChild(h3);
div2.appendChild(label);
div2.appendChild(document.createElement('br'))
div2.appendChild(label2);
div2.appendChild(document.createElement('br'))
divbase.appendChild(div);
divbase.appendChild(div2);
divbase.appendChild(BTN_Editar);
divbase.appendChild(BTN_Mais);
divbase.appendChild(BTN_Excluir);

listy.appendChild(divbase)
sessionStorage.setItem('itens',itens)

imagem.addEventListener('click', function(){
Swal.fire({
title: ``,
html: `
<img id='imimg' src="${data.Imagem1}" alt="" width="280"> 
<br><label id='trocarFoto' style="cursor:pointer">PRONTO!!</label>
`,
background: 'hsla(0, 0%, 100%, 0.00)',
color: '#0e0e0e',
showCloseButton: true,
showConfirmButton: false,
customClass: { popup: 'my-custom_img' },
didOpen: () => { document.body.style.paddingRight = '0px'; }
});
// Quando clicar em "Trocar de foto"
document.getElementById('trocarFoto').style.display='none'
//swal('Pronto', 'imagem Carregada',url_imagem)    
});

BTN_Editar.addEventListener('click',function(){
document.getElementById('a_Cadastro').click()
document.getElementById("CódigoInput").value=data.Código;
document.getElementById("Input_cep").value=data.CEP;
document.getElementById("RuaInput").value=data.Rua;
document.getElementById("BairroInput").value= data.Bairro;
document.getElementById("CidadeInput").value=data.Cidade;
document.getElementById("UFInput").value=data.UF;
document.getElementById("NumeroInput").value=data.Numero;
document.getElementById("RefInput").value=data.REF;
///////////////////////////////////////////////////////////////////////
document.getElementById("ListaSeleção").value=data.Coll_Lista;
document.getElementById("destaque").value=data.Destaque;
document.getElementById("TituloInput").value=data.Titulo;
document.getElementById("SubToInput").value=data.SubTitulo;
document.getElementById("QuartosInput").value=data.Quartos;
document.getElementById("SuitesgoInput").value=data.Suites;
document.getElementById("BanheirosInput").value=data.Banheiros;
document.getElementById("VagasInput").value=data.Vagas_G;
document.getElementById("PiscinaInput").value=data.Piscinas;
document.getElementById("OBSInput").value=data.OBS;
///////////////////////////////////////////////////////////////////////
document.getElementById("CPFpropInput").value=data.CEP;
document.getElementById("NomepropInput").value=data.Nome_Prop;
document.getElementById("TelpropInput").value=data.Tel_Prop;
document.getElementById("estadoIMV").value=data.IMV_Disponivel;
///////////////////////////////////////////////////////////////////////
document.getElementById("IPTUInput").value=data.Valor_IPTU;
document.getElementById("CondominíoInput").value=data.Valor_Condominio;
document.getElementById("vendaVInput").value=data.Valor_Venda;
document.getElementById("LocaçãoVInput").value=data.Valor_Locação;
document.getElementById("tranzação").value= data.Tranzação;
///////////////////////////////////////////////////////////////////////
document.getElementById("mymg1").src=data.Imagem1;
document.getElementById("mymg2").src=data.Imagem2;
document.getElementById("mymg3").src=data.Imagem3;
document.getElementById("mymg4").src=data.Imagem4;
document.getElementById("mymg5").src=data.Imagem5;
document.getElementById("mymg6").src=data.Imagem6;
document.getElementById("mymg7").src=data.Imagem7
document.getElementById("mymg8").src=data.Imagem8;
document.getElementById("mymg9").src=data.Imagem9;
document.getElementById("mymg10").src=data.Imagem10;
//////////////////////////////////////////////////////
document.getElementById('UltimaEdição').value=data.Editado;
/////////////////////////////////////////////////////
sessionStorage.setItem('SessiData',data.Data);
sessionStorage.setItem('SessiHara',data.Hora);
////////////////////////////////////////////////////////
document.getElementById('a_Cadastro').click()
toggleMenu()
document.getElementById('Cadastrar').style.display='block';
document.getElementById('btnsVoltar').style.display='block'
document.getElementById('proximo').style.display='block'
document.getElementById('Cadastrados').style.display='none';
document.getElementById('Vendidos').style.display='none';
document.getElementById('valorDiv').style.display='none'
document.getElementById('EndDiv').style.display='block';
document.getElementById('divImagens').style.display='none'
document.getElementById('fichaDiv').style.display='none'
sessionStorage.setItem('BLC', 'EndDiv')


});

BTN_Mais.addEventListener('click', function(){
Swal.fire(`🏡Ficha do Imóvel `,`<b>Código= </b> ${data.Código}<br><b>Titulo=</b> ${data.Titulo}<br><b>SubTitulo=</b>  ${data.SubTitulo}<br><b>CEP=</b> ${data.CEP}
  <br><b>Rua=</b>  ${data.Rua}<br><b>N°=</b>  ${data.Numero}<br><b>Bairro=</b>  ${data.Bairro}<br>
<b>Cidade=</b> ${data.Cidade}<br><b>UF=</b> ${data.UF}<br><b>Referência=</b> ${data.REF}<br><b>Lista=</b> ${data.Coll_Lista}<br><b>Destaque=</b> ${data.Destaque}
 <br><b>Quartos=</b> ${data.Quartos}<br><b>Suíte=</b> ${data.Suites}<br>
<b>Banheiro=</b>  ${data.Banheiros}<br><b>Vagas garagem=</b> ${data.Vagas_G}<br><b>Piscinas=</b> ${data.Piscinas}<br><b>Area Construida=</b> ${data.Area_Const}
<br><b>Obeservações=</b> ${data.OBS}<br>
<b>CPF PROP=</b> ${data.CPF}<br><b>Nome PROP=</b> ${data.Nome_Prop}<br><b>Tel PROP=</b> ${data.Tel_Prop}<br><b>DISP_ImóveL=</b> ${data.IMV_Disponivel}
<br><b>Valor IPTU=</b> ${data.Valor_IPTU}<br><b> Tranzação:</b> ${data.Tranzação}<br>
<b>Valor Condomínio=</b> ${data.Valor_Condominio}<br><b>Valor para Venda=</b> ${data.Valor_Venda}<br><b>Valor locação=</b> ${data.Valor_Locação}<br>-------------------------------------<br>
<b>Data de Cadastro=</b> ${data.Data}<br><b>Hora=</b> ${data.Hora}<br>--------------------------------------<br><b>${data.Editado}</b><br><br>`,'')
});
BTN_Excluir.addEventListener('click',function(){
Swal.fire({
title: `Excluir Imóvel`,
html: `
<div id='div_custonEx'>
<p>Digite ou cole o Código do imovel</p>
<input id='inputEX'  type='text' placeholder='Código 0000000000'>
<br><button id='lblEx'>Excluir</button> <br><br>
</div>
`,
background: 'hsl(0, 0%, 100%)',
color: '#0e0e0e',
showCloseButton: true,
showConfirmButton: false,
customClass: { popup: 'my-custom_EX' },
didOpen: () => { document.body.style.paddingRight = '0px'; }
});
document.getElementById('inputEX').addEventListener('input', function() {
var horaex = sessionStorage.getItem('hora');
var dataex= sessionStorage.getItem('data');
var exData=`Excluido em: ${dataex} ás ${horaex}`
var resp = this.value;
if (resp.length === 10) {
if (resp === data.Código) {
var dbEX= firebase.firestore();
dbEX.collection('Coll_EXCLUIDOS').doc(data.Código).set({
Código:data.Código,
CEP:data.CEP,
Rua:data.Rua,
Bairro:data.Bairro,
Cidade:data.Cidade,
UF:data.UF,
Numero:data.Numero,
REF:data.REF,
Coll_Lista:data.Coll_Lista,
Destaque:data.Destaque,
Titulo:data.Titulo,
SubTitulo:data.SubTitulo,
Quartos:data.Quartos,
Suites:data.Suites,
Banheiros:data.Banheiros,
Vagas_G:data.Vagas_G,
Piscinas:data.Piscinas,
Area_Const:data.Area_Const,
OBS:data.OBS,
CPF:data.CPF,
Nome_Prop:data.Nome_Prop,
Tel_Prop:data.Tel_Prop,
IMV_Disponivel: 'ativo',
Valor_IPTU:data.Valor_IPTU,
Valor_Condominio:data.Valor_Condominio,
Valor_Venda:data.Valor_Venda,
Valor_Locação:data.Valor_Locação,
Tranzação:data.Tranzação,
Imagem1:data.Imagem1,
Imagem2:data.Imagem2,
Imagem3:data.Imagem3,
Imagem4:data.Imagem4,
Imagem5:data.Imagem5,
Imagem6:data.Imagem6,
Imagem7:data.Imagem7,
Imagem8:data.Imagem8,
Imagem9:data.Imagem9,
Imagem10:data.Imagem10,
Data:data.Data,
Hora:data.Hora,
Editado:data.Editado,
EXCLUIDO:exData ,
})
var ex = firebase.firestore();
ex.collection(data.Coll_Lista).doc(data.Código).delete()
.then(() => {
console.log("Documento excluído com sucesso!");
// alert("Imóvel excluído!");
})
.catch((error) => {
console.error("Erro ao excluir: ", error);
// alert("Erro ao excluir o imóvel!");
});
var exx = firebase.firestore();
exx.collection('GeralColl').doc(data.Código).delete()
.then(() => {
console.log("Documento excluído com sucesso!");
Swal.fire('','Imóvel excluído!','success');
setTimeout(function(){
imovelList()
},1000);
})
.catch((error) => {
console.error("Erro ao excluir: ", error);
//alert("Erro ao excluir o imóvel!");
});
} else {
Swal.fire('','O Código digitado não está correto!','warning')
}
}
});
document.getElementById('lblEx').addEventListener('click', function() {
  var horaex = sessionStorage.getItem('hora');
var dataex= sessionStorage.getItem('data');
var exData=`Excluido em: ${dataex} ás ${horaex}`
var resp = document.getElementById('inputEX').value;
if (resp.length === 10 && resp === data.Código) {
var dbEX= firebase.firestore();
dbEX.collection('Coll_EXCLUIDOS').doc(data.Código).set({
Código:data.Código,
CEP:data.CEP,
Rua:data.Rua,
Bairro:data.Bairro,
Cidade:data.Cidade,
UF:data.UF,
Numero:data.Numero,
REF:data.REF,
Coll_Lista:data.Coll_Lista,
Destaque:data.Destaque,
Titulo:data.Titulo,
SubTitulo:data.SubTitulo,
Quartos:data.Quartos,
Suites:data.Suites,
Banheiros:data.Banheiros,
Vagas_G:data.Vagas_G,
Piscinas:data.Piscinas,
Area_Const:data.Area_Const,
OBS:data.OBS,
CPF:data.CPF,
Nome_Prop:data.Nome_Prop,
Tel_Prop:data.Tel_Prop,
IMV_Disponivel: 'ativo',
Valor_IPTU: data.Valor_IPTU,
Valor_Condominio: data.Valor_Condominio,
Valor_Venda: data.Valor_Venda,
Valor_Locação: data.Valor_Locação,
Tranzação:data.Tranzação,
Imagem1:data.Imagem1,
Imagem2:data.Imagem2,
Imagem3:data.Imagem3,
Imagem4:data.Imagem4,
Imagem5:data.Imagem5,
Imagem6:data.Imagem6,
Imagem7:data.Imagem7,
Imagem8:data.Imagem8,
Imagem9:data.Imagem9,
Imagem10:data.Imagem10,
Data:data.Data,
Hora:data.Hora,
Editado:data.Editado,
EXCLUIDO:exData ,
})
setInterval(function(){
  window.location.reload()
},3000)
var ex1 = firebase.firestore();
ex1.collection(data.Coll_Lista).doc(data.Código).delete()
.then(() => {
console.log("Documento excluído com sucesso!");
// alert("Imóvel excluído!");

})
.catch((error) => {
console.error("Erro ao excluir: ", error);
//alert("Erro ao excluir o imóvel!");
});
var exx_ = firebase.firestore();
exx_.collection('GeralColl').doc(data.Código).delete()
.then(() => {
console.log("Documento excluído com sucesso!");
Swal.fire('','Imóvel excluído!','success');

})

} else {
Swal.fire('','O Código digitado não está correto!','warning')
}
});
});
}
}

} else{
}
});
});

}else{
Swal.fire('','Preencha o campo de pesquisa!','')
}
}
//dataument.getElementById('lblfchardivPesq').addEventListener('click',function(){
//fech()
//})
//clic pesquisa teclado
var botao = document.getElementById('pesqI');
// Captura o evento de tecla pressionada
document.addEventListener('keydown', function(event) {
if (event.key === 'Enter') {
event.preventDefault(); // evita o comportamento padrão (como enviar formulário)
botao.click(); // aciona o clique do botão
}
});

