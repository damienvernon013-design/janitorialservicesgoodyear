const CRM_ENDPOINT = "https://thequotemasters.com/crm_api/api.php?action=push_lead";
const INDUSTRY_ID = 23;

const SERVICE_QUESTION_ID = "1";
const SERVICE_ANSWER_IDS = {
  "Nightly Janitorial Service": "101",
  "Day Porter & Restroom Service": "102",
  "Floor Stripping & Waxing": "103",
  "Not sure — need guidance": "104",
};

function splitName(fullName) {
  const trimmed = (fullName || "").trim();
  if (!trimmed) return { first_name: "", last_name: "" };
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { first_name: parts[0], last_name: "" };
  return { first_name: parts[0], last_name: parts.slice(1).join(" ") };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.CRM_API_TOKEN;
  if (!token) {
    console.error("CRM_API_TOKEN is not configured");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const body = req.body || {};
  const {
    first_name,
    last_name,
    business,
    phone,
    email,
    zip,
    sqft,
    service,
    notes,
    utm_source,
  } = body;

  const nameFields =
    first_name || last_name
      ? { first_name: first_name || "", last_name: last_name || "" }
      : splitName(body.name);

  if (!nameFields.first_name || !phone || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const noteParts = [];
  if (sqft) noteParts.push(`Sq ft: ${sqft}`);
  if (notes) noteParts.push(notes);

  const questions = [];
  if (service && SERVICE_ANSWER_IDS[service]) {
    questions.push({
      question_id: SERVICE_QUESTION_ID,
      answer_id: SERVICE_ANSWER_IDS[service],
    });
  }

  const payload = {
    zip: zip || "",
    customer: {
      company_name: business || "",
      first_name: nameFields.first_name,
      last_name: nameFields.last_name,
      position: "",
      phone,
      email,
      email2: "",
      address: "",
      service_address: "",
      notes: noteParts.join(" | "),
    },
    industry: INDUSTRY_ID,
    questions,
    appointments: [],
    number_of_quotes: "1",
    utm_source: utm_source || "",
  };

  try {
    const crmResponse = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await crmResponse.text();

    if (!crmResponse.ok) {
      console.error("CRM push_lead failed", crmResponse.status, text);
      return res.status(502).json({ error: "Failed to submit lead" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("CRM push_lead error", err);
    return res.status(502).json({ error: "Failed to submit lead" });
  }
};
