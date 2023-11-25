import cv2
import numpy as np
import sys

def detect_faces(image_data):
    print("Received image data on stdin:", image_data[:50])  # Print the first 50 bytes

    # Convert image data to numpy array

    nparr = np.frombuffer(image_data, np.uint8)

    try:
        # Attempt to decode the image
        img = cv2.imread("./download.jpeg",0)
        invImg = cv2.bitwise_not(img) # equivalent to 255-img
        img_str = cv2.imencode('.jpg', invImg )[1] 
        image = cv2.imdecode(img_str, cv2.IMREAD_COLOR)
        # image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if image is not None:
            print("Image decoded successfully.")
            
            # Use a pre-trained face detection classifier
            face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

            # Convert the image to grayscale
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

            # Detect faces in the image
            faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

            return len(faces)
        else:
            print("Error decoding image: Decoded image is None.")
    except Exception as e:
        print("Error decoding image:", str(e))

    return 0

if __name__ == "__main__":
    # Read all input data from stdin
    try:
        image_data = sys.stdin.buffer.read()
    except EOFError:
        print("Error reading input data.")

    # Perform face detection
    num_faces = detect_faces(image_data)

    # Print the result to stdout
    print(num_faces)
    sys.stdout.flush()
