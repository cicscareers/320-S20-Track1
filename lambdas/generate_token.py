import random
import string

def rand_token(N=64):
    return ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=N))
