CREATE DATABASE PROJETO ;
USE PROJETO ;

CREATE TABLE Categorias 
(
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE Produtos (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    marca VARCHAR(50),
    id_categoria INT,
    tamanho VARCHAR(10),
    cor VARCHAR(50),
    preco DECIMAL(10, 2),
    quantidade_estoque INT,
    imagem_url VARCHAR(255),
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);

CREATE TABLE Clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    endereco TEXT,
    telefone VARCHAR(20),
    email VARCHAR(100),
    data_cadastro DATE NOT NULL
);

CREATE TABLE Pedidos (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    data_pedido DATE,
    status VARCHAR(50),
    total DECIMAL(10, 2),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

CREATE TABLE Itens_Pedido (
    id_item_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT,
    id_produto INT,
    quantidade INT,
    preco_unitario DECIMAL(10, 2),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_produto) REFERENCES Produtos(id_produto)
);

CREATE TABLE Fornecedores (
    id_fornecedor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    contato VARCHAR(100),
    endereco TEXT,
    produtos_fornecidos TEXT,
    FOREIGN KEY (id_fornecedor) REFERENCES Produtos(id_produto)
);

CREATE TABLE Pagamentos (
    id_pagamento INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT,
    data_pagamento DATE,
    metodo_pagamento VARCHAR(50),
    status_pagamento VARCHAR(50),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido)
);

CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    permissoes TEXT
);

CREATE TABLE Historico_Compras (
    id_historico INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    id_pedido INT,
    data_compra DATE,
    total DECIMAL(10, 2),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido)
);

CREATE TABLE POS_Transacoes (
    id_transacao INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT,
    id_usuario INT,
    data_transacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2),
    metodo_pagamento VARCHAR(50),
    status_transacao VARCHAR(50),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

CREATE INDEX idx_categoria_produto ON Produtos(id_categoria);
CREATE INDEX idx_cliente_pedido ON Pedidos(id_cliente);
CREATE INDEX idx_pedido_item ON Itens_Pedido(id_pedido);
CREATE INDEX idx_produto_item ON Itens_Pedido(id_produto);
CREATE INDEX idx_pedido_pagamento ON Pagamentos(id_pedido);
#CREATE INDEX idx_usuario_log ON Logs_Acoes(id_usuario);
#CREATE INDEX idx_produto_inventario ON Inventario(id_produto);
CREATE INDEX idx_pedido_pos ON POS_Transacoes(id_pedido);
CREATE INDEX idx_usuario_pos ON POS_Transacoes(id_usuario);

INSERT INTO Categorias (nome, descricao) VALUES
('Tênis', 'Sapatos esportivos'),
('Sandálias', 'Sapatos abertos para o verão'),
('Botas', 'Sapatos robustos para o inverno'),
('Sapatilhas', 'Sapatos casuais e confortáveis'),
('Mocassins', 'Sapatos confortáveis e estilosos'),
('Chinelos', 'Sapatos leves e casuais para o dia a dia');

INSERT INTO Produtos (nome, descricao, marca, id_categoria, tamanho, cor, preco, quantidade_estoque, imagem_url) VALUES
('Tênis Running', 'Tênis para corrida com amortecimento extra', 'Nike', 1, '42', 'Preto', 299.99, 50, 'url_imagem_tenis_running'),
('Sandália Confort', 'Sandália confortável para uso diário', 'Havaianas', 2, '39', 'Azul', 49.99, 150, 'url_imagem_sandalia_confort'),
('Bota Adventure', 'Bota resistente para aventuras', 'Timberland', 3, '43', 'Marrom', 499.99, 20, 'url_imagem_bota_adventure'),
('Sapatilha Casual', 'Sapatilha elegante para ocasiões casuais', 'Moleca', 4, '38', 'Vermelho', 89.99, 75, 'url_imagem_sapatilha_casual'),
('Mocassim Clássico', 'Mocassim de couro para ocasiões formais', 'Gucci', 5, '41', 'Preto', 599.99, 30, 'url_imagem_mocassim_classico'),
('Chinelo Básico', 'Chinelo casual para o dia a dia', 'Ipanema', 6, '40', 'Verde', 29.99, 200, 'url_imagem_chinelo_basico');

INSERT INTO Clientes (nome, endereco, telefone, email, data_cadastro) VALUES
('João Silva', 'Rua A, 123', '536448853', 'joao.silva@gmeil.com', '2023-01-15'),
('Maria Oliveira', 'Avenida B, 456', '72910000', 'maria.oliveira@gmeil.com', '2023-02-20'),
('Carlos Pereira', 'Praça C, 789', '6454566', 'carlos.pereira@gmeil.com', '2023-03-05'),
('Ana Souza', 'Rua D, 101', '654564656', 'ana.souza@gmeil.com', '2023-04-10'),
('Pedro Lima', 'Avenida E, 202', '654566465', 'pedro.lima@gmeil.com', '2023-05-15'),
('Mariana Santos', 'Praça F, 303', '8797897888', 'mariana.santos@gmeil.com', '2023-06-01');

INSERT INTO Pedidos (id_cliente, data_pedido, status, total) VALUES
(1, '2023-03-01', 'Entregue', 349.98),
(2, '2023-03-02', 'Processando', 49.99),
(3, '2023-03-03', 'Cancelado', 499.99),
(4, '2023-05-01', 'Entregue', 629.98),
(5, '2023-05-10', 'Entregue', 29.99),
(6, '2023-06-15', 'Processando', 59.98);

INSERT INTO Itens_Pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES
(1, 1, 1, 299.99),
(1, 4, 1, 89.99),
(2, 2, 1, 49.99),
(3, 3, 1, 499.99),
(4, 5, 1, 599.99),
(4, 2, 1, 29.99),
(5, 6, 1, 29.99),
(6, 6, 2, 29.99);


INSERT INTO Fornecedores (nome, contato, endereco, produtos_fornecidos) VALUES
('FORNECEDOR NIKE', 'NIKE@gmeil.com', 'Rua Nike, 123', 'Tênis'),
('FORNECEDOR Havaianas', 'Havaianas@gmeil.com', 'Rua Havaianas, 456', 'Sandálias'),
('FORNECEDOR Timberland', 'Timberland@gmeil.com', 'Rua Timberland, 789', 'Botas'),
('FORNECEDOR Moleca', 'Moleca@gmeil.com', 'Rua Moleca, 101', 'Sapatilhas'),
('FORNECEDOR Gucci', 'Gucci@gmeil.com', 'Rua Gucci, 123', 'Mocassins'),
('FORNECEDOR Ipanema', 'Ipanema@gmeil.com', 'Rua Ipanema, 456', 'Chinelos');

INSERT INTO Pagamentos (id_pedido, data_pagamento, metodo_pagamento, status_pagamento) VALUES
(1, '2023-03-02', 'Cartão de Crédito', 'Pago'),
(2, '2023-03-02', 'Boleto', 'Aguardando Pagamento'),
(3, '2023-03-03', 'Cartão de Crédito', 'Estornado'),
(4, '2023-05-02', 'Cartão de Crédito', 'Pago'),
(5, '2023-05-10', 'Cartão de Crédito', 'Pago'),
(6, '2023-06-15', 'Cartão de Crédito', 'Aguardando Pagamento');

INSERT INTO Usuarios (nome, cargo, email, senha, permissoes) VALUES
('Geraldo Messias', 'Gerente', 'admin@gmeil.com', 'senha_segura1', 'gerenciar_usuarios,ver_relatorios'),
('Faustão Globolino', 'Vendedor', 'vendedor@gmeil.com', 'senha_segura2', 'atender_clientes,gerenciar_pedidos'),
('Luiz da Silva', 'Gerente', 'gerente@gmeil.com', 'senha_segura3', 'gerenciar_usuarios,ver_relatorios,gerenciar_pedidos'),
('Maria do Nascimento', 'Caixa', 'caixa@gmeil.com', 'senha_segura4', 'atender_clientes,processar_pagamentos');

INSERT INTO Historico_Compras (id_cliente, id_pedido, data_compra, total) VALUES
(1, 1, '2023-03-01', 349.98),
(2, 2, '2023-03-02', 49.99),
(3, 3, '2023-03-03', 499.99),
(4, 4, '2023-05-01', 629.98),
(5, 5, '2023-05-10', 29.99),
(6, 6, '2023-06-15', 59.98);


INSERT INTO POS_Transacoes (id_pedido, id_usuario, total, metodo_pagamento, status_transacao) VALUES
(1, 1, 349.98, 'Cartão de Crédito', 'Concluído'),
(2, 2, 49.99, 'Boleto', 'Pendente'),
(3, 3, 499.99, 'Cartão de Crédito', 'Estornado'),
(4, 4, 629.98, 'Cartão de Crédito', 'Concluído'),
(5, 4, 29.99, 'Cartão de Crédito', 'Concluído');
