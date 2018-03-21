# AVALLIE API
API para a startup Avallie


## POST - /addSupplier

Adiciona um novo fornecedor ao sistema

#### BODY
cpnj - String

responsable - String

phones - Array de Strings

emails - Array de Strings

fantasyName - String

socialReason - String

address - Array do tipo 
```
{
        street - String,
        number - Number (long, int),
        city - String
}
```     
categories - Array de String(id da categoria) 


#### RESPOSTA

{

  status - Number (200 ou 400),
  
  messages - Array de Strings
  
}


## POST - /getProducts

### BODY

{
        name - String
        categories - Array de Strings(id da categoria)
        unity - String
}

### RESPOSTA
```
[
    {
        "_id": "5a8d6db438c41724bce86606",
        "category": "FERRAMENTAS",
        "name": "DISCO DE CORTE P/ ACOS E METAIS FERROSOS, ESP=3,0MM, FURO=22,2MM, DIAM=9",
        "unity": "un"
    },
    {
        "_id": "5a8d6db438c41724bce86608",
        "category": "FERRAMENTAS",
        "name": "DISCO DE DESBASTE FLAP P/ ACOS E METAIS FERROSOS, GRAO 120, ESP=11,0MM, FURO=22,2MM, DIAM=4.1/2",
        "unity": "un"
    },
]
```

OU 

```
{
    "status": 400,
    "messages": "Não foi encontrado nenhum produto"
}
```


## POST - /addBudgetRequest

```
{
        clientEmail - String
        product - String id do produto
}
```

#### RESPOSTA
```
{
    "status": 200,
    "messages": [
        "Solicitação registrada com sucesso",
        "Solicitação enviada para 1 fornecedores",
        "Enviamos um email para kiddlima@gmail.com com as informações de sua solicitação"
    ]
}
```

## GET - /getBudgetRequests
