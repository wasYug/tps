import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {

  BarChart3,
  Building2,
  Calendar,
  Camera,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Download,
  FileCheck2,
  FileText,
  GraduationCap,
  Home,
  Mail,
  Phone,
  Send,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function AdmissionPage() {
  // Use scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    admission_for_std: "",
    email: "",
    student_name: "",
    date_of_birth: "",
    father_name: "",
    mother_name: "",
    previous_school: "",
    phone: "",
    number_of_siblings: "",
    date_of_visit: "",
    address: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Admission for Std
    if (!formData.admission_for_std) {
      newErrors.admission_for_std = "Please select a standard.";
    }

    // Email
    const email = formData.email.trim();
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Student Name
    const studentName = formData.student_name.trim();
    if (!studentName) {
      newErrors.student_name = "Student's name is required.";
    } else if (studentName.length < 2) {
      newErrors.student_name = "Name must be at least 2 characters.";
    } else if (studentName.length > 100) {
      newErrors.student_name = "Name must not exceed 100 characters.";
    }

    // Date of Birth
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required.";
    }

    // Father's Name
    const fatherName = formData.father_name.trim();
    if (!fatherName) {
      newErrors.father_name = "Father's name is required.";
    } else if (fatherName.length < 2) {
      newErrors.father_name = "Name must be at least 2 characters.";
    } else if (fatherName.length > 100) {
      newErrors.father_name = "Name must not exceed 100 characters.";
    }

    // Mother's Name
    const motherName = formData.mother_name.trim();
    if (!motherName) {
      newErrors.mother_name = "Mother's name is required.";
    } else if (motherName.length < 2) {
      newErrors.mother_name = "Name must be at least 2 characters.";
    } else if (motherName.length > 100) {
      newErrors.mother_name = "Name must not exceed 100 characters.";
    }

    // Phone
    const phone = formData.phone.trim().replace(/[\s-+]/g, "");
    // Strip leading 91 for validation if present
    const phoneDigits = phone.startsWith("91") && phone.length > 10 ? phone.slice(2) : phone;
    if (!formData.phone.trim()) {
      newErrors.phone = "Contact number is required.";
    } else if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      newErrors.phone = "Please enter a valid 10-digit Indian phone number.";
    }

    // Address
    const address = formData.address.trim();
    if (!address) {
      newErrors.address = "Address is required.";
    } else if (address.length < 10) {
      newErrors.address = "Address must be at least 10 characters.";
    } else if (address.length > 500) {
      newErrors.address = "Address must not exceed 500 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare phone — strip to 10 digits for backend
      const rawPhone = formData.phone.trim().replace(/[\s\-+]/g, "");
      const cleanPhone = rawPhone.startsWith("91") && rawPhone.length > 10 ? rawPhone.slice(2) : rawPhone;

      const payload = {
        admission_for_std: formData.admission_for_std,
        email: formData.email.trim(),
        student_name: formData.student_name.trim(),
        date_of_birth: formData.date_of_birth,
        father_name: formData.father_name.trim(),
        mother_name: formData.mother_name.trim(),
        phone: cleanPhone,
        address: formData.address.trim(),
        previous_school: formData.previous_school.trim() || null,
        number_of_siblings: formData.number_of_siblings ? parseInt(formData.number_of_siblings, 10) : 0,
        date_of_visit: formData.date_of_visit || null,
        message: formData.message.trim() || null,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admission/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData?.detail && Array.isArray(errorData.detail)) {
          const backendErrors = {};
          errorData.detail.forEach((err) => {
            const field = err.loc?.[err.loc.length - 1];
            if (field) backendErrors[field] = err.msg;
          });
          setErrors(backendErrors);
        }
        throw new Error("Submission failed");
      }

      toast.success("Application submitted successfully! We'll contact you soon.");
      // Reset form
      setFormData({
        admission_for_std: "",
        email: "",
        student_name: "",
        date_of_birth: "",
        father_name: "",
        mother_name: "",
        previous_school: "",
        phone: "",
        number_of_siblings: "",
        date_of_visit: "",
        address: "",
        message: "",
      });
      setErrors({});
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for dynamic border styling
  const inputClass = (field) => {
    const base = "w-full h-12 rounded-xl border bg-zinc-50/50 hover:bg-white focus:bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm shadow-zinc-100";
    return errors[field]
      ? `${base} border-red-500 focus:ring-red-500/20 focus:border-red-500`
      : `${base} border-zinc-200 focus:ring-[#fb2c36]/20 focus:border-[#fb2c36]`;
  };

  const textareaClass = (field) => {
    const base = "w-full rounded-xl border bg-zinc-50/50 hover:bg-white focus:bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm shadow-zinc-100 resize-none";
    return errors[field]
      ? `${base} border-red-500 focus:ring-red-500/20 focus:border-red-500`
      : `${base} border-zinc-200 focus:ring-[#fb2c36]/20 focus:border-[#fb2c36]`;
  };

  const ErrorMsg = ({ field }) =>
    errors[field] ? (
      <p className="text-red-600 text-xs mt-1 font-medium">{errors[field]}</p>
    ) : null;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <Navbar theme="light" />
      
      {/* Spacer for Fixed Navbar */}
      <div className="h-20 sm:h-24"></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-16 sm:gap-24 overflow-x-hidden">
        
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden bg-white shadow-xl shadow-zinc-200/40 border border-zinc-200/80 group min-h-[480px] sm:min-h-[560px] flex items-center">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
              alt="Students" 
              className="w-full h-full object-cover opacity-[0.08] group-hover:scale-105 transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
          </div>
          
          <div className="relative p-8 sm:p-12 lg:p-20 w-full flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl flex flex-col gap-6 w-full">
              <div className="inline-flex items-center gap-2 font-semibold uppercase rounded-full bg-[#fb2c36]/10 text-[#fb2c36] text-xs tracking-widest px-4 py-2 w-fit border border-[#fb2c36]/20 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fb2c36] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fb2c36]"></span>
                </span>
                Admissions Open 2024-25
              </div>
              
              <h1 className="font-bold text-slate-900 text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
                Begin Your Journey With <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fb2c36] to-orange-500">Takshashila</span>
              </h1>
              
              <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-xl">
                Join a community of lifelong learners, innovators, and leaders. We provide an environment where excellence is nurtured and potential is realized.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <Button 
                  asChild
                  className="bg-[#fb2c36] hover:bg-[#d6242d] text-white rounded-full px-8 py-6 text-base sm:text-lg transition-all shadow-[0_8px_20px_rgba(251,44,54,0.25)] hover:shadow-[0_12px_25px_rgba(251,44,54,0.35)] hover:-translate-y-1"
                >
                  <a href="#application-form">
                    Apply Now <ChevronRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-5 min-w-[280px]">
              <Card className="bg-white/80 backdrop-blur-lg border-zinc-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#fb2c36]/10 rounded-xl text-[#fb2c36] shadow-inner">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Important Note</p>
                      <p className="text-slate-600 text-sm font-medium">Admissions close March 31st</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-lg border-zinc-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#fb2c36]/10 rounded-xl text-[#fb2c36] shadow-inner">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Need Help?</p>
                      <p className="text-slate-600 text-sm font-medium">+91 98765 43210</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4 px-4">
            <h2 className="font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">Simple 5-Step Process</h2>
            <p className="text-slate-500 text-base sm:text-lg">Our admission process is designed to be transparent, straightforward, and parent-friendly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "Online Inquiry",
                desc: "Fill out the digital interest form to start your journey.",
                icon: <Mail className="w-6 h-6" />
              },
              {
                step: "02",
                title: "Campus Visit",
                desc: "Experience our state-of-the-art facilities firsthand.",
                icon: <Building2 className="w-6 h-6" />
              },
              {
                step: "03",
                title: "Assessment",
                desc: "A friendly evaluation session to understand the student.",
                icon: <Users className="w-6 h-6" />
              },
              {
                step: "04",
                title: "Documentation",
                desc: "Submit required papers and initial fee payment.",
                icon: <FileText className="w-6 h-6" />
              },
              {
                step: "05",
                title: "Welcome",
                desc: "Join the orientation and commence the session.",
                icon: <GraduationCap className="w-6 h-6" />
              }
            ].map((item, index) => (
              <div key={index} className="relative group h-full">
                <Card className="h-full border-zinc-200 hover:border-[#fb2c36]/50 hover:shadow-[0_8px_30px_rgb(251,44,54,0.12)] hover:-translate-y-2 transition-all duration-300 bg-white relative z-10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-bl-full -mr-16 -mt-16 transition-all duration-500 group-hover:bg-[#fb2c36]/10 group-hover:scale-110" />
                  <CardContent className="p-6 flex flex-col gap-4 items-center text-center relative">
                    <div className="size-14 rounded-2xl bg-zinc-50 text-[#fb2c36] flex items-center justify-center font-bold text-xl group-hover:bg-[#fb2c36] group-hover:text-white transition-colors duration-300 shadow-sm">
                      {item.icon}
                    </div>
                    <div className="absolute top-2 right-2 text-4xl font-black text-zinc-100 group-hover:text-red-100 transition-colors pointer-events-none">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-zinc-950 mb-2">{item.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
                {index !== 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-zinc-200 z-0" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <div className="max-w-4xl mx-auto w-full">
          <Card className="h-full border-zinc-200 shadow-sm bg-white overflow-hidden flex flex-col">
            <div className="h-2 w-full bg-gradient-to-r from-[#fb2c36] to-red-400" />
            <CardHeader className="pb-4">
              <CardTitle className="font-bold text-2xl">Required Documents</CardTitle>
              <CardDescription className="text-base">Keep these ready before submitting your application.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Birth Certificate", icon: <FileCheck2 className="size-5" /> },
                  { label: "Aadhar Card (Updated)", icon: <CheckCircle2 className="size-5" /> },
                  { label: "Samagra ID (Only for M.P. Domicile)", icon: <FileText className="size-5" /> },
                  { label: "Vaccination Card (For all students till the age of 15)", icon: <FileText className="size-5" /> },
                  { label: "Original Transfer Certificate (Grade 2 Onwards)", icon: <FileCheck2 className="size-5" /> },
                  { label: "Report Card of previous class passed", icon: <BarChart3 className="size-5" /> },
                  { label: "Caste Certificate (If Applicable)", icon: <FileText className="size-5" /> },
                  { label: "Child's Bank Passbook", icon: <Building2 className="size-5" /> },
                  { label: "Aadhar Card of Parents for Address Proof", icon: <Users className="size-5" /> },
                  { label: "Passport Photos (Original) 3 Copies Each: Student, Father, Mother, Guardian", icon: <Camera className="size-5" /> }
                ].map((doc, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50/80 border border-zinc-100 hover:border-zinc-200 hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
                    <div className="p-2 bg-white rounded-lg text-[#fb2c36] shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {doc.icon}
                    </div>
                    <span className="font-medium text-zinc-700 text-sm mt-1">{doc.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-red-50/50 text-red-900 border border-red-100">
                <Phone className="size-5 shrink-0 text-[#fb2c36]" />
                <span className="text-sm font-medium">
                  Kindly contact the admission office for further queries.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admission Form */}
        <section id="application-form" className="max-w-4xl mx-auto w-full scroll-mt-32">
          <Card className="border-zinc-200 shadow-xl shadow-zinc-200/50 bg-white overflow-hidden">
            <CardHeader className="bg-zinc-50/80 border-b border-zinc-100 pb-8 pt-10 px-6 sm:px-10 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-[#fb2c36]/5 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />
              <CardTitle className="font-bold text-3xl relative z-10 text-zinc-900">Online Admission Form</CardTitle>
              <CardDescription className="text-base mt-2 relative z-10">Fill out the details below to submit your application. Fields marked with <span className="text-red-500 font-bold">*</span> are mandatory.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-10 bg-gradient-to-b from-white to-zinc-50/30">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleSubmit} noValidate>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700">Admission for Std. <span className="text-red-500">*</span></label>
                  <select name="admission_for_std" value={formData.admission_for_std} onChange={handleChange} className={inputClass("admission_for_std")}>
                    <option value="">Select Standard</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                  <ErrorMsg field="admission_for_std" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700">E-Mail <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" className={inputClass("email")} />
                  <ErrorMsg field="email" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700">Student's Full Name <span className="text-red-500">*</span></label>
                  <input type="text" name="student_name" value={formData.student_name} onChange={handleChange} placeholder="Enter full name" className={inputClass("student_name")} />
                  <ErrorMsg field="student_name" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700">D.O.B (Date of Birth) <span className="text-red-500">*</span></label>
                  <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className={inputClass("date_of_birth")} />
                  <ErrorMsg field="date_of_birth" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700">Father's Name <span className="text-red-500">*</span></label>
                  <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} placeholder="Enter father's name" className={inputClass("father_name")} />
                  <ErrorMsg field="father_name" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700">Mother's Name <span className="text-red-500">*</span></label>
                  <input type="text" name="mother_name" value={formData.mother_name} onChange={handleChange} placeholder="Enter mother's name" className={inputClass("mother_name")} />
                  <ErrorMsg field="mother_name" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700">Previous School (If Any)</label>
                  <input type="text" name="previous_school" value={formData.previous_school} onChange={handleChange} placeholder="Enter previous school name" className={inputClass("previous_school")} />
                  <ErrorMsg field="previous_school" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700">Contact No <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91" className={inputClass("phone")} />
                  <ErrorMsg field="phone" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700">No. of Siblings</label>
                  <input type="number" name="number_of_siblings" value={formData.number_of_siblings} onChange={handleChange} min="0" placeholder="0" className={inputClass("number_of_siblings")} />
                  <ErrorMsg field="number_of_siblings" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700">Date of Visit</label>
                  <input type="date" name="date_of_visit" value={formData.date_of_visit} onChange={handleChange} className={inputClass("date_of_visit")} />
                  <ErrorMsg field="date_of_visit" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-zinc-700">Address <span className="text-red-500">*</span></label>
                  <textarea name="address" value={formData.address} onChange={handleChange} rows="3" placeholder="Enter full residential address" className={textareaClass("address")}></textarea>
                  <ErrorMsg field="address" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-zinc-700">Other Details</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Any medical conditions, allergies, or special requirements" className={textareaClass("message")}></textarea>
                  <ErrorMsg field="message" />
                </div>
                
                <div className="md:col-span-2 flex justify-end mt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#fb2c36] hover:bg-[#d6242d] text-white rounded-xl px-12 py-7 text-lg font-bold shadow-[0_8px_20px_rgb(251,44,54,0.25)] hover:shadow-[0_12px_25px_rgb(251,44,54,0.35)] transition-all hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3"
                  >
                    {isSubmitting && (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                    )}
                    {isSubmitting ? "Submitting..." : "Submit Application"} {!isSubmitting && <ChevronRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* CTA Banner */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#000000] to-[#b30000] text-white shadow-[0_20px_40px_rgba(251,44,54,0.3)]">
            <div className="absolute right-0 top-0 w-full sm:w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent mix-blend-overlay"></div>
          
          <div className="relative p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <h2 className="font-bold text-3xl sm:text-4xl mb-4 text-white">Ready to join our legacy?</h2>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                Apply now to begin the admission process and secure your seat. Spaces are limited for the upcoming academic year.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
              <Button 
                size="lg" 
                asChild
                className="w-full sm:w-auto bg-white text-[#fb2c36] hover:bg-zinc-50 rounded-full font-bold px-8 py-6 text-base shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95"
              >
                <a href="#application-form">
                  <Send className="mr-2 h-5 w-5" /> Apply Online
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white/50 text-[#fb2c36] hover:bg-white hover:border-white rounded-full font-bold px-8 py-6 text-base backdrop-blur-sm transition-all hover:-translate-y-1 active:scale-95">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
