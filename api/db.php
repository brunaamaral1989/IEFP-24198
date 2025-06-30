<?php

  // Ativa o modo de relatório de erros do MySQLi, que lançará exceções em caso de erro
  mysqli_report(MYSQLI_REPORT_ERROR);
       
  // Cria uma nova conexão com o banco de dados usando o MySQLi
  // Parâmetros: servidor (localhost), usuário (root), senha (vazia), nome do banco (24198_Loja)
  $con = new mysqli("localhost", "root", "", "24198_Loja");
  
  // Verifica se ocorreu algum erro na conexão
  if ($con->connect_error)
  {
      // Encerra o script e exibe uma mensagem de erro, caso a conexão falhe
      die("connection failed: " . $con->connect_error);
  }

?>
