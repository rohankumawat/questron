from .custom_components import QuizParser
from haystack.components.converters import HTMLToDocument
from haystack.components.fetchers import LinkContentFetcher
from haystack.components.generators import OpenAIGenerator
from haystack.components.builders import PromptBuilder
from haystack.components.websearch.serper_dev import SerperDevWebSearch

from haystack.utils import Secret
from haystack import Pipeline

# Allowed models
AVAILABLE_MODELS = {
    "llama3-8b-8192": "llama3-8b-8192",  # Default model
    "deepseek-r1-distill-llama-70b": "deepseek-r1-distill-llama-70b",
    "gemma2-9b-it": "gemma2-9b-it",
    "llama-3.3-70b-versatile": "llama-3.3-70b-versatile",
    "mistral-8x7b-32768": "mistral-8x7b-32768",
}

# quiz_generation_template = """Given the following text, create {{number_of_questions}} multiple choice quizzes in JSON format.
# Each question should have 4 different options, and only one of them should be correct.
# The options should be unambiguous.
# Each option should begin with a letter followed by a period and a space (e.g., "a. option").
# The question should also briefly mention the general topic of the text so that it can be understood in isolation.
# Each question should not give hints to answer the other questions.
# Include challenging questions, which require reasoning.

# respond with JSON only, no markdown or descriptions.

# example JSON format you should absolutely follow:
# {"topic": "a sentence explaining the topic of the text",
#  "questions":
#   [
#     {
#       "question": "text of the question",
#       "options": ["a. 1st option", "b. 2nd option", "c. 3rd option", "d. 4th option"],
#       "right_option": "c"  # letter of the right option ("a" for the first, "b" for the second, etc.)
#     }, ...
#   ]
# }

# text:
# {% for doc in documents %}{{ doc.content|truncate(4000) }}{% endfor %}
# """


# quiz_generation_pipeline = Pipeline()
# quiz_generation_pipeline.add_component("link_content_fetcher", LinkContentFetcher())
# quiz_generation_pipeline.add_component("html_converter", HTMLToDocument())
# quiz_generation_pipeline.add_component(
#     "prompt_builder", PromptBuilder(template=quiz_generation_template)
# )
# quiz_generation_pipeline.add_component(
#     "generator",
#     OpenAIGenerator(
#         api_key=Secret.from_env_var("GROQ_API_KEY"),
#         api_base_url="https://api.groq.com/openai/v1",
#         model="llama3-8b-8192",
#         generation_kwargs={"max_tokens": 1000, "temperature": 0.5, "top_p": 1},
#     ),
# )
# quiz_generation_pipeline.add_component("quiz_parser", QuizParser())

# quiz_generation_pipeline.connect("link_content_fetcher", "html_converter")
# quiz_generation_pipeline.connect("html_converter", "prompt_builder")
# quiz_generation_pipeline.connect("prompt_builder", "generator")
# quiz_generation_pipeline.connect("generator", "quiz_parser")

def create_quiz_generation_pipeline(model_name: str = "llama3-8b-8192") -> Pipeline:
    """
    Creates a quiz generation pipeline with the specified model.

    Args:
        model_name (str): The model to use for quiz generation.

    Returns:
        Pipeline: A configured Haystack pipeline.
    """
    selected_model = AVAILABLE_MODELS.get(model_name, "llama3-8b-8192")  # Default fallback

    quiz_generation_template = """Given the following text, create {{number_of_questions}} multiple choice quizzes in JSON format.
      Each question should have 4 different options, and only one of them should be correct.
      The options should be unambiguous.
      Each option should begin with a letter followed by a period and a space (e.g., "a. option").
      The question should also briefly mention the general topic of the text so that it can be understood in isolation.
      Each question should not give hints to answer the other questions.
      Include challenging questions, which require reasoning.

      respond with JSON only, no markdown or descriptions.

      example JSON format you should absolutely follow:
      {"topic": "a sentence explaining the topic of the text",
      "questions":
        [
          {
            "question": "text of the question",
            "options": ["a. 1st option", "b. 2nd option", "c. 3rd option", "d. 4th option"],
            "right_option": "c"  # letter of the right option ("a" for the first, "b" for the second, etc.)
          }, ...
        ]
      }

      text:
      {% for doc in documents %}{{ doc.content|truncate(4000) }}{% endfor %}
    """

    quiz_generation_pipeline = Pipeline()
    
    # Add components
    quiz_generation_pipeline.add_component("link_content_fetcher", LinkContentFetcher())
    quiz_generation_pipeline.add_component("html_converter", HTMLToDocument())
    quiz_generation_pipeline.add_component("prompt_builder", PromptBuilder(template=quiz_generation_template))
    quiz_generation_pipeline.add_component(
        "generator",
        OpenAIGenerator(
            api_key=Secret.from_env_var("GROQ_API_KEY"),
            api_base_url="https://api.groq.com/openai/v1",
            model=selected_model,  # Dynamically set model
            generation_kwargs={"max_tokens": 1000, "temperature": 0.5, "top_p": 1},
        ),
    )
    quiz_generation_pipeline.add_component("quiz_parser", QuizParser())

    # Connect components
    quiz_generation_pipeline.connect("link_content_fetcher", "html_converter")
    quiz_generation_pipeline.connect("html_converter", "prompt_builder")
    quiz_generation_pipeline.connect("prompt_builder", "generator")
    quiz_generation_pipeline.connect("generator", "quiz_parser")

    return quiz_generation_pipeline