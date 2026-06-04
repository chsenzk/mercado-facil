let itens = JSON.parse(localStorage.getItem("itens")) || [];

const campos = document.getElementById("campos");

function renderCampos(){

const tipo = document.getElementById("tipo").value;

if(tipo === "unidade"){

campos.innerHTML = `
<input id="qtd" type="number" placeholder="Quantidade">
<input id="preco" type="number" step="0.01" placeholder="Preço Unitário">
`;

}else{

campos.innerHTML = `
<input id="peso" type="number" step="0.001" placeholder="Peso (kg)">
<input id="precoKg" type="number" step="0.01" placeholder="Preço por Kg">
`;

}

}

document.getElementById("tipo")
.addEventListener("change",renderCampos);

renderCampos();

function adicionarItem(){

const nome = document.getElementById("nome").value;

if(!nome) return;

let subtotal=0;
let descricao="";

if(document.getElementById("tipo").value==="unidade"){

const qtd = Number(document.getElementById("qtd").value);
const preco = Number(document.getElementById("preco").value);

subtotal=qtd*preco;
descricao=`${qtd} un`;

}else{

const peso=Number(document.getElementById("peso").value);
const precoKg=Number(document.getElementById("precoKg").value);

subtotal=peso*precoKg;
descricao=`${peso.toFixed(3)} kg`;

}

itens.push({
nome,
descricao,
subtotal
});

salvar();

document.getElementById("nome").value="";
render();
}

function remover(index){

itens.splice(index,1);

salvar();
render();

}

function salvar(){

localStorage.setItem(
"itens",
JSON.stringify(itens)
);

}

function render(){

const lista=document.getElementById("lista");

lista.innerHTML="";

let total=0;

itens.forEach((item,index)=>{

total+=item.subtotal;

lista.innerHTML += `
<div class="item">

<div>
<strong>${item.nome}</strong><br>
${item.descricao}
</div>

<div>
R$ ${item.subtotal.toFixed(2)}
<button class="remove"
onclick="remover(${index})">
Excluir
</button>
</div>

</div>
`;

});

document.getElementById("total")
.innerText=`R$ ${total.toFixed(2)}`;

const orcamento=
Number(document.getElementById("orcamento").value);

if(orcamento>0){

const restante=
orcamento-total;

document.getElementById("restante")
.innerText=`R$ ${restante.toFixed(2)}`;

const perc=
Math.min((total/orcamento)*100,100);

document.getElementById("progress")
.style.width=`${perc}%`;

}

}

document
.getElementById("orcamento")
.addEventListener("input",render);

function novaCompra(){

if(confirm("Apagar toda a compra?")){

itens=[];

localStorage.removeItem("itens");

render();

}

}

render();
