from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

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

@app.post("/link", description="Upload a link to generate a questionnaire")
def upload_link(link: str):
    return JSONResponse(content={"link": link}, status_code=200)

# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to the Quiz Generator API"}
