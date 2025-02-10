from .pipelines import create_quiz_generation_pipeline
from typing import Dict, Any, List, Tuple
import random


def generate_quiz(url: str, number_of_questions: int, model: str = "llama3-8b-8192") -> Dict[str, Any]:
    """
    Generates a quiz from the given URL with the specified number of questions.
    
    Args:
        url (str): The URL to fetch content from.
        number_of_questions (int): The number of questions to generate in the quiz.
        
    Returns:
        Dict[str, Any]: A dictionary representing the quiz.
    """

    quiz_generation_pipeline = create_quiz_generation_pipeline(model)  # Use selected model

    return quiz_generation_pipeline.run(
        {
            "prompt_builder": {"number_of_questions": number_of_questions},
            "link_content_fetcher": {"urls": [url]}
        })[
        "quiz_parser"
    ]["quiz"]

# response = generate_quiz("https://en.wikipedia.org/wiki/Barcelona")

# print(response)