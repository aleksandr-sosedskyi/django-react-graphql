import graphene
from graphene_django.forms.mutation import DjangoModelFormMutation
from budget.schema import (ProductType, GoalType, CapitalType)
from budget.forms import ProductForm, GoalForm, CapitalForm, UserCreationForm
from budget.models import (Goal, Product, Capital)
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene import Field

class GoalCreateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        price = graphene.Float()

    goal = graphene.Field(GoalType)

    def mutate(self, info, name, price):
        goal = Goal.objects.create(name=name, price=price)
        return goal
    

class GoalDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    goal = graphene.Field(GoalType)

    def mutate(self, info, id):
        try:
            Goal.objects.get(pk=id).delete()
            return id
        except Goal.DoesNotExist:
            return "Goal with this ID was not provided!"


class GoalUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        name = graphene.String()
        price = graphene.Float()

    goal = graphene.Field(GoalType)

    def mutate(self, info, id, name, price):
        try:
            goal = Goal.objects.get(pk=id)
        except Goal.DoesNotExist:
            return "Goal with this ID was not provided!"
        
        goal.name = name
        goal.price = price
        goal.save()
        return goal


class CapitalCreateMutation(graphene.Mutation):
    class Arguments:
        keeper = graphene.Int()
        cash = graphene.Float()

    capital = graphene.Field(CapitalType)

    def mutate(self, info, keeper, cash):
        capital = Capital.objects.create(keeper=keeper, cash=cash)
        return capital


class CapitalDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    capital = graphene.Field(CapitalType)

    def mutate(self, info, id):
        try:
            Capital.objects.get(pk=id).delete()
        except Capital.DoesNotExist:
            return "Capital with this ID was not provided!"


class CapitalUpdateMutation(graphene.Mutation):
    class Arguments:
        cash_plus = graphene.Float()
        keeper_plus = graphene.Int()

    capital = graphene.Field(CapitalType)
    success = graphene.Boolean()

    def mutate(self, info, cash_plus, keeper_plus):
        success = False
        try:
            capital = Capital.objects.first()
        except Capital.DoesNotExist:
            return "Capital with this ID was not provided!"
        
        capital.cash += cash_plus
        capital.keeper += keeper_plus
        capital.save()  
        success = True
        return success


class ProductCreateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        price = graphene.Float()

    success = graphene.Boolean()

    def mutate(self, info, name, price):
        success = False
        product = Product.objects.create(name=name, price=price)
        success = True
        return ProductCreateMutation(success=success)


class ProductUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        name = graphene.String()
        price = graphene.Float()
    
    product = graphene.Field(ProductType)

    def mutate(self, info, id, name, price):
        try:
            product = Product.objects.get(pk=id)
        except Product.DoesNotExist:
            return "Product with this ID was not provided!"
        product.name = name
        product.price = price
        product.save()
        return product


class ProductDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    product = graphene.Field(ProductType)

    def mutate(self, info, id):
        try:
            Product.objects.get(pk=id).delete()
            return id
        except Product.DoesNotExist:
            return "Product with this id was not provided!"


class User(DjangoObjectType):
    class Meta:
        model = get_user_model()

class SignUpMutation(DjangoModelFormMutation):
    user = Field(User)
    
    class Meta:
        form_class = UserCreationForm


class Mutation(graphene.ObjectType):
    sign_up = SignUpMutation.Field()
    goal_create = GoalCreateMutation.Field()
    goal_delete = GoalDeleteMutation.Field()
    goal_update = GoalUpdateMutation.Field()
    product_create = ProductCreateMutation.Field()
    product_update = ProductUpdateMutation.Field()
    product_delete = ProductDeleteMutation.Field()
    capital_create = CapitalCreateMutation.Field()
    capital_update = CapitalUpdateMutation.Field()
    capital_delete = CapitalDeleteMutation.Field()