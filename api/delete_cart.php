<?php
// Inclui o script de autenticação, provavelmente verifica permissões ou valida a sessão
require '../api/auth.php';

// Inicia a sessão, permitindo acesso à variável global $_SESSION
session_start();

// Verifica se o usuário está logado; caso contrário, redireciona para a tela de login
if (!isset($_SESSION["user"])) {
    header("Location: views/login.php");
    exit(); // Encerra o script após o redirecionamento
}

// Inclui a conexão com o banco de dados
require '../api/db.php';

// Verifica se a requisição foi feita via POST e se o ID do produto foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["produtoId"])) {

    // Obtém o ID do usuário logado a partir da sessão
    $userId = $_SESSION["user"]["id"];

    // Escapa o valor recebido de produtoId para evitar SQL Injection
    $produtoId = $con->real_escape_string($_POST["produtoId"]);

    // Prepara uma instrução SQL para remover o item do carrinho com segurança
    $sql = $con->prepare("DELETE FROM Carrinho WHERE userId = ? AND produtoId = ?");

    // Associa os parâmetros à consulta: ambos são inteiros ("ii")
    $sql->bind_param("ii", $userId, $produtoId);

    // Executa a query e verifica se a remoção foi bem-sucedida
    if ($sql->execute()) {
        // Redireciona de volta para a página do carrinho
        header("Location: ../views/cart.php");
        exit();
    } else {
        // Em caso de erro na execução da query, exibe uma mensagem
        echo "Erro ao remover produto do carrinho.";
    }
}

?>
