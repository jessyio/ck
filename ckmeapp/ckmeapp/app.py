from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

DB = SQLAlchemy()
APP = Flask(__name__)

APP.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///db.sqlite3'
APP.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

DB.init_app(APP)
# Set up the main route
@APP.route('/')
def main():
        return render_template('home.html')

# Set up the about page
@APP.route('/about')
def about():
        return render_template('about.html')

# Set up the submit eth tx page
@APP.route('/predict/', methods=['GET','POST'])
def predict():
    
    if request.method == 'POST':
        # Get form data
        pk = request.form.get('privatekey')
        sgxendpt = request.form.get('sgxendpt')
        
        #call preprocessDataAndPredict and pass inputs
        try:
            prediction = preprocessDataAndMint(pk, sgxendpt)
            
            #pass prediction to template
            return render_template('predict.html', prediction = prediction)
   
        except ValueError:
            return "Please Enter valid values"
    pass
pass
 

'''
@APP.route('/mint')
def about():
        return render_template('mint.html')

def preprocessDataAndMint(pk, sgxendpt):
    return render_template('mint.html')
pass
'''
        
if __name__ == '__main__':
    APP.run()