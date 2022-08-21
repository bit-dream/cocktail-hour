from cocktail_creator import generate_drink_recipe
from crafter import generate_drink
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def index():
    return {"Nothing is here"}

@app.get("/craftdrink/")
async def read_item(keywords: str):
    print(f'Raw keysword search: {keywords}')
    receipe = generate_drink(keywords)
    return receipe

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)