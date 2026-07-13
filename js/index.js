
document.getElementById("imgHeader").src='https://i.imgur.com/uR8QrjI.gif';
document.getElementById("imgDoisHeader").src='https://i.imgur.com/eGav3O4.gi';

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

document.getElementById("imgHeader").src='https://i.imgur.com/uR8QrjI.gif';
document.getElementById("imgDoisHeader").src='https://i.imgur.com/eGav3O4.gi';
// iniciar banners Gif
var banner = [];
var index3 = 0;
var dbnn = firebase.firestore();
dbnn.collection("CoLL_Banners").get().then(snapshot => {
snapshot.forEach(doc => {
banner.push(doc.data());
});
// Inicia o ciclo de exibição
if (banner.length > 0) {
mostrarbanner();
setInterval(mostrarbanner, 10000); // muda a cada 7 segundos
}
}).catch(err => console.error("Erro ao carregar dados:", err));
// 🔹 Função que atualiza a imagem e os textos
function mostrarbanner() {
var bann = banner[index3];
var img = document.getElementById("imgHeader")
document.getElementById("imgHeader").src = bann.Imagem; // campo da imagem no Firestore
index3 = (index3 + 1) % banner.length; // avança e reinicia no final
};
//Menor
var banner2 = [];
var index2 = 0;
var dbnnM = firebase.firestore();
dbnnM.collection("CoLL_BannersMenores").get().then(snapshot => {
snapshot.forEach(doc => {
banner2.push(doc.data());
});
// Inicia o ciclo de exibição
if (banner2.length > 0) {
mostrarbanner_2();
setInterval(mostrarbanner_2, 10000); // muda a cada 7 segundos
}
}).catch(err => console.error("Erro ao carregar dados:", err));
// 🔹 Função que atualiza a imagem e os textos
function mostrarbanner_2() {
var banne = banner2[index2];
var img = document.getElementById("imgDoisHeader")
document.getElementById("imgDoisHeader").src = banne.Imagem; // campo da imagem no Firestore
index2 = (index2 + 1) % banner2.length; // avança e reinicia no final
};

//iniciar apresentação de imóveis
var db = firebase.firestore();
var itens = [];
var index = 0;
// 🔹 Carrega todos os documentos da coleção
db.collection("GeralColl").where("IMV_Disponivel", "==", "ativo").get()
.then(snapshot => {
snapshot.forEach(doc => {
itens.push(doc.data());
});
// Inicia o ciclo de exibição
if (itens.length > 0) {
mostrarItem();
setInterval(mostrarItem, 5000); // muda a cada 7 segundos
}
}).catch(err => console.error("Erro ao carregar dados:", err));
// 🔹 Função que atualiza a imagem e os textos
function mostrarItem() {
var item = itens[index];
var img = document.getElementById("IMGAP")
document.getElementById("IMGAP").src = item.Imagem1; // campo da imagem no Firestore
document.getElementById("ALBAP2").innerHTML = ``;
document.getElementById('LBLAP').innerHTML='';
document.getElementById("ALBAP2").style.display='none';
document.getElementById("LBLAP").style.display='none';
//document.getElementById("LBLAP").textContent = ` ${ item.Cidad} ${item.UF}`// campo do título
setTimeout(function(){
document.getElementById("ALBAP2").style.display='block';
document.getElementById("LBLAP").style.display='block';
document.getElementById('LBLAP').innerHTML=`${item.Cidade} - ${item.UF}`
document.getElementById("ALBAP2").innerHTML = `${item.Titulo}<br> ${item.SubTitulo} `;
// campo da descrição
},1000)

index = (index + 1) % itens.length; // avança e reinicia no final
};
function initList(){
  sessionStorage.setItem('NoBarra', '');
var Itens=0
var dtb = firebase.firestore();
dtb.collection("GeralColl").where("IMV_Disponivel", "==", "ativo").get()
.then(snapshot => {
var li = document.getElementById('list');
li.innerHTML=''
snapshot.forEach(docSnap => {
var data = docSnap.data();
if(!data.Destaque|| data.Destaque==''){
}else{

Itens++
if (Itens <= 12){
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
var imagens = [];
for (let i = 1; i <= 10; i++) {
const key = `Imagem${i}`;
if (data[key]) {
imagens.push(data[key]);
}
}

let index = 0;
IMG_Imovel.src = imagens[index];
//p_Imovel.textContent=1;
setInterval(() => {
index++;
if (index >= imagens.length) {
index = 0;
}

IMG_Imovel.src = imagens[index]; // troca imagem
p_Imovel.style.display='none'
setTimeout(function(){
//p_Imovel.textContent=`${index+1}`;
//p_Imovel.style.display='block'
//alert(p_Imovel.textContent)
},1000)
//p_Imovel.textContent=``;
//p_Imovel.style.display='none'
}, 4000);// 5 segundos

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
img1.src='src/regua.png';
img2.src='src/cama-de-solteiro.png';
img3.src='src/chuveiro.png';
img4.src='src/carro.png';
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
window.open('html/imovel.html','_self')
});
div_label.addEventListener('click',function(){
sessionStorage.setItem('Coll_ID', data.Código);
sessionStorage.setItem('Lista_IMV_Menu', data.Coll_Lista);
sessionStorage.setItem('Transação_IMV_Menu', ''  );
window.open('html/imovel.html','_self')
});
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
});
})
};
initList()

// Pesquisar
sessionStorage.setItem('itens','')
function pesquisar() {
  sessionStorage.setItem('NoBarra', '');
sessionStorage.setItem('itens','')
var termo = document.getElementById("PesquInput").value.toLowerCase().trim();
if (!termo) {
Swal.fire('', 'Preencha o campo de pesquisa!', '')
return;
} else{

//sessionStorage.setItem('Coll_ID', data.Código);
//sessionStorage.setItem('Lista_IMV_Menu', data.Coll_Lista);
// sessionStorage.setItem('Transação_IMV_Menu', ''  );
sessionStorage.setItem('Termo', termo);
window.open('html/pesquisa.html','_self')
}
//window.open('html/imovel.html','_self')
}

// Pesquisar Código
sessionStorage.setItem('itens','')
function pesquiCod(){
sessionStorage.setItem('itens','')
var termo = document.getElementById("CodigoInput").value.toLowerCase().trim();
if (!termo) {
Swal.fire('', 'Preencha o campo de pesquisa!', '')
return;
} else{

//sessionStorage.setItem('Coll_ID', data.Código);
//sessionStorage.setItem('Lista_IMV_Menu', data.Coll_Lista);
// sessionStorage.setItem('Transação_IMV_Menu', ''  );
sessionStorage.setItem('Termo', termo)
window.open('html/pesquisa.html','_self')
}
//window.open('html/imovel.html','_self')
}

//document.getElementById('DivPesquisador').style.display='none'
//fucção pesquisa
function funçaoPesquisa(){
document.getElementById('DivPesquisador').style.display='block'
}
document.querySelector('.diValores').style.display='none'
document.querySelector('.classeCodigo').style.display='none'
//Cadastro de pesquisa codigo e valor
function ICodigo(){
var I_resp=document.getElementById('i_codigo_imovel');
var resp= document.querySelector('.classeCodigo');
if(resp.style.display=='block'){
resp.style.display='none';
I_resp.className='fa-solid fa-eye';
}else{
resp.style.display='block';
I_resp.className='fa-solid fa-eye-slash';
}

};
function IValaor(){
var I_resp_=document.getElementById('i_valor_imovel');
var resp_= document.querySelector('.diValores');
if(resp_.style.display=='block'){
resp_.style.display='none';
I_resp_.className='fa-solid fa-eye';
}else{
resp_.style.display='block';
I_resp_.className='fa-solid fa-eye-slash';
}
}

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
<img src="src/Rute_avatar_.png" alt="" class="logo-swal" width="55%"></div>
<div id="divInit"> 
<button id='btnTime'></button> 
<div id="myProgresos" title="Progresos">
<div id="myBarr">10%</div>
</div>
</div>
`,
imageUrl: ``,
background: '#00325300',
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
var id = setInterval(frame, 57);
function frame() {
if (width >= 100) {
i = 0;
sessionStorage.setItem('SeçãoAberta','ok')
document.getElementById('myProgresos').style.display = 'none'
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
}
}

function swalclose(){
Swal.close()
}
initPage()

//seleção
var resp= document.getElementById('select_Imoveis');
resp.value=''
function select_imovel() {
var valor = document.getElementById('select_Imoveis').value;

if(!valor || valor===''|| valor==='Fechar'){
var resp= document.getElementById('select_Imoveis');
resp.value=''
} else{
sessionStorage.setItem('Lista_IMV_Menu', '')
sessionStorage.setItem('Transação_IMV_Menu', '')
Swal.fire({ 
title: ``,
text: ``, 
html:`
<div id='custonMenuR'> 
<h3 id='h3_C_R'> </h3> 
<label id='lbl_c_1'>Venda </label> 
<label id='lbl_c_2'>Locação</label> 
<label id='lbl_c_3'>Temporada</label> 
<label id='lbl_c_4'>Lançamento</label>
</div>
`,
imageUrl: ``,
background: '#000000',
color: '#ffffff', // cor do texto });
showCloseButton: true,  
allowOutsideClick: false,
showConfirmButton: false,
customClass: {
popup: 'my-custom_M_R' // Aplica a classe CSS personalizada
},
didOpen: () => {
document.body.style.paddingRight = '0px';   
}
})
sessionStorage.setItem('NoBarra', '');
var res= valor.split('_');
var resp=res[1]
// alert(resp)
document.getElementById('h3_C_R').innerHTML= resp
document.getElementById('lbl_c_1').addEventListener('click',function(){
var resp1= valor;
var resp2= 'Venda';
var max= 'R$ 999.999.999,00';
var min= 'R$ 0,00'
sessionStorage.setItem('NoBarra', 'No Barra');
sessionStorage.setItem('Lista_IMV_Menu', resp1)
sessionStorage.setItem('Transação_IMV_Menu', resp2)
sessionStorage.setItem('valorMAX', max); sessionStorage.setItem('valorMIN', min); sessionStorage.setItem('valorTransação', resp2); sessionStorage.setItem('valorLista', resp1);
var resp= document.getElementById('select_Imoveis');
resp.value=''
//alert(`${resp1} para ${resp2} `)
setTimeout(function(){
window.open('html/mais_imoveis.html','_self')
Swal.close()
},500)

});
document.getElementById('lbl_c_2').addEventListener('click',function(){
var resp1= valor;
var resp2= 'Locação';
var max= 'R$ 999.999.999,00';
var min= 'R$ 0,00'
sessionStorage.setItem('NoBarra', 'No Barra');
sessionStorage.setItem('Lista_IMV_Menu', resp1)
sessionStorage.setItem('Transação_IMV_Menu', resp2)
sessionStorage.setItem('valorMAX', max); sessionStorage.setItem('valorMIN', min); sessionStorage.setItem('valorTransação', resp2); sessionStorage.setItem('valorLista', resp1);
var resp= document.getElementById('select_Imoveis');
resp.value=''
//alert(`${resp1} para ${resp2} `)
setTimeout(function(){
window.open('html/mais_imoveis.html','_self')
Swal.close()
},500)
})
document.getElementById('lbl_c_3').addEventListener('click',function(){
var resp1= valor;
var resp2= 'Temporada';
var max= 'R$ 999.999.999,00';
var min= 'R$ 0,00'
sessionStorage.setItem('NoBarra', 'No Barra');
sessionStorage.setItem('Lista_IMV_Menu', resp1)
sessionStorage.setItem('Transação_IMV_Menu', resp2)
sessionStorage.setItem('valorMAX', max); sessionStorage.setItem('valorMIN', min); sessionStorage.setItem('valorTransação', resp2); sessionStorage.setItem('valorLista', resp1);
var resp= document.getElementById('select_Imoveis');
resp.value=''
//alert(`${resp1} para ${resp2} `)
setTimeout(function(){
window.open('html/mais_imoveis.html','_self')
Swal.close()
},500)
});
document.getElementById('lbl_c_4').addEventListener('click',function(){
var resp1= valor;
var resp2= 'Lançamento';
var max= 'R$ 999.999.999,00';
var min= 'R$ 0,00'
sessionStorage.setItem('NoBarra', 'No Barra');
sessionStorage.setItem('Lista_IMV_Menu', resp1)
sessionStorage.setItem('Transação_IMV_Menu', resp2)
sessionStorage.setItem('valorMAX', max); sessionStorage.setItem('valorMIN', min); sessionStorage.setItem('valorTransação', resp2); sessionStorage.setItem('valorLista', resp1);
var resp= document.getElementById('select_Imoveis');
resp.value=''
//alert(`${resp1} para ${resp2} `)
setTimeout(function(){
window.open('html/mais_imoveis.html','_self')
Swal.close()
},500)
})
}
}
//ICodigo()
// WhatsApp
function WhatsApp(){
var telefone =sessionStorage.getItem('TelefoneAdmin');
var numero = `+55${telefone}`; // Substitua pelo número de destino, incluindo o código do país
var url = "https://wa.me/"+`${numero}?text= Pedido de contato com corretora Rute - (Rutimóveis)`;
window.open(url, "_blank");
Swal.fire(``,`WhatsApp`,'success')  
exit()   
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


//Menu Lateral
sessionStorage.setItem('MENULateral', '')
var BTN = document.getElementById('heaad_menu');
//BTN.className = 'fa-solid fa-bars'
function Menu() {
var BTN = document.getElementById('iMenu');
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
}
//fechar Menu
function fecharMenu() {
sessionStorage.setItem('MENULateral', '')
document.getElementById("menu_lateral").classList.remove("menu-ativo");
Menu() 
}
//Exite menu
function exit() {
Menu()
}

function ZAP(){
WhatsApp()
}
function emailLA(){
Email() 
}
function INSTA(){
window.open('https://www.instagram.com/rutimoveis.seu.lar.feliz/','_self')
}

// Valor em real
var campoValorEl = document.getElementById("ValorMaxInput");
campoValorEl.addEventListener("input", () => {
var valor = campoValorEl.value.replace(/\D/g, ""); // remove tudo que não é dígito
if (valor) {
var numero = parseInt(valor, 10) / 100; // transforma em número e divide por 100
campoValorEl.value = new Intl.NumberFormat("pt-BR", {
style: "currency",
currency: "BRL"
}).format(numero); // aplica formatação
} else {
campoValorEl.value = ""; // limpa se não houver valor
}
});

var campoValorEl2 = document.getElementById("ValorMinInput");
campoValorEl2.addEventListener("input", () => {
var valor = campoValorEl2.value.replace(/\D/g, ""); // remove tudo que não é dígito
if (valor) {
var numero = parseInt(valor, 10) / 100; // transforma em número e divide por 100
campoValorEl2.value = new Intl.NumberFormat("pt-BR", {
style: "currency",
currency: "BRL"
}).format(numero); // aplica formatação

} else {
campoValorEl2.value = ""; // limpa se não houver valor
}
});

//botão buscar por valores
function buscarValores(){
  sessionStorage.setItem('NoBarra', '');
var resp= document.getElementById("ValorMaxInput").value;
var resp2= document.getElementById("ValorMinInput").value
var resp3 = document.getElementById('tranzação').value;
if(!resp||resp==''||!resp2||resp2==''||!resp3||resp3==''){
Swal.fire('','Presencha os campos transação, valor maxímo e valor minimo','warning')
}else{
sessionStorage.setItem('valorMAX', resp); sessionStorage.setItem('valorMIN', resp2); sessionStorage.setItem('valorTransação', resp3); sessionStorage.setItem('valorLista', 'GeralColl');
setTimeout(function(){
window.open('html/mais_imoveis.html','_self')
},500)

}
}


//Administração
function ADMIN(){
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
window.open('html/cadastro.html','_self')
Swal.close()
},2000)
}else{
swal('Senha incorreta!','','error');
}
})
};

function verMaisIMV(){
  sessionStorage.setItem('NoBarra', '');
  sessionStorage.setItem('ListaMais', 'GeralColl')
  window.open('html/IMV.html','_self')
}


