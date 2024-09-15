from fastapi.testclient import TestClient
from app.xero_balance import app

client = TestClient(app)

def test_get_xero_balance_status_code():
    response = client.get("/balancesheet")
    
    assert response.status_code == 200

def test_get_xero_balance_current_assets_total():
    response = client.get("/balancesheet")
    json_response = response.json()
    report = json_response.get("Reports", [{}])[0]
    
    current_assets_section = next(
        (section for section in report.get("Rows", []) if section.get("Title") == "Current Assets"), {}
    )
    total_current_assets_row = next(
        (row for row in current_assets_section.get("Rows", []) if row.get("RowType") == "SummaryRow"), {}
    )
    
    assert total_current_assets_row.get("Cells", [{}])[1].get("Value") == "2143157.64"

def test_get_xero_balance_row_existence_in_current_assets():
    response = client.get("/balancesheet")
    json_response = response.json()
    report = json_response["Reports"][0]
    
    current_assets = next(
        (section for section in report["Rows"] if section.get("Title") == "Current Assets"), 
        None
    )
    
    assert current_assets is not None, "Current Assets section not found"
    rows = [row["Cells"][0]["Value"] for row in current_assets["Rows"]]
    
    expected_rows = [
        "Accounts Receivable",
        "prepayment",
        "Provisions for Bad Debt",
        "Short Term Director Loan",
        "Stock in Hand",
        "Trade Receivables",
        "Transaction account"
    ]
    
    for expected_row in expected_rows:
        assert expected_row in rows, f"{expected_row} not found in current assets rows"
