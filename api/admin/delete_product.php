<?php
// Inicia a sessão para acesso a variáveis de sessão
session_start();

// Inclui o ficheiro de ligação à base de dados
require '../db.php';

// Inclui o ficheiro com funções de autenticação
require '../auth.php';

// Verifica se o utilizador é um administrador
if(!isAdmin()){
    // Se não for admin, retorna erro em formato JSON e encerra o script
    echo json_encode(array("status" => "error", "message" => "Acesso negado"));
    exit();
}

// Verifica se o parâmetro 'id' foi passado na URL (via GET)
if(!isset($_GET['id'])) {
    // Se não for fornecido o ID, retorna erro em formato JSON e encerra o script
    echo json_encode(array("status" => "error", "message" => "ID do produto não fornecido"));
    exit();
}

// Obtém o ID do produto a ser eliminado
$id = $_GET['id'];

// Prepara a instrução SQL para eliminar o produto com o ID fornecido
$sql = $con->prepare("DELETE FROM produto WHERE id = ?");
$sql->bind_param("i", $id); // Liga o parâmetro ID como inteiro
$sql->execute(); // Executa a query

// Verifica se a query afetou alguma linha (produto eliminado com sucesso)
if($sql->affected_rows > 0){
    echo json_encode(array("status" => "success", "message" => "Produto eliminado com sucesso"));
}else{
    // Caso nenhum produto tenha sido eliminado (ID inválido ou inexistente)
    echo json_encode(array("status" => "error", "message" => "Erro ao eliminar produto"));
}

// Fecha a instrução preparada e a conexão com a base de dados
$sql->close();
$con->close();
?>
