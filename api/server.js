import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import whois from 'whois';

const execAsync = promisify(exec);
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Paths to tools
const SHERLOCK_PATH = path.join(process.cwd(), '..', 'referance', 'sherlock');
const INSPECTOR_PATH = path.join(process.cwd(), '..', 'referance', 'Inspector', 'core');

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'OSINT API is running' });
});

// Sherlock integration for social media enumeration
app.post('/api/sherlock', async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    console.log(`Running Sherlock analysis for username: ${username}`);
    
    // Run Sherlock command
    const command = `cd "${SHERLOCK_PATH}" && python -m sherlock_project "${username}" --json --timeout 10`;
    const { stdout, stderr } = await execAsync(command, { timeout: 60000 });
    
    // Parse Sherlock output
    let results = [];
    try {
      // Sherlock outputs JSON format when --json flag is used
      const lines = stdout.split('\n').filter(line => line.trim());
      results = lines.map(line => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      }).filter(result => result !== null);
    } catch (parseError) {
      console.error('Error parsing Sherlock output:', parseError);
      // Fallback: parse text output
      results = parseSherlockTextOutput(stdout);
    }

    res.json({
      success: true,
      username,
      timestamp: new Date().toISOString(),
      results: results,
      total_sites: results.length,
      found_profiles: results.filter(r => r.status === 'found').length
    });

  } catch (error) {
    console.error('Sherlock error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to run Sherlock analysis',
      details: error.message
    });
  }
});

// WHOIS integration for domain analysis
app.post('/api/whois', async (req, res) => {
  try {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    console.log(`Running WHOIS analysis for domain: ${domain}`);
    
    // Clean domain (remove protocol, www, etc.)
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    
    const whoisData = await new Promise((resolve, reject) => {
      whois.lookup(cleanDomain, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    // Parse WHOIS data
    const parsedData = parseWhoisData(whoisData);

    res.json({
      success: true,
      domain: cleanDomain,
      timestamp: new Date().toISOString(),
      whois_data: parsedData,
      raw_whois: whoisData
    });

  } catch (error) {
    console.error('WHOIS error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to run WHOIS analysis',
      details: error.message
    });
  }
});

// Inspector integration for phone number analysis
app.post('/api/inspector', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    console.log(`Running Inspector analysis for phone: ${phone}`);
    
    // Run Inspector command
    const command = `cd "${INSPECTOR_PATH}" && python inspector.py "${phone}"`;
    const { stdout, stderr } = await execAsync(command, { timeout: 30000 });
    
    // Parse Inspector output
    const results = parseInspectorOutput(stdout);

    res.json({
      success: true,
      phone,
      timestamp: new Date().toISOString(),
      results: results,
      raw_output: stdout
    });

  } catch (error) {
    console.error('Inspector error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to run Inspector analysis',
      details: error.message
    });
  }
});

// Helper function to parse Sherlock text output
function parseSherlockTextOutput(output) {
  const results = [];
  const lines = output.split('\n');
  
  for (const line of lines) {
    if (line.includes('[+]') || line.includes('[-]')) {
      const isFound = line.includes('[+]');
      const siteName = line.split(':')[0].replace(/\[[\+\-]\]\s*/, '').trim();
      const url = line.split(' ')[1] || '';
      
      results.push({
        site: siteName,
        status: isFound ? 'found' : 'not_found',
        url: url,
        response_time: null
      });
    }
  }
  
  return results;
}

// Helper function to parse WHOIS data
function parseWhoisData(whoisText) {
  const data = {};
  const lines = whoisText.split('\n');
  
  for (const line of lines) {
    if (line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      if (key && value) {
        const cleanKey = key.trim().toLowerCase().replace(/\s+/g, '_');
        data[cleanKey] = value;
      }
    }
  }
  
  return {
    registrar: data.registrar || data['registrar name'] || 'N/A',
    creation_date: data['creation date'] || data['created on'] || data['registered on'] || 'N/A',
    expiration_date: data['expiration date'] || data['expires on'] || data['expiry date'] || 'N/A',
    updated_date: data['updated date'] || data['last modified'] || 'N/A',
    name_servers: extractNameServers(whoisText),
    registrant_org: data['registrant organization'] || data['registrant'] || 'N/A',
    admin_email: data['admin email'] || data['administrative contact email'] || 'N/A',
    tech_email: data['tech email'] || data['technical contact email'] || 'N/A',
    status: extractDomainStatus(whoisText)
  };
}

// Helper function to extract name servers
function extractNameServers(whoisText) {
  const nameServers = [];
  const lines = whoisText.split('\n');
  
  for (const line of lines) {
    if (line.toLowerCase().includes('name server') || line.toLowerCase().includes('nserver')) {
      const parts = line.split(':');
      if (parts.length > 1) {
        nameServers.push(parts[1].trim());
      }
    }
  }
  
  return nameServers;
}

// Helper function to extract domain status
function extractDomainStatus(whoisText) {
  const statusLines = whoisText.split('\n').filter(line => 
    line.toLowerCase().includes('status') && !line.toLowerCase().includes('registry')
  );
  
  return statusLines.map(line => line.split(':')[1]?.trim()).filter(Boolean);
}

// Helper function to parse Inspector output
function parseInspectorOutput(output) {
  const results = {
    phone_info: {},
    social_media: {},
    reputation: {},
    carrier_info: {}
  };
  
  const lines = output.split('\n');
  let currentSection = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Detect sections
    if (trimmedLine.includes('Ignorant Modules')) {
      currentSection = 'social_media';
    } else if (trimmedLine.includes('Free-lookup.net')) {
      currentSection = 'reputation';
    }
    
    // Parse results based on Inspector's output format
    if (trimmedLine.includes('[+]')) {
      const info = trimmedLine.replace('[+]', '').trim();
      if (currentSection === 'social_media') {
        results.social_media[extractPlatform(info)] = 'found';
      } else if (currentSection === 'reputation') {
        results.reputation[extractInfoType(info)] = info;
      }
    } else if (trimmedLine.includes('[-]')) {
      const info = trimmedLine.replace('[-]', '').trim();
      if (currentSection === 'social_media') {
        results.social_media[extractPlatform(info)] = 'not_found';
      }
    }
  }
  
  return results;
}

// Helper functions for Inspector parsing
function extractPlatform(info) {
  if (info.toLowerCase().includes('instagram')) return 'instagram';
  if (info.toLowerCase().includes('amazon')) return 'amazon';
  return 'unknown';
}

function extractInfoType(info) {
  if (info.toLowerCase().includes('carrier')) return 'carrier';
  if (info.toLowerCase().includes('location')) return 'location';
  if (info.toLowerCase().includes('type')) return 'line_type';
  return 'other';
}

// Start server
app.listen(PORT, () => {
  console.log(`OSINT API server running on port ${PORT}`);
  console.log(`Sherlock path: ${SHERLOCK_PATH}`);
  console.log(`Inspector path: ${INSPECTOR_PATH}`);
});