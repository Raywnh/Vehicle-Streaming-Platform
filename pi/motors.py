import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)

TSTANDBY = 3

TLIN1 = 8
TLIN2 = 10
TLPWM = 12

TRIN1 = 16
TRIN2 = 18
TRPWM = 32

GPIO.setup(TSTANDBY, GPIO.OUT)

GPIO.setup(TLIN1, GPIO.OUT)
GPIO.setup(TLIN2, GPIO.OUT)
GPIO.setup(TLPWM, GPIO.OUT)
tlpwm = GPIO.PWM(TLPWM, 5000)

GPIO.setup(TRIN1, GPIO.OUT)
GPIO.setup(TRIN2, GPIO.OUT)
GPIO.setup(TRPWM, GPIO.OUT)
trpwm = GPIO.PWM(TRPWM, 5000)

def forward():
        GPIO.output(TSTANDBY, 1)

        GPIO.output(TLIN1, 1)
        GPIO.output(TLIN2, 0)
        GPIO.output(TRIN1, 0)
        GPIO.output(TRIN2, 1)

def backward():
        GPIO.output(TSTANDBY, 1)

        GPIO.outpu      t(TLIN1, 0)
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

try:
        while True:
                tlpwm.start(100)
                trpwm.start(100)
                backward()
except:
        tlpwm.stop()
        trpwm.stop()
finally:
        GPIO.cleanup()


                                                                                                                                                                                                          
