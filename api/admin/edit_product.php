<?php
// Inicia a sessão
session_start();

// Inclui o ficheiro de ligação à base de dados
require '../db.php';

// Inclui o ficheiro com funções de autenticação
require '../auth.php';

// Define o tipo de conteúdo da resposta como JSON
header('Content-Type: application/json');

// Verifica se os dados obrigatórios foram fornecidos via POST
if (!isset($_POST['id']) || !isset($_POST['nome']) || !isset($_POST['descricao']) || !isset($_POST['preco'])) {
    echo json_encode(array("status" => "error", "message" => "Faltam dados obrigatórios"));
    exit();
}

// Verifica se o utilizador tem permissões de administrador
if (!isAdmin()) {
    echo json_encode(array("status" => "error", "message" => "Acesso negado"));
    exit();
}

// Obtém e sanitiza os dados recebidos do formulário
$id = intval($_POST['id']);            // Converte o ID para inteiro
$nome = $_POST['nome'];
$descricao = $_POST['descricao'];
$preco = $_POST['preco'];              // Espera-se que seja um valor numérico

// Verifica se uma imagem foi enviada e tem conteúdo
if (isset($_FILES['imagem']) && $_FILES['imagem']['size'] > 0) {
    // Lê o conteúdo da imagem
    $imagem = file_get_contents($_FILES['imagem']['tmp_name']);

    // Prepara a query para atualizar o produto, incluindo a imagem
    $sql = $con->prepare("UPDATE produto SET nome=?, descricao=?, preco=?, imagem=? WHERE id=?");
    $sql->bind_param("ssdsi", $nome, $descricao, $preco, $imagem, $id);

    // Envia a imagem como dado longo (blob)
    $sql->send_long_data(3, $imagem);
} else {
    // Prepara a query para atualizar o produto sem alterar a imagem
    $sql = $con->prepare("UPDATE produto SET nome=?, descricao=?, preco=? WHERE id=?");
    $sql->bind_param("ssdi", $nome, $descricao, $preco, $id);
}

// Executa a query preparada
$sql->execute();

// Verifica se o produto foi atualizado com sucesso
if ($sql->affected_rows > 0) {
    echo json_encode(array("status" => "success", "message" => "Produto atualizado com sucesso"));
} else {
    echo json_encode(array("status" => "error", "message" => "Nenhuma alteração feita ou erro ao atualizar produto"));
}

// Fecha a query e a conexão com a base de dados
$sql->close();
$con->close();
?>
