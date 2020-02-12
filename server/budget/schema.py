import graphene

from django.db.models import Sum
from graphene_django.types import DjangoObjectType
from budget.models import Goal, Capital, Product
from graphene import ObjectType

class GoalType(DjangoObjectType):
    class Meta:
        model = Goal


class CapitalType(DjangoObjectType):
    class Meta:
        model = Capital


class ProductDistinct(ObjectType):
    name = graphene.String()
    price = graphene.Float()


class ProductType(DjangoObjectType):
    class Meta:
        model = Product


class Query(object):
    all_goals = graphene.List(GoalType)
    all_products = graphene.List(ProductType)
    goal = graphene.Field(GoalType, id=graphene.Int())
    product = graphene.Field(ProductType, id=graphene.Int())
    capital = graphene.Field(CapitalType)
    product_distinct = graphene.List(ProductDistinct)

    def resolve_product_distinct(self, info, **kwargs):
        return Product.objects.values('name').order_by('name').annotate(price=Sum('price'))

    def resolve_all_goals(self, info, **kwargs):
        return Goal.objects.all()

    def resolve_all_products(self, info, **kwargs):
        return Product.objects.all()

    def resolve_goal(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            try:
                goal = Goal.objects.get(pk=id)
                return goal
            except Goal.DoesNotExist:
                return None
        return None

    def resolve_product(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            try:
                product = Product.objects.get(pk=id)
                return product
            except Product.DoesNotExist:
                return None
        return None

    def resolve_capital(self, info, **kwargs):
        return Capital.objects.first()       
