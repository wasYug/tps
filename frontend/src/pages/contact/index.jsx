import React, { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./contact.css";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        class_interest: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear the error for this field as soon as user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }

    };

    const validate = () => {
        const newErrors = {};
        const name = formData.full_name.trim();
        const email = formData.email.trim();
        const phone = formData.phone.trim();
        const classInterest = formData.class_interest;
        const message = formData.message.trim();

        // Full Name
        if (!name) {
            newErrors.full_name = "Full name is required.";
        } else if (name.length < 2) {
            newErrors.full_name = "Name must be at least 2 characters.";
        } else if (name.length > 50) {
            newErrors.full_name = "Name must not exceed 50 characters.";
        }

        // Email
        if (!email) {
            newErrors.email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Phone
        if (!phone) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
            newErrors.phone = "Please enter a valid 10-digit Indian phone number.";
        }

        // Class
        if (!classInterest) {
            newErrors.class_interest = "Please select a class.";
        }

        // Message
        if (!message) {
            newErrors.message = "Enquiry message is required.";
        } else if (message.length < 10) {
            newErrors.message = "Message must be at least 10 characters.";
        } else if (message.length > 350) {
            newErrors.message = "Message must not exceed 350 characters.";
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
            // Map frontend field names to backend schema
            const payload = {
                name: formData.full_name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                class_interested: formData.class_interest,
                message: formData.message.trim(),
            };

            const response = await fetch("http://localhost:8000/api/contact/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                // If the backend returns validation errors, map them to form fields
                if (errorData?.detail && Array.isArray(errorData.detail)) {
                    const backendErrors = {};
                    errorData.detail.forEach((err) => {
                        const field = err.loc?.[err.loc.length - 1];
                        // Map backend field names back to frontend field names
                        const fieldMap = { name: "full_name", class_interested: "class_interest" };
                        const frontendField = fieldMap[field] || field;
                        backendErrors[frontendField] = err.msg;
                    });
                    setErrors(backendErrors);
                }
                throw new Error("Submission failed");
            }

            toast.success("Thank you for contacting us! We'll get back to you soon.");
            // Reset form on success
            setFormData({ full_name: "", email: "", phone: "", class_interest: "", message: "" });
            setErrors({});
        } catch {
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper: returns the border class based on whether the field has an error
    const inputBorderClass = (field) =>
        errors[field]
            ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
            : "border-gray-200 focus:ring-[#e60000]/10 focus:border-[#e60000]";

    return (
        <div className="contact-page-theme text-gray-900 bg-[#f9f9f9]">
            <Navbar theme="light" />
            <div className="pt-20">
                {/* BEGIN: HeroContactIcons */}
                <section
                    className="bg-white pt-16 pb-20 border-b border-gray-100 overflow-hidden relative"
                    data-purpose="hanging-icons-section"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex justify-center items-start space-x-3 md:space-x-12">
                            {/* Phone */}
                            <div className="flex flex-col items-center">
                                <div className="w-0.5 h-24 bg-gradient-to-b from-gray-300 to-blue-400"></div>
                                <div className="w-16 h-16 md:w-28 md:h-28 rounded-3xl bg-blue-500 border-4 border-white shadow-xl flex items-center justify-center hanging-icon cursor-pointer">
                                    <svg
                                        className="w-8 h-8 md:w-14 md:h-14 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            {/* Email */}
                            <div className="flex flex-col items-center">
                                <div className="w-0.5 h-16 bg-gradient-to-b from-gray-300 to-green-400"></div>
                                <div className="w-16 h-16 md:w-28 md:h-28 rounded-3xl bg-green-500 border-4 border-white shadow-xl flex items-center justify-center hanging-icon cursor-pointer">
                                    <span className="text-white text-3xl md:text-5xl font-bold font-archivo">
                                        @
                                    </span>
                                </div>
                            </div>
                            {/* Mail */}
                            <div className="flex flex-col items-center">
                                <div className="w-0.5 h-20 bg-gradient-to-b from-gray-300 to-[#e60000]"></div>
                                <div className="w-16 h-16 md:w-28 md:h-28 rounded-3xl bg-[#e60000] border-4 border-white shadow-xl flex items-center justify-center hanging-icon cursor-pointer">
                                    <svg
                                        className="w-8 h-8 md:w-14 md:h-14 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            {/* Mobile */}
                            <div className="flex flex-col items-center">
                                <div className="w-0.5 h-28 bg-gradient-to-b from-gray-300 to-yellow-400"></div>
                                <div className="w-16 h-16 md:w-28 md:h-28 rounded-3xl bg-yellow-500 border-4 border-white shadow-xl flex items-center justify-center hanging-icon cursor-pointer">
                                    <svg
                                        className="w-8 h-8 md:w-14 md:h-14 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            {/* Location */}
                            <div className="flex flex-col items-center">
                                <div className="w-0.5 h-24 bg-gradient-to-b from-gray-300 to-indigo-800"></div>
                                <div className="w-16 h-16 md:w-28 md:h-28 rounded-3xl bg-indigo-900 border-4 border-white shadow-xl flex items-center justify-center hanging-icon cursor-pointer">
                                    <svg
                                        className="w-8 h-8 md:w-14 md:h-14 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                        ></path>
                                        <path
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* END: HeroContactIcons */}
                {/* BEGIN: Breadcrumb */}
                <div
                    className="bg-[#e60000] py-3 text-white text-xs tracking-widest uppercase font-bold"
                    data-purpose="breadcrumb-bar"
                >
                    <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                        <span>Takshashila Public School</span>
                        <div className="flex items-center space-x-2">
                            <a className="hover:text-[#ffe16d] transition-colors" href="#">
                                Home
                            </a>
                            <span className="opacity-50">/</span>
                            <span className="text-[#ffe16d]">Contact Us</span>
                        </div>
                    </div>
                </div>
                {/* END: Breadcrumb */}
                {/* BEGIN: ContactFormSection */}
                <main className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-16">
                            <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                                Get in Touch
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                Whether you're inquiring about admissions or want to learn more
                                about our academic programs, we're here to help you every step
                                of the way.
                            </p>
                        </div>
                        {/* Form Container */}
                        <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200 p-8 md:p-12 border border-gray-100">
                            <form className="space-y-8" data-purpose="admission-enquiry-form" onSubmit={handleSubmit} noValidate>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label
                                            className="block text-sm font-bold text-gray-700 tracking-wide uppercase"
                                            htmlFor="full_name"
                                        >
                                            Full Name <span className="text-[#e60000]">*</span>
                                        </label>
                                        <input
                                            className={`w-full px-5 py-4 border rounded-xl focus:ring-4 transition-all outline-none bg-gray-50/50 ${inputBorderClass("full_name")}`}
                                            id="full_name"
                                            name="full_name"
                                            placeholder="John Doe"
                                            type="text"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                        />
                                        {errors.full_name && (
                                            <p className="text-red-600 text-xs mt-1 font-medium">{errors.full_name}</p>
                                        )}
                                    </div>
                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label
                                            className="block text-sm font-bold text-gray-700 tracking-wide uppercase"
                                            htmlFor="email"
                                        >
                                            Email Address <span className="text-[#e60000]">*</span>
                                        </label>
                                        <input
                                            className={`w-full px-5 py-4 border rounded-xl focus:ring-4 transition-all outline-none bg-gray-50/50 ${inputBorderClass("email")}`}
                                            id="email"
                                            name="email"
                                            placeholder="john@example.com"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && (
                                            <p className="text-red-600 text-xs mt-1 font-medium">{errors.email}</p>
                                        )}
                                    </div>
                                    {/* Phone Number */}
                                    <div className="space-y-2">
                                        <label
                                            className="block text-sm font-bold text-gray-700 tracking-wide uppercase"
                                            htmlFor="phone"
                                        >
                                            Phone Number <span className="text-[#e60000]">*</span>
                                        </label>
                                        <input
                                            className={`w-full px-5 py-4 border rounded-xl focus:ring-4 transition-all outline-none bg-gray-50/50 ${inputBorderClass("phone")}`}
                                            id="phone"
                                            name="phone"
                                            placeholder="+91 93350 06888"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                        {errors.phone && (
                                            <p className="text-red-600 text-xs mt-1 font-medium">{errors.phone}</p>
                                        )}
                                    </div>
                                    {/* Class Interested In */}
                                    <div className="space-y-2">
                                        <label
                                            className="block text-sm font-bold text-gray-700 tracking-wide uppercase"
                                            htmlFor="class_interest"
                                        >
                                            Class Interested In{" "}
                                            <span className="text-[#e60000]">*</span>
                                        </label>
                                        <select
                                            className={`w-full px-5 py-4 border rounded-xl focus:ring-4 transition-all outline-none bg-gray-50/50 text-gray-600 cursor-pointer ${inputBorderClass("class_interest")}`}
                                            id="class_interest"
                                            name="class_interest"
                                            value={formData.class_interest}
                                            onChange={handleChange}
                                        >
                                            <option disabled value="">
                                                -- Select Class --
                                            </option>
                                            <option value="nursery">Nursery</option>
                                            <option value="kg">K.G.</option>
                                            <option value="1">Class 1</option>
                                            <option value="2">Class 2</option>
                                            <option value="3">Class 3</option>
                                            <option value="4">Class 4</option>
                                            <option value="5">Class 5</option>
                                            <option value="6">Class 6</option>
                                            <option value="7">Class 7</option>
                                            <option value="8">Class 8</option>
                                            <option value="9">Class 9</option>
                                            <option value="10">Class 10</option>
                                            <option value="11">Class 11</option>
                                            <option value="12">Class 12</option>
                                        </select>
                                        {errors.class_interest && (
                                            <p className="text-red-600 text-xs mt-1 font-medium">{errors.class_interest}</p>
                                        )}
                                    </div>
                                </div>
                                {/* Enquiry Message */}
                                <div className="space-y-2">
                                    <label
                                        className="block text-sm font-bold text-gray-700 tracking-wide uppercase"
                                        htmlFor="message"
                                    >
                                        Your Enquiry <span className="text-[#e60000]">*</span>
                                    </label>
                                    <textarea
                                        className={`w-full px-5 py-4 border rounded-xl focus:ring-4 transition-all outline-none bg-gray-50/50 resize-none ${inputBorderClass("message")}`}
                                        id="message"
                                        name="message"
                                        placeholder="How can we help you?"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                    <div className="flex justify-between">
                                        {errors.message ? (
                                            <p className="text-red-600 text-xs mt-1 font-medium">{errors.message}</p>
                                        ) : <span />}
                                        <p className={`text-xs mt-1 font-medium ${formData.message.length > 350 ? 'text-red-600' : 'text-gray-400'}`}>
                                            {formData.message.length}/350
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-center pt-6">
                                    <button
                                        className="bg-[#e60000] hover:bg-red-700 text-white font-bold py-5 px-16 rounded-full transition-all uppercase text-sm tracking-[0.2em] shadow-xl hover:shadow-red-200 hover:-translate-y-1 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-3"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting && (
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                            </svg>
                                        )}
                                        {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
                {/* END: ContactFormSection */}
                {/* BEGIN: MapSection */}
                <section
                    className="w-full bg-white pt-10 pb-20"
                    data-purpose="location-map"
                >
                    <div className="container mx-auto px-4">
                        {/* Map Framing */}
                        <div className="w-full h-[350px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl border-4 md:border-8 border-white ring-1 ring-gray-100 mb-12 md:mb-16">
                            <iframe
                                allowFullScreen=""
                                className="w-full h-full"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.7813472366884!2d79.91587490330188!3d27.874407765982546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb88c9abf88d%3A0xab4507cdce55890!2sTakshashila%20Public%20School!5e1!3m2!1sen!2sin!4v1781929242249!5m2!1sen!2sin"
                                style={{ border: 0 }}
                                title="Takshashila Public School Location Map"
                            ></iframe>
                        </div>
                        {/* Contact Info Bar */}
                        <div className="max-w-6xl mx-auto">
                            <div className="bg-[#1E3A55] text-white rounded-[2rem] shadow-2xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800 p-8 md:p-4">
                                {/* Address */}
                                <div className="flex flex-col items-center justify-center p-8 text-center group">
                                    <div className="w-14 h-14 bg-[#e60000]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#e60000] transition-colors duration-300">
                                        <svg
                                            className="w-7 h-7 text-[#e60000] group-hover:text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            ></path>
                                            <path
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-archivo font-bold mb-2 tracking-wide uppercase">
                                        Location
                                    </h3>
                                    <p className="text-sm text-gray-400 font-medium">
                                        Bijlipura, Anta, Shahjahanpur, Uttar Pradesh 242001
                                    </p>
                                </div>
                                {/* Phone */}
                                <div className="flex flex-col items-center justify-center p-8 text-center group">
                                    <div className="w-14 h-14 bg-[#e60000]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#e60000] transition-colors duration-300">
                                        <svg
                                            className="w-7 h-7 text-[#e60000] group-hover:text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-archivo font-bold mb-2 tracking-wide uppercase">
                                        Call Us
                                    </h3>
                                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                                        05842-224555
                                        <br />
                                        9335006888
                                    </p>
                                </div>
                                {/* Email Address */}
                                <div className="flex flex-col items-center justify-center p-8 text-center group">
                                    <div className="w-14 h-14 bg-[#e60000]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#e60000] transition-colors duration-300">
                                        <svg
                                            className="w-7 h-7 text-[#e60000] group-hover:text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-archivo font-bold mb-2 tracking-wide uppercase">
                                        Email Us
                                    </h3>
                                    <p className="text-sm text-gray-400 font-medium">
                                        tps_spn@rediffmail.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* END: MapSection */}
            </div>
            <Footer />
        </div>
    );
}
