################ 
# LAMBDA Function
################
"""Regular"""
def add(x, y):
    return x + y
"""same function as the add() above"""
lambda x,y: x+y

"""better to use lambda in higher order functions"""
nums = [3, 4, 5, 7]
nums_double = map(lambda x: x*2, nums)
print(list(nums_double))

phones = [
    {'name': 'phone_1', 'price': 200},
    {'name': 'phone_2', 'price': 320},
    {'name': 'phone_3', 'price': 280},
]
phones_greater_300 = list(filter(lambda x: x['price'] > 300, phones))
print(phones_greater_300)

