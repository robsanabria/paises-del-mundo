// backend/src/server.js
const express = require("express");
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const FlexSearch = require("flexsearch");

const app = express();

// Global variables to persist between calls in Serverless
let index;
let countriesData = [];
let initialized = false;

// --- Init ---
async function initializeIndex() {
  if (initialized) return;
  console.log('Initializing FlexSearch index...');
  
  index = new FlexSearch.Document({
    document: {
      id: "id",
      index: ["Country", "Region"],
      store: true
    },
    encode: str => typeof str === 'string' ? str.toLowerCase() : str,
    tokenize: "strict",
    cache: true
  });

  const filePath = path.join(__dirname, '..', 'data', 'countries.csv');
  const records = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ',', mapHeaders: ({ header }) => header.trim() }))
      .on('data', (data) => {
        const formattedData = { id: records.length };
        for (const key in data) {
          const trimmedKey = key.trim();
          let value = data[key].trim();
          if (value !== '' && !isNaN(value.replace(',', '.'))) {
            formattedData[trimmedKey] = parseFloat(value.replace(',', '.'));
          } else if (!value) {
            formattedData[trimmedKey] = null;
          } else {
            formattedData[trimmedKey] = value;
          }
        }
        index.add(formattedData);
        countriesData.push(formattedData);
        records.push(formattedData);
      })
      .on('end', () => {
        console.log(`✅ FlexSearch Index initialized with ${records.length} countries.`);
        initialized = true;
        resolve();
      })
      .on('error', reject);
  });
}

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.get('/api/status', async (req, res) => {
  await initializeIndex();
  res.status(200).json({ status: 'API running', indexedDocuments: countriesData.length });
});

app.get("/api/search", async (req, res) => {
  await initializeIndex();
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(200).json({ results: [] }); 
  }

  try {
    const searchResults = index.search(q, { 
      index: ["Country", "Region"], 
      limit: 25 
    });

    const uniqueIds = new Set();
    searchResults.forEach(fieldResult => {
      fieldResult.result.forEach(docId => uniqueIds.add(docId));
    });

    const finalResults = Array.from(uniqueIds)
      .map(id => countriesData[id])
      .filter(Boolean);

    const lowerCaseQuery = q.toLowerCase();
    const postFilteredResults = finalResults.filter(country => 
      (country.Country?.toLowerCase().includes(lowerCaseQuery)) ||
      (country.Region?.toLowerCase().includes(lowerCaseQuery))
    );

    res.status(200).json({ results: postFilteredResults });

  } catch (error) {
    console.error("❌ Search error:", error);
    res.status(500).json({ error: "Search failed" });
  }
});

// --- Vercel handler ---
module.exports = app;