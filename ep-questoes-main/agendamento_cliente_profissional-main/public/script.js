// Função para cadastrar cliente
async function cadastrarCliente() {
    const nome = document.getElementById('nomeCliente').value;
    const Idcliente = document.getElementById('Id_cliente').value;
    const cpf_cliente = document.getElementById('cpfcliente').value;
    const datanascimento = document.getElementById('datanascimento').value;
    const email = document.getElementById('email').value;
    const Telefone = document.getElementById('Telefone').value;

    await fetch('/cadastrar-cliente', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ nome, Idcliente, cpf_cliente, datanascimento, email, Telefone })
    });
    
}

// Função para cadastrar profissional
async function cadastrarProfissional() {
    const Nome = document.getElementById('NomeProfissional').value;
    const IdProfessor = document.getElementById('IdProfessor').value;
    const Cpf_professor = document.getElementById('Cpf_professor').value;
    const Email = document.getElementById('Email').value;
    const Telefone = document.getElementById('Telefone').value;

    await fetch('/cadastrar-profissional', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ Nome, IdProfessor, Cpf_professor, Email, Telefone })
    });
    alert('Profissional Cadastrado');
}

// Função para cadastrar agendamento
async function cadastrarAgendamento() {
    const data = document.getElementById('dataAgendamento').value;
    const horario = document.getElementById('horarioAgendamento').value;
    const sala = document.getElementById('salaAgendamento').value;
    const Id_cliente = document.getElementById('Id_cliente').value;
    const Id_professor = document.getElementById(' Id_professor').value;

    await fetch('/cadastrar-agendamento', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ data, horario, sala, Id_cliente, Id_professor })
    });
    alert('Agendamento Cadastrado');
}

function consultarAgendamentos(event) {
    event.preventDefault(); // Previne o envio do formulário

    const IdCliente = document.getElementById("IdClienteConsulta").value;
    const IdProfissional = document.getElementById("IdProfissionalConsulta").value;
    const data = document.getElementById("dataConsulta").value;

    const tabelaAgendamentos = document.getElementById("tabelaAgendamentos").querySelector("tbody");
    tabelaAgendamentos.innerHTML = ""; // Limpa resultados anteriores

    // Faz a requisição para consultar agendamentos
    const params = new URLSearchParams({
        Id_cliente: IdCliente,
        Id_profissional: IdProfissional,
        data: data,
    });

    fetch(`/consultar-agendamentos?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na consulta');
            }
            return response.json();
        })
        .then(agendamentos => {
            agendamentos.forEach(agendamento => {
                const row = tabelaAgendamentos.insertRow();
                row.insertCell(0).innerText = agendamento.data;
                row.insertCell(1).innerText = agendamento.horario;
                row.insertCell(2).innerText = agendamento.sala;
                row.insertCell(3).innerText = agendamento.Id_cliente;
                row.insertCell(4).innerText = agendamento.Id_profissional;
            });

            if (agendamentos.length === 0) {
                const row = tabelaAgendamentos.insertRow();
                row.insertCell(0).colSpan = 6;
                row.cells[0].innerText = "Nenhum agendamento encontrado.";
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            const row = tabelaAgendamentos.insertRow();
            row.insertCell(0).colSpan = 6;
            row.cells[0].innerText = "Erro ao consultar agendamentos.";
        });
}

