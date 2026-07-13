
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
sessionStorage.setItem('hora', timeString)
sessionStorage.setItem('data', data)
}, 1000)
function casa(){
window.open('../index.html','_self')
}
sessionStorage.setItem('SETT', '')
function pesquisar() {
var sett= sessionStorage.getItem('SETT')
if(!sett||sett==''){
    var sett= 4
    sessionStorage.setItem('SETT', 4)
}else{
    var sett=sessionStorage.getItem('SETT')
}
sessionStorage.setItem('itens','')
var itens=0
var termo = sessionStorage.getItem('Termo')    
document.getElementById('resultnumber').innerHTML=`${0} Imóveis encontrados `     //document.getElementById("PesquInput").value.toLowerCase();
var li = document.getElementById('list');
li.innerHTML=''
dbP = firebase.firestore();
dbP.collection("GeralColl").get().then(snapshot => {
snapshot.forEach(docSnap => {
var data = docSnap.data();

// Verifica se algum campo contém o termo
let campos = [data.Rua, data.Bairro, data.Código, data.Titulo, data.Cidade];
if (campos.some(c => c && c.toLowerCase().includes(termo))) {
if (data.IMV_Disponivel?.toLowerCase() === 'ativo') {
itens++
if (itens){

if(itens<=2){
document.getElementById('resultnumber').innerHTML=`${itens} Imóvel encontrado`
} else{
document.getElementById('resultnumber').innerHTML=`${itens} Imóveis encontrados`
}

if(itens>=4){
document.getElementById('btnnVerMais').style.display='block'
} else{
document.getElementById('btnnVerMais').style.display='none'
}
if(itens<= sett){
   
var conntainer = document.createElement('div');
var divFlex = document.createElement('div');
var div_label = document.createElement('div');
var div_botao = document.createElement('div');
var div_imagem = document.createElement('div');
var div_cvc = document.createElement('div');
var div_cvic= document.createElement('div');
var label_um = document.createElement('label');
var label_dois = document.createElement('label');
var label_tres = document.createElement('label');
var label_quatro = document.createElement('label');
var label_cinco = document.createElement('p');
var BTN_Compart = document.createElement('button');
var BTN_Mais = document.createElement('button');
var IMG_Imovel = document.createElement('img');
var parag = document.createElement('p');
var img1=document.createElement('img');
var img2=document.createElement('img');
var img3=document.createElement('img');
var img4=document.createElement('img');
var img5=document.createElement('img');
var parag2 = document.createElement('p');
var parag3 = document.createElement('p');
var parag4 = document.createElement('p');
var parag5 = document.createElement('p');
var parag6 = document.createElement('p');
conntainer.id = 'ConntDiv';
div_label.id = 'divLabel';
div_imagem.id = 'divIMG';
div_botao.id = 'divBotao';
IMG_Imovel.id = 'ImagemIMV';
label_um.id = 'label_um';
label_dois.id = 'label_dois';
label_tres.id = 'label_tres';
label_quatro.id = 'label_quatro';
label_cinco.id = 'label_cinco';
divFlex.id = 'flexDiv';
BTN_Compart.id= 'CompartBTN';
BTN_Mais.id = 'maisBTN';
img1.id='img_icom';
img2.id='img_icom';
img3.id='img_icom';
img4.id='img_icom';
img5.id='img_icom';
div_cvc.id='cvc';
div_cvic.id='cvic';
parag2.id='paraG';
parag3.id='paraG';
parag4.id='paraG';
parag5.id='paraG';
parag6.id='paraG';
// cria o elemento da imagem principal
var IMG_Imovel = document.createElement('img');
var p_Imovel = document.createElement('p');
IMG_Imovel.id = 'ImagemIMV';
IMG_Imovel.className = 'fade'; // classe para transição suave
IMG_Imovel.title = 'imagem do Imóvel';
p_Imovel.id='p_IMG_I';
label_cinco.textContent=data.SubTitulo
// monta array com todas as imagens disponíveis
//p_Imovel.textContent=1;

IMG_Imovel.src = data.Imagem1; // troca imagem
p_Imovel.style.display='none'

label_um.textContent = `🏡 ${data.Titulo}`;
label_tres.textContent = `${data.Código}`;
if(data.Tranzação==='Venda'||data.Tranzação==='Lançamento'){
label_dois.innerHTML = `${data.Tranzação}:<b id='spamm'>${data.Valor_Venda}</b>` ;

}else if(data.Tranzação==='Locação'|| data.Tranzação==='Temporada'){
label_dois.innerHTML = `${data.Tranzação}:<b id='spamm'>${data.Valor_Locação}</b>` ;

}else if(data.Tranzação==='Locação e Venda'){
label_dois.innerHTML = `${data.Tranzação}: <b id='spamm'>${data.Valor_Locação} <br> ${data.Valor_Venda}</b>` ;
label_dois.id = 'label_dois_';
}else{
}
BTN_Mais.className = 'fa-solid fa-eye';
BTN_Mais.title = 'Ver mais informações';
IMG_Imovel.title = 'imagem do Imóvel';
BTN_Compart.className='fa-solid fa-share-nodes';
BTN_Compart.title='Compartilhar'
parag.textContent = '';
img1.src='../src/regua.png';
img2.src='../src/cama-de-solteiro.png';
img3.src='../src/chuveiro.png';
img4.src='../src/carro.png';
if(!data.Area_Const || data.Area_Const==''){
parag2.textContent='00 m²?';
parag2.className='smai';
img1.title='Área construída, sem informação!'
}else{
parag2.textContent=`${data.Area_Const} m²`
img1.title=`Área construída: ${data.Area_Const} m²`
};
if(!data.Quartos || data.Quartos==''|| data.Quartos=='0'){
parag3.textContent=' quartos?';
parag3.className='smai';
img2.title='Sem Quartos!'
}else{
parag3.textContent=`${data.Quartos} quartos`
img2.title=`${data.Quartos} quartos`
};
if(!data.Banheiros || data.Banheiros==''|| data.Banheiros=='0'){
parag4.textContent='banh ?';
parag4.className='smai';
img3.title='Sem Banheiros!'
}else{
parag4.textContent=`${data.Banheiros} banh.`
img3.title=`${data.Banheiros} banheiros`
};
if(!data.Vagas_G || data.Vagas_G==''|| data.Vagas_G=='0'){
parag5.textContent='vaga ?';
parag5.className='smai';
img4.title='Sem vaga de garagem!'
}else{
parag5.textContent=`${data.Vagas_G} vagas`
img4.title=`${data.Vagas_G} vagas de garagem `
};
conntainer.appendChild(parag);
div_imagem.appendChild(IMG_Imovel);
div_imagem.appendChild(p_Imovel)
div_label.appendChild(label_um);
div_label.appendChild(label_cinco);
div_label.appendChild(label_dois);
div_label.appendChild(label_tres);
div_botao.appendChild(BTN_Compart);
div_botao.appendChild(BTN_Mais);
div_cvc.appendChild(img1);
div_cvc.appendChild(img2);
div_cvc.appendChild(img3);
div_cvc.appendChild(img4);
div_cvic.appendChild(parag2)   
div_cvic.appendChild(parag3)
div_cvic.appendChild(parag4)
div_cvic.appendChild(parag5)
div_cvic.appendChild(parag6)             
conntainer.appendChild(div_botao)
conntainer.appendChild(div_imagem);
conntainer.appendChild(div_label);
conntainer.appendChild(div_cvc);
conntainer.appendChild(div_cvic);
conntainer.appendChild(div_botao)
li.appendChild(conntainer);

BTN_Mais.addEventListener('click',function(){
sessionStorage.setItem('Coll_ID', data.Código);
sessionStorage.setItem('Lista_IMV_Menu', data.Coll_Lista);
sessionStorage.setItem('Transação_IMV_Menu', ''  );
window.open('../html/imovel.html','_self')
})
div_label.addEventListener('click',function(){
sessionStorage.setItem('Coll_ID', data.Código);
sessionStorage.setItem('Lista_IMV_Menu', data.Coll_Lista);
sessionStorage.setItem('Transação_IMV_Menu', ''  );
window.open('../html/imovel.html','_self')
})
BTN_Compart.addEventListener('click', function(){
var pag = `https://rutimoveis.netlify.app/html/imovel.html/?codigo=${data.Código}`
var url = "https://rutimoveis.netlify.app/";
var Titulo = `${data.Titulo}: ${pag}`;
var cod=`${data.Código}`
var whatsappMessage =`\n\n🏡 ${Titulo} \n\n Código: ${cod}`;
var whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
window.open(whatsappLink, "_blank");
})
}
}
}
}
})
})
}
pesquisar() 

sessionStorage.setItem('itens','')
function Pesquisar_(){
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
setTimeout(function(){
pesquisar() 
},300)
}
}



function QueroVermais(){
    var resp=sessionStorage.getItem('SETT')
    var valor = Number(resp) + 4;

sessionStorage.setItem('SETT', valor)
 pesquisar()
}