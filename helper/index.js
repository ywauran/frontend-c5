export const getTemperatureStatus = (temp) => {
  if (temp < 21) {
    return "Dingin";
  } else if (temp > 27) {
    return "Panas";
  } else {
    return "Normal";
  }
};

export const getHumidityStatus = (humidity) => {
  if (humidity < 80) {
    return "Kurang Lembab";
  } else if (humidity <= 85) {
    return "Cukup";
  } else {
    return "Sangat Lembab";
  }
};

export const getSoilMoistureStatus = (moisture) => {
  if (moisture < 60) {
    return "Kurang Lembab";
  } else if (moisture <= 80) {
    return "Kelembaban Normal";
  } else {
    return "Sangat Lembab";
  }
};
