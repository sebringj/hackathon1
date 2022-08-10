# Lil' OpenAI Experiment
This takes test content as input and spits out a multiple choice question test.

- Test content limited to about 4000 characters
- This demonstrates how to use OpenAI using a mini-pipeline approach
- Uses 2-step approach to determine the final test output
- This can be further "trained" to optimize cost using a prompt training model
- Some of the manual coding can most likely be removed and be replaced with further OpenAI steps

### Installation
1. Install deno: https://deno.land/manual/getting_started/installation
2. Clone this project locally
3. On your command line, export `OPENAI_API_KEY` env variable with a valid OpenAI API Key
4. Go into the cloned project directory then run the following command
```
deno task start
```
5. View http://localhost:8000
6. Find some test content within 4000 characters about
