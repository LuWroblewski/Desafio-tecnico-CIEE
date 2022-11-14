const router = require('express').Router()
const { connection, transporter } = require("./API/API.js")
var mysql = require('mysql2');



router.get("/view", async (req, res) => {
  try {
    connection.query('SELECT * FROM pedidos',
    function( results, fields, value) {
      console.log(fields); 

      res.status(201).json({ message: 'vizualização aceita ', clientes: fields  }),console.log("view");
    })
  } catch (error) {
    res.status(500).json({ error: error, }, console.log(error))
  }

});


//inserção de dados
router.post("/insert", async (req, res) => {

  const { nomeCliente, telefoneCliente, emailCliente, saborSorvete, adicionais, total} = req.body

  transporter.sendMail({
    from: "Sorvetes <testeluwroblewski@gmail.com>",
    to: `${emailCliente}`,
subject: "Solicitação cliente",
html:`<div style= "border: 4px; border-style: solid; border-color: #FEE7AF; width: 500px; height: 380px; background-color: #FEE7AF" >
<h2 style="font-family: roboto-condesed; color: #004891; text-align: center;" >Pedido</h2>
<p style="font-family: roboto-condesed; color: #004891;  text-align: center; font-size: large; font-weight: bold"  >Nome: ${nomeCliente}</p>
<p style="font-family: roboto-condesed; color: #004891;  text-align: center; font-size: large; font-weight: bold"  >Telefone cadastrado: ${telefoneCliente}</p>
<p style="font-family: roboto-condesed; color: #004891;  text-align: center; font-size: large; font-weight: bold"  >Email cadastrado: ${emailCliente}</p>
<p style="font-family: roboto-condesed; color: #004891;  text-align: center; font-size: large; font-weight: bold"  >Sabor do sorvete pedido: ${saborSorvete}</p>
<p style="font-family: roboto-condesed; color: #004891;  text-align: center; font-size: large; font-weight: bold"  >adicionais pedidos:${adicionais}</p>
<p style="font-family: roboto-condesed; color: #004891;  text-align: center; font-size: large; font-weight: bold"  >total do pedido: ${total}</p>
<p style="font-family: Arial; color: #004891;  text-align: center;"  ><small>Se voce não fez a solicitação por favor ignorar.</small></p>
</div> `

}).then(message =>{
console.log(message)
}).catch(err =>{
    console.log(err)
})

  let sql = `INSERT INTO pedidos (nomeCliente, telefoneCliente, emailCliente, saborSorvete, adicionais, total) VALUES ('${nomeCliente}', '${telefoneCliente}','${emailCliente}','${saborSorvete}','${adicionais}','${total}')`
  try {
    connection.query(sql),
      res.status(201).json({ message: 'Pedido inserido no sistema ' }), console.log("Inserido");
  } catch (error) {
    res.status(500).json({ error: error, }, console.log(error))
  }


});


router.delete('/delete', async (req, res) => {
const{idpedidos} = req.body

    try {
      connection.query(`DELETE FROM pedidos WHERE idpedidos='${idpedidos}'`),
      res.status(200).json({ message: 'delete feito com sucesso' }), console.log("Deletado");
      
    } catch (error) {
      res.status(500).json({ error: error })

  }



})

router.patch('/atualiza', async (req, res) => {

  const {idpedidos, nomeCliente, telefoneCliente, emailCliente, saborSorvete, adicionais, total} = req.body


  let sql = (`UPDATE pedidos SET nomeCliente = '${nomeCliente}', telefoneCliente= '${telefoneCliente}', emailCliente= '${emailCliente}',saborSorvete = '${saborSorvete}', adicionais = '${adicionais}', total = '${total}' WHERE  idpedidos='${idpedidos}'`);
  try {
    connection.query(sql),
      res.status(201).json({ message: 'Pedido atualizado no sistema ' }), console.log("Atualizado");
  }  catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router;
