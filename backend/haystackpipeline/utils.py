from .pipelines import quiz_generation_pipeline
from typing import Dict, Any, List, Tuple
import random


def generate_quiz(url: str) -> Dict[str, Any]:
    return quiz_generation_pipeline.run({"link_content_fetcher": {"urls": [url]}})[
        "quiz_parser"
    ]["quiz"]

# response = generate_quiz("https://en.wikipedia.org/wiki/Barcelona")

# print(response)