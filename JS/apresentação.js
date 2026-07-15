
 sessionStorage.setItem('Lista', '')

window.onload = function () {
var params = new URLSearchParams(window.location.search);
var codigo = params.get("codigo");

if (codigo) {
//wal("Código capturado: " + codigo);
sessionStorage.setItem('Codigo_ID', codigo);
document.getElementById('p_codigo').innerHTML=codigo
iniciar()
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

  document.getElementById('p_OBS').style.display='none'
function iniciar(){

var codigo = sessionStorage.getItem('Codigo_ID');
var db = firebase.firestore();
db.collection('Cadastros-Gerais').doc(codigo).get().then((doc) => {
    if (doc.exists) {
        var dados = doc.data();
        sessionStorage.setItem('Lista', dados.Lista)
        document.getElementById('imgLogo').src= dados.Imagem
        document.getElementById('h2_titulo').innerHTML = dados.Titulo;
        document.getElementById('h3_SubTitulo').innerHTML = dados.SubTitulo;
         if(dados.OBS){
            document.getElementById('p_OBS').innerHTML = dados.OBS;
             document.getElementById('p_OBS').style.display='block'
         }else{
              document.getElementById('p_OBS').style.display='none'
         }
    } else {
        console.log("Documento não encontrado!");
    }
}).catch((error) => {
    console.error("Erro ao buscar documento:", error);
});

}

var botãoBaixar=document.getElementById('i_Baixar');

botãoBaixar.addEventListener('click', async function() {

try {
// pega a URL da imagem cadastrada
var url = document.getElementById('imgLogo').src;
var titulo=document.getElementById('h2_titulo').textContent;
var subtitulo=document.getElementById('h3_SubTitulo').textContent;


// baixa via fetch para forçar download
const response = await fetch(url, { mode: 'cors' });
const blob = await response.blob();
const urlBlob = URL.createObjectURL(blob);

const a = document.createElement('a');
a.href = urlBlob;
a.download = `${titulo || 'arquivo'}.png`; // nome do arquivo
document.body.appendChild(a);
a.click();
document.body.removeChild(a);

URL.revokeObjectURL(urlBlob);

// 🔥 Salva no Firestore quem baixou
const userId = localStorage.getItem("userId") || crypto.randomUUID();
localStorage.setItem("userId", userId);

await firebase.firestore().collection("downloads").add({
userId: userId,
arquivo: titulo,
SubTitulo: subtitulo,
imagemUrl: url,
data: new Date().toISOString()
});

console.log("Download registrado no Firebase!");
} catch (error) {
console.error('Erro ao baixar imagem:', error);
alert('Falha ao baixar imagem.');
}
});


// COMPARTILHAR
var botãoCompart=document.getElementById('I_compartilhar');
botãoCompart.addEventListener('click', async function() {
    var Codigo_ID=document.getElementById('p_codigo').textContent
    var url = document.getElementById('imgLogo').src;
    var TTitulo=document.getElementById('h2_titulo').textContent;
    var subtitulo=document.getElementById('h3_SubTitulo').textContent;
try {
// monta a mensagem para WhatsApp
var pag = `https://asd-logos.netlify.app/HTML/apresentação.html/?codigo=${Codigo_ID}`;
var url = "https://asd-logos.netlify.app/";
var titulo = `${subtitulo}: ${pag}`;
var cod = `${Codigo_ID}`;
var whatsappMessage = `${titulo}\n\nCódigo: ${cod}`;
var whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

// abre o WhatsApp com a mensagem
window.open(whatsappLink, "_blank");

// 🔥 registra no Firestore
const userId = localStorage.getItem("userId") || crypto.randomUUID();
localStorage.setItem("userId", userId);

await firebase.firestore().collection("compartilhamentos").add({
userId: userId,
arquivo: TTitulo,
SubTitulo: subtitulo,
imagemUrl: url,
codigo: Codigo_ID,
data: new Date().toISOString()
});

console.log("Compartilhamento registrado no Firebase!");
} catch (error) {
console.error("Erro ao compartilhar:", error);
alert("Falha ao compartilhar.");
}
});

document.getElementById('imgBT_canva').addEventListener('click',function(){
 Swal.fire('Editar no canva','Você sera redirecionado para o Canva!','info')
  setTimeout(function(){
    var lista= sessionStorage.getItem('Lista')
      if(lista=='logos'){
         window.open('https://canva.link/9fjk304mcq37jal','_self')
      } else if(lista=='Animes'){
         window.open('https://canva.link/yr6w22brpggf53g','_self')
      } else if(lista=='Emojis'){
         window.open(']https://canva.link/74qkfn901kiy8hq','_self')
      }else if(lista=='GIF'){
         window.open('https://canva.link/w5cycctxbpm3t3a','_self')
      }
       },2000)
})

document.getElementById('I_Casa').addEventListener('click', function(){
    window.open('../index.html','_self')
})