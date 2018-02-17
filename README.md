# AVALLIE API
API para a startup Avallie


## ROTAS
### POST - /addSupplier

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
