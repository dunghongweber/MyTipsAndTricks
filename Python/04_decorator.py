################ 
# DECORATOR
# wrap a function outside another function
################
import time

def tictok(func):
    def wrapper():
        t1 = time.time()
        func()
        t2 = time.time() - t1
        print(f"function {func.__name__} ran in {t2}")
    return wrapper

@tictok
def do_this():
    time.sleep(3)

@tictok
def do_that():
    print(f"result of 3 + 5 is: {3+5}")
    time.sleep(2)

do_this()
do_that()
"""
function do_this ran in 3.0012378692626953
result of 3 + 5 is: 8
function do_that ran in 2.001617193222046
"""
