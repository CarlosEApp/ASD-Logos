


 document.getElementById('togle').addEventListener('click',function(){
    toggleFullScreen() 
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


async function listarVideos() {
  // Recupera lista do Firebase
  var client = new Appwrite.Client()
.setEndpoint("https://nyc.cloud.appwrite.io/v1")
.setProject("6a592bf5000f7f251ba1");

var storage = new Appwrite.Storage(client);
var bucketId = "6a592c4b000f5847fcd2";  
  var snapshot = await firebase.firestore().collection("ASD_VIDEOS_PAG").get();

  // Container onde os vídeos vão aparecer
  var container = document.getElementById("list");
  container.innerHTML = "";

  snapshot.forEach(doc => {
    var data = doc.data();
   
    // Gera URL de visualização no Appwrite
   var viewUrl = storage.getFileView(bucketId, data.URL_ID);
    var divVd= document.createElement('div'); divVd.className='divVd';
     var divVd2= document.createElement('div'); divVd2.className='divVd2';
      var divVd3= document.createElement('div');divVd3.className='divVd3';

       var video=document.createElement('video'); video.className='video';  video.src= viewUrl;  video.controls= true

      var label=document.createElement('label'); label.className='label'; label.textContent=data.Titulo
       var label2=document.createElement('label'); label2.className='label2'; label2.textContent=data.SubTitulo

       var botãobaichar=document.createElement('buttom');  botãobaichar.innerHTML='<b id="bb"> Baixar <b>'; botãobaichar.id='botãobaichar'; botãobaichar.className='fa-solid fa-download'; botãobaichar.title='Baixar Arquivo'
     

    divVd2.appendChild(label);
     divVd2.appendChild(document.createElement('br'))
    divVd2.appendChild(label2);
     divVd2.appendChild(document.createElement('br'))
      divVd2.appendChild(video)
    
     divVd3.appendChild(document.createElement('br'))
    divVd3.appendChild(botãobaichar);
     divVd3.appendChild(document.createElement('br'))
    divVd.appendChild(divVd2);
     divVd.appendChild(divVd3);

    container.appendChild(divVd);
  


  botãobaichar.addEventListener('click',function(){
      window.downloadVideo_ = async function() {
var fileId = data.URL_ID
if (!fileId) return Swal.fire("Erro", "Digite o File ID!", "error");
try {
var downloadUrl = storage.getFileDownload(bucketId, fileId);
window.open(downloadUrl, "_blank");
} catch (err) {
Swal.fire("Erro", err.message, "error");
}
}
downloadVideo_()
});


  });
}

listarVideos()



//Resultado da Pesquisa

document.getElementById('h2Res').style.display='none';
async function VideosPesquisa() {
  // Recupera lista do Firebase
  var client = new Appwrite.Client()
    .setEndpoint("https://nyc.cloud.appwrite.io/v1")
    .setProject("6a592bf5000f7f251ba1");

  var storage = new Appwrite.Storage(client);
  var bucketId = "6a592c4b000f5847fcd2";  
  var snapshot = await firebase.firestore().collection("ASD_VIDEOS_PAG").get();

  // Texto digitado na pesquisa
  var pesquisa = document.getElementById("inputPesquisa").value.toLowerCase();

  // Container onde os vídeos vão aparecer
  var container = document.getElementById("listPesquisa");
  container.innerHTML = "";

  snapshot.forEach(doc => {
    var data = doc.data();

    // Verifica se pesquisa está contida no título ou subtítulo
    var titulo = data.Titulo ? data.Titulo.toLowerCase() : "";
    var subtitulo = data.SubTitulo ? data.SubTitulo.toLowerCase() : "";

    if (titulo.includes(pesquisa) || subtitulo.includes(pesquisa)) {
      // Gera URL de visualização no Appwrite
      var viewUrl = storage.getFileView(bucketId, data.URL_ID);

      var divVd = document.createElement('div'); divVd.className = 'divVd';
      var divVd2 = document.createElement('div'); divVd2.className = 'divVd2';
      var divVd3 = document.createElement('div'); divVd3.className = 'divVd3';

      var video = document.createElement('video'); 
      video.className = 'video';  
      video.src = viewUrl;  
      video.controls = true;

      var label = document.createElement('label'); 
      label.className = 'label'; 
      label.textContent = data.Titulo;

      var label2 = document.createElement('label'); 
      label2.className = 'label2'; 
      label2.textContent = data.SubTitulo;


        var botãobaichar=document.createElement('buttom');  botãobaichar.innerHTML='<b id="bb"> Baixar <b>'; botãobaichar.id='botãobaichar'; botãobaichar.className='fa-solid fa-download'; botãobaichar.title

      divVd2.appendChild(label);
      divVd2.appendChild(document.createElement('br'));
      divVd2.appendChild(label2);
      divVd2.appendChild(document.createElement('br'));
      divVd2.appendChild(video);

      divVd3.appendChild(document.createElement('br'));
      divVd3.appendChild(botãobaichar);
      divVd3.appendChild(document.createElement('br'));

      divVd.appendChild(divVd2);
      divVd.appendChild(divVd3);

      container.appendChild(divVd);

      document.getElementById('h2Res').style.display='none';

    botãobaichar.addEventListener('click', function() {
        window.downloadVideo_ = async function() {
          var fileId = data.URL_ID;
          if (!fileId) return Swal.fire("Erro", "Digite o File ID!", "error");
          try {
            var downloadUrl = storage.getFileDownload(bucketId, fileId);
            window.open(downloadUrl, "_blank");
          } catch (err) {
            Swal.fire("Erro", err.message, "error");
          }
        }
        downloadVideo_();
      });
    }
  });
}


document.getElementById('btnPesquisa').addEventListener('click', function(){
    VideosPesquisa()
})

document.getElementById('TelaInicial').addEventListener('click', function(){
    window.open('../index.html','_self')
})