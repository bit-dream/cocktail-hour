from crafter import generate_drink
from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from server_secrets import email_password
from email.utils import parseaddr
from pydantic import BaseModel
from simplegmail import Gmail
from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
import json
from database import Database

app = FastAPI(root_path="/v1/api")
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

gmail = Gmail()

db = Database('database','djblack','secret', host='0.0.0.0')
db.set_table('cocktails')

@app.get('/')
def index():
    return {"Nothing is here"}

@app.get("/craft/")
async def read_item(keywords: str):
    print(f'Raw keysword search: {keywords}')

    keywords = keywords.lower()
    
    # Check to see if result has been queried before
    # if so pull from database since it's faster
    # than recomputing the recipe
    query = db.get_cocktail(keywords)
    if query is None:
        print('Search does not exist in database. Creating new entry')
        receipe = generate_drink(keywords)
        db.add_cocktail(keywords,json.dumps(receipe))
    else:
        print('Search exists in database, pulling in directly')
        receipe = query[1]

    print(receipe)
    return receipe

class Email(BaseModel):
    address: str
    subject: str
    message: str
    
@app.post("/email/", status_code=200)
async def create_item(email: Email, response: Response):

    print(email)

    email_address = "cocktailhour.tk@gmail.com"

    valid = False
    _, addr = parseaddr(email.address)
    if addr:
        if '@' in addr:
            valid = True
    
    if valid:
        try:
            # Send a message to cocktailhour.tk@gmail.com so we have our own record
            full_msg = f'Sender:{email.address}\nSubject:\n{email.subject}\nMessage:\n{email.message}'
            params = {
                "to": email_address,
                "sender": email_address,
                "subject": email.subject,
                "msg_plain": full_msg,
                "signature": False  # use my account signature
            }
            message = gmail.send_message(**params) 

            # Send a confirmation message to the sender
            full_msg = f'We have received your message. For additional inquiries, feel free to respond directly to this message.\n\nMessage:\n{email.message}'
            params = {
                "to": email.address,
                "sender": email_address,
                "subject": email.subject,
                "msg_plain": full_msg,
                "signature": False  # use my account signature
            }
            message = gmail.send_message(**params) 
        except:
            response.status_code = status.HTTP_400_BAD_REQUEST

    else:
        response.status_code = status.HTTP_400_BAD_REQUEST

    return

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)