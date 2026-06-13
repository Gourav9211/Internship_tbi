export interface College {
  id: string;
  name: string;
  type: "IIT" | "NIT" | "IIIT" | "GFTI" | "STATE_GOVT" | "PRIVATE";
  state: string;
  city: string;
  tier: 1 | 2 | 3;
  averagePackage: number; // in LPA
  medianPackage: number; // in LPA
  annualFees: number; // in INR
  hostelFees: number; // in INR
  placementRate: number; // in %
  rating: number; // 1 to 5 stars
}

export interface CollegeChoice {
  id: string;
  institute: string;
  branch: string;
  type: "IIT" | "NIT" | "IIIT" | "GFTI" | "STATE_GOVT" | "PRIVATE";
  state: string;
  baseCutoff: number;
}

export const branchesList = [
  "Computer Science & Engineering",
  "Data Science & AI",
  "Information Technology",
  "Software Engineering",
  "Mathematics & Computing",
  "Electronics & Communication",
  "Electrical & Electronics",
  "Instrumentation & Control",
  "Mechanical Engineering",
  "Aerospace Engineering",
  "Chemical Engineering",
  "Civil Engineering",
  "Metallurgical & Materials",
  "Production & Industrial",
  "Biotechnology & Bioengineering"
];

// Helper to generate realistic stats based on type and tier
function generateStats(type: string, tier: number, name: string) {
  let averagePackage = 5.0;
  let annualFees = 80000;
  let hostelFees = 20000;
  let placementRate = 70;
  let rating = 3;

  if (type === "IIT") {
    averagePackage = tier === 1 ? 21.5 : 15.0;
    annualFees = 220000;
    hostelFees = tier === 1 ? 32000 : 28000;
    placementRate = tier === 1 ? 95 : 88;
    rating = tier === 1 ? 5 : 4;
  } else if (type === "NIT") {
    averagePackage = tier === 1 ? 16.5 : tier === 2 ? 10.5 : 7.5;
    annualFees = 150000;
    hostelFees = 30000;
    placementRate = tier === 1 ? 92 : tier === 2 ? 82 : 75;
    rating = tier === 1 ? 4.5 : tier === 2 ? 4.0 : 3.5;
  } else if (type === "IIIT") {
    averagePackage = tier === 1 ? 18.0 : tier === 2 ? 11.0 : 8.0;
    annualFees = 240000;
    hostelFees = 45000;
    placementRate = tier === 1 ? 94 : tier === 2 ? 85 : 78;
    rating = tier === 1 ? 4.5 : tier === 2 ? 4.0 : 3.5;
  } else if (type === "GFTI") {
    averagePackage = tier === 1 ? 11.5 : tier === 2 ? 7.8 : 5.8;
    annualFees = 95000;
    hostelFees = 25000;
    placementRate = tier === 1 ? 84 : tier === 2 ? 74 : 65;
    rating = tier === 1 ? 4.0 : tier === 2 ? 3.5 : 3.0;
  } else if (type === "STATE_GOVT") {
    averagePackage = tier === 1 ? 13.0 : tier === 2 ? 8.0 : 5.2;
    annualFees = 85000;
    hostelFees = 22000;
    placementRate = tier === 1 ? 88 : tier === 2 ? 78 : 68;
    rating = tier === 1 ? 4.0 : tier === 2 ? 3.5 : 3.0;
  } else if (type === "PRIVATE") {
    averagePackage = tier === 1 ? 15.5 : tier === 2 ? 7.0 : 4.2;
    annualFees = tier === 1 ? 450000 : tier === 2 ? 260000 : 180000;
    hostelFees = tier === 1 ? 95000 : tier === 2 ? 70000 : 55000;
    placementRate = tier === 1 ? 90 : tier === 2 ? 75 : 60;
    rating = tier === 1 ? 4.5 : tier === 2 ? 3.5 : 3.0;
  }

  // Add minor name-based variation
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  averagePackage += (hash % 10) * 0.2 - 1.0;
  placementRate += (hash % 6) - 3;
  annualFees += (hash % 100) * 100 - 5000;

  // Keep packages and rates within bounds
  averagePackage = Math.round(Math.max(3.2, Math.min(42.0, averagePackage)) * 10) / 10;
  placementRate = Math.min(99, Math.max(50, placementRate));
  const medianPackage = Math.round(averagePackage * 0.85 * 10) / 10;

  return { averagePackage, medianPackage, annualFees, hostelFees, placementRate, rating };
}

// 1. Explicit JoSAA Colleges (119 total)
const rawJoSAAColleges: { name: string; type: "IIT" | "NIT" | "IIIT" | "GFTI"; state: string; city: string; tier: 1 | 2 | 3 }[] = [
  // IITs (23)
  { name: "IIT Bombay", type: "IIT", state: "Maharashtra", city: "Mumbai", tier: 1 },
  { name: "IIT Delhi", type: "IIT", state: "Delhi", city: "New Delhi", tier: 1 },
  { name: "IIT Madras", type: "IIT", state: "Tamil Nadu", city: "Chennai", tier: 1 },
  { name: "IIT Kanpur", type: "IIT", state: "Uttar Pradesh", city: "Kanpur", tier: 1 },
  { name: "IIT Kharagpur", type: "IIT", state: "West Bengal", city: "Kharagpur", tier: 1 },
  { name: "IIT Roorkee", type: "IIT", state: "Uttarakhand", city: "Roorkee", tier: 1 },
  { name: "IIT Guwahati", type: "IIT", state: "Assam", city: "Guwahati", tier: 1 },
  { name: "IIT Hyderabad", type: "IIT", state: "Telangana", city: "Hyderabad", tier: 1 },
  { name: "IIT Indore", type: "IIT", state: "Madhya Pradesh", city: "Indore", tier: 2 },
  { name: "IIT BHU Varanasi", type: "IIT", state: "Uttar Pradesh", city: "Varanasi", tier: 1 },
  { name: "IIT Ropar", type: "IIT", state: "Punjab", city: "Ropar", tier: 2 },
  { name: "IIT Bhubaneswar", type: "IIT", state: "Odisha", city: "Bhubaneswar", tier: 2 },
  { name: "IIT Gandhinagar", type: "IIT", state: "Gujarat", city: "Gandhinagar", tier: 2 },
  { name: "IIT Patna", type: "IIT", state: "Bihar", city: "Patna", tier: 2 },
  { name: "IIT Mandi", type: "IIT", state: "Himachal Pradesh", city: "Mandi", tier: 2 },
  { name: "IIT Jodhpur", type: "IIT", state: "Rajasthan", city: "Jodhpur", tier: 2 },
  { name: "IIT Tirupati", type: "IIT", state: "Andhra Pradesh", city: "Tirupati", tier: 3 },
  { name: "IIT Palakkad", type: "IIT", state: "Kerala", city: "Palakkad", tier: 3 },
  { name: "IIT Bhilai", type: "IIT", state: "Chhattisgarh", city: "Bhilai", tier: 3 },
  { name: "IIT Goa", type: "IIT", state: "Goa", city: "Ponda", tier: 3 },
  { name: "IIT Jammu", type: "IIT", state: "Jammu & Kashmir", city: "Jammu", tier: 3 },
  { name: "IIT Dharwad", type: "IIT", state: "Karnataka", city: "Dharwad", tier: 3 },
  { name: "IIT ISM Dhanbad", type: "IIT", state: "Jharkhand", city: "Dhanbad", tier: 1 },

  // NITs & IIEST (32)
  { name: "NIT Trichy", type: "NIT", state: "Tamil Nadu", city: "Trichy", tier: 1 },
  { name: "NIT Surathkal", type: "NIT", state: "Karnataka", city: "Surathkal", tier: 1 },
  { name: "NIT Warangal", type: "NIT", state: "Telangana", city: "Warangal", tier: 1 },
  { name: "MNNIT Allahabad", type: "NIT", state: "Uttar Pradesh", city: "Prayagraj", tier: 1 },
  { name: "VNIT Nagpur", type: "NIT", state: "Maharashtra", city: "Nagpur", tier: 1 },
  { name: "MANIT Bhopal", type: "NIT", state: "Madhya Pradesh", city: "Bhopal", tier: 2 },
  { name: "NIT Calicut", type: "NIT", state: "Kerala", city: "Calicut", tier: 1 },
  { name: "NIT Kurukshetra", type: "NIT", state: "Haryana", city: "Kurukshetra", tier: 2 },
  { name: "NIT Rourkela", type: "NIT", state: "Odisha", city: "Rourkela", tier: 1 },
  { name: "NIT Silchar", type: "NIT", state: "Assam", city: "Silchar", tier: 2 },
  { name: "NIT Durgapur", type: "NIT", state: "West Bengal", city: "Durgapur", tier: 2 },
  { name: "MNIT Jaipur", type: "NIT", state: "Rajasthan", city: "Jaipur", tier: 1 },
  { name: "NIT Jamshedpur", type: "NIT", state: "Jharkhand", city: "Jamshedpur", tier: 2 },
  { name: "NIT Patna", type: "NIT", state: "Bihar", city: "Patna", tier: 2 },
  { name: "NIT Raipur", type: "NIT", state: "Chhattisgarh", city: "Raipur", tier: 3 },
  { name: "NIT Jalandhar", type: "NIT", state: "Punjab", city: "Jalandhar", tier: 2 },
  { name: "NIT Hamirpur", type: "NIT", state: "Himachal Pradesh", city: "Hamirpur", tier: 2 },
  { name: "NIT Goa", type: "NIT", state: "Goa", city: "Farmagudi", tier: 3 },
  { name: "NIT Puducherry", type: "NIT", state: "Puducherry", city: "Karaikal", tier: 3 },
  { name: "NIT Uttarakhand", type: "NIT", state: "Uttarakhand", city: "Srinagar Garhwal", tier: 3 },
  { name: "NIT Manipur", type: "NIT", state: "Manipur", city: "Imphal", tier: 3 },
  { name: "NIT Mizoram", type: "NIT", state: "Mizoram", city: "Aizawl", tier: 3 },
  { name: "NIT Nagaland", type: "NIT", state: "Nagaland", city: "Chumukedima", tier: 3 },
  { name: "NIT Sikkim", type: "NIT", state: "Sikkim", city: "Ravangla", tier: 3 },
  { name: "NIT Arunachal Pradesh", type: "NIT", state: "Arunachal Pradesh", city: "Yupia", tier: 3 },
  { name: "NIT Srinagar", type: "NIT", state: "Jammu & Kashmir", city: "Srinagar", tier: 3 },
  { name: "NIT Meghalaya", type: "NIT", state: "Meghalaya", city: "Shillong", tier: 3 },
  { name: "NIT Agartala", type: "NIT", state: "Agartala", city: "Agartala", tier: 2 },
  { name: "NIT Delhi", type: "NIT", state: "Delhi", city: "Delhi", tier: 2 },
  { name: "IIEST Shibpur", type: "NIT", state: "West Bengal", city: "Howrah", tier: 2 },
  { name: "NIT Andhra Pradesh", type: "NIT", state: "Andhra Pradesh", city: "Tadepalligudem", tier: 3 },
  { name: "NIT Sibpur", type: "NIT", state: "West Bengal", city: "Howrah", tier: 2 },

  // IIITs (26)
  { name: "IIIT Allahabad", type: "IIIT", state: "Uttar Pradesh", city: "Prayagraj", tier: 1 },
  { name: "IIIT Gwalior", type: "IIIT", state: "Madhya Pradesh", city: "Gwalior", tier: 1 },
  { name: "IIIT Jabalpur", type: "IIIT", state: "Madhya Pradesh", city: "Jabalpur", tier: 2 },
  { name: "IIIT Kancheepuram", type: "IIIT", state: "Tamil Nadu", city: "Kancheepuram", tier: 2 },
  { name: "IIIT Hyderabad", type: "IIIT", state: "Telangana", city: "Hyderabad", tier: 1 },
  { name: "IIIT Bangalore", type: "IIIT", state: "Karnataka", city: "Bangalore", tier: 1 },
  { name: "IIIT Guwahati", type: "IIIT", state: "Assam", city: "Guwahati", tier: 3 },
  { name: "IIIT Kota", type: "IIIT", state: "Rajasthan", city: "Kota", tier: 3 },
  { name: "IIIT Sri City", type: "IIIT", state: "Andhra Pradesh", city: "Sri City", tier: 2 },
  { name: "IIIT Vadodara", type: "IIIT", state: "Gujarat", city: "Vadodara", tier: 3 },
  { name: "IIIT Pune", type: "IIIT", state: "Maharashtra", city: "Pune", tier: 2 },
  { name: "IIIT Surat", type: "IIIT", state: "Gujarat", city: "Surat", tier: 3 },
  { name: "IIIT Delhi", type: "IIIT", state: "Delhi", city: "New Delhi", tier: 1 },
  { name: "IIIT Lucknow", type: "IIIT", state: "Uttar Pradesh", city: "Lucknow", tier: 2 },
  { name: "IIIT Dharwad", type: "IIIT", state: "Karnataka", city: "Dharwad", tier: 3 },
  { name: "IIIT Kalyani", type: "IIIT", state: "West Bengal", city: "Kalyani", tier: 3 },
  { name: "IIIT Una", type: "IIIT", state: "Himachal Pradesh", city: "Una", tier: 3 },
  { name: "IIIT Sonepat", type: "IIIT", state: "Haryana", city: "Sonepat", tier: 3 },
  { name: "IIIT Bhagalpur", type: "IIIT", state: "Bihar", city: "Bhagalpur", tier: 3 },
  { name: "IIIT Bhopal", type: "IIIT", state: "Madhya Pradesh", city: "Bhopal", tier: 3 },
  { name: "IIIT Kottayam", type: "IIIT", state: "Kerala", city: "Kottayam", tier: 3 },
  { name: "IIIT Ranchi", type: "IIIT", state: "Jharkhand", city: "Ranchi", tier: 3 },
  { name: "IIIT Nagpur", type: "IIIT", state: "Maharashtra", city: "Nagpur", tier: 3 },
  { name: "IIIT Agartala", type: "IIIT", state: "Tripura", city: "Agartala", tier: 3 },
  { name: "IIIT Raichur", type: "IIIT", state: "Karnataka", city: "Raichur", tier: 3 },
  { name: "IIIT Kurnool", type: "IIIT", state: "Andhra Pradesh", city: "Kurnool", tier: 3 },

  // GFTIs (38)
  { name: "BIT Mesra Ranchi", type: "GFTI", state: "Jharkhand", city: "Ranchi", tier: 1 },
  { name: "PEC Chandigarh", type: "GFTI", state: "Punjab", city: "Chandigarh", tier: 1 },
  { name: "JNU Delhi", type: "GFTI", state: "Delhi", city: "New Delhi", tier: 2 },
  { name: "HBTU Kanpur", type: "GFTI", state: "Uttar Pradesh", city: "Kanpur", tier: 1 },
  { name: "GKV Haridwar", type: "GFTI", state: "Uttarakhand", city: "Haridwar", tier: 3 },
  { name: "UIET Kanpur", type: "GFTI", state: "Uttar Pradesh", city: "Kanpur", tier: 2 },
  { name: "NIFT Ranchi", type: "GFTI", state: "Jharkhand", city: "Ranchi", tier: 3 },
  { name: "CURaj Rajasthan", type: "GFTI", state: "Rajasthan", city: "Kishangarh", tier: 3 },
  { name: "Tezpur University", type: "GFTI", state: "Assam", city: "Tezpur", tier: 2 },
  { name: "Assam University", type: "GFTI", state: "Assam", city: "Silchar", tier: 3 },
  { name: "SMVDU Katra", type: "GFTI", state: "Jammu & Kashmir", city: "Katra", tier: 3 },
  { name: "GGV Bilaspur", type: "GFTI", state: "Chhattisgarh", city: "Bilaspur", tier: 3 },
  { name: "IITRAM Ahmedabad", type: "GFTI", state: "Gujarat", city: "Ahmedabad", tier: 3 },
  { name: "University of Hyderabad", type: "GFTI", state: "Telangana", city: "Hyderabad", tier: 2 },
  { name: "SPA Delhi", type: "GFTI", state: "Delhi", city: "New Delhi", tier: 1 },
  { name: "SPA Bhopal", type: "GFTI", state: "Madhya Pradesh", city: "Bhopal", tier: 2 },
  { name: "SPA Vijayawada", type: "GFTI", state: "Andhra Pradesh", city: "Vijayawada", tier: 2 },
  { name: "IICT Bhadohi", type: "GFTI", state: "Uttar Pradesh", city: "Bhadohi", tier: 3 },
  { name: "NIELIT Aurangabad", type: "GFTI", state: "Maharashtra", city: "Aurangabad", tier: 3 },
  { name: "NIAMT Ranchi", type: "GFTI", state: "Jharkhand", city: "Ranchi", tier: 3 },
  { name: "SLIET Longowal", type: "GFTI", state: "Punjab", city: "Longowal", tier: 3 },
  { name: "Mizoram University Aizawl", type: "GFTI", state: "Mizoram", city: "Aizawl", tier: 3 },
  { name: "CSVTU Bhilai", type: "GFTI", state: "Chhattisgarh", city: "Bhilai", tier: 3 },
  { name: "GKCIET Malda", type: "GFTI", state: "West Bengal", city: "Malda", tier: 3 },
  { name: "CIT Kokrajhar", type: "GFTI", state: "Assam", city: "Kokrajhar", tier: 3 },
  { name: "PTU Puducherry", type: "GFTI", state: "Puducherry", city: "Puducherry", tier: 3 },
  { name: "NIFTEM Kundli", type: "GFTI", state: "Haryana", city: "Sonepat", tier: 3 },
  { name: "NIFTEM Thanjavur", type: "GFTI", state: "Tamil Nadu", city: "Thanjavur", tier: 3 },
  { name: "NERIST Nirjuli", type: "GFTI", state: "Arunachal Pradesh", city: "Nirjuli", tier: 3 },
  { name: "IIHT Salem", type: "GFTI", state: "Tamil Nadu", city: "Salem", tier: 3 },
  { name: "School of Engineering Tezpur", type: "GFTI", state: "Assam", city: "Tezpur", tier: 3 },
  { name: "School of Engineering CURaj", type: "GFTI", state: "Rajasthan", city: "Kishangarh", tier: 3 },
  { name: "IIIT Naya Raipur", type: "GFTI", state: "Chhattisgarh", city: "Naya Raipur", tier: 2 },
  { name: "IICT Salem", type: "GFTI", state: "Tamil Nadu", city: "Salem", tier: 3 },
  { name: "Central University of Haryana", type: "GFTI", state: "Haryana", city: "Mahendragarh", tier: 3 },
  { name: "Central University of Punjab", type: "GFTI", state: "Punjab", city: "Bathinda", tier: 3 },
  { name: "Central University of Jammu", type: "GFTI", state: "Jammu & Kashmir", city: "Samba", tier: 3 },
  { name: "Central University of Karnataka", type: "GFTI", state: "Karnataka", city: "Kalaburagi", tier: 3 }
];

// 2. Top-tier State & Private Universities (30 total)
const rawTopStatePrivateColleges: { name: string; type: "STATE_GOVT" | "PRIVATE"; state: string; city: string; tier: 1 | 2 | 3 }[] = [
  { name: "DTU Delhi", type: "STATE_GOVT", state: "Delhi", city: "Delhi", tier: 1 },
  { name: "NSUT Delhi", type: "STATE_GOVT", state: "Delhi", city: "Delhi", tier: 1 },
  { name: "IGDTUW Delhi", type: "STATE_GOVT", state: "Delhi", city: "Delhi", tier: 1 }, // Female specific
  { name: "COEP Pune", type: "STATE_GOVT", state: "Maharashtra", city: "Pune", tier: 1 },
  { name: "VJTI Mumbai", type: "STATE_GOVT", state: "Maharashtra", city: "Mumbai", tier: 1 },
  { name: "Jadavpur University Kolkata", type: "STATE_GOVT", state: "West Bengal", city: "Kolkata", tier: 1 },
  { name: "IET Lucknow", type: "STATE_GOVT", state: "Uttar Pradesh", city: "Lucknow", tier: 2 },
  { name: "HBTU Kanpur (State)", type: "STATE_GOVT", state: "Uttar Pradesh", city: "Kanpur", tier: 1 },
  { name: "SGSITS Indore", type: "STATE_GOVT", state: "Madhya Pradesh", city: "Indore", tier: 2 },
  { name: "MBM Jodhpur", type: "STATE_GOVT", state: "Rajasthan", city: "Jodhpur", tier: 2 },
  { name: "L.D. College of Engineering Ahmedabad", type: "STATE_GOVT", state: "Gujarat", city: "Ahmedabad", tier: 2 },
  { name: "RVCE Bangalore", type: "PRIVATE", state: "Karnataka", city: "Bangalore", tier: 1 },
  { name: "BMSCE Bangalore", type: "PRIVATE", state: "Karnataka", city: "Bangalore", tier: 1 },
  { name: "MSRIT Bangalore", type: "PRIVATE", state: "Karnataka", city: "Bangalore", tier: 2 },
  { name: "PSG College of Technology Coimbatore", type: "PRIVATE", state: "Tamil Nadu", city: "Coimbatore", tier: 1 },
  { name: "Anna University Guindy", type: "STATE_GOVT", state: "Tamil Nadu", city: "Chennai", tier: 1 },
  { name: "JNTU Hyderabad", type: "STATE_GOVT", state: "Telangana", city: "Hyderabad", tier: 1 },
  { name: "Osmania University Hyderabad", type: "STATE_GOVT", state: "Telangana", city: "Hyderabad", tier: 1 },
  { name: "Andhra University Visakhapatnam", type: "STATE_GOVT", state: "Andhra Pradesh", city: "Visakhapatnam", tier: 1 },
  { name: "YMCA Faridabad", type: "STATE_GOVT", state: "Haryana", city: "Faridabad", tier: 2 },
  
  // Private
  { name: "BITS Pilani", type: "PRIVATE", state: "Rajasthan", city: "Pilani", tier: 1 },
  { name: "BITS Goa", type: "PRIVATE", state: "Goa", city: "Zuarinagar", tier: 1 },
  { name: "BITS Hyderabad", type: "PRIVATE", state: "Telangana", city: "Hyderabad", tier: 1 },
  { name: "VIT Vellore", type: "PRIVATE", state: "Tamil Nadu", city: "Vellore", tier: 1 },
  { name: "VIT Chennai", type: "PRIVATE", state: "Tamil Nadu", city: "Chennai", tier: 2 },
  { name: "MIT Manipal", type: "PRIVATE", state: "Karnataka", city: "Manipal", tier: 1 },
  { name: "Thapar University Patiala", type: "PRIVATE", state: "Punjab", city: "Patiala", tier: 1 },
  { name: "LNMIIT Jaipur", type: "PRIVATE", state: "Rajasthan", city: "Jaipur", tier: 1 },
  { name: "DA-IICT Gandhinagar", type: "PRIVATE", state: "Gujarat", city: "Gandhinagar", tier: 1 },
  { name: "SRM IST Kattankulathur", type: "PRIVATE", state: "Tamil Nadu", city: "Chennai", tier: 2 }
];

// 3. Generate State/Private Colleges programmatically (700+ distinct colleges)
// We have 22 major states, each with 4 cities, and 8 colleges generated per city: 22 * 4 * 8 = 704 colleges!
const stateCitiesData: { [state: string]: string[] } = {
  "Maharashtra": ["Pune", "Nagpur", "Nashik", "Aurangabad"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "Uttar Pradesh": ["Noida", "Lucknow", "Kanpur", "Ghaziabad"],
  "West Bengal": ["Kolkata", "Durgapur", "Siliguri", "Asansol"],
  "Delhi": ["Dwarka", "Okhla", "Rohini", "Janakpuri"],
  "Telangana": ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
  "Haryana": ["Gurgaon", "Faridabad", "Rohtak", "Hisar"],
  "Bihar": ["Patna", "Muzaffarpur", "Bhagalpur", "Gaya"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Sambalpur", "Rourkela"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Assam": ["Guwahati", "Dibrugarh", "Jorhat", "Tezpur"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Haldwani", "Roorkee"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Jagdalpur"],
  "Himachal Pradesh": ["Shimla", "Hamirpur", "Dharamshala", "Solan"],
  "Jammu & Kashmir": ["Jammu", "Srinagar", "Kathua", "Anantnag"]
};

const collegePrefixes = [
  "Government College of Engineering",
  "Institute of Technology & Science",
  "College of Engineering & Technology",
  "Sardar Patel Institute of Tech",
  "Jawaharlal Nehru Engineering College",
  "Vidyasagar College of Engineering",
  "Maharishi Institute of Tech",
  "Apex Institute of Engineering"
];

function generateRegionalColleges(): College[] {
  const list: College[] = [];
  const states = Object.keys(stateCitiesData);
  
  states.forEach((state) => {
    const cities = stateCitiesData[state];
    cities.forEach((city, cityIdx) => {
      collegePrefixes.forEach((prefix, prefixIdx) => {
        // Deterministic college name
        const name = `${prefix}, ${city}`;
        // Set type (prefixIdx === 0 -> STATE_GOVT, others are PRIVATE)
        const type = prefixIdx === 0 ? ("STATE_GOVT" as const) : ("PRIVATE" as const);
        // Determine tier (0-1 -> tier 2, others -> tier 3)
        const tier = prefixIdx <= 1 ? (2 as const) : (3 as const);
        
        const id = `gen_${state.toLowerCase()}_${city.toLowerCase()}_${prefix.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
        const stats = generateStats(type, tier, name);

        list.push({
          id,
          name,
          type,
          state,
          city,
          tier,
          ...stats
        });
      });
    });
  });
  return list;
}

// Assemble all colleges (yielding 119 + 30 + 704 = 853 colleges!)
export const allColleges: College[] = [
  ...rawJoSAAColleges.map((c) => ({
    id: `josaa_${c.type.toLowerCase()}_${c.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
    name: c.name,
    type: c.type,
    state: c.state,
    city: c.city,
    tier: c.tier,
    ...generateStats(c.type, c.tier, c.name)
  })),
  ...rawTopStatePrivateColleges.map((c) => ({
    id: `top_${c.type.toLowerCase()}_${c.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
    name: c.name,
    type: c.type,
    state: c.state,
    city: c.city,
    tier: c.tier,
    ...generateStats(c.type, c.tier, c.name)
  })),
  ...generateRegionalColleges()
];

// Generate branch choices dynamically with realistic base cutoff ranges
// Total choices = ~6,300 options
export function generateAllChoices(): CollegeChoice[] {
  const choices: CollegeChoice[] = [];
  
  allColleges.forEach((col) => {
    // Restrict branches based on tier to make it realistic
    let branchesToUse = branchesList;
    
    if (col.type === "IIIT") {
      // IIITs usually only offer CS/IT/EC related branches
      branchesToUse = branchesList.filter(b => 
        b.includes("Computer") || 
        b.includes("Data") || 
        b.includes("Information") || 
        b.includes("Software") || 
        b.includes("Mathematics") || 
        b.includes("Electronics")
      );
    } else if (col.tier === 2) {
      // Tier 2 colleges: 9 branches
      branchesToUse = branchesList.slice(0, 9);
    } else if (col.tier === 3) {
      // Tier 3 colleges: 6 core branches
      branchesToUse = [
        "Computer Science & Engineering",
        "Information Technology",
        "Electronics & Communication",
        "Electrical & Electronics",
        "Mechanical Engineering",
        "Civil Engineering"
      ];
    }

    branchesToUse.forEach((branch, branchIdx) => {
      // Compute deterministic base cutoffs
      let cutoffRank = 50;
      
      // Compute rank score by tier and type
      if (col.type === "IIT") {
        const iitIdx = rawJoSAAColleges.findIndex(r => r.name === col.name);
        const relativeIdx = iitIdx >= 0 ? iitIdx : 10;
        cutoffRank = relativeIdx * 450 + 80; // IITs: 80 to 11,000
      } else if (col.type === "NIT") {
        const nitIdx = rawJoSAAColleges.findIndex(r => r.name === col.name);
        const relativeIdx = nitIdx >= 0 ? (nitIdx - 23) : 15;
        cutoffRank = relativeIdx * 1100 + 2500; // NITs: 2,500 to 45,000
      } else if (col.type === "IIIT") {
        const iiitIdx = rawJoSAAColleges.findIndex(r => r.name === col.name);
        const relativeIdx = iiitIdx >= 0 ? (iiitIdx - 55) : 10;
        cutoffRank = relativeIdx * 1200 + 4500; // IIITs: 4,500 to 35,000
      } else if (col.type === "GFTI") {
        const gftiIdx = rawJoSAAColleges.findIndex(r => r.name === col.name);
        const relativeIdx = gftiIdx >= 0 ? (gftiIdx - 81) : 15;
        cutoffRank = relativeIdx * 1900 + 15000; // GFTIs: 15,000 to 88,000
      } else if (col.type === "STATE_GOVT") {
        if (col.tier === 1) {
          cutoffRank = 4000 + (col.name.length % 5) * 1500; // Top State: 4,000 to 11,500
        } else {
          // Generated state govt: 20,000 to 95,000
          const hash = col.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
          cutoffRank = 20000 + (hash % 75) * 1000;
        }
      } else if (col.type === "PRIVATE") {
        if (col.tier === 1) {
          // Top private: BITS/VIT: 2000 to 18000
          const hash = col.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
          cutoffRank = 2000 + (hash % 16) * 1100;
        } else {
          // Generated private: 40,000 to 180,000
          const hash = col.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
          cutoffRank = 40000 + (hash % 140) * 1000;
        }
      }

      // Adjust based on branch preference weight
      let branchWeight = branchIdx * 2500;
      if (branch.includes("Computer") || branch.includes("Data") || branch.includes("Mathematics")) {
        branchWeight = branchIdx * 110; // CS branch is extremely high cutoff
      } else if (branch.includes("Electronics") || branch.includes("Electrical")) {
        branchWeight = branchIdx * 900;
      }
      
      const baseCutoff = Math.round(cutoffRank + branchWeight);
      const choiceId = `${col.id}_${branch.toLowerCase().replace(/[^a-z0-9]/g, "")}`;

      choices.push({
        id: choiceId,
        institute: col.name,
        branch,
        type: col.type,
        state: col.state,
        baseCutoff
      });
    });
  });

  return choices.sort((a, b) => a.baseCutoff - b.baseCutoff);
}
