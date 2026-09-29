/* =========================================
   SISTEMA DE CONTAS
   localStorage
   Suporta várias contas
========================================= */


/* =========================================
   VARIÁVEIS
========================================= */

let accounts = JSON.parse(
    localStorage.getItem("accounts")
) || [];

let selectedEmail = localStorage.getItem(
    "selectedEmail"
);


/* =========================================
   SALVAR CONTAS
========================================= */

function saveAccounts() {

    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );
}


/* =========================================
   MOSTRAR MENSAGEM
========================================= */

function showMessage(elementId, message) {

    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = message;
    }
}


/* =========================================
   CADASTRAR CONTA
========================================= */

function createAccount(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const birthDate =
        document.getElementById("birthDate").value;


    /* VERIFICAR CAMPOS */

    if (
        !name ||
        !email ||
        !password ||
        !confirmPassword ||
        !birthDate
    ) {

        alert("Preencha todos os campos!");

        return;
    }


    /* VERIFICAR SENHAS */

    if (password !== confirmPassword) {

        alert("As senhas não são iguais!");

        return;
    }


    /* VERIFICAR DATA */

    const date = new Date(birthDate);

    if (isNaN(date.getTime())) {

        alert(
            "Digite uma data de nascimento válida!"
        );

        return;
    }


    /* NÃO PERMITIR DATA FUTURA */

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    if (date > today) {

        alert(
            "A data de nascimento não pode ser no futuro!"
        );

        return;
    }


    /* VERIFICAR E-MAIL */

    const accountExists = accounts.some(
        account =>
            account.email.toLowerCase() ===
            email.toLowerCase()
    );


    if (accountExists) {

        alert(
            "Esse e-mail já está cadastrado!"
        );

        return;
    }


    /* CRIAR CONTA */

    const newAccount = {

        name: name,

        email: email,

        password: password,

        birthDate: birthDate
    };


    accounts.push(newAccount);

    saveAccounts();


    alert(
        "Conta criada com sucesso!"
    );


    document
        .getElementById("registerForm")
        .reset();


    window.location.href =
        "index.html";
}


/* =========================================
   LOGIN
========================================= */

function login(event) {

    event.preventDefault();


    const emailInput =
        document.getElementById("loginEmail");

    const passwordInput =
        document.getElementById("loginPassword");


    if (!emailInput || !passwordInput) {
        return;
    }


    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


    /* PROCURAR CONTA */

    const account = accounts.find(
        account =>
            account.email.toLowerCase() ===
            email.toLowerCase() &&
            account.password ===
            password
    );


    if (!account) {

        alert(
            "E-mail ou senha incorretos!"
        );

        return;
    }


    /* SALVAR CONTA SELECIONADA */

    selectedEmail =
        account.email;

    localStorage.setItem(
        "selectedEmail",
        selectedEmail
    );


    alert(
        "Login realizado com sucesso!"
    );


    window.location.href =
        "conta.html";
}


/* =========================================
   PEGAR CONTA SELECIONADA
========================================= */

function getSelectedAccount() {

    if (!selectedEmail) {
        return null;
    }


    return accounts.find(
        account =>
            account.email ===
            selectedEmail
    );
}


/* =========================================
   FORMATAR DATA
========================================= */

function formatBirthDate(dateString) {

    if (!dateString) {
        return "";
    }


    const parts =
        dateString.split("-");


    if (parts.length !== 3) {
        return dateString;
    }


    return (
        parts[2] +
        "/" +
        parts[1] +
        "/" +
        parts[0]
    );
}


/* =========================================
   MOSTRAR CONTA
========================================= */

function loadSelectedAccount() {

    const account =
        getSelectedAccount();


    if (!account) {
        return;
    }


    const nameElement =
        document.getElementById(
            "accountName"
        );


    const emailElement =
        document.getElementById(
            "accountEmail"
        );


    const birthDateElement =
        document.getElementById(
            "accountBirthDate"
        );


    if (nameElement) {

        nameElement.textContent =
            account.name || "";
    }


    if (emailElement) {

        emailElement.textContent =
            account.email || "";
    }


    if (birthDateElement) {

        birthDateElement.textContent =
            formatBirthDate(
                account.birthDate
            );
    }
}


/* =========================================
   MOSTRAR PÁGINA DE EDIÇÃO
========================================= */

function showEditPage() {

    const accountPage =
        document.getElementById(
            "accountPage"
        );

    const editPage =
        document.getElementById(
            "editPage"
        );


    if (!accountPage || !editPage) {
        return;
    }


    loadEditAccount();


    accountPage.classList.add(
        "hidden"
    );

    editPage.classList.remove(
        "hidden"
    );
}


/* =========================================
   VOLTAR PARA A CONTA
========================================= */

function showAccountPage() {

    const accountPage =
        document.getElementById(
            "accountPage"
        );

    const editPage =
        document.getElementById(
            "editPage"
        );


    if (!accountPage || !editPage) {
        return;
    }


    editPage.classList.add(
        "hidden"
    );

    accountPage.classList.remove(
        "hidden"
    );
}


/* =========================================
   CARREGAR DADOS PARA EDIÇÃO
========================================= */

function loadEditAccount() {

    const account =
        getSelectedAccount();


    if (!account) {
        return;
    }


    const nameInput =
        document.getElementById(
            "editName"
        );


    const emailInput =
        document.getElementById(
            "editEmail"
        );


    const passwordInput =
        document.getElementById(
            "editPassword"
        );


    const birthDateInput =
        document.getElementById(
            "editBirthDate"
        );


    if (nameInput) {

        nameInput.value =
            account.name || "";
    }


    if (emailInput) {

        emailInput.value =
            account.email || "";
    }


    if (passwordInput) {

        passwordInput.value =
            account.password || "";
    }


    if (birthDateInput) {

        birthDateInput.value =
            account.birthDate || "";
    }
}


/* =========================================
   EDITAR CONTA
========================================= */

function editAccount(event) {

    event.preventDefault();


    const account =
        getSelectedAccount();


    if (!account) {

        alert(
            "Nenhuma conta selecionada!"
        );

        return;
    }


    const nameInput =
        document.getElementById(
            "editName"
        );


    const emailInput =
        document.getElementById(
            "editEmail"
        );


    const passwordInput =
        document.getElementById(
            "editPassword"
        );


    const birthDateInput =
        document.getElementById(
            "editBirthDate"
        );


    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;

    const birthDate =
        birthDateInput.value;


    /* VERIFICAR CAMPOS */

    if (
        !name ||
        !email ||
        !password ||
        !birthDate
    ) {

        alert(
            "Preencha todos os campos!"
        );

        return;
    }


    /* VERIFICAR DATA */

    const date =
        new Date(birthDate);


    if (isNaN(date.getTime())) {

        alert(
            "Digite uma data de nascimento válida!"
        );

        return;
    }


    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    if (date > today) {

        alert(
            "A data de nascimento não pode ser no futuro!"
        );

        return;
    }


    /* VERIFICAR E-MAIL */

    const emailExists =
        accounts.some(
            otherAccount =>
                otherAccount !== account &&
                otherAccount.email.toLowerCase() ===
                email.toLowerCase()
        );


    if (emailExists) {

        alert(
            "Esse e-mail já está sendo usado por outra conta!"
        );

        return;
    }


    /* GUARDAR E-MAIL ANTIGO */

    const oldEmail =
        account.email;


    /* ATUALIZAR */

    account.name =
        name;

    account.email =
        email;

    account.password =
        password;

    account.birthDate =
        birthDate;


    /* SALVAR */

    saveAccounts();


    /* ATUALIZAR CONTA SELECIONADA */

    selectedEmail =
        email;

    localStorage.setItem(
        "selectedEmail",
        selectedEmail
    );


    alert(
        "Conta atualizada com sucesso!"
    );


    window.location.href =
        "conta.html";
}


/* =========================================
   EXCLUIR CONTA
========================================= */

function deleteAccount() {

    const account =
        getSelectedAccount();


    if (!account) {

        alert(
            "Nenhuma conta selecionada!"
        );

        return;
    }


    const confirmDelete =
        confirm(
            "Tem certeza que deseja excluir esta conta?"
        );


    if (!confirmDelete) {
        return;
    }


    accounts =
        accounts.filter(
            account =>
                account.email !==
                selectedEmail
        );


    saveAccounts();


    localStorage.removeItem(
        "selectedEmail"
    );


    selectedEmail =
        null;


    alert(
        "Conta excluída com sucesso!"
    );


    window.location.href =
        "index.html";
}


/* =========================================
   SAIR DA CONTA
========================================= */

function logout() {

    localStorage.removeItem(
        "selectedEmail"
    );


    selectedEmail =
        null;


    window.location.href =
        "index.html";
}


/* =========================================
   VERIFICAR LOGIN
========================================= */

function checkLogin() {

    const account =
        getSelectedAccount();


    if (!account) {

        window.location.href =
            "index.html";
    }
}


/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* LOGIN */

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                login
            );
        }


        /* CADASTRO */

        const registerForm =
            document.getElementById(
                "registerForm"
            );


        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                createAccount
            );
        }


        /* EDIÇÃO */

        const editForm =
            document.getElementById(
                "editForm"
            );


        if (editForm) {

            editForm.addEventListener(
                "submit",
                editAccount
            );
        }


        /* PÁGINA DA CONTA */

        const accountPage =
            document.getElementById(
                "accountPage"
            );


        if (accountPage) {

            checkLogin();

            loadSelectedAccount();
        }

    }
);