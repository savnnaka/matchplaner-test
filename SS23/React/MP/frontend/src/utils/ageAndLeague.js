// country
// GER, AT, CH, (IT, FR, EN)
export const allCountries = [
  { label: "Deutschland", value: "GER" },
  { label: "Österreich", value: "AT" },
  { label: "Schweiz", value: "CH" },
];

// association
// GER - Baden, Bayern, Berlin, Brandenburg, Bremen, Hamburg, Hessen, Mecklenburg-Vorpommern, Mittelrhein, Niederrhein, Niedersachsen, Rheinland, Saarland, Sachsen, Sachsen-Anhalt, Schleswig-Holstein, Südbaden, Südwest, Thüringen, Westfalen, Württemberg
// AT - Burgenland, Kärnten, Niederösterreich, Oberösterreich, Salzburg, Steiermark, Tirol, Vorarlberg, Wien
// CH - Aargau, Bern/Jura, Innerschweiz, Nordwestschweiz, Ostschweiz, Solothurn, Zürich, Ticinese di Calcio, Genevoise, Neuchâteloise, Valaisanne, Vaudoise
export const GERassociations = [
  { label: "Baden", value: "GER-BA" },
  { label: "Bayern", value: "GER-BY" },
  { label: "Berlin", value: "GER-BE" },
  { label: "Brandenburg", value: "GER-BB" },
  { label: "Bremen", value: "GER-HB" },
  { label: "Hamburg", value: "GER-HH" },
  { label: "Hessen", value: "GER-HE" },
  { label: "Mecklenburg-Vorpommern", value: "GER-MV" },
  { label: "Mittelrhein", value: "GER-MR" },
  { label: "Niederrhein", value: "GER-NR" },
  { label: "Niedersachsen", value: "GER-NI" },
  { label: "Rheinland", value: "GER-RL" },
  { label: "Saarland", value: "GER-SL" },
  { label: "Sachsen", value: "GER-SN" },
  { label: "Sachsen-Anhalt", value: "GER-ST" },
  { label: "Schleswig-Holstein", value: "GER-SH" },
  { label: "Südbaden", value: "GER-SB" },
  { label: "Südwest", value: "GER-SW" },
  { label: "Thüringen", value: "GER-TH" },
  { label: "Westfalen", value: "GER-WF" },
  { label: "Württemberg", value: "GER-WB" },
];
export const ATassociations = [
  { label: "Burgenland", value: "AT-BL" },
  { label: "Kärnten", value: "AT-KT" },
  { label: "Niederösterreich", value: "AT-NO" },
  { label: "Oberösterreich", value: "AT-OO" },
  { label: "Salzburg", value: "AT-SB" },
  { label: "Steiermark", value: "AT-SM" },
  { label: "Tirol", value: "AT-TI" },
  { label: "Vorarlberg", value: "AT-VA" },
  { label: "Wien", value: "AT-WI" },
];
export const CHassociations = [
  { label: "Aargau", value: "CH-AG" },
  { label: "Bern/Jura", value: "CH-BJ" },
  { label: "Innerschweiz", value: "CH-IS" },
  { label: "Nordwestschweiz", value: "CH-NS" },
  { label: "Ostschweiz", value: "CH-OS" },
  { label: "Solothurn", value: "CH-SO" },
  { label: "Zürich", value: "CH-ZH" },
  { label: "Ticino", value: "CH-TI" },
  { label: "Genf", value: "CH-GE" },
  { label: "Neuchâtel", value: "CH-NE" },
  { label: "Wallis", value: "CH-VS" },
  { label: "Vaud", value: "CH-VD" },
];
// export const italianAssociations = []
// export const frenchAssociations = []
// export const englishAssociations = []

// age
// Bambini (0), F(1,2), E(3,4), D(5,6), C(7,8), B(9,10), A(11,12), Aktiv(13), Senioren(14)
export const allAges = [
  { label: "Bambini/G-Jugend (U7)", value: 0 },
  { label: "F2-Junioren (U8)", value: 1 },
  { label: "F2-Juniorinnen (U8)", value: 1 },
  { label: "F1-Junioren (U9)", value: 2 },
  { label: "F1-Juniorinnen (U9)", value: 2 },
  { label: "E2-Junioren (U10)", value: 3 },
  { label: "E2-Juniorinnen (U10)", value: 3 },
  { label: "E1-Junioren (U11)", value: 4 },
  { label: "E1-Juniorinnen (U11)", value: 4 },
  { label: "D2-Junioren (U12)", value: 5 },
  { label: "D2-Juniorinnen (U12)", value: 5 },
  { label: "D1-Junioren (U13)", value: 6 },
  { label: "D1-Juniorinnen (U13)", value: 6 },
  { label: "C2-Junioren (U14)", value: 7 },
  { label: "C2-Juniorinnen (U14)", value: 7 },
  { label: "C1-Junioren (U15)", value: 8 },
  { label: "C1-Juniorinnen (U15)", value: 8 },
  { label: "B2-Junioren (U16)", value: 9 },
  { label: "B2-Juniorinnen (U16)", value: 9 },
  { label: "B1-Junioren (U17)", value: 10 },
  { label: "B1-Juniorinnen (U17)", value: 10 },
  { label: "A2-Junioren (U18)", value: 11 },
  { label: "A2-Juniorinnen (U18)", value: 11 },
  { label: "A1-Junioren (U19)", value: 12 },
  { label: "A1-Juniorinnen (U19)", value: 12 },
  { label: "Herren", value: 13 },
  { label: "Frauen", value: 13 },
  { label: "Senioren", value: 14 },
];

// league (for every association and every age)
// ### GER ###
// BA
// BY
// BE
// BB
// HB
// HH
// HE
// MV
// MR
// NR
// NI
// RL
// SL
// SN
// ST
// SH
// SB
// SW
// TH
// WF
// WB
// ### AT ###
// BL
// KT
// NO
// OO
// SB
// SM
// TI
// VA
// WI
// ### CH ###
// AG
// BJ
// IS
// NS
// OS
// SO
// ZH
// TI
// GE
// NE
// VS
// VD
