# PC Inventory Reconciliation - Step by Step Process

## Workflow Summary

1. **Upload Item Buy Detail** (DRS Excel report - 18 months of purchases)
2. **Upload Precount** (CSV of what DRS thinks is on hand)
3. **Collect Store Scans** → Match against Precount → Identify missing items (97% have QOH=0)
4. **Review Missing Items** → Accept as write-off, skip, or bulk accept all
5. **Generate Barcodes** → Format 5×22 grid → Print → Scan in DRS Adjust Out to Zero

---

## Step 1: Upload Item Buy Detail

- **Source:** DRS "Item Buy Detail" report (last 18 months)
- **File:** `Item Buy Detail Aug124-April142026.xlsx` (Excel format)
- **Important:** First column header says "Ski" but actually means "SKU"
- **Contents:** Every item bought in the store for the specified time period
- **Key columns:**
  - SKI (SKU)
  - Brand Description
  - Model
  - Description
  - Buy Date
  - QOH (Quantity on Hand)
  - DRS Cost
  - DRS Retail

> Note: ~172,860 items in system inventory

---

## Step 2: Upload Precount File

- **File:** `Precount.001` (CSV format)
- **Contents:** Basic CSV with a list of every SKU in the target subcategory
- **Purpose:** Shows what DRS inventory system believes are on hand

---

## Step 3: Collect Store Scans

- **File:** `BShortsPhysicalCountRev3.csv` (or similar)
- **Format:** CSV with no header row
- **Column 1:** SKU that was scanned
- **Column 2:** Marks beginning and end of count zones

### Process After Collection:

1. **Create subset:** Match Precount items against Item Buy Detail - create a subset containing only items that appear in BOTH files

2. **Compare scans:** Compare the scanned file against that subset by matching Precount items to Item Buy Detail

3. **Analyze "missing" items:**
   - 97% of "missing" items have QOH = 0
   - This means DRS already shows them as sold/gone
   - They're in Precount because DRS thought they were there at some point, but they're no longer in inventory

4. **Handle scanned items not in Item Buy Detail:**
   - Some scanned items may NOT be in Item Buy Detail (too old to capture in the date filter)
   - These need to have inventory OH increased to account for them
   - **Do this AFTER the other matching steps** - hold this for another step

---

## Step 4: Review Missing Items

- **Purpose:** Review items flagged as missing/ discrepancies
- **Display format:** Scrollable SKU list showing:
  - SKU
  - Description/Brand
  - Date bought
  - DRS Cost

- **User actions per item:**
  - **Accept as writeoff:** Mark item as written off (loss)
  - **Skip:** Keep item in inventory (don't write off)
  - **Trust the process:** Bulk accept all items as writeoffs without reviewing individually

> Note: This is the routine that will need to be built later - a scrollable interface for review

---

## Step 5: Barcode Generation

1. **User downloads:** `shorts-writeoff-list.csv` (list of SKUs approved for write-off)

2. **User uploads:** SKU list to [barcodegenerator.tech](https://barcodegenerator.tech)
   - Format: Code128
   - Size: 300x100 PNG

3. **User downloads:** ZIP file → uploads to Blair

4. **Blair formats:** Arrange barcodes in 5×22 grid (91 barcodes per page)

5. **User prints:** Downloadable formatted PDF

6. **User scans in DRS:** Use barcode scanner to perform "Adjust Out to Zero" for each item

---

## Steps to be continued...