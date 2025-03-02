import cherrypy
import os.path
import mako.template
import mako.lookup
import random
import datetime
import quotes

#we have modules for each page we're displaying 
import page_index
import page_signup
import page_posts
import page_test
import page_home

lookup = mako.lookup.TemplateLookup(
    directories=[
        os.path.dirname(__file__),
        f"{os.path.dirname(__file__)}/../html"
    ]
)

def getThemeForUser():
    return random.choice(["light","dark"])

names = ["Alice","Bob","Carol","Dave"]

images = ["banana.png","dino.png","fish.png",
          "frog.png","germ.png","logo.png",
          "monkey.png","pizza.png","robot.png",
          "steak.png"]

BASEDIR=os.path.abspath( os.path.dirname(__file__))

class App:
    @cherrypy.expose
    def quote(self):
        q = random.choice(quotes.quotations)
        t = lookup.get_template("quotes.html")
        return t.render(QUOTE=q)
    @cherrypy.expose
    def index(self):
        #themeName = getThemeForUser()
        #t = lookup.get_template("home.html")
        #return t.render(theme=themeName)
        return page_home.get()
    @cherrypy.expose
    def signup(self):
        return page_signup.get()
    @cherrypy.expose
    def posts(self):
        t = lookup.get_template("posts.html")
        img = []
        days = []
        hours = []
        minutes = []
        views = []
        for i in range(10):
            i = random.choice(images)
            x = datetime.timedelta(minutes=random.randrange(8000))
            hoursago = int( x.seconds / 3600 )
            minutesago = round( (x.seconds - hoursago*3600)/60 )
            v = random.randint(1,100)
            img.append(i)
            days.append(x.days)
            hours.append(hoursago)
            minutes.append(minutesago)
            views.append(v)
        return t.render(IMAGE=img,DAYS=days,HOURS=hours,MINUTES=minutes,VIEWS=views)
    @cherrypy.expose
    def test(self):
        return page_test.get()
    
    @cherrypy.expose
    def updateprofile(self):
        with open(f"{BASEDIR}/../html/updateprofile.html") as fp:
            return fp.read()

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def do_update(self, name, birthday, pic ):
        print("name is:",name)
        print("birthday is:",birthday)
        print("pic is:",pic)
        tmp = pic.file.read()
        #just print first 10 bytes
        print("pic is:",tmp[:10])
        return {"ok": True }
    
    @cherrypy.expose
    def makepost(self):
        with open(f"{BASEDIR}/../html/makepost.html") as fp:
            return fp.read()

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def update_post(self,pic,title):
        print("pic is:",pic)
        print("title is:",title)
        tmp = pic.file.read()
        #just print first 10 bytes
        print("pic is:",tmp[:10])
        return {"ok": True }

app = App()
cherrypy.quickstart(app,'/',
    {
        "/html": {
            "tools.staticdir.on": True,
            "tools.staticdir.dir": f"{os.path.dirname(__file__)}/../html"
        }
    }
)