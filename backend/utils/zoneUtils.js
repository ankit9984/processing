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
  }
  // Add other regions here as needed
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