export const zoneCityMapping = {
  "Mumbai": {
    "Zone1": [
      "South Mumbai", "Colaba", "Fort", "Churchgate", "Marine Drive",
      "Breach Candy", "Worli", "Prabhadevi", "Dadar", "Matunga"
    ],
    "Zone2": [
      "Bandra", "Khar", "Santacruz", "Vile Parle", "Juhu",
      "Andheri", "Jogeshwari", "Malad", "Kandivali", "Borivali"
    ],
    "Zone3": [
      "Ghatkopar", "Kurla", "Bhandup", "Powai", "Vikhroli",
      "Kanjurmarg", "Mulund", "Thane", "Dahisar", "Oshiwara"
    ],
    "Zone4": [
      "Mira Road", "Bhayandar", "Nalasopara", "Vasai", "Virar",
      "Dombivli", "Kalyan", "Ambarnath", "Ulhasnagar", "Badlapur"
    ]
  },
  "Pune": {
    "Central": [
      "Shivaji Nagar", "Deccan", "FC Road", "JM Road", "Camp",
      "Koregaon Park", "Kalyani Nagar", "Bund Garden", "Swargate"
    ],
    "North": [
      "Pimple Saudagar", "Aundh", "Baner", "Balewadi", "Wakad",
      "Pimple Nilakh", "Pimple Gurav", "Hinjewadi", "Ravet"
    ],
    "East": [
      "Viman Nagar", "Kharadi", "Mundhwa", "Keshav Nagar", "Hadapsar",
      "Wagholi", "Magarpatta", "Manjri", "Chandan Nagar"
    ],
    "South": [
      "Katraj", "Bibwewadi", "Dhankawadi", "Ambegaon", "Warje",
      "Kothrud", "Bavdhan", "Pashan", "Karvenagar"
    ]
  },
  "Nagpur": {
    "Central Nagpur": [
      "Sadar", "Sitabuldi", "Dhantoli", "Ramdas Peth", "Shankar Nagar",
      "Civil Lines", "Hanuman Nagar", "Gandhibagh", "Itwari"
    ],
    "North Nagpur": [
      "Koradi", "Nandanvan", "Jaripatka", "Mankapur", "Godhni",
      "Pardi", "Kamptee Road", "Mahal", "Gittikhadan"
    ],
    "East Nagpur": [
      "Manewada", "Ayodhya Nagar", "Pardi", "Hudkeshwar", "Besa",
      "Mahalgaon", "Surya Nagar", "Somalwada", "Khamla"
    ],
    "South Nagpur": [
      "Ajni", "Wardhaman Nagar", "Laxmi Nagar", "Medical Square", "Dighori",
      "Manish Nagar", "Pratap Nagar", "Besa", "Somalwada"
    ]
  },
  "Nashik": {
    "Old City": [
      "Panchavati", "Gole Colony", "College Road", "Gangapur Road",
      "Mahatma Nagar", "Sarda Circle", "Ashok Stambh", "Shalimar"
    ],
    "New City": [
      "Indira Nagar", "Satpur", "CIDCO", "Jail Road", "Makhmalabad",
      "Nashik Road", "Upnagar", "Pathardi Phata", "Ambad"
    ],
    "East Nashik": [
      "Panchavati", "Makhmalabad", "Meri Colony", "Pathardi",
      "Dwarka", "Trimurti Chowk", "Untwadi", "Jail Road"
    ],
    "West Nashik": [
      "Gangapur Road", "College Road", "Mahatma Nagar", "Indira Nagar",
      "Satpur", "Canada Corner", "Tidke Colony", "Trimbak Road"
    ]
  }
};


 const getCities = (region, zone) => {
  console.log(region, zone);

  if (zoneCityMapping[region] && zoneCityMapping[region][zone]) {
    return zoneCityMapping[region][zone]
  }
  return []
};

 const getZone = (region) => {
  if (zoneCityMapping[region]) {
    return Object.keys(zoneCityMapping[region])
  }
  return [];
}

const getCitiesByZone = (req, res) => {
  const { region, zone } = req.query;

  if (!region || !zone) {
    return res.status(400).json({ message: 'Region and zone are required' })
  }

  const cities = getCities(region, zone);

  if (cities.length > 0) {
    res.status(200).json(cities)
  } else {
    res.status(404).json({ message: 'No cites for the selected region and zone' })
  }
};

export const getZoneByRegion = (req, res) => {
  try {
    const { region } = req.query;
    console.log(region);
    
    if (!region) {
      return res.status(404).json({ error: 'Region not found' })
    };

    const zone = getZone(region);
    res.status(200).json({ message: 'Zone retrieve successfully', zone })
  } catch (error) {
    console.error('getZoneByRegion ', error);
    res.status(500).json({message: 'Server error'})
  }
}

export {
  getCitiesByZone
}