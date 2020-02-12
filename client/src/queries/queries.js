import gql from "graphql-tag";

export const SignUp = gql`
mutation signUp(
	$input: SignUpMutationInput!
){
  signUp(
    input: $input
  )
   {
    errors{
        field,
        messages
      }
    }
  } 
`
export const getAllGoals = gql `
    query allGoals{
        allGoals{
            id
            name
            price
        }
    }
`

export const getCapital = gql `
    query capital{
        capital{
            id
            keeper
            cash
        }
    }
`

export const capitalUpdate = gql `
    mutation capitalUpdate(
        $cashPlus: Float
        $keeperPlus: Int
    ){
        capitalUpdate(cashPlus: $cashPlus, keeperPlus: $keeperPlus) 
        {
            success
        }
    
    }
`

export const getProductDistinct = gql`
    query productDistinct{
        productDistinct{
            name
            price
        }
    }
`;

export const getAllProducts = gql `
    query allProducts{
        allProducts{
                id
                name
                price
                createdAt
        }
    }
`

export const productCreate = gql`
    mutation productCreate(
        $name: String!
        $price: Float!
    ){
        productCreate(
            name: $name,
            price: $price
        ){
            success 
        }
    }
`;