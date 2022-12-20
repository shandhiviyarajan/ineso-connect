const models = [
    { key: "INESR-S01-02-868", name_fr: "", name_en: "Light Switch Radar Box" },
    { key: "INESL-S04-02-868", name_fr: "Contrôleur Eclairage", name_en: "Light Switch Box" },
    { key: "INEDL-R01-01-868", name_fr: "Contrôleur Eclairage DALI Dev", name_en: "Light Switch Box DALI Dev" },
    { key: "INEDB-S01-02-868", name_fr: "", name_en: "Light Switch Box DALI-D4i" },
    { key: "INEDB-S01-01-868", name_fr: "", name_en: "Light Switch Box DALI2" },
    { key: "INEDB-R01-02-868", name_fr: "", name_en: "Nema DALI-D4i" },
    { key: "INEDB-R01-01-868", name_fr: "", name_en: "Nema DALI2" },
    { key: "INESR-S04-02-868", name_fr: "", name_en: "Light Switch Radar Box" },
    { key: "INESP-PM3-01-868", name_fr: "", name_en: "Outdoor Air Quality Sensor PM Standard" },
    { key: "INESP-CR1-01-868", name_fr: "", name_en: "Air Quality Sensor PM Clean-Room" },
    { key: "INESC-PM1-01-868", name_fr: "", name_en: "Chair Sensor" },
    { key: "INEMS-PM1-01-868", name_fr: "", name_en: "Parking Ground Sensor", },
    { key: "TA120", name_fr: "Sonomètre Pro", name_en: "Sonometer Pro" },
    { key: "SAMPOLS", name_fr: "", name_en: "Sampols" },
    { key: "SEN-041", name_fr: "", name_en: "Indoor Air Quality Sensor Standard" },
    { key: "SENSE", name_fr: "", name_en: "Indoor Air Quality Sensor Pro" },
    { key: "Atmo", name_fr: "", name_en: "Water Valve" },
    { key: "SVL-DN15DA-868-BSP-S", name_fr: "", name_en: "Industrial Power Switch 16A" },
    { key: "SSL-868", name_fr: "", name_en: "Weather Station" },
    { key: "WD600_UMB", name_fr: "", name_en: "Bio-Radar" },
    { key: "WD700_UMB", name_fr: "", name_en: "Slim Localisation Tag" },
    { key: "VSR10-WR", name_fr: "", name_en: "Localisation Tag" },
    { key: "PLACEPOD_S", name_fr: "", name_en: "Parking Ground Sensor" },
    { key: "PMO_D725A", name_fr: "", name_en: "Outdoor Air Quality Sensor PM Pro" },
    { key: "UL2014A_DCDO_868", name_fr: "", name_en: "Light Switch Box DALI" },
    { key: "BB05_002_002_W", name_fr: "", name_en: "Slim tag" },
    { key: "BB10_L00_TAG_W", name_fr: "", name_en: "ETag X" },
    { key: "BB12_001_CWF_W", name_fr: "", name_en: "Brick" },
    { key: "BB10_LBV_CLP_W", name_fr: "", name_en: "Safe X clip" },
    { key: "LEVANTE_SSL_868", name_fr: "", name_en: "Air Sanitizer Switch" },
    { key: "levante_SSL_868", name_fr: "", name_en: "Air Sanitizer Switch" },
]
const vendors = [
    { key: "ineso", name_en: "Ineso" },
    { key: "cesva", name_en: "Ineso" },
    { key: "orbiwise", name_en: "Ineso" },
    { key: "domnexx", name_en: "Ineso" },
    { key: "strega", name_en: "Ineso" },
    { key: "lufft", name_en: "Ineso" },
    { key: "jcft", name_en: "Ineso" },
    { key: "blueup", name_en: "Ineso" },
    {
        key: "airicom", name_en: "Ineso",
    },
    {
        key: "nexelec", name_en: "Ineso",
    },
    { key: "nippongases", name_en: "Ineso" }
]
export const generateModel = (value, type) => {
    let m = models.filter(model => model.key === value);
    if (type === "type") {
        return m.length > 0 ? m[0].name_en : ""
    } else {
        return m.length > 0 ? m[0].key : ""
    }

}

export const vendorName = (key) => {
    let v = vendors.filter(vendor => vendor.key === key);
    return v.length > 0 ? v[0].name_en : "Ineso"
}