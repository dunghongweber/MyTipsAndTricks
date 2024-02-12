################ 
# List COMPREHENSION
################
nums = [54, 313, 94, 16, 63, 47, 82]
# for loop, destructure each item, condition for single item
evens = [num for num in nums if num % 2 == 0]
print(evens)

################ 
# FILTER function - filter(function, iterable)
# returns items (object) from iterable based on criteria
# for more complex operation/iterable that List Comprehensive cannot handle
################
available_units = {
    '101':{
        'PN': 3,
        'WC': 2,
        'rent': 1000
    },
    '201':{
        'PN': 2,
        'WC': 2,
        'rent': 850
    },
    '301':{
        'PN': 1,
        'WC': 1,
        'rent': 600
    },
}

def my_filter(unit_num):
    if available_units[unit_num]['rent'] > 700 and available_units[unit_num]['PN'] == 2:
        return True
    return False

# use list() to print out result as python list
result_filter = list(filter(my_filter, available_units))
# only show the keys
print(result_filter)


my_nums = [54, 313, 94, 16, 63, 47, 82]
def test_filter(num):
    if num % 2 != 0:
        return True
    return False
x = filter(test_filter, my_nums)
print(list(x))

################ 
# MAP function - map(function, iterable)
# returns an iterator that applies function to every item of iterable
################
cars = {
    'car_1':{
        'year': 2021,
        'price': 1000
    },
    'car_2':{
        'year': 2019,
        'price': 850
    },
    'car_3':{
        'year': 2018,
        'price': 600
    },
}

def increase_price(car_no):
    if cars[car_no]['year'] > 2020:
        temp = cars[car_no]
        return {car_no: {
            'year': temp['year'],
            'price': temp['price'] + 1000
        }}
    return {car_no: cars[car_no]}

cars_mapped = map(increase_price, cars)
print(list(cars_mapped))
