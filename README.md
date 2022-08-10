# Lil' Open AI demo
This takes test content as input and spits out a multiple choice question test.

- Test content limited to about 4000 characters about
- This demonstrates how to use OpenAI using a mini-pipeline approach
- Uses 2-step approach in determine the final test output
- This can be further "trained" to optimize cost using a prompt training model
- Some of the manual coding can most likely be removed and be replaced with further OpenAI steps

### Installation
1. install deno: https://deno.land/manual/getting_started/installation
1. clone this project locally
1. on your command line, export `OPENAI_API_KEY` env variable with a valid OpenAI API Key
1. Go into the cloned project directory then run the following command
```
deno task start
```
1. View http://localhost:8000
1. Find some test content within 4000 characters about
