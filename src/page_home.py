import random
import mako.template
import os.path

srcdir = os.path.dirname(__file__)

names = ["Alice","Bob","Carol","Dave"]

def get():
    n = random.choice(names)
    T = mako.template.Template(filename=f"{srcdir}/../html/home.html")
    return T.render(NAME=n)