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

        { 
        
          street - String,
          
          number - Number (long, int),
          
          city - String
          
        }
        
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


OU 

{
    "status": 400,
    "messages": "Não foi encontrado nenhum produto"
}



## POST - /addBudgetRequest

{
        clientEmail - String
        product - String id do produto
}


#### RESPOSTA
{
    "status": 200,
    "messages": [
        "Solicitação registrada com sucesso",
        "Solicitação enviada para 1 fornecedores",
        "Enviamos um email para kiddlima@gmail.com com as informações de sua solicitação"
    ]
}

## GET - /getBudgetRequests

#### EXEMPLO DE RESPOSTA

[
    {
        "_id": "5aafeb61e4bf5c0029f6737b",
        "updatedAt": "2018-03-19T16:54:57.461Z",
        "createdAt": "2018-03-19T16:54:57.461Z",
        "deadLine": "2018-02-23T00:00:00.000Z",
        "address": {
            "address": "Avenida Polar",
            "city": "Porto alegre",
            "number": 415
        },
        "user": {
            "cpf": "86392743049",
            "email": "kiddlima@gmail.com",
            "name": "Vinicius Lima",
            "phone": "51999826032"
        },
        "suppliers": [
            {
                "id": "5aafea8fe4bf5c0029f67220",
                "fantasyName": "Balaroti",
                "cnpj": "77.044.618/0001-88",
                "_id": "5aafeb61e4bf5c0029f6737e",
                "products": [
                    {
                        "_id": "5aafea67e4bf5c0029f65584",
                        "category": "DIVERSOS",
                        "name": "ABERTURA PALET (MATERIAL FRACIONADO)",
                        "unity": "un",
                        "budgets": []
                    }
                ],
                "categories": [
                    "ACESSÓRIOS DE PAREDE",
                    "AÇOS",
                    "AGLOMERANTES",
                    "AGREGEQUIP. DE PROTEÇÃO INDIVIDUAL",
                    "ADOS",
                    "ALVENARIAS",
                    "ARGAMASSAS E ADITIVOS",
                    "ARGAMASSAS E REVESTIMENTOS",
                    "CABOS",
                    "CÂMERAS E EQUIPAMENTOS DE CFTV",
                    "CHURRASQUEIRA PRÉ-MOLDADA",
                    "DIVERSOS",
                    "ENTRADA DE ENERGIA",
                    "EQUIPAMENTOS CLIMATIZAÇÃO",
                    "EQUIPAMENTOS LÓGICA",
                    "EQUIPAMENTOS TELEFONIA",
                    "ESQUADRIAS DE ALUMÍNIO",
                    "ESQUADRIAS DE MADEIRA",
                    "FERRAGENS E FECHADURAS",
                    "FERRAMENTAS",
                    "IMPERMEABILIZAÇÃO",
                    "INFRAESTRUTURA ELÉTRICAS LÓGICA E CFTV",
                    "INFRAESTRUTURA HIDRÁULICA EM COBRE",
                    "INFRAESTRUTURA HIDRÁULICA EM FERRO",
                    "INFRAESTRUTURA HIDRÁULICA EM PPR",
                    "INFRAESTRUTURA HIDRÁULICA EM PVC",
                    "LOUÇAS METAIS E ACABAMENTOS",
                    "LUMINÁRIAS E LAMPADAS",
                    "MADEIRAS",
                    "MATERIAIS DE CONCRETO PRÉ-MOLDADO",
                    "MISCELÂNEAS DIVERSAS",
                    "PINTURAS",
                    "REVESTIMENTOS DE PAREDE",
                    "REVESTIMENTOS DE PISO",
                    "REVESTIMENTOS DE TETO",
                    "SEGURANÇA E SINALIZAÇÃO",
                    "TOMADAS E ACABAMENTOS ELÉTRICOS",
                    "INSTALAÇÕES DE GÁS",
                    "COBOGÓ",
                    "ARGILA EXPANDIDA"
                ],
                "address": [
                    "Av. das Torres, 3001"
                ],
                "cep": [],
                "state": [
                    "PR"
                ],
                "city": [
                    "São José dos Pinhais"
                ],
                "emails": [
                    "comercial@avallie.com"
                ],
                "phones": [
                    "(41) 3035-8088",
                    "(41) 9900-2671"
                ],
                "status": "Aguardando orçamento"
            },
            {
                "id": "5aafea8fe4bf5c0029f67298",
                "fantasyName": "Cassol",
                "cnpj": null,
                "_id": "5aafeb61e4bf5c0029f6737d",
                "products": [
                    {
                        "_id": "5aafea67e4bf5c0029f65584",
                        "category": "DIVERSOS",
                        "name": "ABERTURA PALET (MATERIAL FRACIONADO)",
                        "unity": "un",
                        "budgets": []
                    }
                ],
                "categories": [
                    "ACESSÓRIOS DE PAREDE",
                    "AÇOS",
                    "AGLOMERANTES",
                    "AGREGEQUIP. DE PROTEÇÃO INDIVIDUAL",
                    "ADOS",
                    "ALVENARIAS",
                    "ARGAMASSAS E ADITIVOS",
                    "ARGAMASSAS E REVESTIMENTOS",
                    "CABOS",
                    "CÂMERAS E EQUIPAMENTOS DE CFTV",
                    "CHURRASQUEIRA PRÉ-MOLDADA",
                    "DIVERSOS",
                    "ENTRADA DE ENERGIA",
                    "EQUIPAMENTOS CLIMATIZAÇÃO",
                    "EQUIPAMENTOS LÓGICA",
                    "EQUIPAMENTOS TELEFONIA",
                    "ESQUADRIAS DE ALUMÍNIO",
                    "ESQUADRIAS DE MADEIRA",
                    "FERRAGENS E FECHADURAS",
                    "FERRAMENTAS",
                    "IMPERMEABILIZAÇÃO",
                    "INFRAESTRUTURA ELÉTRICAS LÓGICA E CFTV",
                    "INFRAESTRUTURA HIDRÁULICA EM COBRE",
                    "INFRAESTRUTURA HIDRÁULICA EM FERRO",
                    "INFRAESTRUTURA HIDRÁULICA EM PPR",
                    "INFRAESTRUTURA HIDRÁULICA EM PVC",
                    "LOUÇAS METAIS E ACABAMENTOS",
                    "LUMINÁRIAS E LAMPADAS",
                    "MADEIRAS",
                    "MATERIAIS DE CONCRETO PRÉ-MOLDADO",
                    "MISCELÂNEAS DIVERSAS",
                    "PINTURAS",
                    "REVESTIMENTOS DE PAREDE",
                    "REVESTIMENTOS DE PISO",
                    "REVESTIMENTOS DE TETO",
                    "SEGURANÇA E SINALIZAÇÃO",
                    "TOMADAS E ACABAMENTOS ELÉTRICOS",
                    "INSTALAÇÕES DE GÁS",
                    "COBOGÓ",
                    "ARGILA EXPANDIDA"
                ],
                "address": [
                    ""
                ],
                "cep": [],
                "state": [
                    "PR"
                ],
                "city": [
                    "Curitiba"
                ],
                "emails": [
                    "comercial@avallie.com"
                ],
                "phones": [
                    "(41) 3641-5970"
                ],
                "status": "Aguardando orçamento"
            },
            {
                "id": "5aafea8fe4bf5c0029f6734b",
                "fantasyName": "Toldos Capital",
                "cnpj": null,
                "_id": "5aafeb61e4bf5c0029f6737c",
                "products": [
                    {
                        "_id": "5aafea67e4bf5c0029f65584",
                        "category": "DIVERSOS",
                        "name": "ABERTURA PALET (MATERIAL FRACIONADO)",
                        "unity": "un",
                        "budgets": []
                    }
                ],
                "categories": [
                    "TELHAS E COBERTURAS",
                    "DIVERSOS"
                ],
                "address": [
                    ""
                ],
                "cep": [],
                "state": [
                    "PR"
                ],
                "city": [
                    "Curitiba"
                ],
                "emails": [
                    "comercial@avallie.com"
                ],
                "phones": [
                    "(47) 3426-5331"
                ],
                "status": "Aguardando orçamento"
            }
        ],
        "status": "Aguardando orçamento"
    }
]
