<?php 
// Inicia a sessão para manter dados entre requisições
session_start();

// Inclui o ficheiro de conexão à base de dados
require '../db.php';

// Inclui o ficheiro com as funções de autenticação (como isAdmin)
require '../auth.php';

// Verifica se os campos obrigatórios foram fornecidos via POST
if(!isset($_POST['nome']) || !isset($_POST['descricao']) || !isset($_POST['preco'])) {
    echo json_encode(array("status" => "error", "message" => "Faltam dados obrigatórios"));
    exit();
}

// Verifica se o utilizador atual tem permissões de administrador
if(!isAdmin()){
    echo json_encode(array("status" => "error", "message" => "Acesso negado"));
    exit();
}

// Lê o conteúdo da imagem enviada via formulário
$imagem = file_get_contents($_FILES['imagem']['tmp_name']);

// Prepara a query SQL para inserir um novo produto na base de dados
$sql = $con->prepare("INSERT INTO produto (nome, descricao, preco, imagem) VALUES (?, ?, ?, ?)");

// Liga os parâmetros à query preparada:
// - "s" = string (nome)
// - "s" = string (descrição)
// - "d" = double (preço)
// - "b" = blob (imagem)
$sql->bind_param("ssdb", $_POST['nome'], $_POST['descricao'], $_POST['preco'], $imagem);

// Envia a imagem (dados binários) separadamente como blob
$sql->send_long_data(3, $imagem);

// Executa a query de inserção
$sql->execute();

// Verifica se a inserção foi bem-sucedida
if($sql->affected_rows > 0){
    echo json_encode(array("status" => "success", "message" => "Produto inserido com sucesso"));
} else {
    echo json_encode(array("status" => "error", "message" => "Erro ao inserir produto"));
}

// Fecha a instrução SQL e a conexão com o banco de dados
$sql->close();
$con->close();
?>
