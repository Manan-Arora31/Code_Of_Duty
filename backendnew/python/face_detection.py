import sys
import numpy as np
import cv2

if len(sys.argv) != 2:
    print("Usage: python script.py <image_path>")
    sys.exit(1)

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_alt.xml')

# print(sys.argv[1])
image_name = sys.argv[1]
image = cv2.imread('../uploads/' + image_name)

if image is None:
    print("Error: Unable to read the image.")
    sys.exit(1)

grayImage = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

faces = face_cascade.detectMultiScale(grayImage)

if len(faces) == 0:
    print("No faces found")
else:
    print("Number of faces detected: " + str(faces.shape[0]))
