const models = [
    { key: "INESR-S01-02-868", name_en: "Light Switch Radar Box" },
    { key: "INESL-S04-02-868", name_en: "Light Switch Box" },
    {
        key: "INEDL-R01-01-868", name_en: "Light Switch Box DALI Dev"
    },
    {
        key: "INEDB-S01-02-868", name_en: "Light Switch Box DALI-D4i"
    },
    { key: "INEDB-S01-01-868", name_en: "Light Switch Box DALI2" },
    { key: "INEDB-R01-02-868", name_en: "Nema DALI-D4i" },
    { key: "INEDB-R01-01-868", name_en: "Nema DALI2" },
    { key: "INESR-S04-02-868", name_en: "Light Switch Radar Box" },
    {
        key: "INESP-PM3-01-868", name_en: "Outdoor Air Quality Sensor PM Standard"
    },
    {
        key: "INESP-CR1-01-868", name_en: "Air Quality Sensor PM Clean-Room"
    },
    {
        key: "INESC-PM1-01-868", name_en: "Chair Sensor"
    },
    {
        key: "INEMS-PM1-01-868", name_en: "Parking Ground Sensor",
    },
    { key: "TA120", name_en: "Sonometer Pro", },
    { key: "SAMPOLS", name_en: "Sonometer" },
    { key: "SEN-041", name_en: "Indoor Air Quality Sensor Standard" },
    { key: "SENSE", name_en: "Indoor Air Quality Sensor Pro" },
    { key: "Atmo", name_en: "Water Valve" },
    { key: "SVL-DN15DA-868-BSP-S", name_en: "Industrial Power Switch 16A" },
    { key: "SSL-868", name_en: "Weather Station" },
    { key: "WD600_UMB", name_en: "Bio-Radar" },
    { key: "WD700_UMB", name_en: "Slim Localisation Tag" },
    { key: "VSR10-WR", name_en: "Localisation Tag" },
    { key: "BB05_002_002_W", name_en: "Slim tag" },
    { key: "BB10_L00_TAG_W", name_en: "ETag X" },
    { key: "BB12_001_CWF_W", name_en: "Brick" },
    { key: "BB10_LBV_CLP_W", name_en: "Safe X clip" },
    { key: "LEVANTE_SSL_868", name_en: "Air Sanitizer Switch" },
    { key: "PLACEPOD_S", name_en: "Parking Ground Sensor" },
    { key: "PMO_D725A", name_en: "Outdoor Air Quality Sensor PM Pro" }
]
const vendors = [
    { key: "ineso", name_en: "Ineso" },
    { key: "cesva", name_en: "Ineso" },
    { key: "orbiwise", name_en: "Ineso" },
    { key: "domnexx", name_en: "Ineso" },
    { key: "nexelec", name_en: "Ineso" },
    { key: "nexelec", name_en: "Ineso" },
    { key: "strega", name_en: "Ineso" },
    { key: "strega", name_en: "Ineso" },
    { key: "lufft", name_en: "Ineso" },
    { key: "jcft", name_en: "Ineso" },
    { key: "blueup", name_en: "Ineso" },
    { key: "strega", name_en: "Ineso" },
    {
        key: "airicom", name_en: "Ineso",
    },
    {
        key: "nexelec", name_en: "Ineso",
    },
    { key: "nippongases", name_en: "Ineso" }
]
export const generateModel = (value) => {
    let m = models.filter(model => model.key === value);

    return m.length > 0 ? m[0].name_en : ""
}

export const vendorName = (key) => {
    let v = vendors.filter(vendor => vendor.key === key);

    return v.length > 0 ? v[0].name_en : "Ineso"
}