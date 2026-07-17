

// Tela Cheia
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

// Gerar código
function geradorCodigo(){
document.getElementById('inputCódigo').value= ''
var cod=document.getElementById('inputCódigo').value;
if(!cod|| cod==''){
var hora= sessionStorage.getItem('hora')
var data= sessionStorage.getItem('data')
var time= hora.split(':')
var resp0=time[0]
var resp1=time[1]
var resp2=time[2]
var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let codigo = '';
for (let i = 0; i < 4; i++) {
codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
var codigo_= `${codigo}-`+resp1+resp2
document.getElementById('inputCódigo').value= `${codigo_}`
}
} else{
}
}

document.getElementById('select_Cadastre').addEventListener('change', function(){
  
var resp= document.getElementById('select_Cadastre').value;
if(resp=='video'){

document.getElementById('select_Cadastre').value='';
document.getElementById('divCadastro').style.display='none'
document.getElementById('div_Cadastrados').style.display='none';

Swal.fire({
title: `Upload e Download `,
html: `
<h2 id='Preenchimentoh2'>Preencha os campos Titulo e SubT.</h2>
<div id='dadosdiv'>
<input type="text" id="TituloInputVideo" placeholder="Digite um Titulo"> <br>
<input type="text" id="SubTituloInputVideo" placeholder="Digite um SubTitulo"> <br>
</div>
<div id="armazenar">
<h4>Upload</h4>
<input type="file" id="videoInput" accept="video/*" placeholder="file"><br>
<button onclick="uploadVideo()">Enviar Vídeo</button>
<br><br>
<h4>Visualizar , Baixar , Deletar</h4>
<input type="text" id="fileIdInput" placeholder="Digite o File ID">
<input type="text" id="filedelete" placeholder="Digite o File ID">
<button onclick="showVideo()">Mostrar</button>
<button onclick="downloadVideo()">Baixar</button>
<button id="btnDelet" onclick="deleteVideo()" title="deletar"> Deletar</button>
<div id="videoContainer"></div>
<br>
<button id="salvarCadVideo"  title="Salvar"> Salvar Video</button>
<br><br>
</div>
`,
background: 'hsl(0, 0%, 100%)',
color: '#0e0e0e',
showCloseButton: true,
showConfirmButton: false,
customClass: { popup: 'my-custom_img' },
didOpen: () => { document.body.style.paddingRight = '0px'; }
});
  document.getElementById('Preenchimentoh2').style.display='none';
var client = new Appwrite.Client()
.setEndpoint("https://nyc.cloud.appwrite.io/v1")
.setProject("6a592bf5000f7f251ba1");

var storage = new Appwrite.Storage(client);
var bucketId = "6a592c4b000f5847fcd2"; 

// Funções no escopo global
window.uploadVideo = async function() {
var file = document.getElementById("videoInput").files[0];
if (!file) return Swal.fire("Erro", "Selecione um vídeo!", "error");
try {
var response = await storage.createFile(bucketId, "unique()", file);
// Swal.fire("Sucesso", "Upload concluído! File ID: " + response.$id, "success");
document.getElementById('fileIdInput').value= response.$id
document.getElementById('filedelete').value= response.$id
showVideo()
} catch (err) {
//Swal.fire("Erro", err.message, "error");
}
}

window.showVideo = async function() {
var fileId = document.getElementById("fileIdInput").value;
if (!fileId) return Swal.fire("Erro", "Digite o File ID!", "error");
try {
const viewUrl = storage.getFileView(bucketId, fileId);
document.getElementById("videoContainer").innerHTML =
`<video src="${viewUrl}" controls width="480"></video>`;
} catch (err) {
Swal.fire("Erro", err.message, "error");
}
}

window.downloadVideo = async function() {
var fileId = document.getElementById("fileIdInput").value;
if (!fileId) return Swal.fire("Erro", "Digite o File ID!", "error");
try {
var downloadUrl = storage.getFileDownload(bucketId, fileId);
window.open(downloadUrl, "_blank");
} catch (err) {
Swal.fire("Erro", err.message, "error");
}
}

window.deleteVideo = async function() {
var fileId = document.getElementById("filedelete").value;
if (!fileId) return Swal.fire("Erro", "Digite o File ID!", "error");
try {
await storage.deleteFile(bucketId, fileId);
Swal.fire("Sucesso", "Vídeo deletado com sucesso!", "success");
} catch (err) {
Swal.fire("Erro", err.message, "error");
}
}

document.getElementById('salvarCadVideo').addEventListener('click', function(){
var url_ID=document.getElementById('fileIdInput').value;
var TituloVideo= document.getElementById('TituloInputVideo').value;
var subTVideo=document.getElementById('SubTituloInputVideo').value;
var hora=sessionStorage.getItem('hora')
var data=sessionStorage.getItem('data')

if(!url_ID|| url_ID==''|| !TituloVideo|| !subTVideo){
 document.getElementById('Preenchimentoh2').style.display='block';
}else{
   document.getElementById('Preenchimentoh2').style.display='none';
  var vd=firebase.firestore();
  vd.collection('ASD_VIDEOS_PAG').doc(url_ID).set({
    
    Titulo: TituloVideo,
    SubTitulo: subTVideo,
    URL_ID:url_ID,
    DATA:data,
    HORA:hora,

  
  })
  Swal.fire('salvo','Dados armazenados!','success')
}
})

}else{


document.getElementById('inputNome').value='';
document.getElementById('inputTitulo').value='';
document.getElementById('inputSubTitulo').value='';
document.getElementById('inputOBS').value='';
document.getElementById('select_Departamentos').value='';
document.getElementById('imagemLogo').src=`../SRC/LogoApas.png`;
document.getElementById('inputCódigo').value='';
document.getElementById('select_Cadastrados').value='';
var resp = document.getElementById('inputNome');
resp.disabled = false;
var resp2=document.getElementById('selectDoc');
resp2.disabled = false;
document.getElementById('divIMGEM').style.display='block';

geradorCodigo()
var resp= document.getElementById('select_Cadastre').value; 
if(!resp||resp==''||resp=='sair'){
document.getElementById('select_Cadastre').value= '';
document.getElementById('divCadastro').style.display='none'
}else{
document.getElementById('a_cadastro').click()
document.getElementById('divCadastro').style.display='block'
document.getElementById('div_Cadastrados').style.display='none';
}
  }
})

setInterval(function(){
var nome= document.getElementById('inputNome').value;
var titulo=document.getElementById('inputTitulo').value;
var lista=document.getElementById('select_Cadastre').value;
var departamento=document.getElementById('select_Departamentos').value;
var codigo= document.getElementById('inputCódigo').value;
var docTipo= document.getElementById('selectDoc').value;
var btImg=document.getElementById('divIMGEM').style.display;
if(!nome||!titulo||!lista||!departamento||!docTipo|| btImg=='block'){
document.getElementById('divSalvarCad').style.display='none'
} else{
document.getElementById('divSalvarCad').style.display='block'
}
},100)

//selecionar imagem
document.getElementById('divIMGEM').addEventListener('click',function(){
var nome= document.getElementById('inputNome').value;
var docTipo= document.getElementById('selectDoc').value;

if(!nome||!docTipo){
Swal.fire('','Preencha o campo nome da imagem e Tipo de documento!','warning')
}else{
document.getElementById('fileInput').click()
}
});

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = "https://byuckhoakmjtidcsmqzd.supabase.co"
const SUPABASE_KEY = "sb_publishable_kz_65I4tRCLRJumF86S8Rw_mqeNHunn"
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const inputFile = document.getElementById('fileInput')
const imgPreview = document.getElementById('imagemLogo')

inputFile.addEventListener('change', async (event) => {
var banco=document.getElementById('select_Cadastre').value;
var nome= document.getElementById('inputNome').value;
var lista=document.getElementById('select_Cadastre').value;
var docTipo= document.getElementById('selectDoc').value;
var refence=docTipo


const file = event.target.files[0]
if (!file) return
// Upload para o bucket 'imagensapp'
const { data, error } = await supabase
.storage
.from('Logos') // nome do bucket
.upload(`${banco}/${nome}${refence}`, file, { upsert: true })
if (error) {
console.error('Erro no upload:', error)
return
}

// Recupera URL pública
const { data: publicData } = supabase
.storage
.from('Logos')
.getPublicUrl(`${banco}/${nome}${refence}`)

// Mostra a imagem no <img>
imgPreview.src = publicData.publicUrl
//alert(publicData.publicUrl)
sessionStorage.setItem('Nome_Imagem', `${nome}${refence}` )

var resp = document.getElementById('inputNome');
resp.disabled = true;

var resp2=document.getElementById('selectDoc');
resp2.disabled = true;

document.getElementById('divIMGEM').style.display='none';
})
// salvar firebase
document.getElementById('divSalvarCad').addEventListener('click',function(){
var nome= document.getElementById('inputNome').value;
var tipo= document.getElementById('selectDoc').value;
var titulo=document.getElementById('inputTitulo').value;
var subtitulo=document.getElementById('inputSubTitulo').value;
var obs=document.getElementById('inputOBS').value;
var lista=document.getElementById('select_Cadastre').value;
var departamento=document.getElementById('select_Departamentos').value;
var imagem=document.getElementById('imagemLogo').src;
var codigo= document.getElementById('inputCódigo').value;
var hora=sessionStorage.getItem('hora')
var data=sessionStorage.getItem('data')
var nome_imagem= nome+tipo;

if(!lista||!codigo||!nome||!titulo||!departamento||!tipo){
Swal.fire('','Preencha os campos obrigatórios!')
}else{
var db= firebase.firestore();
db.collection('Cadastros-Gerais').doc(`${codigo}`).set({

Titulo:titulo ,
SubTitulo:subtitulo ,
OBS: obs,
Imagem:imagem ,
Nome_Imagem:nome_imagem,
Nome:nome,
Tipo:tipo,
Lista:lista,
Departamento:departamento,
Codigo_ID: codigo,
Hora:hora,
Data:data,
})
Swal.fire('','Cadastro Salvo com sucesso!','success')
ListaItens()
setTimeout(function(){
document.getElementById('inputNome').value='';
document.getElementById('inputTitulo').value='';
document.getElementById('inputSubTitulo').value='';
document.getElementById('inputOBS').value='';
document.getElementById('select_Cadastre').value='';
document.getElementById('select_Departamentos').value='';
document.getElementById('imagemLogo').src=`../SRC/LogoApas.png`;
document.getElementById('inputCódigo').value='';
document.getElementById('divCadastro').style.display='none';
document.getElementById('selectDoc').value='';
document.getElementById('select_Cadastrados').value='';
var resp = document.getElementById('inputNome');
resp.disabled = false;
var resp2=document.getElementById('selectDoc');
resp2.disabled = false;
},1000)
}
})

// Fechar cadastro
document.getElementById('P_fechar_Cad').addEventListener('click',function(){
document.getElementById('inputNome').value='';
document.getElementById('inputTitulo').value='';
document.getElementById('inputSubTitulo').value='';
document.getElementById('inputOBS').value='';
document.getElementById('select_Cadastre').value='';
document.getElementById('select_Departamentos').value='';
document.getElementById('imagemLogo').src=`../SRC/LogoApas.png`;
document.getElementById('inputCódigo').value='';
document.getElementById('divCadastro').style.display='none';
document.getElementById('selectDoc').value='';
var resp = document.getElementById('inputNome');
resp.disabled = false;
var resp2=document.getElementById('selectDoc');
resp2.disabled = false;
});
document.getElementById('P_fechar_CadItens').addEventListener('click',function(){
document.getElementById('inputNome').value='';
document.getElementById('inputTitulo').value='';
document.getElementById('inputSubTitulo').value='';
document.getElementById('inputOBS').value='';
document.getElementById('select_Cadastre').value='';
document.getElementById('select_Departamentos').value='';
document.getElementById('imagemLogo').src=`../SRC/LogoApas.png`;
document.getElementById('inputCódigo').value='';
document.getElementById('divCadastro').style.display='none';
document.getElementById('selectDoc').value='';
document.getElementById('div_Cadastrados').style.display='none';
document.getElementById('select_Cadastrados').value= '';
var resp = document.getElementById('inputNome');
resp.disabled = false;
var resp2=document.getElementById('selectDoc');
resp2.disabled = false;
});

// Chanar itens cadastrados via select
document.getElementById('select_Cadastrados').addEventListener('change', function(){

var resp= document.getElementById('select_Cadastrados').value; 
document.getElementById('divIMGEM').style.display='none';
if(!resp||resp==''||resp=='sair'){
document.getElementById('select_Cadastrados').value= '';
document.getElementById('div_Cadastrados').style.display='none';
}else{
document.getElementById('a_cadastro').click()
document.getElementById('divCadastro').style.display='none';
document.getElementById('div_Cadastrados').style.display='block';
sessionStorage.setItem('ListaItens', resp);
document.getElementById('select_Cadastre').value='';
ListaItens();
}
})

//Excluir imagem e nome da imagem
document.getElementById('lblEXC').addEventListener('click', function(){
    document.getElementById('divIMGEM').style.display='none';
var nome= document.getElementById('inputNome').value;
var tipo= document.getElementById('selectDoc').value;
//var titulo=document.getElementById('inputTitulo').value;
//var subtitulo=document.getElementById('inputSubTitulo').value;
//var obs=document.getElementById('inputOBS').value;
var banco=document.getElementById('select_Cadastre').value;
//var departamento=document.getElementById('select_Departamentos').value;
//var imagem=document.getElementById('imagemLogo').src;
var codigo= document.getElementById('inputCódigo').value;

  const fileName = nome+tipo// sessionStorage.getItem('url')
  alert(fileName)
  if (!fileName) {
    console.error("Nenhum arquivo selecionado para excluir")
    return
  }
  supabase
    .storage
    .from('Logos') // nome do bucket
    .remove([`${banco}/${fileName}`])
    .then(({ data, error }) => {
      if (error) {
        console.error("Erro ao excluir:", error)
      } else {
        console.log("Arquivo excluído com sucesso:", data)
        imgPreview.src = "" // limpa a imagem do preview
        document.getElementById('imagemLogo').src=`../SRC/LogoApas.png`;
        document.getElementById('inputNome').value='';
        document.getElementById('selectDoc').value='';
        var resp = document.getElementById('inputNome');
         resp.disabled = false;
        var resp2=document.getElementById('selectDoc');
         resp2.disabled= false;

        var dbex= firebase.firestore();
        dbex.collection('Cadastros-Gerais').doc(codigo).delete()

        Swal.fire('','Excluido com sucesso!', 'success')
        document.getElementById('P_fechar_Cad').click()
        ListaItens()

      }
    })
})

// lista Itens
sessionStorage.setItem('Dep','');
function ListaItens(){
var dep=sessionStorage.getItem('Dep');
var seleção=sessionStorage.getItem('ListaItens')
var itens=0;
var list = document.getElementById('lists');
list.innerHTML=''
var dbl = firebase.firestore();
var produtosRef = dbl.collection(`Cadastros-Gerais`);
produtosRef.get().then((querySnapshot) => {
querySnapshot.forEach(docSnap => {
var doc = docSnap.data();
if(seleção== doc.Lista ){
  if(!dep ||dep==''||dep== doc.Departamento ){
itens++

var containner=document.createElement('div');
var div1=document.createElement('div');
var div2=document.createElement('div');
var div3=document.createElement('div');

var label1=document.createElement('label');
//var label2=document.createElement('label');
var label3=document.createElement('label');
var label4=document.createElement('label');

var botão=document.createElement('botton');
var botão2=document.createElement('botton');

var imagem=document.createElement('img');

containner.className='ContG';
div1.className='div1';
div2.className='div2';
div3.className='div3';

label1.className='label1';
//label2.className='label2';
label3.className='label3';
label4.className='label4';


label1.textContent=doc.Titulo;
//label2.textContent=doc.SubTitulo;
label3.textContent=`DEPART: ${doc.Departamento}`;
label4.textContent=doc.Codigo_ID;


botão.id='botão';
botão2.id='botão2'

botão.textContent='📝Editar'
botão2.className='fa-solid fa-eye';


imagem.className='imagem1'
imagem.src=doc.Imagem


div1.appendChild(imagem);
div2.appendChild(label1)
//div2.appendChild(label2)
div2.appendChild(label3)
div2.appendChild(document.createElement('br'))
div2.appendChild(label4)
div3.appendChild(botão2);
div3.appendChild(document.createElement('br'))

div3.appendChild(botão);
containner.appendChild(div1);
containner.appendChild(div2);
containner.appendChild(div3);
list.appendChild(containner);

botão.addEventListener('click',function(){
document.getElementById('inputNome').value=doc.Nome;
document.getElementById('inputTitulo').value=doc.Titulo;
document.getElementById('inputSubTitulo').value=doc.SubTitulo;
document.getElementById('inputOBS').value=doc.OBS;
document.getElementById('select_Cadastre').value=doc.Lista;
document.getElementById('select_Departamentos').value=doc.Departamento;
document.getElementById('imagemLogo').src=doc.Imagem;
document.getElementById('inputCódigo').value=doc.Codigo_ID;
document.getElementById('divCadastro').style.display='block';
//document.getElementById('div_Cadastrados').style.display='none';
document.getElementById('selectDoc').value=doc.Tipo;
document.getElementById('divIMGEM').style.display='none'
var resp = document.getElementById('inputNome');
resp.disabled = true;
var resp2=document.getElementById('selectDoc');
resp2.disabled = true;
document.getElementById('a_cadastro').click()

})
  
}
}
})
})
};

// deartamento select
document.getElementById('sel-Departamentos').addEventListener('change',function(){
  var dep=document.getElementById('sel-Departamentos').value;
  sessionStorage.setItem('Dep',dep);
 ListaItens()

});

// ir para tela inicial
document.getElementById('TelaInicial').addEventListener('click',function(){
window.open('../index.html','_self')
});