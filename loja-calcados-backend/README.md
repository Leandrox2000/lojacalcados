# loja-calcados-backend

Desenvolvemos esta aplicação com a IDE Intellij Community 2024 utilizando o Java JDK 11 (ou superior)
disponível em https://www.jetbrains.com/idea/ e o java https://www.oracle.com/java/technologies/downloads/

Para rodar a aplicação backend via IDE Intellij ou outra similar, abrir a classe Java br.com.faculdade.api.AutomacaoApplication
disponível em src/main/java e rodar como Java Aplication, 
que o Spring boot será inicializado e feita a conexão via datasource com o banco de dados mysql.

Para rodar a aplicação direto, somente clicar duas vezes em loja-calcados-backend-0.0.1-SNAPSHOT.jar
que é um JAR executável com o spring boot inicializável, sendo criado uma pasta log com o texto de sucesso ou erro caso dê.
 
Para testar se o backend levantou com sucesso, abrir o navegador web e acessar o link:
http://localhost:8080/loja-calcados/swagger-ui.html

Neste swagger é possível visualizar e testar todas as apis rest disponibilizadas para o fronted consumir,
ou seja, todas as operações que o Java backend entrega para a tela, como listagem de dados e atualizações.