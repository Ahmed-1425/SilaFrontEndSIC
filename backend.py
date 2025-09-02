from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import io
from PIL import Image
import uvicorn
import numpy as np
import base64

app = FastAPI(title="Sila Sign Language Recognition API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://127.0.0.1:8000"],  # Frontend URLs
    allow_methods=["*"],
    allow_headers=["*"],
)

# TODO: Load your trained AI model here
# Example: model = load_model('path/to/your/model')

# ========================================
# ADD YOUR MODEL LOADING CODE HERE
# ========================================

# Example for TensorFlow/Keras:
# from tensorflow import keras
# model = keras.models.load_model('your_model.h5')

# Example for PyTorch:
# import torch
# model = torch.load('your_model.pth')
# model.eval()

# Example for ONNX:
# import onnxruntime as ort
# model = ort.InferenceSession('your_model.onnx')

# Example for scikit-learn:
# import pickle
# with open('your_model.pkl', 'rb') as f:
#     model = pickle.load(f)

# ========================================
# END MODEL LOADING CODE
# ========================================

@app.get("/")
async def root():
    return {"message": "Sila Sign Language Recognition API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "sign-recognition"}

@app.post("/api/sign/recognize")
async def recognize_sign(request: Request):
    try:
        # Get the image data from the request body
        data = await request.body()
        
        if not data:
            return JSONResponse(
                status_code=400,
                content={"error": "No image data received"}
            )
        
        # Convert bytes to PIL Image
        img = Image.open(io.BytesIO(data)).convert("RGB")
        
        # ========================================
        # ADD YOUR IMAGE PREPROCESSING HERE
        # ========================================
        
        # Example preprocessing for common model inputs:
        # img_resized = img.resize((224, 224))  # Adjust size based on your model
        # img_array = np.array(img_resized) / 255.0  # Normalize to 0-1
        # img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        
        # ========================================
        # ADD YOUR MODEL INFERENCE HERE
        # ========================================
        
        # Example for TensorFlow/Keras:
        # prediction = model.predict(img_array)
        # predicted_class = np.argmax(prediction[0])
        # confidence = float(np.max(prediction[0]))
        
        # Example for PyTorch:
        # with torch.no_grad():
        #     input_tensor = torch.from_numpy(img_array).float()
        #     prediction = model(input_tensor)
        #     predicted_class = torch.argmax(prediction).item()
        #     confidence = float(torch.max(torch.softmax(prediction, dim=1)))
        
        # Example for ONNX:
        # input_name = model.get_inputs()[0].name
        # output_name = model.get_outputs()[0].name
        # prediction = model.run([output_name], {input_name: img_array.astype(np.float32)})
        # predicted_class = np.argmax(prediction[0])
        # confidence = float(np.max(prediction[0]))
        
        # ========================================
        # END MODEL INFERENCE CODE
        # ========================================
        
        # For now, return a placeholder response
        
        # ========================================
        # ADD YOUR CLASS MAPPING HERE
        # ========================================
        
        # Map your model's class indices to actual sign language words/phrases
        # Example:
        # class_mapping = {
        #     0: "Hello",
        #     1: "Thank you",
        #     2: "Good morning",
        #     3: "How are you?",
        #     4: "Nice to meet you",
        #     5: "Please",
        #     6: "Sorry",
        #     7: "Goodbye"
        # }
        # predicted_text = class_mapping.get(predicted_class, "Unknown sign")
        
        # For now, return a placeholder response
        import random
        sample_predictions = [
            "Hello",
            "Thank you", 
            "Good morning",
            "How are you?",
            "Nice to meet you",
            "Please",
            "Sorry",
            "Goodbye"
        ]
        
        predicted_text = random.choice(sample_predictions)
        
        return {
            "text": predicted_text,
            "confidence": 0.95,  # Replace with actual confidence from your model
            "model_version": "placeholder_v1.0"
        }
        
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"error": f"Internal server error: {str(e)}"}
        )

@app.post("/api/sign/recognize-debug")
async def recognize_sign_debug(request: Request):
    """Debug endpoint to see what's being received"""
    try:
        data = await request.body()
        content_type = request.headers.get("content-type", "unknown")
        
        return {
            "received_bytes": len(data),
            "content_type": content_type,
            "first_100_bytes": str(data[:100]),
            "message": "Debug info - check if image data is being received correctly"
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    print("Starting Sila Sign Language Recognition API...")
    print("Frontend should be running on http://localhost:8000")
    print("Backend will be available on http://127.0.0.1:8010")
    print("API endpoint: http://127.0.0.1:8010/api/sign/recognize")
    print("\nPress Ctrl+C to stop the server")
    
    uvicorn.run(
        app, 
        host="127.0.0.1", 
        port=8010,
        log_level="info"
    ) 