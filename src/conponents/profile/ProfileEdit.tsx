'use client';

import { useState, useEffect } from 'react';
import { X, Camera, Save, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';

interface ProfileData {
    name: string;
    email: string;
    phone: string;
    location: string;
    joinDate: string;
    bio: string;
    membershipLevel: string;
    avatar?: string;
}

interface ProfileEditProps {
    isOpen: boolean;
    onClose: () => void;
    profileData: ProfileData;
    onSave: (data: ProfileData) => void;
}

const ProfileEdit = ({ isOpen, onClose, profileData, onSave }: ProfileEditProps) => {
    const [editData, setEditData] = useState<ProfileData>(profileData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen) {
            setEditData(profileData);
            setErrors({});
        }
    }, [isOpen, profileData]);

    const handleInputChange = (field: keyof ProfileData, value: string) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!editData.name.trim()) {
            newErrors.name = 'Tên không được để trống';
        }
        if (!editData.email.trim()) {
            newErrors.email = 'Email không được để trống';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!editData.phone.trim()) {
            newErrors.phone = 'Số điện thoại không được để trống';
        }
        if (!editData.location.trim()) {
            newErrors.location = 'Địa chỉ không được để trống';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            onSave(editData);
        } catch (error) {
            console.error('Error saving profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAvatarUpload = () => {
        // In a real app, this would open file picker
        console.log('Upload avatar');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-800">Chỉnh sửa hồ sơ</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            disabled={isLoading}
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center overflow-hidden">
                                {editData.avatar ? (
                                    <Image
                                        src={editData.avatar}
                                        alt="Profile"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="w-12 h-12 text-white" />
                                )}
                            </div>
                            <button
                                onClick={handleAvatarUpload}
                                className="absolute -bottom-2 -right-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors shadow-lg"
                                disabled={isLoading}
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500">Nhấp vào camera để thay đổi ảnh đại diện</p>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <User className="w-4 h-4 inline mr-1" />
                                Tên đầy đủ *
                            </label>
                            <input
                                type="text"
                                value={editData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                                placeholder="Nhập tên đầy đủ"
                                disabled={isLoading}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Mail className="w-4 h-4 inline mr-1" />
                                Email *
                            </label>
                            <input
                                type="email"
                                value={editData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                                placeholder="email@example.com"
                                disabled={isLoading}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Phone className="w-4 h-4 inline mr-1" />
                                Số điện thoại *
                            </label>
                            <input
                                type="tel"
                                value={editData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                                placeholder="+84 123 456 789"
                                disabled={isLoading}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        {/* Location */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <MapPin className="w-4 h-4 inline mr-1" />
                                Địa chỉ *
                            </label>
                            <input
                                type="text"
                                value={editData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${errors.location ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                                placeholder="Thành phố, Quốc gia"
                                disabled={isLoading}
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                        </div>

                        {/* Bio */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Giới thiệu bản thân
                            </label>
                            <textarea
                                value={editData.bio}
                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                                placeholder="Viết vài dòng về bản thân bạn..."
                                disabled={isLoading}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {editData.bio.length}/500 ký tự
                            </p>
                        </div>
                    </div>

                    {/* Join Date Display */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm">
                                Tham gia từ: <span className="font-semibold">{new Date(editData.joinDate).toLocaleDateString('vi-VN')}</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
                    <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                            disabled={isLoading}
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                    Đang lưu...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Lưu thay đổi
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;