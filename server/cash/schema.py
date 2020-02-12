import graphene
import budget.schema
from budget import mutations


class Query(
    budget.schema.Query,
    graphene.ObjectType
    ):
    pass

class Mutation(
    mutations.Mutation,
    graphene.ObjectType
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
