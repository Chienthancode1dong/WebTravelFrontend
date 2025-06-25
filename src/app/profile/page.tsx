'use client';

import { useEffect, useState } from 'react';
import Header from '@/conponents/header';
import ProfileHeader from '@/conponents/profile/ProfileHeader';
import ProfileEdit from '@/conponents/profile/ProfileEdit';
import QuickAction from '@/conponents/profile/QuickAction';
import RecentActivity from '@/conponents/profile/RecentActivity';
import { userApi } from '@/lib/api-user';
import HistorySummary from '@/conponents/profile/HistorySummary';

const Profile = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        joinDate: '',
        bio: 'Yêu thích du lịch và khám phá những vùng đất mới. Luôn tìm kiếm những trải nghiệm thú vị và độc đáo.',
        membershipLevel: 'Gold'
    });

    const getInformation = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            const response = await userApi.information(userId);
            console.log('User Information:', response);
            if (response) {
                setProfileData({
                    name: response.name,
                    email: response.email,
                    phone: response.phone_number || '',
                    location: response.address || '',
                    joinDate: response.createdAt,
                    bio: 'Yêu thích du lịch và khám phá những vùng đất mới. Luôn tìm kiếm những trải nghiệm thú vị và độc đáo.',
                    membershipLevel: response.role === 'ADMIN' ? 'Admin' : 'Gold'
                });

            }
        }
    }
    useEffect(() => {
        getInformation();
    }, []);

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveProfile = (updatedData: typeof profileData) => {
        setProfileData(updatedData);
        setIsEditModalOpen(false);
    };

    return (
        <>
            <Header opacity='100' />
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 pt-32">
                <ProfileHeader
                    profileData={profileData}
                    onEdit={handleOpenEditModal}
                />                {/* Profile Edit Modal */}
                <ProfileEdit
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    profileData={profileData}
                    onSave={handleSaveProfile}
                />

                {/* History Summary */}
                <HistorySummary />

                {/* Additional Sections */}
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <QuickAction />
                        <RecentActivity />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;