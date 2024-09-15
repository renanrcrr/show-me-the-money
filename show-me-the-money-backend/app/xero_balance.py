from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import httpx

app = FastAPI()

XERO_API_URL = "http://xero_api:3000/api.xro/2.0/Reports/BalanceSheet"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/balancesheet")
async def get_xero_balance():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(XERO_API_URL)
            response.raise_for_status()
            return response.json()  
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Error fetching data from Xero API")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
