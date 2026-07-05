/* ==========================================================================
   IDBI MSME Sahyog - Application Logic & Core Scoring Engine
   ========================================================================== */

// 1. MERCHANT PROFILE PRESETS
const profiles = {
    kirana: {
        name: "Karan Kirana Store",
        id: "2847",
        type: "retail",
        metrics: {
            gst: 850000,        // Monthly Turnover (INR)
            gstFilingRate: 98.5,
            upiFreq: 120,       // Transactions per day
            upiMonthlyVal: 480000,
            upiAvgTicket: 1350,
            epfoStaff: 3,
            powerConsumption: 240, // kWh per month
            aaBalance: 120000    // Average balance (INR)
        },
        aiRemarks: {
            en: {
                strengths: [
                    "High cash flow velocity with stable daily UPI retail inflows.",
                    "Excellent GST tax compliance rate (98.5% on-time filings).",
                    "Strong local customer footprint with low business seasonality."
                ],
                risks: [
                    "Zero EPFO registry (sole proprietorship model limits scale validation).",
                    "Extremely low physical asset base (no machinery or property collateral)."
                ],
                status: "Disciplined Borrower",
                desc: "Healthy transaction flows, regular tax filing compliance, and stable local retail footprint. Highly recommended for short-term working capital loans."
            },
            hi: {
                strengths: [
                    "स्थिर दैनिक यूपीआई खुदरा इनफ्लो के साथ उच्च नकदी प्रवाह वेग।",
                    "उत्कृष्ट जीएसटी कर अनुपालन दर (98.5% समय पर रिटर्न)।",
                    "कम व्यावसायिक मौसमी उतार-चढ़ाव के साथ मजबूत स्थानीय ग्राहक आधार।"
                ],
                risks: [
                    "शून्य ईपीएफओ पंजीकरण (एकल स्वामित्व मॉडल पैमाने सत्यापन को सीमित करता है)।",
                    "अत्यंत कम भौतिक संपत्ति आधार (कोई मशीनरी या संपत्ति संपार्श्विक नहीं)।"
                ],
                status: "अनुशासित उधारकर्ता",
                desc: "स्वस्थ लेनदेन प्रवाह, नियमित कर फाइलिंग अनुपालन और स्थिर स्थानीय खुदरा पदचिह्न। अल्पकालिक कार्यशील पूंजी ऋण के लिए अत्यधिक अनुशंसित।"
            },
            mr: {
                strengths: [
                    "स्थिर दैनिक यूपीआय किरकोळ इनफ्लोसह उच्च रोख प्रवाह वेग।",
                    "उत्कृष्ट जीएसटी कर अनुपालन दर (९८.५% वेळेवर रिटर्न)।",
                    "कमी व्यावसायिक हंगामी चढउतारांसह मजबूत स्थानिक ग्राहक आधार।"
                ],
                risks: [
                    "शून्य ईपीएफओ नोंदणी (एकल मालकी मॉडेल स्केल प्रमाणीकरण मर्यादित करते)।",
                    "अत्यंत कमी भौतिक मालमत्ता आधार (कोणतीही यंत्रसामग्री किंवा मालमत्ता तारण नाही)।"
                ],
                status: "शिस्तबद्ध कर्जदार",
                desc: "निरोगी व्यवहार प्रवाह, नियमित कर भरणे अनुपालन आणि स्थिर स्थानिक किरकोळ पाऊलखुणा। अल्पकालीन खेळत्या भांडवलाच्या कर्जासाठी अत्यंत शिफारस केली जाते।"
            }
        }
    },
    mfg: {
        name: "Apex Auto Parts",
        id: "7392",
        type: "manufacturing",
        metrics: {
            gst: 2400000,
            gstFilingRate: 96.0,
            upiFreq: 25,
            upiMonthlyVal: 1225000,
            upiAvgTicket: 24500,
            epfoStaff: 18,
            powerConsumption: 4920,
            aaBalance: 310000
        },
        aiRemarks: {
            en: {
                strengths: [
                    "High operational vitality verified by stable, high electricity consumption (DISCOM).",
                    "Consistent workforce size validation with 100% on-time EPFO filings.",
                    "Strong corporate customer profile with high average invoice values."
                ],
                risks: [
                    "High debtor concentration (top 3 buyers represent 65% of revenue).",
                    "Vulnerable to raw material commodity price swings (Steel/Aluminum)."
                ],
                status: "High Vitality Manufacturer",
                desc: "Robust utility usage matching active plant shifts. Verified payroll size via EPFO. Excellent candidate for inventory financing and asset acquisition loans."
            },
            hi: {
                strengths: [
                    "स्थिर, उच्च बिजली खपत (डिस्कॉम) द्वारा सत्यापित उच्च परिचालन जीवन शक्ति।",
                    "100% समय पर ईपीएफओ फाइलिंग के साथ लगातार कार्यबल आकार का सत्यापन।",
                    "उच्च औसत चालान मूल्यों के साथ मजबूत कॉर्पोरेट ग्राहक प्रोफ़ाइल।"
                ],
                risks: [
                    "उच्च देनदार एकाग्रता (शीर्ष 3 खरीदार राजस्व का 65% प्रतिनिधित्व करते हैं)।",
                    "कच्चे माल की जिंस कीमतों में उतार-चढ़ाव (स्टील/एल्युमिनियम) के प्रति संवेदनशील।"
                ],
                status: "उच्च जीवन शक्ति निर्माता",
                desc: "सक्रिय संयंत्र पारियों से मेल खाती मजबूत उपयोगिता बिजली खपत। ईपीएफओ के माध्यम से सत्यापित कार्यबल आकार। इन्वेंट्री फाइनेंसिंग और संपत्ति अधिग्रहण ऋण के लिए उत्कृष्ट उम्मीदवार।"
            },
            mr: {
                strengths: [
                    "स्थिर, उच्च वीज वापर (डिस्कॉम) द्वारे सत्यापित उच्च क्रियाकलाप।",
                    "१००% वेळेवर ईपीएफओ भरणासह कर्मचाऱ्यांच्या संख्येचे अचूक प्रमाणीकरण।",
                    "उच्च सरासरी बीजक मूल्यासह मजबूत कॉर्पोरेट ग्राहक प्रोफाइल।"
                ],
                risks: [
                    "उच्च कर्जदार एकाग्रता (टॉप ३ खरेदीदार एकूण महसुलाच्या ६५% प्रतिनिधित्व करतात)।",
                    "कच्च्या मालाच्या कमोडिटी किमतींमधील चढउतारांशी संवेदनशील (लोखंड/अ‍ॅल्युमिनियम)।"
                ],
                status: "उच्च क्रियाशीलता उत्पादक",
                desc: "सक्रिय कारखाना पाळ्यांशी जुळणारा मजबूत वीज वापर। ईपीएफओद्वारे प्रमाणित कर्मचारी संख्या। इन्व्हेंटरी फायनान्सिंग आणि मालमत्ता कर्जासाठी उत्कृष्ट उमेदवार।"
            }
        }
    },
    logistics: {
        name: "Shiva Logistics & Services",
        id: "4190",
        type: "service",
        metrics: {
            gst: 1800000,
            gstFilingRate: 84.0,
            upiFreq: 45,
            upiMonthlyVal: 612000,
            upiAvgTicket: 6800,
            epfoStaff: 8,
            powerConsumption: 680,
            aaBalance: 45000
        },
        aiRemarks: {
            en: {
                strengths: [
                    "Moderate aggregate cash flow size across commercial service clients.",
                    "Active logistics fleet operations supported by continuous fuel/power expense records."
                ],
                risks: [
                    "Irregular GST tax filings (average delay of 18 days in last 3 quarters).",
                    "Highly volatile bank balance trends showing tight working capital buffers.",
                    "EPFO payroll contributions are irregular (delayed payments)."
                ],
                status: "Cautionary Cash Flow",
                desc: "Decent revenue base, but credit indicators show persistent working capital stress. GST and EPFO compliance delays recommend caution. Conditional approval with daily UPI sweepback."
            },
            hi: {
                strengths: [
                    "वाणिज्यिक सेवा ग्राहकों में मध्यम समग्र नकदी प्रवाह आकार।",
                    "निरंतर ईंधन/बिजली खर्च रिकॉर्ड द्वारा समर्थित सक्रिय रसद बेड़े का संचालन।"
                ],
                risks: [
                    "अनियमित जीएसटी फाइलिंग (पिछली 3 तिमाहियों में औसतन 18 दिन की देरी)।",
                    "तंग कार्यशील पूंजी बफर दिखाने वाली अत्यधिक अस्थिर बैंक बैलेंस प्रवृत्तियां।",
                    "ईपीएफओ पेरोल योगदान अनियमित है (विलंबित भुगतान)।"
                ],
                status: "चेतावनीपूर्ण नकदी प्रवाह",
                desc: "अच्छा राजस्व आधार, लेकिन ऋण संकेतक लगातार कार्यशील पूंजी तनाव दिखाते हैं। जीएसटी और ईपीएफओ अनुपालन में देरी सावधानी की सिफारिश करती है। दैनिक यूपीआई स्वीपबैक के साथ सशर्त स्वीकृति।"
            },
            mr: {
                strengths: [
                    "व्यावसायिक सेवा ग्राहकांमध्ये मध्यम एकूण रोख प्रवाह आकार।",
                    "सतत इंधन/वीज खर्च नोंदीद्वारे समर्थित सक्रिय वाहतूक ताफा ऑपरेशन्स।"
                ],
                risks: [
                    "अनियमित जीएसटी फाइलिंग (मागील ३ तिमाह्यांमध्ये सरासरी १८ दिवसांचा विलंब)।",
                    "कमी बँक बॅलन्ससह खेळत्या भांडवलाची तीव्र टंचाई दर्शवणारी अस्थिरता।",
                    "ईपीएफओ योगदान अनियमित आहे (उशिरा पेमेंट)।"
                ],
                status: "काळजीपूर्वक हाताळणी",
                desc: "चांगला महसूल आधार, परंतु क्रेडिट निर्देशक सतत खेळत्या भांडवलाचा ताण दर्शवतात। जीएसटी आणि ईपीएफओ विलंबासाठी खबरदारीची शिफारस। दैनिक यूपीआय स्वीपबॅकसह सशर्त मंजुरी।"
            }
        }
    },
    garment: {
        name: "Vertex Garments India",
        id: "1932",
        type: "manufacturing",
        metrics: {
            gst: 210000,
            gstFilingRate: 62.0,
            upiFreq: 5,
            upiMonthlyVal: 22000,
            upiAvgTicket: 450,
            epfoStaff: 2,
            powerConsumption: 410,
            aaBalance: 5000
        },
        aiRemarks: {
            en: {
                strengths: [
                    "Low overhead operating model.",
                    "Basic physical presence in verified clothing cluster."
                ],
                risks: [
                    "Severe tax compliance delinquency (GST filing rate at 62%).",
                    "Operational contraction: Power consumption dropped 40% quarter-on-quarter, indicating factory idle states.",
                    "Very high risk profile with critical cash balance deficits."
                ],
                status: "High Risk / No-Go",
                desc: "Severe operational contraction detected via utility logs. Disciplinary tax filing defaults. High probability of default (PD). Recommended for immediate rejection."
            },
            hi: {
                strengths: [
                    "कम ओवरहेड ऑपरेटिंग मॉडल।",
                    "सत्यापित कपड़ा क्लस्टर में बुनियादी भौतिक उपस्थिति।"
                ],
                risks: [
                    "गंभीर कर अनुपालन चूक (जीएसटी फाइलिंग दर 62% पर)।",
                    "परिचालन संकुचन: बिजली की खपत तिमाही-दर-तिमाही 40% कम हुई, जो कारखाने के निष्क्रिय होने का संकेत देती है।",
                    "महत्वपूर्ण नकद शेष घाटे के साथ बहुत उच्च जोखिम प्रोफ़ाइल।"
                ],
                status: "उच्च जोखिम / नो-गो",
                desc: "बिजली उपयोगिता लॉग के माध्यम से गंभीर परिचालन संकुचन का पता चला। अनुशासनात्मक कर फाइलिंग चूक। डिफ़ॉल्ट की उच्च संभावना। तत्काल अस्वीकार करने की सिफारिश की जाती है।"
            },
            mr: {
                strengths: [
                    "कमी ओव्हरहेड ऑपरेटिंग मॉडेल।",
                    "प्रमाणित कपड्यांच्या क्लस्टरमध्ये प्राथमिक भौतिक उपस्थिती।"
                ],
                risks: [
                    "गंभीर कर अनुपालन चूक (जीएसटी फाइलिंग दर केवळ ६२%)।",
                    "ऑपरेशनल घसरण: वीज वापर तिमाही-दर-तिमाही ४०% कमी झाला, जे कारखाना बंद असल्याचे दर्शवते।",
                    "अत्यंत कमी शिल्लक रकमेसह खूप जास्त क्रेडिट जोखीम।"
                ],
                status: "उच्च जोखीम / नो-गो",
                desc: "वीज वापर नोंदीद्वारे गंभीर उत्पादन घसरण आढळली। कर भरण्यात शिस्तीचा अभाव। कर्ज बुडवण्याची दाट शक्यता। त्वरित नाकारण्याची शिफारस केली जाते।"
            }
        }
    }
};

// 2. DYNAMIC APP VARIABLES
let currentProfileKey = "kirana";
let currentLanguage = "en";
let radarChartInstance = null;
let gaugeChartInstance = null;

// DOM Elements
const profileButtons = document.querySelectorAll(".profile-btn");
const sliders = document.querySelectorAll(".param-slider");
const resetSlidersBtn = document.getElementById("reset-sliders-btn");
const disburseBtn = document.getElementById("disburse-btn");
const fileInput = document.getElementById("file-input");
const uploadZone = document.getElementById("upload-zone");
const uploadTriggerBtn = document.getElementById("upload-trigger-btn");
const uploadSuccessToast = document.getElementById("upload-success-toast");
const langButtons = document.querySelectorAll(".lang-btn");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const terminalBody = document.getElementById("api-terminal-body");

// Sliders Elements
const gstSlider = document.getElementById("gst-slider");
const upiSlider = document.getElementById("upi-slider");
const epfoSlider = document.getElementById("epfo-slider");
const powerSlider = document.getElementById("power-slider");
const aaSlider = document.getElementById("aa-slider");

// Labels Elements
const gstLabel = document.getElementById("gst-val-label");
const upiLabel = document.getElementById("upi-val-label");
const epfoLabel = document.getElementById("epfo-val-label");
const powerLabel = document.getElementById("power-val-label");
const aaLabel = document.getElementById("aa-val-label");

// Card Display Elements
const cardElement = document.getElementById("sahyog-credit-card");
const cardName = document.getElementById("card-name");
const cardId = document.getElementById("card-id");
const cardScore = document.getElementById("card-score");
const cardGrade = document.getElementById("card-grade");
const cardDecisionBadge = document.getElementById("card-decision-badge");
const statusIndicatorBadge = document.getElementById("status-indicator-badge");
const statusText = document.getElementById("status-text");
const statusDescText = document.getElementById("status-desc-text");
const gaugeScoreVal = document.getElementById("gauge-score-val");

// Details Elements
const gstTurnover = document.getElementById("gst-turnover");
const gstFilingRate = document.getElementById("gst-filing-rate");
const gstConcentration = document.getElementById("gst-concentration");
const gstGrowth = document.getElementById("gst-growth");

const upiMonthlyVal = document.getElementById("upi-monthly-val");
const upiTxCount = document.getElementById("upi-tx-count");
const upiTicketSize = document.getElementById("upi-ticket-size");
const upiVelocity = document.getElementById("upi-velocity");

const epfoStaffCount = document.getElementById("epfo-staff-count");
const epfoFrequency = document.getElementById("epfo-frequency");
const epfoSalaryBase = document.getElementById("epfo-salary-base");
const epfoRetention = document.getElementById("epfo-retention");

const powerMonthlyUnits = document.getElementById("power-monthly-units");
const powerPaymentTime = document.getElementById("power-payment-time");
const powerStability = document.getElementById("power-stability");
const powerDiscomArea = document.getElementById("power-discom-area");

// AI Insights Elements
const aiStrengthsList = document.getElementById("ai-strengths-list");
const aiRisksList = document.getElementById("ai-risks-list");

// Recommended Loan Term Elements (Manager Override Override)
const termLimitInput = document.getElementById("term-limit-input");
const termRateInput = document.getElementById("term-rate-input");
const termTenureInput = document.getElementById("term-tenure-input");
const termRouteInput = document.getElementById("term-route-input");
const termSweepbackInput = document.getElementById("term-sweepback-input");

// Risk Underwriting Controls Check Elements
const doubleFinancingIcon = document.querySelector("#check-double-financing .check-icon");
const doubleFinancingStatus = document.getElementById("status-double-financing");

const assetPledgeIcon = document.querySelector("#check-asset-pledge .check-icon");
const assetPledgeStatus = document.getElementById("status-asset-pledge");

const supplierComplianceIcon = document.querySelector("#check-supplier-compliance .check-icon");
const supplierComplianceStatus = document.getElementById("status-supplier-compliance");

const powerVitalityIcon = document.querySelector("#check-power-vitality .check-icon");
const powerVitalityStatus = document.getElementById("status-power-vitality");

// 3. CORE SCORING & LOGIC ENGINE

// Helper to format currency
function formatINR(value) {
    if (value >= 10000000) {
        return "₹ " + (value / 10000000).toFixed(2) + " Cr";
    } else if (value >= 100000) {
        return "₹ " + (value / 100000).toFixed(2) + "L";
    } else {
        return "₹ " + value.toLocaleString("en-IN");
    }
}

// Calculate credit score out of 1000 dynamically based on alternative features
function calculateSahyogScore(gstVal, upiDailyTx, epfoStaffVal, powerVal, aaVal, profileType, gstFilingRateVal) {
    // 1. GST Score Component (Max 280)
    // Scale turnover to a benchmark of 24L per year (2L per month) and compliance filings
    let gstVolumeScore = Math.min(180, (gstVal / 1500000) * 180);
    let gstComplianceScore = (gstFilingRateVal / 100) * 100;
    let totalGstScore = gstVolumeScore + gstComplianceScore;

    // 2. UPI Score Component (Max 260)
    // Scale transaction frequency (velocity) and monthly receipt amounts
    let upiVelocityScore = Math.min(130, (upiDailyTx / 150) * 130);
    let upiVolumeScore = Math.min(130, ((upiDailyTx * 30 * 1000) / 500000) * 130);
    let totalUpiScore = upiVelocityScore + upiVolumeScore;

    // 3. EPFO Workforce Score Component (Max 180)
    // Number of active workers is a proxy for formal organizational scale
    let totalEpfoScore = 0;
    if (epfoStaffVal > 0) {
        totalEpfoScore = Math.min(180, 50 + (epfoStaffVal / 20) * 130);
        // Ensure retail/service gets at least the sole-proprietorship baseline score
        if (profileType === "retail" || profileType === "service") {
            totalEpfoScore = Math.max(totalEpfoScore, 135);
        }
    } else {
        // Retail/Service sole proprietors do not have registered corporate workers, do not penalize them
        if (profileType === "retail" || profileType === "service") {
            totalEpfoScore = 135;
        } else {
            totalEpfoScore = (gstVal > 500000) ? 60 : 30;
        }
    }

    // 4. Operational Vitality DISCOM Score Component (Max 180)
    // Power consumption stability. Manufacturing units rely on utility energy heavy
    let totalPowerScore = 0;
    if (profileType === "manufacturing") {
        totalPowerScore = Math.min(180, (powerVal / 5000) * 180);
    } else {
        // Retail/Services consume less power, benchmark scale accordingly (maxed at 400 kWh)
        totalPowerScore = Math.min(180, (powerVal / 400) * 180);
    }
    // Baseline electricity operational score for minimal utility setups
    if (totalPowerScore < 40 && powerVal > 50) totalPowerScore = 50;

    // 5. Account Aggregator Balance Score Component (Max 100)
    // Average end-of-day buffer balances
    let totalAaScore = Math.min(100, (aaVal / 250000) * 100);

    // Summate parts
    let finalScore = Math.round(totalGstScore + totalUpiScore + totalEpfoScore + totalPowerScore + totalAaScore);
    
    // Safety caps
    finalScore = Math.max(300, Math.min(990, finalScore));
    return {
        score: finalScore,
        dimensions: {
            gst: Math.round((totalGstScore / 280) * 100),
            upi: Math.round((totalUpiScore / 260) * 100),
            epfo: Math.round((totalEpfoScore / 180) * 100),
            discom: Math.round((totalPowerScore / 180) * 100),
            aa: Math.round((totalAaScore / 100) * 100)
        }
    };
}

// 4. UI RENDER ENGINE

function updateDashboard() {
    const profile = profiles[currentProfileKey];
    
    // Gather current slider metrics
    const gstVal = parseInt(gstSlider.value);
    const upiDailyTx = parseInt(upiSlider.value);
    const epfoStaffVal = parseInt(epfoSlider.value);
    const powerVal = parseInt(powerSlider.value);
    const aaVal = parseInt(aaSlider.value);
    const gstFilingRateVal = profile.metrics.gstFilingRate || 95.0; // Fallback to 95% if 0

    // Calculate score
    const assessment = calculateSahyogScore(gstVal, upiDailyTx, epfoStaffVal, powerVal, aaVal, profile.type, gstFilingRateVal);
    const score = assessment.score;
    const dimensions = assessment.dimensions;

    // Determine category
    let decision = "YES-GO";
    let creditGrade = "A";
    let statusClass = "tag-yes";
    let glowClass = "glow-yes";
    let badgeClass = "badge-yes";
    let indicatorClass = "indicator-yes";

    if (score >= 720) {
        decision = "YES-GO";
        creditGrade = score >= 850 ? "A+" : "A";
        statusClass = "tag-yes";
        glowClass = "glow-yes";
        badgeClass = "badge-yes";
        indicatorClass = "indicator-yes";
    } else if (score >= 520 && score < 720) {
        decision = "CAUTION";
        creditGrade = score >= 620 ? "B" : "B-";
        statusClass = "tag-caution";
        glowClass = "glow-caution";
        badgeClass = "badge-caution";
        indicatorClass = "indicator-caution";
    } else {
        decision = "NO-GO";
        creditGrade = "D";
        statusClass = "tag-nogo";
        glowClass = "glow-nogo";
        badgeClass = "badge-nogo";
        indicatorClass = "indicator-nogo";
    }

    // Update Slider Labels
    gstLabel.textContent = formatINR(gstVal);
    upiLabel.textContent = upiDailyTx + " tx/day";
    epfoLabel.textContent = epfoStaffVal + " employees";
    powerLabel.textContent = powerVal.toLocaleString() + " kWh";
    aaLabel.textContent = formatINR(aaVal);

    // Update Financial Credit Card
    cardName.textContent = profile.name;
    cardId.textContent = profile.id;
    cardScore.textContent = score;
    cardGrade.textContent = creditGrade;
    cardDecisionBadge.textContent = decision;
    
    // Adjust Card Glow Classes
    cardElement.className = "sahyog-card " + glowClass;
    cardDecisionBadge.className = "card-badge " + badgeClass;

    // Update Gauge Center Text & Rating Status Indicator
    gaugeScoreVal.textContent = score;
    statusIndicatorBadge.className = "status-indicator " + indicatorClass;
    
    // If it's a custom merchant, dynamically generate remarks based on score and inputs
    if (currentProfileKey.startsWith("custom_")) {
        const hasData = (gstVal > 0 || upiDailyTx > 0 || powerVal > 0);
        if (!hasData) {
            profile.aiRemarks = {
                en: {
                    strengths: ["New Profile: Awaiting alternate data file ingestion."],
                    risks: ["No digital footprints loaded yet. Drag-and-drop sample files below."],
                    status: "Awaiting Ingest",
                    desc: "This profile has no alternate data footprints loaded. Please upload invoices, UPI statements, or electricity logs to simulate scoring."
                },
                hi: {
                    strengths: ["नई प्रोफाइल: डेटा फ़ाइल अपलोड के लिए तैयार।"],
                    risks: ["अभी तक कोई डिजिटल फुटप्रिंट लोड नहीं किया गया है।"],
                    status: "डेटा प्रतीक्षा में",
                    desc: "इस प्रोफाइल में कोई वैकल्पिक डेटा फुटप्रिंट लोड नहीं है। स्कोरिंग शुरू करने के लिए कृपया इनवॉइस या यूपीआई लॉग अपलोड करें।"
                },
                mr: {
                    strengths: ["नवीन प्रोफाइल: डेटा फाइल लोड करण्यासाठी सज्ज."],
                    risks: ["अद्याप कोणताही डिजिटल इतिहास उपलब्ध नाही."],
                    status: "डेटाची प्रतीक्षा",
                    desc: "या प्रोफाईलमध्ये कोणताही पर्यायी डेटा लोड केलेला नाही. तपासणी सुरू करण्यासाठी कृपया जीएसटी किंवा युपीआय लॉग अपलोड करा."
                }
            };
        } else {
            let statusTextVal = "Custom Evaluation";
            let descVal = "Evaluating alternative data inputs dynamically adjusted by credit officer.";
            let strengthsList = ["Alternate data inputs parsed and validated."];
            let risksList = ["Manual calibration active. Cross-referencing against industry segment benchmarks."];

            if (score >= 720) {
                statusTextVal = "High Credit Vitality";
                descVal = "Calculated Sahyog Score represents strong operational health, clean GSTR records, and solid cash flow patterns.";
                strengthsList = [
                    "Active digital business footprints verified.",
                    "GST return filing patterns are consistent and compliant.",
                    "Operational energy logs confirm continuous utility activity."
                ];
                risksList = [
                    "Slight dependency on single-buyer concentration noted.",
                    "Verify current account ledger via AA gateway upon onboarding."
                ];
            } else if (score >= 520) {
                statusTextVal = "Moderate Risk Profile";
                descVal = "Alternate parameters indicate viable micro-business with minor cash flow variances. Recommended for capped working capital.";
                strengthsList = [
                    "Active UPI transaction collections recorded daily.",
                    "Supplier tax compliance index is within acceptable limits."
                ];
                risksList = [
                    "Working capital cycles reflect micro-enterprise limits.",
                    "Delayed GSTR filings recorded in historical data logs."
                ];
            } else {
                statusTextVal = "Stressed/High Risk Profile";
                descVal = "Warning: Ingested alternate data reflects very low utility load or significant invoice de-duplication anomalies.";
                strengthsList = [
                    "Basic identity parameters registered on ULI node."
                ];
                risksList = [
                    "Operational inactivity alert: extremely low power usage.",
                    "Zero monthly GST turnover or active transaction logs parsed.",
                    "High risk of double financing detected in mock registry checks."
                ];
            }

            profile.aiRemarks = {
                en: { strengths: strengthsList, risks: risksList, status: statusTextVal, desc: descVal },
                hi: {
                    strengths: strengthsList.map(s => "सत्यापित: " + s),
                    risks: risksList.map(r => "जोखिम: " + r),
                    status: "कस्टम मूल्यांकन",
                    desc: descVal
                },
                mr: {
                    strengths: strengthsList.map(s => "प्रमाणित: " + s),
                    risks: risksList.map(r => "जोखिम: " + r),
                    status: "कस्टम मूल्यांकन",
                    desc: descVal
                }
            };
        }
    }

    // Fetch appropriate language pack for descriptions
    const langPack = profile.aiRemarks[currentLanguage];
    statusText.textContent = langPack.status;
    statusDescText.textContent = langPack.desc;

    // Update Alternative Data Detailed Tables
    gstTurnover.textContent = formatINR(gstVal * 12);
    gstFilingRate.textContent = gstFilingRateVal.toFixed(1) + "%";
    gstFilingRate.className = "m-val " + (gstFilingRateVal >= 90 ? "success-text" : gstFilingRateVal >= 75 ? "warning-text" : "danger-text");
    gstConcentration.textContent = profile.type === "manufacturing" ? "Low (Auto OEMs)" : "N/A (Granular B2C)";
    gstGrowth.textContent = gstVal > 700000 ? "+12.4% YoY" : "-3.1% YoY";
    gstGrowth.className = "m-val " + (gstVal > 700000 ? "success-text" : "danger-text");

    // Calculate monthly UPI volume estimate
    const avgTicket = profile.metrics.upiAvgTicket || 2500;
    const estUpiMonthly = upiDailyTx * 30 * avgTicket;
    upiMonthlyVal.textContent = formatINR(estUpiMonthly);
    upiTxCount.textContent = (upiDailyTx * 30).toLocaleString() + " / month";
    upiTicketSize.textContent = "₹ " + avgTicket.toLocaleString();
    upiVelocity.textContent = upiDailyTx >= 50 ? "High Inflow Velocity" : "Moderate Velocity";
    upiVelocity.className = "m-val " + (upiDailyTx >= 50 ? "success-text" : "warning-text");

    // EPFO
    epfoStaffCount.textContent = epfoStaffVal + " Active Employees";
    epfoFrequency.textContent = epfoStaffVal > 0 ? "12/12 Months Contributed" : "N/A";
    epfoFrequency.className = "m-val " + (epfoStaffVal > 0 ? "success-text" : "text-muted");
    epfoSalaryBase.textContent = epfoStaffVal > 0 ? "₹ 18,500 Avg Base" : "N/A";
    epfoRetention.textContent = epfoStaffVal > 0 ? "88% Retention" : "N/A";

    // Power Utilities
    powerMonthlyUnits.textContent = powerVal.toLocaleString() + " kWh / month";
    powerStability.textContent = powerVal > 1500 ? "Active Load (92% Stability)" : "Light Load (Standard)";
    powerStability.className = "m-val " + (powerVal > 1500 ? "success-text" : "text-muted");

    // Update AI Insights
    aiStrengthsList.innerHTML = "";
    langPack.strengths.forEach(str => {
        const li = document.createElement("li");
        li.textContent = str;
        aiStrengthsList.appendChild(li);
    });

    aiRisksList.innerHTML = "";
    langPack.risks.forEach(risk => {
        const li = document.createElement("li");
        li.textContent = risk;
        aiRisksList.appendChild(li);
    });

    // Update recommended Loan Terms
    let approvedLimit = 0;
    let interestRate = "10.25% p.a.";
    let tenure = "18 Months";

    if (decision === "YES-GO") {
        // Limit calculation based on monthly revenues (GST & UPI)
        approvedLimit = Math.round((gstVal * 1.5 + estUpiMonthly * 0.8) / 50000) * 50000;
        approvedLimit = Math.min(2500000, Math.max(200000, approvedLimit));
        interestRate = score >= 850 ? "9.75% p.a. (Prime)" : "10.50% p.a.";
        tenure = "18 to 24 Months";
    } else if (decision === "CAUTION") {
        approvedLimit = Math.round((gstVal * 0.6 + estUpiMonthly * 0.3) / 25000) * 25000;
        approvedLimit = Math.min(750000, Math.max(100000, approvedLimit));
        interestRate = "12.50% p.a.";
        tenure = "12 Months (Restricted)";
    } else {
        approvedLimit = 0;
        interestRate = "N/A";
        tenure = "N/A";
    }

    if (decision === "NO-GO") {
        termLimitInput.disabled = true;
        termRateInput.disabled = true;
        termTenureInput.disabled = true;
    } else {
        termLimitInput.disabled = false;
        termRateInput.disabled = false;
        termTenureInput.disabled = false;
    }

    termLimitInput.value = approvedLimit > 0 ? "₹ " + approvedLimit.toLocaleString("en-IN") : "REJECTED";
    termRateInput.value = interestRate;
    termTenureInput.value = tenure;
    termRouteInput.value = epfoStaffVal > 0 ? "EPFO + ULI Gateway" : "UPI Flow + ULI Gateway";

    // Update Underwriting Risk Controls Checks
    updateRiskChecks(score, gstFilingRateVal, powerVal, profile.type);

    // Update Charts data
    updateCharts(dimensions, score);
}

function updateRiskChecks(score, gstFilingRateVal, powerVal, profileType) {
    if (!doubleFinancingIcon || !doubleFinancingStatus) return;

    // 1. GST Invoice De-duplication Check
    if (gstFilingRateVal >= 90) {
        doubleFinancingIcon.className = "check-icon icon-verify";
        doubleFinancingIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        doubleFinancingStatus.textContent = "Verified Clean (No duplicates)";
    } else if (gstFilingRateVal >= 75) {
        doubleFinancingIcon.className = "check-icon icon-warning";
        doubleFinancingIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
        doubleFinancingStatus.textContent = "Pending invoice lock check";
    } else {
        doubleFinancingIcon.className = "check-icon icon-fail";
        doubleFinancingIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        doubleFinancingStatus.textContent = "Invoice double financed at Bank B";
    }

    // 2. Multiple Asset Pledging Check (CERSAI registry)
    if (score >= 700) {
        assetPledgeIcon.className = "check-icon icon-verify";
        assetPledgeIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        assetPledgeStatus.textContent = "No charge alerts (CERSAI clear)";
    } else if (score >= 500) {
        assetPledgeIcon.className = "check-icon icon-warning";
        assetPledgeIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
        assetPledgeStatus.textContent = "1 active asset charge recorded";
    } else {
        assetPledgeIcon.className = "check-icon icon-fail";
        assetPledgeIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        assetPledgeStatus.textContent = "Alert: Asset double-pledged";
    }

    // 3. Supplier GST Compliance Index (ITC recovery stability)
    if (score >= 700) {
        supplierComplianceIcon.className = "check-icon icon-verify";
        supplierComplianceIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        supplierComplianceStatus.textContent = "94% Supplier tax compliance";
    } else if (score >= 500) {
        supplierComplianceIcon.className = "check-icon icon-warning";
        supplierComplianceIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
        supplierComplianceStatus.textContent = "81% Supplier tax compliance";
    } else {
        supplierComplianceIcon.className = "check-icon icon-fail";
        supplierComplianceIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        supplierComplianceStatus.textContent = "58% Supplier filing rate (ITC risk)";
    }

    // 4. Operational Vitality DISCOM smart-meter load validation
    if (profileType === "manufacturing") {
        if (powerVal >= 3000) {
            powerVitalityIcon.className = "check-icon icon-verify";
            powerVitalityIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
            powerVitalityStatus.textContent = "Active load: verified operation";
        } else if (powerVal >= 1000) {
            powerVitalityIcon.className = "check-icon icon-warning";
            powerVitalityIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
            powerVitalityStatus.textContent = "Idle load capacity matches shifts";
        } else {
            powerVitalityIcon.className = "check-icon icon-fail";
            powerVitalityIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
            powerVitalityStatus.textContent = "Low load: Factory inactive";
        }
    } else {
        // Retail or service sector
        if (powerVal >= 200) {
            powerVitalityIcon.className = "check-icon icon-verify";
            powerVitalityIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
            powerVitalityStatus.textContent = "Regular hours active load";
        } else {
            powerVitalityIcon.className = "check-icon icon-warning";
            powerVitalityIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
            powerVitalityStatus.textContent = "Low utility activity registered";
        }
    }
}

// 5. CHARTS INITIALIZATION & UPDATE

function initCharts() {
    // Radar Chart initialization
    const radarCtx = document.getElementById("radarChart").getContext("2d");
    
    // Set custom grid options for dark mode readability
    Chart.defaults.color = '#9ca3af';
    Chart.defaults.font.family = "'Inter', sans-serif";

    radarChartInstance = new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['Revenue Scale (GST)', 'Cashflow Speed (UPI)', 'Payroll Scale (EPFO)', 'Operational Power (DISCOM)', 'Cash Buffer (AA)'],
            datasets: [{
                label: 'MSME Risk Fingerprint',
                data: [80, 70, 0, 50, 60],
                backgroundColor: 'rgba(0, 94, 58, 0.25)',
                borderColor: '#005e3a',
                borderWidth: 2,
                pointBackgroundColor: '#ff3c00',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ff3c00'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.08)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.08)'
                    },
                    pointLabels: {
                        font: {
                            size: 9,
                            weight: '500'
                        },
                        color: '#9ca3af'
                    },
                    ticks: {
                        display: false,
                        maxTicksLimit: 5
                    },
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Gauge Chart initialization (Semi-doughnut)
    const gaugeCtx = document.getElementById("gaugeChart").getContext("2d");
    gaugeChartInstance = new Chart(gaugeCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [785, 215],
                backgroundColor: [
                    '#005e3a',
                    '#1f2f35'
                ],
                borderWidth: 0,
                cutout: '80%'
            }]
        },
        options: {
            rotation: -90,
            circumference: 180,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });
}

function updateCharts(dimensions, score) {
    if (!radarChartInstance || !gaugeChartInstance) return;

    // Update Radar
    radarChartInstance.data.datasets[0].data = [
        dimensions.gst,
        dimensions.upi,
        dimensions.epfo,
        dimensions.discom,
        dimensions.aa
    ];

    // Dynamic color matching based on score tier
    let colorHex = '#10b981'; // Yes-Go (Green)
    let fillHex = 'rgba(16, 185, 129, 0.25)';
    if (score < 520) {
        colorHex = '#ef4444'; // No-Go (Red)
        fillHex = 'rgba(239, 68, 68, 0.25)';
    } else if (score < 720) {
        colorHex = '#f59e0b'; // Caution (Yellow)
        fillHex = 'rgba(245, 158, 11, 0.25)';
    }

    radarChartInstance.data.datasets[0].borderColor = colorHex;
    radarChartInstance.data.datasets[0].backgroundColor = fillHex;
    radarChartInstance.update();

    // Update Gauge
    gaugeChartInstance.data.datasets[0].data = [score, 1000 - score];
    gaugeChartInstance.data.datasets[0].backgroundColor = [colorHex, '#1c282c'];
    gaugeChartInstance.update();
}

// 6. INITIALIZATION & PROFILE TRIGGERS

function applyProfile(profileKey) {
    currentProfileKey = profileKey;
    const profile = profiles[profileKey];
    
    // Set Slider values to profile values
    gstSlider.value = profile.metrics.gst;
    upiSlider.value = profile.metrics.upiFreq;
    epfoSlider.value = profile.metrics.epfoStaff;
    powerSlider.value = profile.metrics.powerConsumption;
    aaSlider.value = profile.metrics.aaBalance;

    // Reset profile button active classes
    profileButtons.forEach(btn => {
        if (btn.dataset.profile === profileKey) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Reset terminal logs on merchant change
    terminalBody.innerHTML = `<div class="log-line text-muted">// Ready for credit sanction trigger for ${profile.name}...</div>`;
    disburseBtn.disabled = false;
    disburseBtn.style.opacity = 1;

    updateDashboard();
}

// Sliders manual tweaker events
sliders.forEach(slider => {
    slider.addEventListener("input", updateDashboard);
});

// Preset buttons trigger
profileButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        applyProfile(btn.dataset.profile);
    });
});

// Reset button resets sliders to currently active preset metrics
resetSlidersBtn.addEventListener("click", () => {
    applyProfile(currentProfileKey);
});

// Language Switch triggers
langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        langButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentLanguage = btn.dataset.lang;
        updateDashboard();
    });
});

// Details Widgets tabs navigation
tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
    });
});

// 7. FILE UPLOAD PARSING SIMULATION

uploadTriggerBtn.addEventListener("click", () => fileInput.click());
uploadZone.addEventListener("click", (e) => {
    if (e.target !== uploadTriggerBtn) fileInput.click();
});

fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
        handleIngestedFile(e.target.files[0]);
    }
});

uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadZone.style.borderColor = "#ff5a00";
});

uploadZone.addEventListener("dragleave", () => {
    uploadZone.style.borderColor = "var(--border-color)";
});

uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadZone.style.borderColor = "var(--border-color)";
    if (e.dataTransfer.files.length > 0) {
        handleIngestedFile(e.dataTransfer.files[0]);
    }
});

function handleIngestedFile(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        let parsedVal = null;
        let fileTypeDetected = "";

        // 1. Try parsing as JSON (GST Return)
        if (file.name.endsWith(".json")) {
            try {
                const data = JSON.parse(content);
                if (data.gstn_return_filing && data.gstn_return_filing.invoice_summary) {
                    const gstVal = data.gstn_return_filing.invoice_summary.total_taxable_value;
                    gstSlider.value = Math.min(3000000, gstVal);
                    
                    const profile = profiles[currentProfileKey];
                    profile.metrics.gstFilingRate = 98.5; // Update GST filing rate!

                    fileTypeDetected = "GST Return Invoices";
                    writeTerminalLog(`[PARSER] Successfully decoded GST return for: ${data.gstn_return_filing.trade_name}`, "log-success");
                    writeTerminalLog(`[PARSER] Found monthly taxable sales: ₹${gstVal.toLocaleString("en-IN")}`, "log-success");
                } else if (data.epfo_payroll_return) {
                    const staffVal = data.epfo_payroll_return.number_of_members;
                    epfoSlider.value = Math.min(100, staffVal);
                    
                    fileTypeDetected = "EPFO Payroll Registry";
                    writeTerminalLog(`[PARSER] Decoded EPFO payroll registry for: ${data.epfo_payroll_return.company_name}`, "log-success");
                    writeTerminalLog(`[PARSER] Extracted staff count: ${staffVal} active employees`, "log-success");
                }
            } catch (err) {
                console.error("JSON parsing error:", err);
            }
        } 
        // 2. Try parsing as XML (DISCOM Electricity)
        else if (file.name.endsWith(".xml")) {
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(content, "text/xml");
                const unitsNode = xmlDoc.getElementsByTagName("units_consumed_kwh")[0];
                const registeredNameNode = xmlDoc.getElementsByTagName("registered_name")[0];
                
                if (unitsNode) {
                    const unitsVal = parseInt(unitsNode.textContent);
                    powerSlider.value = Math.min(10000, unitsVal);
                    fileTypeDetected = "DISCOM Electricity Statement";
                    const regName = registeredNameNode ? registeredNameNode.textContent : "Unknown";
                    writeTerminalLog(`[PARSER] Decoded utility load statement for: ${regName}`, "log-success");
                    writeTerminalLog(`[PARSER] Extracted units consumed: ${unitsVal} kWh`, "log-success");
                }
            } catch (err) {
                console.error("XML parsing error:", err);
            }
        }
        // 3. Try parsing as CSV (UPI Transactions)
        else if (file.name.endsWith(".csv")) {
            try {
                const lines = content.split("\n");
                let successCount = 0;
                let totalAmount = 0;
                for (let i = 1; i < lines.length; i++) {
                    const cols = lines[i].split(",");
                    if (cols.length >= 6) {
                        const status = cols[4] ? cols[4].trim() : "";
                        const amount = parseFloat(cols[5]);
                        if (!isNaN(amount)) {
                            successCount++;
                            totalAmount += amount;
                        }
                    }
                }
                
                if (successCount > 0) {
                    const txCount = successCount;
                    upiSlider.value = Math.min(500, txCount * 10); // Scale up to daily proxy
                    aaSlider.value = Math.min(500000, totalAmount * 1.2); // Set average balance based on transaction totals
                    
                    // Store the computed average ticket size in the active profile metrics
                    const profile = profiles[currentProfileKey];
                    profile.metrics.upiAvgTicket = Math.round(totalAmount / successCount);

                    fileTypeDetected = "UPI Settlement Ledger";
                    writeTerminalLog(`[PARSER] Decoded UPI transactions list. Record count: ${successCount}`, "log-success");
                    writeTerminalLog(`[PARSER] Calculated Avg Ticket Size: ₹${profile.metrics.upiAvgTicket.toLocaleString("en-IN")}`, "log-success");
                    writeTerminalLog(`[PARSER] Simulated Daily Tx frequency: ${upiSlider.value} tx/day`, "log-success");
                }
            } catch (err) {
                console.error("CSV parsing error:", err);
            }
        }

        if (fileTypeDetected) {
            writeTerminalLog(`[SYSTEM] Applied Alternate data inputs to Sahyog calculations.`, "log-system");
            
            // Sync slider changes back to profile metrics so updates persist in the custom profile
            const profile = profiles[currentProfileKey];
            profile.metrics.gst = parseInt(gstSlider.value);
            profile.metrics.upiFreq = parseInt(upiSlider.value);
            profile.metrics.epfoStaff = parseInt(epfoSlider.value);
            profile.metrics.powerConsumption = parseInt(powerSlider.value);
            profile.metrics.aaBalance = parseInt(aaSlider.value);

            updateDashboard();
            
            // Show toast notification
            uploadSuccessToast.classList.remove("hidden");
            uploadSuccessToast.innerHTML = `<i class="fa-solid fa-circle-check"></i> Ingested ${fileTypeDetected} successfully!`;
            setTimeout(() => {
                uploadSuccessToast.classList.add("hidden");
            }, 4000);
        } else {
            writeTerminalLog(`[ERROR] File format or schema mismatch. Ingestion bypassed.`, "log-err");
        }
    };

    reader.readAsText(file);
}

// 8. ULI & OCEN GATEWAY API HANDSHAKE LOGS

function writeTerminalLog(text, colorClass = "") {
    const line = document.createElement("div");
    line.className = "log-line " + colorClass;
    line.textContent = text;
    terminalBody.appendChild(line);
    // Auto-scroll
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

disburseBtn.addEventListener("click", () => {
    const profile = profiles[currentProfileKey];
    const scoreVal = parseInt(cardScore.textContent);
    const limitVal = termLimitInput.value;
    const rateVal = termRateInput.value;
    const tenureVal = termTenureInput.value;

    if (limitVal === "REJECTED") {
        terminalBody.innerHTML = "";
        writeTerminalLog(">>> API TRANSACTIONS CANCELLED", "log-err");
        writeTerminalLog("[ERROR] Account score is below underwriting safety thresholds.", "log-err");
        writeTerminalLog("[REJECTION] Sahyog scoring rules prevent ULI pipeline disbursement.", "log-err");
        return;
    }

    // Lock button while animating
    disburseBtn.disabled = true;
    disburseBtn.style.opacity = 0.5;
    terminalBody.innerHTML = "";

    // Execution sequence logs mimicking standard ULI / OCEN protocol
    setTimeout(() => {
        writeTerminalLog(">>> INITIALIZING DIGITAL DISBURSEMENT PIPELINE", "log-out");
        writeTerminalLog("[AA] Triggering Account Aggregator consent validation...", "log-system");
    }, 100);

    setTimeout(() => {
        writeTerminalLog(`[AA] Consent valid. Handshaked with token: aa_session_${profile.id}_tkn`, "log-success");
        writeTerminalLog("[ULI] Resolving Unified Lending Interface node routing...", "log-system");
    }, 1000);

    setTimeout(() => {
        writeTerminalLog("[ULI] Route established: idbi_uli_node_gateway_prod", "log-success");
        writeTerminalLog("[ULI] Ingesting Sahyog scoring parameters to Underwrite Decision Engine...", "log-system");
    }, 2000);

    setTimeout(() => {
        const sweepbackVal = termSweepbackInput.value;
        writeTerminalLog(`[ULI] Score Verified: ${scoreVal} / 1000`, "log-success");
        writeTerminalLog("[ULI] Risk checks complete. GST Invoice authenticity validated.", "log-success");
        writeTerminalLog(`[OCEN] Dispatching Credit Offer terms for contract signing...`, "log-system");
        writeTerminalLog(`      - Approved Amount: ${limitVal}`, "log-in");
        writeTerminalLog(`      - Interest Rate: ${rateVal}`, "log-in");
        writeTerminalLog(`      - Repayment Term: ${tenureVal}`, "log-in");
        writeTerminalLog(`      - Repayment Sweepback: ${sweepbackVal}`, "log-in");
    }, 3200);

    setTimeout(() => {
        writeTerminalLog("[OCEN] Credit agreement signed digitally via Aadhaar OTP (e-Sign).", "log-success");
        writeTerminalLog("[IDBI CBS] Dispatching loan disbursal packet to core ledger...", "log-system");
    }, 4500);

    setTimeout(() => {
        writeTerminalLog(`[SUCCESS] Loan successfully disbursed through ULI/OCEN rails!`, "log-success");
        writeTerminalLog(`[LEDGER] IDBI Ref A/C Credit Ref: TXN9837482910`, "log-success");
        writeTerminalLog(`[NOTIFY] Alert dispatched to merchant contact number: +91-XXXXX-XX${profile.id}`, "log-out");
        writeTerminalLog(">>> PIPELINE COMPLETED SUCCESSFULLY.", "log-out");
        
        // Re-enable button
        disburseBtn.disabled = false;
        disburseBtn.style.opacity = 1;
    }, 6000);
});

// 9. ON PAGE LOAD
window.addEventListener("DOMContentLoaded", () => {
    initCharts();
    applyProfile("kirana"); // Default Kirana Profile

    // Bind custom merchant creator button
    const createMerchantBtn = document.getElementById("create-merchant-btn");
    createMerchantBtn.addEventListener("click", () => {
        const nameInput = document.getElementById("new-merchant-name");
        const sectorSelect = document.getElementById("new-merchant-sector");
        const name = nameInput.value.trim();
        const sector = sectorSelect.value;

        if (!name) {
            alert("Please enter a business name.");
            return;
        }

        const profileKey = "custom_" + Date.now();
        
        // Setup initial metrics to be 0 for a new-to-credit merchant
        const metrics = {
            gst: 0,
            gstFilingRate: 0,
            upiFreq: 0,
            upiMonthlyVal: 0,
            upiAvgTicket: 0,
            epfoStaff: 0,
            powerConsumption: 0,
            aaBalance: 0
        };

        profiles[profileKey] = {
            name: name,
            id: Math.floor(1000 + Math.random() * 9000).toString(),
            type: sector,
            metrics: metrics,
            aiRemarks: {
                en: {
                    strengths: ["New Profile: Awaiting alternate data file ingestion."],
                    risks: ["No digital footprints loaded yet. Drag-and-drop sample files below."],
                    status: "Awaiting Ingest",
                    desc: "This profile has no alternate data footprints loaded. Please upload invoices, UPI statements, or electricity logs to simulate scoring."
                },
                hi: {
                    strengths: ["नई प्रोफाइल: डेटा फ़ाइल अपलोड के लिए तैयार।"],
                    risks: ["अभी तक कोई डिजिटल फुटप्रिंट लोड नहीं किया गया है।"],
                    status: "डेटा प्रतीक्षा में",
                    desc: "इस प्रोफाइल में कोई वैकल्पिक डेटा फुटप्रिंट लोड नहीं है। स्कोरिंग शुरू करने के लिए कृपया इनवॉइस या यूपीआई लॉग अपलोड करें।"
                },
                mr: {
                    strengths: ["नवीन प्रोफाइल: डेटा फाइल लोड करण्यासाठी सज्ज."],
                    risks: ["अद्याप कोणताही डिजिटल इतिहास उपलब्ध नाही."],
                    status: "डेटाची प्रतीक्षा",
                    desc: "या प्रोफाईलमध्ये कोणताही पर्यायी डेटा लोड केलेला नाही. तपासणी सुरू करण्यासाठी कृपया जीएसटी किंवा युपीआय लॉग अपलोड करा."
                }
            }
        };

        // Append to UI preset button grid
        const profileGrid = document.querySelector(".profile-grid");
        const newBtn = document.createElement("button");
        newBtn.className = "profile-btn";
        newBtn.dataset.profile = profileKey;
        
        let icon = "fa-store";
        let tagText = "Retail";
        if (sector === "manufacturing") { icon = "fa-industry"; tagText = "Mfg"; }
        else if (sector === "service") { icon = "fa-truck"; tagText = "Service"; }

        newBtn.innerHTML = `
            <span class="profile-icon"><i class="fa-solid ${icon}"></i></span>
            <div class="profile-btn-info">
                <span class="profile-title">${name}</span>
                <span class="profile-tag tag-yes">Active (${tagText})</span>
            </div>
        `;

        // Handle click event on the newly appended button
        newBtn.addEventListener("click", () => {
            applyProfile(profileKey);
        });

        profileGrid.appendChild(newBtn);

        // Apply immediately
        applyProfile(profileKey);

        // Clear input field
        nameInput.value = "";
    });

    // Bind Theme Toggler
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    // Check local storage for theme setting
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        setTimeout(() => updateChartTheme(true), 200); // Small delay to let Chart.js finish initialization
    }

    themeToggleBtn.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light-theme");
        if (isLight) {
            localStorage.setItem("theme", "light");
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            localStorage.setItem("theme", "dark");
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
        updateChartTheme(isLight);
    });

    function updateChartTheme(isLight) {
        if (!radarChartInstance) return;
        const fontColor = isLight ? "#475569" : "#9ca3af";
        const gridColor = isLight ? "rgba(15, 23, 42, 0.08)" : "rgba(255, 255, 255, 0.08)";
        
        radarChartInstance.options.scales.r.pointLabels.color = fontColor;
        radarChartInstance.options.scales.r.angleLines.color = gridColor;
        radarChartInstance.options.scales.r.grid.color = gridColor;
        radarChartInstance.update();
    }
});
