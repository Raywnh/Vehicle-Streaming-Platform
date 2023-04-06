

from flask import Flask, redirect, url_for, request, render_template, Response, jsonify
import cv2
import json
import numpy as np
from flask_cors import CORS
from subprocess import call
import os
import subprocess

app=Flask(__name__)
CORS(app)

recognizer = cv2.face.LBPHFaceRecognizer_create()
try: 
    recognizer.read('./trainer/trainer.yml')
except IOError:
    print("Could not open/read file:")

cascadePath = "haarcascade_frontalface_default.xml"
faceCascade = cv2.CascadeClassifier(cascadePath);
font = cv2.FONT_HERSHEY_SIMPLEX
#iniciate id counter
id = 0
# names related to ids: example ==> Marcelo: id=1,  etc
names = ['Martin', 'Kenn', 'Ian', 'Daniel', 'Ray', 'Participant'] 
# Initialize and start realtime video capture
cam = cv2.VideoCapture("http://192.168.8.185/html/cam_pic_new.php")
cam.set(3, 640) # set video widht
cam.set(4, 480) # set video height
# Define min window size to be recognized as a face
minW = 0.1*cam.get(3)
minH = 0.1*cam.get(4)

webcam = cv2.VideoCapture(0)
webcam.set(3, 640) # set video widht
webcam.set(4, 480) # set video height

faces_detected = set()

def gen_frames():  
    global faces_detected
    faces_detected = set()
    recognizer.read('./trainer/trainer.yml')
    while True:
        ret, img = cam.read()
        if ret == True:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = faceCascade.detectMultiScale( 
                gray,
                scaleFactor = 1.2,
                minNeighbors = 5,
                minSize = (int(minW), int(minH)),
                )
            for(x,y,w,h) in faces:
                cv2.rectangle(img, (x,y), (x+w,y+h), (0,255,0), 2)
                id, confidence = recognizer.predict(gray[y:y+h,x:x+w])
                # Check if confidence is less them 100 ==> "0" is perfect match 
                if (confidence < 100):
                    try:
                        id = names[id]
                    except IndexError:
                        id = "unknown"
                    confidence = "  {0}%".format(round(100 - confidence))
                else:
                    id = "unknown"
                    confidence = "  {0}%".format(round(100 - confidence))
                
                cv2.putText(img, str(id), (x+5,y-5), font, 1, (255,255,255), 2)
                cv2.putText(img, str(confidence), (x+5,y+h-5), font, 1, (255,255,0), 1)
                faces_detected.add(str(id))

            img = cv2.flip(img, 1) # Flip vertically
            img = cv2.flip(img, 0) # Flip vertically
            ret, buffer = cv2.imencode('.jpg', img)
            img = buffer.tobytes()
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')
            
def webcam_frames():  
    global faces_detected
    faces_detected = set()
    recognizer.read('./trainer/trainer.yml')
    while True:
        ret, img = webcam.read()
        if ret == True:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = faceCascade.detectMultiScale( 
                gray,
                scaleFactor = 1.2,
                minNeighbors = 5,
                minSize = (int(minW), int(minH)),
                )
            for(x,y,w,h) in faces:
                cv2.rectangle(img, (x,y), (x+w,y+h), (0,255,0), 2)
                id, confidence = recognizer.predict(gray[y:y+h,x:x+w])
                # Check if confidence is less them 100 ==> "0" is perfect match 
                if (confidence < 100):
                    try:
                        id = names[id]
                    except IndexError:
                        id = "unknown"
                    confidence = "  {0}%".format(round(confidence))
                else:
                    id = "unknown"
                    confidence = "  {0}%".format(round(confidence))
                
                cv2.putText(img, str(id), (x+5,y-5), font, 1, (255,255,255), 2)
                cv2.putText(img, str(confidence), (x+5,y+h-5), font, 1, (255,255,0), 1)
                faces_detected.add(str(id))

            img = cv2.flip(img, 0) # Flip vertically
            img = cv2.flip(img, 1) # Flip vertically
            ret, buffer = cv2.imencode('.jpg', img)
            img = buffer.tobytes()
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')  


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/webcam_feed')
def webcam_feed():
    return Response(webcam_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/face')
def return_face():
    global faces_detected
    return jsonify({'faces': json.dumps(list(faces_detected))})

@app.route('/data')
def dataset():
    print("success data backend")
    subprocess.call(['python', 'face_dataset.py'])
    return '', 204

@app.route('/name', methods=['POST'])
def name():
    data = request.get_json()
    names.append(data)
    print(names)
    return '', 204

@app.route('/train')
def train():
    print("success train backend")
    subprocess.call(['python', 'face_training.py'])
    return '', 204


if __name__=='__main__':
    app.run(host='0.0.0.0', port=8080, threaded=True, use_reloader=False)


