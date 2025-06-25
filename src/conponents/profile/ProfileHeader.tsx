'use client';

import { useState } from 'react';
import Image from "next/image";
import { User, Mail, Phone, MapPin, Calendar, Camera, Edit3, Settings, Star, Award } from 'lucide-react';

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

interface ProfileHeaderProps {
    profileData: ProfileData;
    onEdit: () => void;
}

const ProfileHeader = ({
    profileData,
    onEdit
}: ProfileHeaderProps) => {
    return (
        <div className="max-w-4xl mx-auto px-4">
            {/* Hero Section with Cover Photo */}
            <div className="relative rounded-3xl shadow-2xl overflow-hidden mb-8 h-80">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0">
                    <Image
                        src="/4459b16d92fe37f01fbd24ba59e39ee98303f766 (1).jpg"
                        alt="Hero Pattern"
                        layout="fill"
                        objectFit="cover"
                        className="object-cover"
                    />
                </div>

                {/* Cover Photo Upload Button */}
                <button className="absolute top-6 right-6 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-3 rounded-xl transition-all duration-300 border border-white/20">
                    <Camera className="w-5 h-5" />
                </button>

                {/* Profile Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-8">

                        {/* Profile Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-36 h-36 bg-white rounded-full p-1.5 shadow-2xl">
                                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center overflow-hidden">
                                    {profileData.avatar ? (
                                        <Image
                                            src={profileData.avatar}
                                            alt="Profile"
                                            width={132}
                                            height={132}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-16 h-16 text-white" />
                                    )}
                                </div>
                            </div>
                            <button className="absolute -bottom-2 -right-2 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-xl transition-all duration-300 border-4 border-white">
                                <Camera className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Profile Information */}
                        <div className="flex-1 text-white min-w-0">
                            {/* Name */}
                            <h1 className="text-3xl md:text-4xl font-bold mb-3 truncate">{profileData.name}</h1>

                            {/* Contact Info */}
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-white/90 mb-4">
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span className="text-sm truncate">{profileData.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span className="text-sm">Tham gia từ {new Date(profileData.joinDate).toLocaleDateString('vi-VN')}</span>
                                </div>
                            </div>

                            {/* Membership & Stats */}
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center bg-amber-500/90 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-400/50">
                                    <Award className="w-4 h-4 mr-2" />
                                    <span className="text-sm font-semibold">{profileData.membershipLevel} Member</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 flex-shrink-0">
                            <button
                                onClick={onEdit}
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-xl transition-all duration-300 shadow-lg border border-white/30"
                            >
                                <Edit3 className="w-5 h-5" />
                            </button>
                            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-xl transition-all duration-300 shadow-lg border border-white/30">
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Information & Bio Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <Phone className="w-5 h-5 mr-2 text-orange-500" />
                            Thông tin liên hệ
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <Phone className="w-5 h-5 mr-4 text-orange-500 flex-shrink-0" />
                                <span className="text-gray-700 font-medium">{profileData.phone}</span>
                            </div>
                            <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <MapPin className="w-5 h-5 mr-4 text-orange-500 flex-shrink-0" />
                                <span className="text-gray-700 font-medium">{profileData.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <User className="w-5 h-5 mr-2 text-orange-500" />
                            Giới thiệu
                        </h3>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
