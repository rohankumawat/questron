from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.haystackpipeline.utils import generate_quiz # import the generate_quiz function

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

# POST endpoint to accept a link and generate a questionnaire
@app.post("/link", description="Upload a link to generate a questionnaire")
def upload_link(link: str):
    try:
        # Debugging: log the link received
        print(f"Received link: {link}")
        
        # Call the generate_quiz function with the provided link
        quiz_data = generate_quiz(link)
        
        # Debugging: log the quiz data
        print(f"Generated quiz: {quiz_data}")
        
        # # Check if the quiz data is valid
        # if not quiz_data.get('quiz'):
        #     raise HTTPException(status_code=500, detail="Quiz generation failed or returned empty data.")
        
        # Return the generated quiz data in the response
        return JSONResponse(content=quiz_data, status_code=200)
    
    except Exception as e:
        # Handle any exceptions that might occur during quiz generation
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating quiz: {str(e)}")

# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to the Quiz Generator API"}
