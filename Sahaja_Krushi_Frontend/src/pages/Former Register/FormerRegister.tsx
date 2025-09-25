import React, { useState } from "react";
import TextField from "../../components/TextField";
import SelectField from "../../components/SelectField";
import MultiSelectField from "../../components/MultiSelectField";
import TextAreaField from "../../components/TextAreaField";
import FileInputField from "../../components/FileInputField";
import SuccessModal from "../../components/SuccessModel";
import ErrorModal from "../../components/ErrorModal";
import { farmerRegisterSchema, type FarmerRegisterFormData } from "../../lib/validation/Register";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";
import { FileText, User, Wheat, DollarSign } from "lucide-react";
import { farmerApi } from "../../lib/network/FarmerApi";

// Language translations
interface Translation {
  [key: string]: string;
}
interface Translations {
  [lang: string]: Translation;
}
const translations: Translations = {
  en: {
    title: "Farmer Registration Portal",
    subtitle: "Ministry of Agriculture & Farmers Welfare",
    subsubtitle: "Government of India",
    formNumber: "Form No: AGR-REG-2025",
    language: "Language",
    cancel: "Cancel",
    submit: "Submit Application",
    required: "Required",
    optional: "Optional",

    // Section headers
    personalInfo: "Personal Information",
    farmingDetails: "Farming Details",
    bankDetails: "Bank & Financial Details",
    documents: "Document Upload",

    // Personal Information fields
    fullName: "Full Name",
    dateOfBirth: "Date of Birth",
    gender: "Gender",
    aadharNumber: "Aadhar Number",
    contactNumber: "Contact Number",
    alternateContactNumber: "Alternate Contact Number",
    email: "Email Address",
    address: "Address",
    state: "State",
    district: "District",
    village: "Village/Town",
    pinCode: "PIN Code",

    // Farming Details fields
    landSize: "Land Size (in Acres)",
    cropsGrown: "Type of Crops Grown",
    farmingType: "Type of Farming",
    waterSource: "Water Source",
    equipmentOwned: "Equipment Owned",
    experienceYears: "Farming Experience (Years)",

    // Bank Details fields
    bankName: "Bank Name",
    accountNumber: "Account Number",
    ifscCode: "IFSC Code",
    accountHolderName: "Account Holder Name",
    isKycDone: "Is KYC Completed?",
    insuranceScheme: "Insurance Scheme",

    // Document fields
    aadharCard: "Aadhar Card",
    landProof: "Land Ownership Proof",
    bankPassbook: "Bank Passbook",
    farmerIdCard: "Farmer ID Card",

    // Success
    success: "Registration Successful",
    successMessage:
      "Your farmer registration has been submitted successfully. Reference ID will be sent to your mobile number.",

    // Options
    male: "Male",
    female: "Female",
    other: "Other",
    yes: "Yes",
    no: "No",
  },
  kn: {
    title: "ರೈತ ನೋಂದಣಿ ಪೋರ್ಟಲ್",
    subtitle: "ಕೃಷಿ ಮತ್ತು ರೈತ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ",
    subsubtitle: "ಭಾರತ ಸರ್ಕಾರ",
    formNumber: "ಫಾರಂ ಸಂಖ್ಯೆ: AGR-REG-2025",
    language: "ಭಾಷೆ",
    cancel: "ರದ್ದುಗೊಳಿಸಿ",
    submit: "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    required: "ಅಗತ್ಯವಿದೆ",
    optional: "ಐಚ್ಛಿಕ",

    // Section headers
    personalInfo: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
    farmingDetails: "ಕೃಷಿ ವಿವರಗಳು",
    bankDetails: "ಬ್ಯಾಂಕ್ ಮತ್ತು ಆರ್ಥಿಕ ವಿವರಗಳು",
    documents: "ದಾಖಲೆ ಅಪ್‌ಲೋಡ್",

    // Personal Information fields
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    dateOfBirth: "ಜನ್ಮ ದಿನಾಂಕ",
    gender: "ಲಿಂಗ",
    aadharNumber: "ಆಧಾರ್ ಸಂಖ್ಯೆ",
    contactNumber: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ",
    alternateContactNumber: "ಪರ್ಯಾಯ ಸಂಪರ್ಕ ಸಂಖ್ಯೆ",
    email: "ಇಮೇಲ್ ವಿಳಾಸ",
    address: "ವಿಳಾಸ",
    state: "ರಾಜ್ಯ",
    district: "ಜಿಲ್ಲೆ",
    village: "ಹಳ್ಳಿ/ಪಟ್ಟಣ",
    pinCode: "ಪಿನ್ ಕೋಡ್",

    // Farming Details fields
    landSize: "ಭೂಮಿಯ ಗಾತ್ರ (ಎಕರೆಗಳಲ್ಲಿ)",
    cropsGrown: "ಬೆಳೆಯುವ ಬೆಳೆಗಳ ಪ್ರಕಾರ",
    farmingType: "ಕೃಷಿ ಪ್ರಕಾರ",
    waterSource: "ನೀರಿನ ಮೂಲ",
    equipmentOwned: "ಹೊಂದಿರುವ ಉಪಕರಣಗಳು",
    experienceYears: "ಕೃಷಿ ಅನುಭವ (ವರ್ಷಗಳು)",

    // Bank Details fields
    bankName: "ಬ್ಯಾಂಕ್ ಹೆಸರು",
    accountNumber: "ಖಾತೆ ಸಂಖ್ಯೆ",
    ifscCode: "IFSC ಕೋಡ್",
    accountHolderName: "ಖಾತೆದಾರರ ಹೆಸರು",
    insuranceScheme: "ವಿಮಾ ಯೋಜನೆ",

    // Document fields
    aadharCard: "ಆಧಾರ್ ಕಾರ್ಡ್",
    landProof: "ಭೂಮಿ ಮಾಲೀಕತ್ವ ಪುರಾವೆ",
    bankPassbook: "ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್",
    farmerIdCard: "ರೈತ ID ಕಾರ್ಡ್",

    // Success
    success: "ನೋಂದಣಿ ಯಶಸ್ವಿ",
    successMessage:
      "ನಿಮ್ಮ ರೈತ ನೋಂದಣಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ. ಉಲ್ಲೇಖ ID ಅನ್ನು ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಲಾಗುವುದು.",

    // Options
    male: "ಪುರುಷ",
    female: "ಮಹಿಳೆ",
    other: "ಇತರೆ",
    yes: "ಹೌದು",
    no: "ಇಲ್ಲ",
  },
};

// Dropdown options
const stateOptions = [
  { label: "Karnataka", value: "Karnataka", labelKn: "ಕರ್ನಾಟಕ" },
 
];

const districtOptionsMap = {
  Karnataka: [
    { label: "Bagalkot", value: "Bagalkot", labelKn: "ಬಾಗಲಕೋಟೆ" },
    { label: "Ballari", value: "Ballari", labelKn: "ಬಳ್ಳಾರಿ" },
    { label: "Belagavi", value: "Belagavi", labelKn: "ಬೇಲಗಾವಿ" },
    { label: "Bengaluru Rural", value: "Bengaluru Rural", labelKn: "ಬೆಂಗಳೂರು ಗ್ರಾಮೀಣ" },
    { label: "Bengaluru Urban", value: "Bengaluru Urban", labelKn: "ಬೆಂಗಳೂರು ನಗರ" },
    { label: "Bidar", value: "Bidar", labelKn: "ಬೀದರ್" },
    { label: "Chamarajanagar", value: "Chamarajanagar", labelKn: "ಚಾಮರಾಜನಗರ" },
    { label: "Chikkaballapur", value: "Chikkaballapur", labelKn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ" },
    { label: "Chikkamagaluru", value: "Chikkamagaluru", labelKn: "ಚಿಕ್ಕಮಗಳೂರು" },
    { label: "Chitradurga", value: "Chitradurga", labelKn: "ಚಿತ್ತದೂರು" },
    { label: "Dakshina Kannada", value: "Dakshina Kannada", labelKn: "ದಕ್ಷಿಣ ಕನ್ನಡ" },
    { label: "Davanagere", value: "Davanagere", labelKn: "ದಾವಣಗೆರೆ" },
    { label: "Dharwad", value: "Dharwad", labelKn: "ಧಾರವಾಡ" },
    { label: "Gadag", value: "Gadag", labelKn: "ಗದಗ" },
    { label: "Hassan", value: "Hassan", labelKn: "ಹಾಸನ" },
    { label: "Haveri", value: "Haveri", labelKn: "ಹಾವೇರಿ" },
    { label: "Kalaburagi", value: "Kalaburagi", labelKn: "ಕಲಬುರ್ಗಿ" },
    { label: "Kodagu", value: "Kodagu", labelKn: "ಕೊಡಗು" },
    { label: "Kolar", value: "Kolar", labelKn: "ಕೊಲಾರ" },
    { label: "Koppal", value: "Koppal", labelKn: "ಕೊಪ್ಪಳ" },
    { label: "Mandya", value: "Mandya", labelKn: "ಮಂಡ್ಯ" },
    { label: "Mysuru", value: "Mysuru", labelKn: "ಮೈಸೂರು" },
    { label: "Raichur", value: "Raichur", labelKn: "ರೈಚೂರು" },
    { label: "Ramanagara", value: "Ramanagara", labelKn: "ರಾಮನಗರ" },
    { label: "Shivamogga", value: "Shivamogga", labelKn: "ಶಿವಮೊಗ್ಗ" },
    { label: "Tumakuru", value: "Tumakuru", labelKn: "ತುಮಕೂರು" },
    { label: "Udupi", value: "Udupi", labelKn: "ಉಡುಪಿ" },
    { label: "Uttara Kannada", value: "Uttara Kannada", labelKn: "ಉತ್ತರ ಕನ್ನಡ" },
    { label: "Vijayanagara", value: "Vijayanagara", labelKn: "ವಿಜಯನಗರ" },
    { label: "Yadgir", value: "Yadgir", labelKn: "ಯಾದಗಿರಿ" },
  ],

};

const genderOptions = [
  { label: "Male", value: "Male", labelKn: "ಪುರುಷ" },
  { label: "Female", value: "Female", labelKn: "ಮಹಿಳೆ" },
  { label: "Other", value: "Other", labelKn: "ಇತರೆ" },
];

const cropOptions = {
  Vegetables: [
    { label: "Tomato", value: "Tomato", labelKn: "ಟಮಾಟೊ" },
    { label: "Onion", value: "Onion", labelKn: "ಈರುಳ್ಳಿ" },
    { label: "Potato", value: "Potato", labelKn: "ಬಟಾಟೆ" },
    { label: "Brinjal", value: "Brinjal", labelKn: "ಬೆಳ್ಳುಳ್ಳಿ" },
    { label: "Carrot", value: "Carrot", labelKn: "ಗಾಜರ" },
  ],
  Horticulture: [
    { label: "Mango", value: "Mango", labelKn: "ಮಾವು" },
    { label: "Banana", value: "Banana", labelKn: "ಬಾಳೆಹಣ್ಣು" },
    { label: "Papaya", value: "Papaya", labelKn: "ಪಪಿತ" },
    { label: "Guava", value: "Guava", labelKn: "ಸೀತೆಪಪ್ಪಳ" },
    { label: "Coconut", value: "Coconut", labelKn: "ತೆಂಗಿನಕಾಯಿ" },
  ],
  CommercialCrops: [
    { label: "Sugarcane", value: "Sugarcane", labelKn: "ಕಬ್ಬು" },
    { label: "Cotton", value: "Cotton", labelKn: "ಬಟ್ಟೆ ಹಣೆ" },
    { label: "Groundnut", value: "Groundnut", labelKn: "ಚಿಕ್ಕ ಮೆಕ್ಕೆ" },
    { label: "Maize", value: "Maize", labelKn: "ಮೆಕ್ಕೆ ಜೋಳ" },
    { label: "Ragi", value: "Ragi", labelKn: "ರಾಗಿ" },
  ],
};

// Flatten grouped crop options for select components
const cropOptionsFlat: Option[] = (Object.values(cropOptions).flat() as Option[]);


const farmingTypeOptions = [
  { label: "Organic", value: "Organic", labelKn: "ಸಾವಯವ" },
  { label: "Traditional", value: "Traditional", labelKn: "ಸಾಂಪ್ರದಾಯಿಕ" },
  { label: "Modern / Mechanized", value: "Modern", labelKn: "ಆಧುನಿಕ " },
];


const waterSourceOptions = [
  { label: "Borewell", value: "Borewell", labelKn: "ಬೋರ್‌ವೆಲ್" },
  { label: "Canal", value: "Canal", labelKn: "ಕಾಲುವೆ" },
  { label: "Rain-fed", value: "Rain-fed", labelKn: "ಮಳೆ ಆಧಾರಿತ" },
  { label: "Open Well", value: "Open Well", labelKn: "ತೆರೆದ ಬಾವಿ" },
  { label: "Tank", value: "Tank", labelKn: "ಕೆರೆ" },
  { label: "River", value: "River", labelKn: "ನದಿ" },
  { label: "Drip Irrigation", value: "Drip Irrigation", labelKn: "ಡ್ರಿಪ್ ಹನಿ ಹಿಮ್ಮಳೆ" },
  { label: "Sprinkler", value: "Sprinkler", labelKn: "ಸ್ಪ್ರಿಂಕ್ಲರ್" },
];

const equipmentOptions = [
  { label: "Tractor", value: "Tractor", labelKn: "ಟ್ರಾಕ್ಟರ್" },
  { label: "Plough", value: "Plough", labelKn: "ನಾಗಲಿ" },
  { label: "Rotavator", value: "Rotavator", labelKn: "ರೋಟಾವೇಟರ್" },
  { label: "Seeder", value: "Seeder", labelKn: "ಸೀಡರ್" },
  { label: "Sprayer", value: "Sprayer", labelKn: "ಸ್ಪ್ರೇಯರ್" },
  { label: "Irrigation Pump", value: "Irrigation Pump", labelKn: "ಸಿಂಪಡಣ ಪಂಪ್" },
  { label: "Harvester", value: "Harvester", labelKn: "ಹಾರ್ವೆಸ್ಟರ್" },
];


// const insuranceSchemeOptions = [
//   { label: "PMFBY", value: "PMFBY", labelKn: "PMFBY" },
//   { label: "Private", value: "Private", labelKn: "ಖಾಸಗಿ" },
//   { label: "None", value: "None", labelKn: "ಯಾವುದೂ ಇಲ್ಲ" },
// ];

const initialForm: FarmerRegisterFormData = {
  fullName: "",
  dateOfBirth: "",
  gender: "Male",
  aadharNumber: "",
  contactNumber: "",
  alternateContactNumber: "",
  email: "",
  address: "",
  state: "Karnataka",
  district: "",
  village: "",
  pinCode: "",
  landSize: "",
  cropsGrown: [],
  farmingType: "",
  waterSource: "",
  equipmentOwned: [],
  experienceYears: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  accountHolderName: "",
  isKycDone: false,
  insuranceScheme: "",
  aadharCard: null,
  landProof: null,
  bankPassbook: null,
  farmerIdCard: null,
};

// Helper types for local options with i18n labels
interface Option { label: string; value: string; labelKn?: string }

// Map base options to react-select options using current language
const mapToSelectOptions = (opts: Option[], lang: "en" | "kn") =>
  opts.map((o) => ({ label: lang === "kn" && o.labelKn ? o.labelKn : o.label, value: o.value }));

// Given current string[] values, map to OptionType[] using base options
const mapValuesToOptionTypes = (values: string[], opts: Option[], lang: "en" | "kn") => {
  const labelMap = new Map(opts.map((o) => [o.value, lang === "kn" && o.labelKn ? o.labelKn : o.label]));
  return values.map((v) => ({ value: v, label: labelMap.get(v) || v }));
};

type FarmerFormErrors = {
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  aadharNumber?: string;
  contactNumber?: string;
  alternateContactNumber?: string;
  email?: string;
  address?: string;
  state?: string;
  district?: string;
  village?: string;
  pinCode?: string;
  landSize?: string;
  cropsGrown?: string;
  farmingType?: string;
  waterSource?: string;
  equipmentOwned?: string;
  experienceYears?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  accountHolderName?: string;
  insuranceScheme?: string;
  aadharCard?: string;
  landProof?: string;
  bankPassbook?: string;
  farmerIdCard?: string;
};

const FarmerRegistrationForm = () => {
  const [form, setForm] = useState<FarmerRegisterFormData>(initialForm);
  const [errors, setErrors] = useState<FarmerFormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDetails, setErrorDetails] = useState<{ message: string; path?: (string | number)[] }[]>([]);
  const [selectedState, setSelectedState] = useState("Karnataka");
  const [language, setLanguage] = useState<"en" | "kn">("en");

  const t = translations[language as keyof typeof translations];

  const handleChange = (name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    if (name === "state") setSelectedState(value as string);
  };

  const handleMultiSelectChange = (name: string, values: string[]) => {
    setForm((prev) => ({ ...prev, [name]: values }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    setForm((prev) => ({ ...prev, [name]: file }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    // Zod validation
    const result = farmerRegisterSchema.safeParse(form);
    if (!result.success) {
      // Map Zod errors to FarmerFormErrors
      const fieldErrors: FarmerFormErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path && err.path.length > 0) {
          const key = err.path[0] as keyof FarmerFormErrors;
          fieldErrors[key] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await farmerApi.register(result.data as any);
      // Because axios interceptor resolves 400 responses, we must check success flag
      if ((response as any)?.success) {
        setSuccessMessage((response as any)?.message || t.successMessage);
        setShowSuccess(true);
      } else {
        // Backend error payload should be of shape { success:false, message, errors? }
        const msg = (response as any)?.message || "Registration failed";
        const errs = (response as any)?.errors || [];
        setErrorMessage(msg);
        setErrorDetails(errs);
        setShowError(true);
      }
    } catch (err: any) {
      // Non-400 errors will be thrown by axios interceptor
      const message = err?.message || "Failed to register";
      setErrorMessage(message);
      setErrorDetails([]);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleSuccessClose = () => {
    setShowSuccess(false);
    setForm(initialForm);
    setSelectedState("Karnataka");
  };

  const handleErrorClose = () => {
    setShowError(false);
    setErrorMessage("");
    setErrorDetails([]);
  };

  const districts =
    selectedState &&
    districtOptionsMap[selectedState as keyof typeof districtOptionsMap]
      ? districtOptionsMap[selectedState as keyof typeof districtOptionsMap]
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Official Government Header */}
      {/* Enhanced Form */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        >
          {/* Personal Information */}
          <div className="p-6 border-b border-gray-200">
            {/* Heading + Switch in one row */}
            <div className="flex items-center justify-between mb-5">
              {/* Left: Icon + Title */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t.personalInfo}
                </h2>
               
              </div>

              {/* Right: Language Switch */}
              <div
                onClick={() => setLanguage(language === "en" ? "kn" : "en")}
                className="flex items-center bg-gray-300 rounded-full p-1 cursor-pointer w-24 relative"
              >
                {/* Switch knob */}
                <div
                  className={`absolute top-1 bottom-1 w-11 bg-blue-600 rounded-full transition-transform duration-300 ${
                    language === "kn" ? "translate-x-12" : "translate-x-0"
                  }`}
                />

                {/* Labels */}
                <span
                  className={`flex-1 text-center text-sm font-medium z-10 ${
                    language === "en" ? "text-white" : "text-gray-700"
                  }`}
                >
                  EN
                </span>
                <span
                  className={`flex-1 text-center text-sm font-medium z-10 ${
                    language === "kn" ? "text-white" : "text-gray-700"
                  }`}
                >
                  KN
                </span>
              </div>
              
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <TextField
                  label={t.fullName}
                  name="fullName"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  error={errors.fullName}
                  required
                />{" "}
                <TextField
                  label={t.dateOfBirth}
                  name="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  error={errors.dateOfBirth}
                  required
                />{" "}
                <SelectField
                  label={t.gender}
                  name="gender"
                  options={mapToSelectOptions(genderOptions, language)}
                  value={form.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  error={errors.gender}
                  required
                />{" "}
                <TextField
                  label={t.aadharNumber}
                  name="aadharNumber"
                  value={form.aadharNumber}
                  onChange={(e) => handleChange("aadharNumber", e.target.value)}
                  error={errors.aadharNumber}
                  required
                />{" "}
                <TextField
                  label={t.contactNumber}
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={(e) =>
                    handleChange("contactNumber", e.target.value)
                  }
                  error={errors.contactNumber}
                  required
                />{" "}
                <TextField
                  label={t.alternateContactNumber}
                  name="alternateContactNumber"
                  value={form.alternateContactNumber}
                  onChange={(e) =>
                    handleChange("alternateContactNumber", e.target.value)
                  }
                  error={errors.alternateContactNumber}
                />{" "}
                <TextField
                  label={t.email}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={errors.email}
                />{" "}
                <SelectField
                  label={t.state}
                  name="state"
                  options={mapToSelectOptions(stateOptions, language)}
                  value={form.state}
                  error={errors.state}
                  required
                  disabled={true}
                />
                <SelectField
                  label={t.district}
                  name="district"
                  options={mapToSelectOptions(districts as any, language)}
                  value={form.district}
                  onChange={(e) => handleChange("district", e.target.value)}
                  error={errors.district}
                  required
                />{" "}
                <TextField
                  label={t.village}
                  name="village"
                  value={form.village}
                  onChange={(e) => handleChange("village", e.target.value)}
                  error={errors.village}
                  required
                />{" "}
                <TextField
                  label={t.pinCode}
                  name="pinCode"
                  value={form.pinCode}
                  onChange={(e) => handleChange("pinCode", e.target.value)}
                  error={errors.pinCode}
                  required
                />{" "}
                <TextAreaField
                  label={t.address}
                  name="address"
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  error={errors.address}
                  required
                />
                </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* your fields here */}
            </div>
          </div>

          {/* Farming Details */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Wheat className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {t.farmingDetails}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                label={t.landSize}
                name="landSize"
                type="number"
                value={form.landSize}
                onChange={(e) => handleChange("landSize", e.target.value)}
                error={errors.landSize}
                required
              />
              <MultiSelectField
                label={t.cropsGrown}
                name="cropsGrown"
                options={mapToSelectOptions(cropOptionsFlat, language)}
                value={mapValuesToOptionTypes(form.cropsGrown || [], cropOptionsFlat, language)}
                onChange={(selected) =>
                  handleMultiSelectChange(
                    "cropsGrown",
                    selected.map((s: any) => s.value)
                  )
                }
                error={errors.cropsGrown}
                required
              />
              <SelectField
                label={t.farmingType}
                name="farmingType"
                options={mapToSelectOptions(farmingTypeOptions, language)}
                value={form.farmingType}
                onChange={(e) => handleChange("farmingType", e.target.value)}
                error={errors.farmingType}
                required
              />
              <SelectField
                label={t.waterSource}
                name="waterSource"
                options={mapToSelectOptions(waterSourceOptions, language)}
                value={form.waterSource}
                onChange={(e) => handleChange("waterSource", e.target.value)}
                error={errors.waterSource}
                required
              />
             
              <MultiSelectField
                label={t.equipmentOwned}
                name="equipmentOwned"
                options={mapToSelectOptions(equipmentOptions, language)}
                value={mapValuesToOptionTypes(form.equipmentOwned || [], equipmentOptions, language)}
                onChange={(selected) =>
                  handleMultiSelectChange(
                    "equipmentOwned",
                    selected.map((s: any) => s.value)
                  )
                }
                error={errors.equipmentOwned}
              />
              <TextField
                label={t.experienceYears}
                name="experienceYears"
                type="number"
                value={form.experienceYears}
                onChange={(e) =>
                  handleChange("experienceYears", e.target.value)
                }
                error={errors.experienceYears}
                required
              />
            </div>
          </div>

          {/* Bank & Financial Details */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {t.bankDetails}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                label={t.bankName}
                name="bankName"
                value={form.bankName}
                onChange={(e) => handleChange("bankName", e.target.value)}
                error={errors.bankName}
                required
              />
              <TextField
                label={t.accountNumber}
                name="accountNumber"
                value={form.accountNumber}
                onChange={(e) => handleChange("accountNumber", e.target.value)}
                error={errors.accountNumber}
                required
              />
              <TextField
                label={t.ifscCode}
                name="ifscCode"
                value={form.ifscCode}
                onChange={(e) => handleChange("ifscCode", e.target.value)}
                error={errors.ifscCode}
                required
              />
              <TextField
                label={t.accountHolderName}
                name="accountHolderName"
                value={form.accountHolderName}
                onChange={(e) =>
                  handleChange("accountHolderName", e.target.value)
                }
                error={errors.accountHolderName}
                required
              />
             
             
              {/* <SelectField
                label={t.insuranceScheme}
                name="insuranceScheme"
                options={insuranceSchemeOptions}
                value={form.insuranceScheme}
                onChange={(e) =>
                  handleChange("insuranceScheme", e.target.value)
                }
                error={errors.insuranceScheme}
                language={language}
              /> */}
            </div>
          </div>

          {/* Document Upload */}
          {/* <div className="p-6 border-b border-gray-200"> */}
            <div className="flex items-center space-x-3 mb-5">
              {/* <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center"> */}
                {/* <FileText className="w-5 h-5 text-purple-600" /> */}
              {/* </div> */}
              {/* <h2 className="text-lg font-semibold text-gray-900"> */}
                {/* {t.documents} */}
              {/* </h2> */}
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FileInputField
                label={t.aadharCard}
                name="aadharCard"
                onChange={(file) => handleFileChange("aadharCard", file)}
              />
              <FileInputField
                label={t.landProof}
                name="landProof"
                onChange={(file) => handleFileChange("landProof", file)}
              />
              <FileInputField
                label={t.bankPassbook}
                name="bankPassbook"
                onChange={(file) => handleFileChange("bankPassbook", file)}
              />
            </div> */}
          {/* </div> */}

          {/* Actions */}
        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
  {/* Cancel button */}
  <ButtonSecondary
    text={t.cancel}
    onClick={() => {
      setForm(initialForm);
      setErrors({});
      setSelectedState("Karnataka");
    }}
  />

  {/* Submit button */}
  <div className="w-full md:w-auto min-w-[160px]">
    <ButtonPrimary isLoading={isSubmitting} onClick={() => {}} type="submit">
    {t.submit}
    </ButtonPrimary>
  </div>
</div>

        </form>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title={t.success}
        message={successMessage || t.successMessage}
      />
      <ErrorModal
        isOpen={showError}
        onClose={handleErrorClose}
        title={"Registration Failed"}
        message={errorMessage}
        errors={errorDetails}
      />
    </div>
  );
};

export default FarmerRegistrationForm;
