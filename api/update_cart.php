<?php

// Importa o script de autenticação (verifica se o usuário tem permissão para acessar)
require '../api/auth.php';

// Inicia a sessão para acessar a variável global $_SESSION
session_start();

// Verifica se o usuário está logado; se não estiver, redireciona para a página de login
if (!isset($_SESSION["user"])) {
    header("Location: views/login.php");
    exit(); // Encerra o script após o redirecionamento
}

// Importa o script que conecta ao banco de dados
require '../api/db.php';

// Verifica se a requisição é do tipo POST e se os campos 'produtoId' e 'quantidade' foram enviados
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["produtoId"]) && isset($_POST["quantidade"])) {
    
    // Recupera o ID do usuário da sessão
    $userId = $_SESSION["user"]["id"];

    // Protege contra SQL Injection escapando os dados recebidos do formulário
    $produtoId = $con->real_escape_string($_POST["produtoId"]);
    $quantidade = $con->real_escape_string($_POST["quantidade"]);

    // Se a quantidade for menor ou igual a 0, remove o item do carrinho
    if ($quantidade <= 0) {
        $sql = $con->prepare("DELETE FROM Carrinho WHERE userId = ? AND produtoId = ?");
        $sql->bind_param("ii", $userId, $produtoId);
    } else {
        // Caso contrário, atualiza a quantidade do produto no carrinho
        $sql = $con->prepare("UPDATE Carrinho SET quantidade = ? WHERE userId = ? AND produtoId = ?");
        $sql->bind_param("iii", $quantidade, $userId, $produtoId);
    }

    // Executa a query preparada
    if ($sql->execute()) {
        // Em caso de sucesso, redireciona de volta ao carrinho
        header("Location: ../views/cart.php");
        exit();
    } else {
        // Exibe mensagem de erro caso a execução falhe
        echo "Erro ao atualizar carrinho.";
    }
}

?>
