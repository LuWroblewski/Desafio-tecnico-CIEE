
let button3 = document.getElementById("button3");
let button5 = document.getElementById("button5");

let text_ov = document.getElementById("text_ov");

const nome = document.getElementById("nome");
const telefone = document.getElementById("telefone");
const email = document.getElementById("email");
const saborSorvete = document.getElementById("saborSorvete");
const adicionais = document.getElementById("adicionais");
const total = document.getElementById("total")

function calcula_preço(calculoSabor, calculoAdicional) {
    if (saborSorvete.value == "baunilha" || saborSorveteUp.value == "baunilha"){
        calculoSabor = 1.00
    }else if(saborSorvete.value == "chocolate" || saborSorveteUp.value == "chocolate"){
        calculoSabor = 2.00

    }else if(saborSorvete.value == "misto" || saborSorveteUp.value == "misto"){
        calculoSabor = 2.50
    }else{
        calculoSabor = 0.00 
    }

    if (adicionais.value == "caldaChocolate" || adicionaisUp.value == "caldaChocolate"){
        calculoAdicional = 1.00
    }else if(adicionais.value == "tubinhoWafer" || adicionaisUp.value == "tubinhoWafer"){
        calculoAdicional = 1.50
    }else if(adicionais.value == "semAdicional" || adicionaisUp.value == "semAdicional"){
        calculoAdicional = 0.00
}else{
    calculoAdicional = 0.00 
}
let calculoFinal = parseFloat(calculoSabor) + parseFloat(calculoAdicional)
total.innerHTML = `R$: ${calculoFinal.toFixed(2)}`
totalUp.innerHTML = `R$: ${calculoFinal.toFixed(2)}`

}

//criar os dados

button3.onclick = function (e) {
    e.preventDefault()

    console.log("clicou")
    const nomePedido = nome.value
    const telPedido = telefone.value
    const emailPedido = email.value
    const saborPedido = saborSorvete.value
    const adicionalPedido = adicionais.value

    calcula_preço()

    console.log(total.innerHTML)



    const totalPedido = total.innerHTML
    localStorage.setItem('nomePedido', `${nomePedido}`)
    localStorage.setItem('telPedido', `${telPedido}`)
    localStorage.setItem('emailPedido', `${emailPedido}`)
    localStorage.setItem('saborPedido', `${saborPedido}`)
    localStorage.setItem('adicionalPedido', `${adicionalPedido}`)
    localStorage.setItem('totalPedido', `${totalPedido}`)

    const nomeFetch = localStorage.getItem('nomePedido')
    const telFetch = localStorage.getItem('telPedido')
    const emailFetch = localStorage.getItem('emailPedido')
    const saborFetch = localStorage.getItem('saborPedido')
    const adicionalFetch = localStorage.getItem('adicionalPedido')
    const totalFetch = localStorage.getItem('totalPedido')

    fetch("http://localhost:3000/cliente/insert", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            nomeCliente: nomeFetch,
            telefoneCliente: telFetch,
            emailCliente: emailFetch,
            saborSorvete: saborFetch,
            adicionais: adicionalFetch,
            total: totalFetch,
        }),
    })
    text_ov.innerHTML = "Solicitação enviada para os atendentes."
    overlay.style.display = "block";
    setTimeout(function () {
      overlay.style.display = "none";
    adicionar.style.left = "450px"
    adicionar2.style.left = "450px"
    menu.style.left = "5px"
}, 3000);

nome.value = ""
telefone.value = ""
email.value = ""
saborSorvete.value = ""
adicionais.value = ""
}

//deletar os dados
const idpedidos = document.getElementById("idpedidos");

button5.onclick = function (e) {
    e.preventDefault()

    console.log("clicou")

    const clienteData = idpedidos.value
    localStorage.setItem('clienteData', `${clienteData}`)
    const clienteFetch = localStorage.getItem('clienteData')

    fetch("http://localhost:3000/cliente/delete", {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            idpedidos: clienteFetch,
        }),
    })
    text_ov.innerHTML = "Removido com sucesso."
    overlay.style.display = "block";

    button4.style.display = "none";
    button5.style.display = "none";
    overlay.style.display = "block";
    setTimeout(function () {
    overlay.style.display = "none";
    remover.style.left = "450px"
    menu.style.left = "5px"
}, 3000);
idpedidos.value = ""
}

//atualizar cliente
const idpedidosUp = document.getElementById("idpedidosUp");
const nomeUp = document.getElementById("nomeUp");
const telefoneUp = document.getElementById("telefoneUp");
const emailUp = document.getElementById("emailUp");
const saborSorveteUp = document.getElementById("saborSorveteUp");
const adicionaisUp = document.getElementById("adicionaisUp");
const totalUp = document.getElementById("totalUp");


button9.onclick = function (e) {
    e.preventDefault()

    console.log("clicou")
    const idpedidoUp = idpedidosUp.value
    const nomePedido = nomeUp.value
    const telPedido = telefoneUp.value
    const emailPedido = emailUp.value
    const saborPedido = saborSorveteUp.value
    const adicionalPedido = adicionaisUp.value

    calcula_preço()

    console.log(total.innerHTML)



    const totalPedido = totalUp.innerHTML
    localStorage.setItem('idpedidos', `${idpedidoUp}`)
    localStorage.setItem('nomePedido', `${nomePedido}`)
    localStorage.setItem('telPedido', `${telPedido}`)
    localStorage.setItem('emailPedido', `${emailPedido}`)
    localStorage.setItem('saborPedido', `${saborPedido}`)
    localStorage.setItem('adicionalPedido', `${adicionalPedido}`)
    localStorage.setItem('totalPedido', `${totalPedido}`)

    const clienteFetch = localStorage.getItem('idpedidos')
    const nomeFetch = localStorage.getItem('nomePedido')
    const telFetch = localStorage.getItem('telPedido')
    const emailFetch = localStorage.getItem('emailPedido')
    const saborFetch = localStorage.getItem('saborPedido')
    const adicionalFetch = localStorage.getItem('adicionalPedido')
    const totalFetch = localStorage.getItem('totalPedido')

    fetch("http://localhost:3000/cliente/atualiza", {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            idpedidos: clienteFetch,
            nomeCliente: nomeFetch,
            telefoneCliente: telFetch,
            emailCliente: emailFetch,
            saborSorvete: saborFetch,
            adicionais: adicionalFetch,
            total: totalFetch,
        }),
    })
    text_ov.innerHTML = "Atualizado com sucesso."
    overlay.style.display = "block";
    setTimeout(function () {
        overlay.style.display = "none";
    update.style.left = "450px"
    update2.style.left = "450px"
    menu.style.left = "5px"
}, 3000);

idpedidosUp.value = ""
nomeUp.value = ""
telefoneUp.value = ""
emailUp.value = ""
saborSorveteUp.value = ""
adicionaisUp.value = ""

}


async function getAllPosts() {
    const response = await fetch("http://localhost:3000/cliente/view");

    console.log(response);

    const data = await response.json();

    console.log(data);

    data.clientes.map((post) => {
        const tr = document.createElement("tr")

        const idpedidos = document.createElement("td");
        const nomeCliente = document.createElement("td");
        const telefoneCliente = document.createElement("td");
        const emailCliente = document.createElement("td");
        const saborSorvete = document.createElement("td");
        const adicionais = document.createElement("td");
        const total = document.createElement("td");

        idpedidos.innerText = post.idpedidos;
        nomeCliente.innerText = post.nomeCliente;
        telefoneCliente.innerText = post.telefoneCliente;
        emailCliente.innerText = post.emailCliente;
        saborSorvete.innerText = post.saborSorvete;
        adicionais.innerText = post.adicionais;
        total.innerText = post.total;

        tr.appendChild(idpedidos);
        tr.appendChild(nomeCliente);
        tr.appendChild(telefoneCliente);
        tr.appendChild(emailCliente);
        tr.appendChild(saborSorvete);
        tr.appendChild(adicionais);
        tr.appendChild(total);

        vizualizar.appendChild(tr);


    });
}

