################ 
# *ARGS and **KWARGS / regular arguments and keywords arguments
# *args :  extra value paremeters parse to the function
# **kwargs: keywords and values of extra parameters parse to the function
#
# These are used for flexible function arguments/parameters
################
nums = [2,3,4,5,6]
print(nums)  # print a list of nums
print(*nums)  # unpacking, print the unpackaged elements of nums


def order_pizza1(size, *toppings):
    print(f"Ordered a {size} pizza with toppings:")
    for topping in toppings:
        print(f"- {topping}")

order_pizza1("large", "olive", "pepper")


def order_pizza2(size, *toppings, **details):
    print(f"\nOrdered a {size} pizza with toppings:")
    print(f"toppings: {toppings}")  # tupple
    for topping in toppings:
        print(f"- {topping}")
    print(f"details: {details}")  # dictionary
    print("Extra info:")
    
    for key, value in details.items():
        print(f"- {key}: {value}")

order_pizza2("large", "olive", "pepper", delivery=True, tip=3)
"""
Ordered a large pizza with toppings:
- olive
- pepper
details: {'delivery': True, 'tip': 3}
Extra info:
- delivery: True
- tip: 3
"""
