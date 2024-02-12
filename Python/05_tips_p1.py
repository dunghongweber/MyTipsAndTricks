################ 
# COMPREHENSION for most of things in python
################
dict_comp = {i: i * 2 for i in range(5)}
set_comp = {i%3 for i in range(5)}
list_comp = [x*3 for x in range(5)]
print(f"dict: {dict_comp} \n set: {set_comp} \n list: {list_comp}")

################ 
# shoud use ISINSTANCE to check type
# shoud use is for checking singletons
################
def check_equal(cond):
    if cond is None:
        print("None")
    if cond is True:
        print("True")
    if cond is False:
        print("False")

################ 
# NEVER check for bool or len
# because it's just a check if the variable exist
################
def bad_check(my_var):
    if bool(my_var):
        return True
    if len(my_var) != 0:
        return True
    return False
def good_check(my_var):
    if my_var:
        return True
    return False

print(good_check('s'))

################ 
# LOOP better
################
my_list = [1, 2, 3]
for item in my_list:
    print(item)

# with indexes
for indx, val in enumerate(my_list):
    print(f"item {val} is at index {indx}")

# loop 2 lists with the same length
a = [1, 2, 3]
b = [4, 5, 6]
for i, (av, bv) in enumerate(zip(a, b)):
    print(f"index {i}, value a:{av}, value b: {bv}")

# default diction loop is its keys
d = {"a": 1, "b": 2, "c": 3}
for key in d:
    print(key)


################ 
# LEARN TO USE
# - logging
# - pandas
# - numpy
################
