import os
os.environ["HAYSTACK_TELEMETRY_ENABLED"] = "False" # Disable usage statistics and telemetry (bcoz of AWS Lambda)
os.environ["HAYSTACK_TELEMETRY_PATH"] = "/tmp/haystack" # Set the path for telemetry data (bcoz of AWS Lambda)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from haystackpipeline.utils import generate_quiz # import the generate_quiz function
from mangum import Mangum

# Create FastAPI instance
app = FastAPI(
    title="Quiz Generator API",
    description="An API to upload links and generate questionnaires using AI",
    version="0.1"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.post("/link", description="Upload a link to generate a questionnaire")
# def upload_link(link: str):
#     return JSONResponse(content={"link": link}, status_code=200)

class URLInput(BaseModel):
    url: str
    number_of_questions: int = 5  # field for the number of questions

@app.post("/generate-quiz", description="Generate a quiz from a given URL")
async def generate_quiz_endpoint(input: URLInput):
    try:
        # Debugging: log the URL received
        print(f"Received URL: {input.url}, Number of Questions: {input.number_of_questions}")
        
        # Call the generate_quiz function with the provided URL
        quiz_data = generate_quiz(input.url, input.number_of_questions)
        
        # Debugging: log the quiz data
        print(f"Generated quiz: {quiz_data}")
        
        # Check if the quiz data is valid
        if not quiz_data:
            raise HTTPException(status_code=500, detail="Quiz generation failed or returned empty data.")
        
        # Return the generated quiz data in the response
        return JSONResponse(content=quiz_data, status_code=200)
    
    except Exception as e:
        # Handle any exceptions that might occur during quiz generation
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating quiz: {str(e)}")

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Quiz Generator API"}

handler = Mangum(app=app)