import socket
import time
import threading
import RPi.GPIO as GPIO

key = "b"

# Set the key variable to the default value "b"
GPIO.setmode(GPIO.BOARD)

TSTANDBY = 3

# Define the pins used for the left motor
TRIN1 = 8
TRIN2 = 10
TRPWM = 12

# Define the pins used for the right motor
TRIN1 = 16
TRIN2 = 18
TRPWM = 32

# Set up the pins for the standby and PWM signals for both motors
GPIO.setup(TSTANDBY, GPIO.OUT)

GPIO.setup(TLIN1, GPIO.OUT)
GPIO.setup(TLIN2, GPIO.OUT)
GPIO.setup(TLPWM, GPIO.OUT)
tlpwm = GPIO.PWM(TLPWM, 5000)

GPIO.setup(TRIN1, GPIO.OUT)
GPIO.setup(TRIN2, GPIO.OUT)
GPIO.setup(TRPWM, GPIO.OUT)
trpwm = GPIO.PWM(TRPWM, 5000)

# Define a function to listen for keyboard input from the backend server
def key_listener():
    global key
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    reconnect(sock)
    
    while True:
        time.sleep(0.1)
        sock.send(b"GET /key HTTP/1.1\r\nhttp://localhost:8000/\r\n\r\n") # Send get request for keyboard input
        response = sock.recv(1024).decode("utf-8") # Decodes json format as string
        key = response[len(response) - 3] # get key input
       
        if not response:
            break
    sock.close()

# Define a function to handle reconnecting to the backend server in case of disconnection
def reconnect(sock):
    while True:
        try:
            sock.connect(("localhost", 8000)) # Establish permanent connection to backend server
            return;
        except:
            pass
# Define a function to convert keyboard input to motor movement
def input_to_movement():
    global key # Global variable to read same variable being changed by the other thread
    try:
        while True:
            tlpwm.start(100)
            trpwm.start(100)
            if key == "w":
                forward()
            elif key == "a":
                left()
            elif key == "s":
                backward()
            elif key == "d":
                right()
            else: 
                brake()
    except:
        tlpwm.stop()
        trpwm.stop()
    finally:
        GPIO.cleanup()

# Define functions for each type of motor movement
def brake():
    GPIO.output(TSTANDBY, 0)

    GPIO.output(TLIN1, 0)
    GPIO.output(TLIN2, 0)
    GPIO.output(TRIN1, 0)
    GPIO.output(TRIN2, 0)
def forward():
    GPIO.output(TSTANDBY, 1)

    GPIO.output(TLIN1, 1)
    GPIO.output(TLIN2, 0)
    GPIO.output(TRIN1, 0)
    GPIO.output(TRIN2, 1)

def backward():
    GPIO.output(TSTANDBY, 1)

    GPIO.output(TLIN1, 0)
    GPIO.output(TLIN2, 1)
    GPIO.output(TRIN1, 1)
    GPIO.output(TRIN2, 0)
def left():
    GPIO.output(TSTANDBY, 1)

    GPIO.output(TLIN1, 1)
    GPIO.output(TLIN2, 0)
    GPIO.output(TRIN1, 1)
    GPIO.output(TRIN2, 0)
def right():
    GPIO.output(TSTANDBY, 1)

    GPIO.output(TLIN1, 0)
    GPIO.output(TLIN2, 1)
    GPIO.output(TRIN1, 0)
    GPIO.output(TRIN2, 1)

if __name__ == '__main__':
    listener_thread = threading.Thread(target=key_listener, args=()) # key_listeneer function starts as a separate thread
    listener_thread.daemon = True # Set daemon to true so we can exit the program and kill the thread on Ctrl + C
    listener_thread.start() # Start thread
    input_to_movement() # Run input_to_movement function as a main loop
